import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { VENDOR_CATEGORIES } from '@/lib/categories';
import { sendVendorApplicationReceipt } from '@/lib/email';
import { createVendorContact } from '@/lib/hubspot';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      businessName,
      contactName,
      email,
      phone,
      website,
      category,
      description,
      serviceArea,
      address,
      city,
      state,
      zipCode,
      yearsInBusiness,
      certifications,
      bonded,
      insured,
      licenseNumber,
      googleBusinessUrl,
      googleRating,
      googleReviewCount,
    } = body;

    // Validate required fields
    if (!businessName || !contactName || !email || !phone || !category || !description || !serviceArea || !city || !state || !zipCode) {
      return NextResponse.json(
        { error: 'Missing required fields. Please fill out all required fields.' },
        { status: 400 }
      );
    }

    // Validate category
    if (!VENDOR_CATEGORIES.find((c) => c.id === category)) {
      return NextResponse.json(
        { error: 'Invalid category selected.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const trimmedName = String(businessName).trim();
    const trimmedContact = String(contactName).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedPhone = String(phone).trim();
    const trimmedCity = String(city).trim();
    const trimmedState = String(state).trim();
    const trimmedDesc = String(description).trim();

    const vendor = await prisma.vendor.create({
      data: {
        businessName: trimmedName,
        contactName: trimmedContact,
        email: trimmedEmail,
        phone: trimmedPhone,
        website: website ? String(website).trim() : null,
        category: String(category),
        description: trimmedDesc,
        serviceArea: String(serviceArea).trim(),
        address: address ? String(address).trim() : null,
        city: trimmedCity,
        state: trimmedState,
        zipCode: String(zipCode).trim(),
        yearsInBusiness: yearsInBusiness ? parseInt(String(yearsInBusiness), 10) : null,
        certifications: certifications ? String(certifications).trim() : null,
        bonded: bonded === 'true' || bonded === true,
        insured: insured === 'true' || insured === true,
        licenseNumber: licenseNumber ? String(licenseNumber).trim() : null,
        googleBusinessUrl: googleBusinessUrl ? String(googleBusinessUrl).trim() : null,
        googleRating: googleRating ? parseFloat(String(googleRating)) : null,
        googleReviewCount: googleReviewCount ? parseInt(String(googleReviewCount), 10) : null,
        status: 'pending',
      },
    });

    // Send confirmation email and create CRM contact (non-blocking)
    Promise.allSettled([
      sendVendorApplicationReceipt(trimmedEmail, trimmedName),
      createVendorContact({
        businessName: trimmedName,
        contactName: trimmedContact,
        email: trimmedEmail,
        phone: trimmedPhone,
        website: website ? String(website).trim() : undefined,
        category: String(category),
        city: trimmedCity,
        state: trimmedState,
        description: trimmedDesc,
      }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`Post-submission task ${i} failed:`, r.reason);
        }
      });
    });

    return NextResponse.json(
      { id: vendor.id, message: 'Application submitted successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
