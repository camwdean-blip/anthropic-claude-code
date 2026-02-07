import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const introductions = await prisma.introduction.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      vendor: {
        select: {
          businessName: true,
          category: true,
        },
      },
    },
  });

  return NextResponse.json(introductions);
}
