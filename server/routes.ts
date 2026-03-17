import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertWaitlistSchema,
  insertNewsletterSchema,
  insertContactSchema,
  insertReviewSchema,
} from "@shared/schema";
import { ZodError } from "zod";

function validationError(res: any, err: ZodError) {
  return res.status(400).json({
    error: "Validation failed",
    details: err.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
  });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ── Health check ──────────────────────────────────────────────────────────
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ── Stats (public) ────────────────────────────────────────────────────────
  app.get("/api/stats", async (_req, res) => {
    try {
      const waitlistCount = await storage.getWaitlistCount();
      res.json({
        waitlistCount,
        downloads: 120000,
        countries: 87,
        destinations: 200,
        rating: 4.9,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // ── Waitlist ──────────────────────────────────────────────────────────────
  app.post("/api/waitlist", async (req, res) => {
    const parsed = insertWaitlistSchema.safeParse(req.body);
    if (!parsed.success) return validationError(res, parsed.error);

    const { email, name, referralSource } = parsed.data;

    try {
      const already = await storage.isEmailOnWaitlist(email);
      if (already) {
        return res.status(409).json({ error: "Email already on waitlist" });
      }
      const entry = await storage.addToWaitlist({ email, name, referralSource });
      const count = await storage.getWaitlistCount();
      return res.status(201).json({
        success: true,
        message: "You're on the waitlist!",
        position: count,
        id: entry.id,
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  // ── Newsletter ────────────────────────────────────────────────────────────
  app.post("/api/newsletter", async (req, res) => {
    const parsed = insertNewsletterSchema.safeParse(req.body);
    if (!parsed.success) return validationError(res, parsed.error);

    const { email } = parsed.data;

    try {
      const already = await storage.isEmailSubscribed(email);
      if (already) {
        return res.status(409).json({ error: "Email already subscribed" });
      }
      await storage.subscribeNewsletter({ email });
      return res.status(201).json({
        success: true,
        message: "Subscribed! Check your inbox for a confirmation email.",
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  // ── Contact form ──────────────────────────────────────────────────────────
  app.post("/api/contact", async (req, res) => {
    const parsed = insertContactSchema.safeParse(req.body);
    if (!parsed.success) return validationError(res, parsed.error);

    try {
      const contact = await storage.createContact(parsed.data);
      return res.status(201).json({
        success: true,
        message: "Message received! We'll get back to you within 24 hours.",
        id: contact.id,
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to send message" });
    }
  });

  // ── Reviews ───────────────────────────────────────────────────────────────
  app.get("/api/reviews", async (_req, res) => {
    try {
      const approved = await storage.getApprovedReviews();
      res.json({ reviews: approved });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    const parsed = insertReviewSchema.safeParse(req.body);
    if (!parsed.success) return validationError(res, parsed.error);

    const { rating } = parsed.data;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    try {
      const review = await storage.createReview(parsed.data);
      return res.status(201).json({
        success: true,
        message: "Review submitted! It will appear after moderation.",
        id: review.id,
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to submit review" });
    }
  });

  return httpServer;
}
