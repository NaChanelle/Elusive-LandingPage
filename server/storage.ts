import { users, reservations, rsvps, type User, type InsertUser, type Reservation, type InsertReservation, type RSVP, type InsertRSVP } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getReservation(id: number): Promise<Reservation | undefined>;
  getReservationByEmail(email: string): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getAllReservations(): Promise<Reservation[]>;
  
  getRSVP(id: number): Promise<RSVP | undefined>;
  getRSVPByEmail(email: string): Promise<RSVP | undefined>;
  createRSVP(rsvp: InsertRSVP): Promise<RSVP>;
  getAllRSVPs(): Promise<RSVP[]>;
  getRSVPCount(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private reservations: Map<number, Reservation>;
  private rsvps: Map<number, RSVP>;
  private currentUserId: number;
  private currentReservationId: number;
  private currentRSVPId: number;

  constructor() {
    this.users = new Map();
    this.reservations = new Map();
    this.rsvps = new Map();
    this.currentUserId = 1;
    this.currentReservationId = 1;
    this.currentRSVPId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async getReservationByEmail(email: string): Promise<Reservation | undefined> {
    return Array.from(this.reservations.values()).find(
      (reservation) => reservation.email === email,
    );
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = this.currentReservationId++;
    const reservation: Reservation = {
      ...insertReservation,
      id,
      createdAt: new Date(),
      interests: insertReservation.interests || null,
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async getAllReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }

  async getRSVP(id: number): Promise<RSVP | undefined> {
    return this.rsvps.get(id);
  }

  async getRSVPByEmail(email: string): Promise<RSVP | undefined> {
    return Array.from(this.rsvps.values()).find(
      (rsvp) => rsvp.email === email,
    );
  }

  async createRSVP(insertRSVP: InsertRSVP): Promise<RSVP> {
    const id = this.currentRSVPId++;
    const rsvp: RSVP = {
      id,
      email: insertRSVP.email,
      firstName: insertRSVP.firstName || null,
      investigationChoice: insertRSVP.investigationChoice || null,
      source: insertRSVP.source || "coming_soon",
      createdAt: new Date(),
    };
    this.rsvps.set(id, rsvp);
    return rsvp;
  }

  async getAllRSVPs(): Promise<RSVP[]> {
    return Array.from(this.rsvps.values());
  }

  async getRSVPCount(): Promise<number> {
    return this.rsvps.size;
  }
}

export const storage = new MemStorage();
