import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getLevelParamSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get a random quote for a specific level
  app.get("/api/quotes/random", async (req, res) => {
    try {
      const { level } = getLevelParamSchema.parse({ 
        level: req.query.level 
      });
      
      const quote = await storage.getRandomQuote(level);
      
      if (!quote) {
        return res.status(404).json({ 
          message: `No quotes found for level ${level}` 
        });
      }
      
      return res.json(quote);
    } catch (error) {
      if (error instanceof Error) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message || "Invalid level parameter"
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // API route to get all quotes for a specific level
  app.get("/api/quotes", async (req, res) => {
    try {
      const { level } = getLevelParamSchema.parse({ 
        level: req.query.level 
      });
      
      const quotes = await storage.getQuotes(level);
      
      return res.json(quotes);
    } catch (error) {
      if (error instanceof Error) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message || "Invalid level parameter"
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
