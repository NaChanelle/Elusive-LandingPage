import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs/promises";
import path from "path";
import { insertReservationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create reservation
  app.post("/api/reservations", async (req, res) => {
    try {
      const data = insertReservationSchema.parse(req.body);
      
      // Check if email already exists
      const existingReservation = await storage.getReservationByEmail(data.email);
      if (existingReservation) {
        return res.status(400).json({ 
          message: "Email already registered. You're already on our investigation list!" 
        });
      }

      const reservation = await storage.createReservation(data);
      res.json({ 
        message: "Investigation access reserved successfully!",
        reservation: {
          id: reservation.id,
          firstName: reservation.firstName,
          email: reservation.email,
          createdAt: reservation.createdAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Please check your information and try again.",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to process reservation. Please try again." });
    }
  });

  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Create new user (in production, hash the password)
      const user = await storage.createUser({
        username: email, // Using email as username for simplicity
        email,
        firstName: "",
        lastName: "",
        password: password // In production, hash this password
      });

      res.status(201).json({ message: "Account created successfully", userId: user.id });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In production, verify password hash here
      res.json({ message: "Sign in successful", user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Failed to sign in" });
    }
  });

  // Get all reservations (for admin purposes)
  app.get("/api/reservations", async (req, res) => {
    try {
      const reservations = await storage.getAllReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "Investigation Portal is active", timestamp: new Date().toISOString() });
  });

  // Content management API endpoints
  app.post('/api/content/:type', async (req, res) => {
    try {
      const { type } = req.params;
      const content = req.body;
      
      if (!['home', 'vessel'].includes(type)) {
        return res.status(400).json({ error: 'Invalid content type' });
      }
      
      const contentPath = path.join(process.cwd(), 'public', 'content', `${type}.json`);
      await fs.writeFile(contentPath, JSON.stringify(content, null, 2));
      
      res.json({ success: true, message: `${type} content updated successfully` });
    } catch (error) {
      console.error('Error saving content:', error);
      res.status(500).json({ error: 'Failed to save content' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
