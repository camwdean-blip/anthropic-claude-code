import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { VENDOR_CATEGORIES } from '@/lib/categories';

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

    const vendor = await prisma.vendor.create({
      data: {
        businessName: String(businessName).trim(),
        contactName: String(contactName).trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone).trim(),
        website: website ? String(website).trim() : null,
        category: String(category),
        description: String(description).trim(),
        serviceArea: String(serviceArea).trim(),
        address: address ? String(address).trim() : null,
        city: String(city).trim(),
        state: String(state).trim(),
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
