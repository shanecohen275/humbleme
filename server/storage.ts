import { users, type User, type InsertUser, quotes, type Quote, type InsertQuote } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

// Storage interface for CRUD operations
export interface IStorage {
  // User operations (kept from template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quote operations
  getQuotes(level: number): Promise<Quote[]>;
  getRandomQuote(level: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  seedQuotes(quotes: InsertQuote[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Check if we need to seed quotes
    this.seedIfEmpty();
  }

  // User operations (kept from template)
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Quote operations
  async getQuotes(level: number): Promise<Quote[]> {
    return await db.select().from(quotes).where(eq(quotes.level, level));
  }
  
  async getRandomQuote(level: number): Promise<Quote | undefined> {
    // Use SQL to get a random quote directly from the database
    const [quote] = await db
      .select()
      .from(quotes)
      .where(eq(quotes.level, level))
      .orderBy(sql`RANDOM()`)
      .limit(1);
    
    return quote || undefined;
  }
  
  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const [quote] = await db
      .insert(quotes)
      .values(insertQuote)
      .returning();
    return quote;
  }
  
  async seedQuotes(quotesToSeed: InsertQuote[]): Promise<void> {
    if (quotesToSeed.length === 0) return;
    
    await db.insert(quotes).values(quotesToSeed);
  }
  
  // Helper to check if quotes table is empty and seed if needed
  private async seedIfEmpty(): Promise<void> {
    // Check if there are any quotes
    const [count] = await db.select({ count: sql`COUNT(*)` }).from(quotes);
    
    // If no quotes, seed with default data
    if (!count || count.count === 0 || Number(count.count) === 0) {
      await this.seedDefaultQuotes();
    }
  }
  
  // Helper to seed default quotes
  private async seedDefaultQuotes(): Promise<void> {
    const defaultQuotes: InsertQuote[] = [
      // Level 1 - Treat Me Like Royalty
      { level: 1, text: "You're doing great, sweetie. Remember, breathing counts as progress." },
      { level: 1, text: "Not everyone can be perfect. Thankfully, you've never even tried." },
      { level: 1, text: "Your potential is limitless. Your execution could use a timer, though." },
      { level: 1, text: "You're basically a princess. Specifically, one of those ones that needs rescuing constantly." },
      { level: 1, text: "Don't worry about your flaws. They're what make you... well, mostly flawed, but charmingly so." },
      
      // Level 2 - Mild Toast
      { level: 2, text: "Your room may be a mess, but at least your excuses are organized." },
      { level: 2, text: "You're special. Not 'everyone gets a trophy' special, but... you know." },
      { level: 2, text: "You're not lazy, you're just conserving energy for more important tasks. Like finding more excuses." },
      { level: 2, text: "Your work ethic is like WiFi – invisible but you hope it's there." },
      { level: 2, text: "If talent skipped a generation, it's probably just taking a brief vacation in your case." },
      
      // Level 3 - Public Roast
      { level: 3, text: "You're not a failure, you're just...a prototype that should've stayed in beta." },
      { level: 3, text: "You've set the bar so low, it's practically a tripping hazard in hell." },
      { level: 3, text: "Your decision-making skills are like your dating history – questionable, but entertaining for everyone else." },
      { level: 3, text: "If mediocrity were an Olympic sport, you'd still place fourth." },
      { level: 3, text: "You put the 'pro' in 'procrastination' and the 'mess' in 'promising'." },
      
      // Level 4 - Character Development Arc
      { level: 4, text: "Your life story would be inspirational if it were happening to someone else." },
      { level: 4, text: "You're living proof that evolution can go in reverse, but hey, at least you're unique." },
      { level: 4, text: "Your potential is like your WiFi signal – theoretically there, but barely connecting when you need it most." },
      { level: 4, text: "Your ambition is writing checks your talent can't cash. Maybe try a payment plan?" },
      { level: 4, text: "The good news: you're one of a kind. The bad news: that was intentional." },
      
      // Level 5 - Full Gordon Ramsay
      { level: 5, text: "If common sense were a currency, you'd be on a payment plan." },
      { level: 5, text: "Your achievements are like stars – millions of light years away and not visible to the naked eye." },
      { level: 5, text: "If disappointment had a spokesperson, your resume would be their business card." },
      { level: 5, text: "You've got all the raw talent of a participation trophy and half the usefulness." },
      { level: 5, text: "I've seen more drive in a car with no wheels. At least that had an excuse." }
    ];
    
    await this.seedQuotes(defaultQuotes);
  }
}

export const storage = new DatabaseStorage();
