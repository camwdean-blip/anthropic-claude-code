import { prisma } from '@/lib/db';
import { Suspense } from 'react';
import SearchFilters from '@/components/SearchFilters';
import VendorCard from '@/components/VendorCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendor Directory | Nexus DC Connector',
  description: 'Browse verified data center subcontractors and equipment suppliers. Filter by specialty, location, and more.',
};

export const dynamic = 'force-dynamic';

async function VendorList({
  category,
  state,
  q,
}: {
  category?: string;
  state?: string;
  q?: string;
}) {
  const where: Record<string, unknown> = { status: 'approved' };

  if (category) {
    where.category = category;
  }
  if (state) {
    where.state = state;
  }
  if (q) {
    where.OR = [
      { businessName: { contains: q } },
      { description: { contains: q } },
      { certifications: { contains: q } },
    ];
  }

  const vendors = await prisma.vendor.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      businessName: true,
      category: true,
      city: true,
      state: true,
      description: true,
      yearsInBusiness: true,
      googleRating: true,
      googleReviewCount: true,
      bonded: true,
      insured: true,
      certifications: true,
      featured: true,
    },
  });

  if (vendors.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-silver-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-silver-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-silver-900 mb-1">No vendors found</h3>
        <p className="text-silver-500">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-silver-500 mb-4">
        Showing {vendors.length} vendor{vendors.length !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </>
  );
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; state?: string; q?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="bg-silver-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-silver-900">
            Vendor Directory
          </h1>
          <p className="text-silver-500 mt-1">
            Browse verified data center subcontractors and equipment suppliers.
          </p>
        </div>

        {/* Filters */}
        <Suspense fallback={<div className="h-24 bg-white rounded-xl border border-silver-200 animate-pulse" />}>
          <SearchFilters />
        </Suspense>

        {/* Results */}
        <div className="mt-6">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="card p-6 animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-silver-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-48 bg-silver-200 rounded" />
                        <div className="h-4 w-32 bg-silver-100 rounded" />
                        <div className="h-3 w-40 bg-silver-100 rounded" />
                      </div>
                    </div>
                    <div className="h-10 bg-silver-100 rounded mt-3" />
                  </div>
                ))}
              </div>
            }
          >
            <VendorList
              category={params.category}
              state={params.state}
              q={params.q}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
