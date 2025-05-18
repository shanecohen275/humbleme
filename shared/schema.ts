import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Quote table schema
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  level: integer("level").notNull(),
  text: text("text").notNull().unique(),
});

// User schema (kept from template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Insert schemas
export const insertQuoteSchema = createInsertSchema(quotes).omit({ id: true });
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// For validation on API endpoints
export const getLevelParamSchema = z.object({
  level: z.coerce.number().int().min(1).max(5),
});
