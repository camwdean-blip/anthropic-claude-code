import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    const email = session.customer_details?.email;
    if (!email) {
      return NextResponse.json({ error: "No email found for this payment" }, { status: 400 });
    }

    return NextResponse.json({ email, paid: true });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json(
      { error: "Could not verify payment. Please contact support@theaiplaybook.com." },
      { status: 500 }
    );
  }
}
