import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function initDb() {
  await db.execute(`
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

export interface User {
  id: number;
  email: string;
  password_hash: string;
  stripe_customer_id: string | null;
  stripe_session_id: string | null;
  created_at: string;
}

export async function createUser(
  email: string,
  passwordHash: string,
  stripeCustomerId?: string,
  stripeSessionId?: string
): Promise<User> {
  await initDb();
  await db.execute({
    sql: `INSERT INTO users (email, password_hash, stripe_customer_id, stripe_session_id)
          VALUES (?, ?, ?, ?)`,
    args: [email, passwordHash, stripeCustomerId || null, stripeSessionId || null],
  });
  return (await getUserByEmail(email))!;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  await initDb();
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [email],
  });
  if (result.rows.length === 0) return undefined;
  return result.rows[0] as unknown as User;
}

export async function getUserById(id: number): Promise<User | undefined> {
  await initDb();
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE id = ?",
    args: [id],
  });
  if (result.rows.length === 0) return undefined;
  return result.rows[0] as unknown as User;
}
