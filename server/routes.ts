import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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

  const httpServer = createServer(app);
  return httpServer;
}
