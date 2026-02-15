import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in instead." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = createUser(email, passwordHash);

    await createSession(user.id, user.email);

    return NextResponse.json({ success: true, email: user.email });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
