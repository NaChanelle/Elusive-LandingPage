import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").default(""),
  lastName: text("last_name").default(""),
  password: text("password").notNull(),
});

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  investigationInterests: text("investigation_interests").array().notNull(),
  preferredRole: text("preferred_role").notNull(),
  interests: text("interests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rsvps = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  investigationChoice: text("investigation_choice"),
  source: text("source").default("coming_soon"), // 'coming_soon', 'platform', 'vessel'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  firstName: true,
  lastName: true,
  password: true,
}).extend({
  email: z.string().email("Valid email is required"),
  firstName: z.string().default(""),
  lastName: z.string().default(""),
});

export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  createdAt: true,
}).extend({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Valid email is required"),
  investigationInterests: z.array(z.string()).min(1, "Select at least one interest"),
  preferredRole: z.string().optional(),
  interests: z.string().optional(),
});

export const insertRSVPSchema = createInsertSchema(rsvps).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Valid email is required"),
  firstName: z.string().optional(),
  investigationChoice: z.string().optional(),
  source: z.string().default("coming_soon"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservations.$inferSelect;
export type InsertRSVP = z.infer<typeof insertRSVPSchema>;
export type RSVP = typeof rsvps.$inferSelect;
