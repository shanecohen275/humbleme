import { db } from "../server/db";
import { quotes } from "../shared/schema";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { eq, sql } from "drizzle-orm";

// Get current file URL and directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define InsertQuote type locally
type QuoteData = {
  level: number;
  text: string;
};

async function countExistingQuotes() {
  const result = await db.select({ count: sql`COUNT(*)` }).from(quotes);
  return Number(result[0]?.count || 0);
}

async function seedQuotes() {
  try {
    console.log("Starting database quote seeding process...");
    
    // Check existing quotes first
    const existingCount = await countExistingQuotes();
    console.log(`Found ${existingCount} quotes already in database`);
    
    // Read quotes from JSON file
    const quotesFilePath = path.join(__dirname, '../utils/quotes.json');
    if (!fs.existsSync(quotesFilePath)) {
      console.error("Quotes file not found:", quotesFilePath);
      return;
    }
    
    const quotesData = JSON.parse(fs.readFileSync(quotesFilePath, 'utf8')) as QuoteData[];
    console.log(`Read ${quotesData.length} quotes from file`);
    
    // Skip placeholder quotes with default text
    const validQuotes = quotesData.filter(quote => 
      !quote.text.includes('Replace with real quote later')
    );
    
    console.log(`Found ${validQuotes.length} valid quotes (excluding placeholders)`);
    
    // Insert quotes in batches to avoid memory issues
    const BATCH_SIZE = 50;
    let insertedCount = 0;
    let successfulBatches = 0;
    
    for (let i = 0; i < validQuotes.length; i += BATCH_SIZE) {
      try {
        const batch = validQuotes.slice(i, Math.min(i + BATCH_SIZE, validQuotes.length));
        
        // Use onConflictDoNothing with the unique constraint on text
        await db.insert(quotes).values(batch)
          .onConflictDoNothing({ target: [quotes.text] });
        
        successfulBatches++;
        insertedCount += batch.length;
        console.log(`Processed batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(validQuotes.length / BATCH_SIZE)}`);
      } catch (error) {
        console.error(`Error in batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
        
        // If batch insert fails, try one by one
        const batch = validQuotes.slice(i, Math.min(i + BATCH_SIZE, validQuotes.length));
        console.log(`Falling back to individual inserts for ${batch.length} quotes`);
        
        for (const quote of batch) {
          try {
            await db.insert(quotes).values(quote)
              .onConflictDoNothing({ target: [quotes.text] });
            insertedCount++;
          } catch (e) {
            console.error(`Could not insert quote: ${quote.text.substring(0, 30)}...`);
          }
        }
      }
    }
    
    // Count final number of quotes
    const finalCount = await countExistingQuotes();
    
    console.log("Seeding complete!");
    console.log(`Initial count: ${existingCount}`);
    console.log(`Final count: ${finalCount}`);
    console.log(`Added approximately ${finalCount - existingCount} new quotes`);
    
    // Count by level
    const levelCounts = await Promise.all([1, 2, 3, 4, 5].map(async level => {
      const result = await db
        .select({ count: sql`COUNT(*)` })
        .from(quotes)
        .where(eq(quotes.level, level));
      return { level, count: Number(result[0]?.count || 0) };
    }));
    
    console.log("Quotes by level:");
    levelCounts.forEach(({ level, count }) => {
      console.log(`Level ${level}: ${count} quotes`);
    });
    
  } catch (error) {
    console.error("Error seeding quotes:", error);
  }
}

// Run the seeding function
seedQuotes()
  .then(() => {
    console.log("Script completed successfully");
    process.exit(0);
  })
  .catch(error => {
    console.error("Error in script execution:", error);
    process.exit(1);
  });