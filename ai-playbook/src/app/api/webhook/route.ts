import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendPurchaseConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey);
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;

  // In development, parse without signature verification
  if (process.env.NODE_ENV === "development" || !process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET === "whsec_replace_with_your_webhook_secret") {
    event = JSON.parse(body) as Stripe.Event;
  } else {
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;

    if (customerEmail) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const registerUrl = `${baseUrl}/register?email=${encodeURIComponent(customerEmail)}`;
      await sendPurchaseConfirmation(customerEmail, registerUrl);
    }
  }

  return NextResponse.json({ received: true });
}
