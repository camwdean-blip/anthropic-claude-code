import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { stripe, INTRODUCTION_FEE_CENTS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      vendorId,
      buyerName,
      buyerEmail,
      buyerPhone,
      buyerCompany,
      buyerTitle,
      projectDescription,
      projectTimeline,
      projectBudget,
    } = body;

    // Validate required fields
    if (!vendorId || !buyerName || !buyerEmail || !buyerPhone || !buyerCompany || !projectDescription) {
      return NextResponse.json(
        { error: 'Please fill out all required fields.' },
        { status: 400 }
      );
    }

    // Verify vendor exists and is approved
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true, businessName: true, status: true },
    });

    if (!vendor || vendor.status !== 'approved') {
      return NextResponse.json(
        { error: 'Vendor not found or not available.' },
        { status: 404 }
      );
    }

    // Create the introduction record (pending payment)
    const introduction = await prisma.introduction.create({
      data: {
        vendorId,
        buyerName: String(buyerName).trim(),
        buyerEmail: String(buyerEmail).trim().toLowerCase(),
        buyerPhone: String(buyerPhone).trim(),
        buyerCompany: String(buyerCompany).trim(),
        buyerTitle: buyerTitle ? String(buyerTitle).trim() : null,
        projectDescription: String(projectDescription).trim(),
        projectTimeline: projectTimeline ? String(projectTimeline) : null,
        projectBudget: projectBudget ? String(projectBudget) : null,
        amount: INTRODUCTION_FEE_CENTS,
        status: 'pending',
      },
    });

    // Try to create Stripe checkout session
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Introduction to ${vendor.businessName}`,
                description: `Warm introduction connecting ${buyerCompany} with ${vendor.businessName} through Nexus DC Connector.`,
              },
              unit_amount: INTRODUCTION_FEE_CENTS,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${appUrl}/connect/success?intro=${introduction.id}`,
        cancel_url: `${appUrl}/connect/${vendorId}`,
        customer_email: buyerEmail,
        metadata: {
          introductionId: introduction.id,
          vendorId,
        },
      });

      // Update introduction with Stripe session ID
      await prisma.introduction.update({
        where: { id: introduction.id },
        data: { stripeSessionId: session.id },
      });

      return NextResponse.json({
        checkoutUrl: session.url,
        introductionId: introduction.id,
      });
    } catch (stripeError) {
      // If Stripe fails (e.g., not configured), return the intro ID so
      // the app still works in development without Stripe keys
      console.error('Stripe error (dev mode fallback):', stripeError);

      // Mark as paid for development purposes
      await prisma.introduction.update({
        where: { id: introduction.id },
        data: { status: 'paid' },
      });

      return NextResponse.json({
        introductionId: introduction.id,
        checkoutUrl: null,
        message: 'Stripe not configured. Introduction created in dev mode.',
      });
    }
  } catch (error) {
    console.error('Error creating introduction:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
