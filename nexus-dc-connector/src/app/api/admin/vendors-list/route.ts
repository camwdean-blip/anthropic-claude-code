import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const vendors = await prisma.vendor.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      businessName: true,
      contactName: true,
      email: true,
      phone: true,
      category: true,
      city: true,
      state: true,
      status: true,
      featured: true,
      createdAt: true,
    },
  });

  return NextResponse.json(vendors);
}
