import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users, waitlist, newsletter, contacts, reviews,
  type User, type InsertUser,
  type WaitlistEntry, type InsertWaitlist,
  type NewsletterSubscriber, type InsertNewsletter,
  type ContactMessage, type InsertContact,
  type Review, type InsertReview,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addToWaitlist(entry: InsertWaitlist): Promise<WaitlistEntry>;
  getWaitlistCount(): Promise<number>;
  isEmailOnWaitlist(email: string): Promise<boolean>;
  subscribeNewsletter(entry: InsertNewsletter): Promise<NewsletterSubscriber>;
  isEmailSubscribed(email: string): Promise<boolean>;
  createContact(contact: InsertContact): Promise<ContactMessage>;
  createReview(review: InsertReview): Promise<Review>;
  getApprovedReviews(): Promise<Review[]>;
}

// ── PostgreSQL Storage ─────────────────────────────────────────────────────────
export class DbStorage implements IStorage {
  async getUser(id: string) {
    const [user] = await db!.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username: string) {
    const [user] = await db!.select().from(users).where(eq(users.username, username));
    return user;
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db!.insert(users).values(insertUser).returning();
    return user;
  }
  async addToWaitlist(entry: InsertWaitlist): Promise<WaitlistEntry> {
    const [row] = await db!.insert(waitlist).values(entry).returning();
    return row;
  }
  async getWaitlistCount(): Promise<number> {
    const rows = await db!.select().from(waitlist);
    return rows.length;
  }
  async isEmailOnWaitlist(email: string): Promise<boolean> {
    const [row] = await db!.select().from(waitlist).where(eq(waitlist.email, email));
    return !!row;
  }
  async subscribeNewsletter(entry: InsertNewsletter): Promise<NewsletterSubscriber> {
    const [row] = await db!.insert(newsletter).values(entry).returning();
    return row;
  }
  async isEmailSubscribed(email: string): Promise<boolean> {
    const [row] = await db!.select().from(newsletter).where(eq(newsletter.email, email));
    return !!row;
  }
  async createContact(contact: InsertContact): Promise<ContactMessage> {
    const [row] = await db!.insert(contacts).values(contact).returning();
    return row;
  }
  async createReview(review: InsertReview): Promise<Review> {
    const [row] = await db!.insert(reviews).values(review).returning();
    return row;
  }
  async getApprovedReviews(): Promise<Review[]> {
    return db!.select().from(reviews).where(eq(reviews.approved, true));
  }
}

// ── In-memory Storage (fallback when no DB) ────────────────────────────────────
export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private waitlistEntries = new Map<string, WaitlistEntry>();
  private newsletterSubs = new Map<string, NewsletterSubscriber>();
  private contactMessages: ContactMessage[] = [];
  private reviewList: Review[] = [];

  async getUser(id: string) { return this.users.get(id); }
  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  async addToWaitlist(entry: InsertWaitlist): Promise<WaitlistEntry> {
    const id = randomUUID();
    const row: WaitlistEntry = { ...entry, id, name: entry.name ?? null, referralSource: entry.referralSource ?? null, createdAt: new Date() };
    this.waitlistEntries.set(entry.email, row);
    return row;
  }
  async getWaitlistCount() { return this.waitlistEntries.size; }
  async isEmailOnWaitlist(email: string) { return this.waitlistEntries.has(email); }
  async subscribeNewsletter(entry: InsertNewsletter): Promise<NewsletterSubscriber> {
    const id = randomUUID();
    const row: NewsletterSubscriber = { ...entry, id, confirmed: false, createdAt: new Date() };
    this.newsletterSubs.set(entry.email, row);
    return row;
  }
  async isEmailSubscribed(email: string) { return this.newsletterSubs.has(email); }
  async createContact(contact: InsertContact): Promise<ContactMessage> {
    const id = randomUUID();
    const row: ContactMessage = { ...contact, id, read: false, createdAt: new Date() };
    this.contactMessages.push(row);
    return row;
  }
  async createReview(review: InsertReview): Promise<Review> {
    const id = randomUUID();
    const row: Review = { ...review, id, approved: false, createdAt: new Date() };
    this.reviewList.push(row);
    return row;
  }
  async getApprovedReviews() { return this.reviewList.filter((r) => r.approved); }
}

// Use DB if available, otherwise MemStorage
export const storage: IStorage = db ? new DbStorage() : new MemStorage();
