import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const vendor = await prisma.vendor.findUnique({
    where: { id },
    select: {
      id: true,
      businessName: true,
      category: true,
      city: true,
      state: true,
      status: true,
    },
  });

  if (!vendor || vendor.status !== 'approved') {
    return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
  }

  return NextResponse.json(vendor);
}
