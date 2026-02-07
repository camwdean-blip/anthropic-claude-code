import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { sendIntroductionEmails } from '@/lib/email';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const introductionId = session.metadata?.introductionId;

    if (introductionId) {
      // Update introduction status
      const introduction = await prisma.introduction.update({
        where: { id: introductionId },
        data: {
          status: 'paid',
          stripePaymentId: session.payment_intent as string,
        },
        include: {
          vendor: true,
        },
      });

      // Send introduction emails
      await sendIntroductionEmails({
        vendorName: introduction.vendor.businessName,
        vendorEmail: introduction.vendor.email,
        vendorPhone: introduction.vendor.phone,
        buyerName: introduction.buyerName,
        buyerEmail: introduction.buyerEmail,
        buyerPhone: introduction.buyerPhone,
        buyerCompany: introduction.buyerCompany,
        projectDescription: introduction.projectDescription,
      });

      // Update status to completed
      await prisma.introduction.update({
        where: { id: introductionId },
        data: { status: 'completed' },
      });
    }
  }

  return NextResponse.json({ received: true });
}
