import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

export const INTRODUCTION_FEE_CENTS = parseInt(
  process.env.INTRODUCTION_FEE_CENTS || '25000',
  10
);

export const INTRODUCTION_FEE_DOLLARS = INTRODUCTION_FEE_CENTS / 100;
