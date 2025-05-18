import { storage } from "../server/storage";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Define InsertQuote type locally to avoid import issues
type InsertQuote = {
  level: number;
  text: string;
};

// Get current file URL and directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to get existing quotes
async function getExistingQuotes() {
  const quotes: InsertQuote[] = [];
  for (let level = 1; level <= 5; level++) {
    const levelQuotes = await storage.getQuotes(level);
    quotes.push(...levelQuotes.map(q => ({ level: q.level, text: q.text })));
  }
  return quotes;
}

// Function to read quotes from a JSON file
function readQuotesFromFile(filePath: string): InsertQuote[] {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading quotes file: ${error}`);
    return [];
  }
}

// Main function to seed quotes
async function seedQuotes() {
  // Path to the JSON file with quotes
  const quotesFilePath = path.join(__dirname, 'quotes.json');
  
  // Read quotes from file
  const newQuotes = readQuotesFromFile(quotesFilePath);
  
  if (newQuotes.length === 0) {
    console.error("No quotes found in file or file doesn't exist");
    return;
  }
  
  // Get existing quotes to avoid duplicates
  const existingQuotes = await getExistingQuotes();
  const existingTexts = new Set(existingQuotes.map(q => q.text));
  
  // Filter out duplicates
  const uniqueNewQuotes = newQuotes.filter(q => !existingTexts.has(q.text));
  
  console.log(`Found ${newQuotes.length} quotes in file`);
  console.log(`${existingQuotes.length} quotes already in database`);
  console.log(`Adding ${uniqueNewQuotes.length} new unique quotes`);
  
  if (uniqueNewQuotes.length === 0) {
    console.log("No new quotes to add");
    return;
  }
  
  // Seed quotes in batches to avoid memory issues
  const BATCH_SIZE = 100;
  for (let i = 0; i < uniqueNewQuotes.length; i += BATCH_SIZE) {
    const batch = uniqueNewQuotes.slice(i, i + BATCH_SIZE);
    await storage.seedQuotes(batch);
    console.log(`Seeded batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(uniqueNewQuotes.length / BATCH_SIZE)}`);
  }
  
  console.log("Quote seeding complete!");
}

// Execute the seeding process
seedQuotes()
  .then(() => {
    console.log("Script completed successfully");
    process.exit(0);
  })
  .catch(error => {
    console.error("Error in seeding script:", error);
    process.exit(1);
  });