import { users, reservations, type User, type InsertUser, type Reservation, type InsertReservation } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getReservation(id: number): Promise<Reservation | undefined>;
  getReservationByEmail(email: string): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getAllReservations(): Promise<Reservation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private reservations: Map<number, Reservation>;
  private currentUserId: number;
  private currentReservationId: number;

  constructor() {
    this.users = new Map();
    this.reservations = new Map();
    this.currentUserId = 1;
    this.currentReservationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
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
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async getAllReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }
}

export const storage = new MemStorage();
