import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "users.db");

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        stripe_customer_id TEXT,
        stripe_session_id TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);
  }
  return db;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  stripe_customer_id: string | null;
  stripe_session_id: string | null;
  created_at: string;
}

export function createUser(
  email: string,
  passwordHash: string,
  stripeCustomerId?: string,
  stripeSessionId?: string
): User {
  const stmt = getDb().prepare(
    `INSERT INTO users (email, password_hash, stripe_customer_id, stripe_session_id)
     VALUES (?, ?, ?, ?)`
  );
  const result = stmt.run(email, passwordHash, stripeCustomerId || null, stripeSessionId || null);
  return getUserById(result.lastInsertRowid as number)!;
}

export function getUserByEmail(email: string): User | undefined {
  return getDb()
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as User | undefined;
}

export function getUserById(id: number): User | undefined {
  return getDb()
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(id) as User | undefined;
}
