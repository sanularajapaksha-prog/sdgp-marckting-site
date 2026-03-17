import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";

let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 5000,
    });
    db = drizzle(pool, { schema });
  } catch (err) {
    console.warn("[db] Failed to connect to database, using in-memory storage:", err);
    db = null;
  }
} else {
  console.warn("[db] DATABASE_URL not set — using in-memory storage");
}

export { db };
