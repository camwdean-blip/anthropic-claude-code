import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryName } from '@/lib/categories';
import { INTRODUCTION_FEE_DOLLARS } from '@/lib/stripe';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vendor = await prisma.vendor.findUnique({
    where: { id, status: 'approved' },
    select: { businessName: true, category: true, city: true, state: true },
  });

  if (!vendor) return { title: 'Vendor Not Found' };

  return {
    title: `${vendor.businessName} | Conduit Partners`,
    description: `${vendor.businessName} — ${getCategoryName(vendor.category)} in ${vendor.city}, ${vendor.state}. Connect through Conduit Partners.`,
  };
}

export default async function VendorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vendor = await prisma.vendor.findUnique({
    where: { id, status: 'approved' },
  });

  if (!vendor) {
    notFound();
  }

  const certList = vendor.certifications
    ? vendor.certifications.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  const serviceAreas = vendor.serviceArea
    ? vendor.serviceArea.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-silver-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/directory" className="text-brand-600 hover:text-brand-700">
            Directory
          </Link>
          <span className="mx-2 text-silver-400">/</span>
          <span className="text-silver-500">{vendor.businessName}</span>
        </nav>

        {/* Profile card */}
        <div className="bg-white rounded-xl border border-silver-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-700 to-brand-800 px-6 md:px-8 py-8">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">
                  {vendor.businessName.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {vendor.businessName}
                  </h1>
                  {vendor.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-500 text-white">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-brand-200 mt-1 font-medium">
                  {getCategoryName(vendor.category)}
                </p>
                <p className="text-brand-300 text-sm mt-0.5">
                  {vendor.city}, {vendor.state}
                  {vendor.yearsInBusiness && (
                    <span> &middot; {vendor.yearsInBusiness} years in business</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 md:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="md:col-span-2 space-y-8">
                {/* About */}
                <div>
                  <h2 className="text-lg font-semibold text-silver-900 mb-3">About</h2>
                  <p className="text-silver-600 leading-relaxed">{vendor.description}</p>
                </div>

                {/* Service Areas */}
                {serviceAreas.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-silver-900 mb-3">Service Areas</h2>
                    <div className="flex flex-wrap gap-2">
                      {serviceAreas.map((area) => (
                        <span key={area} className="badge-blue">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {certList.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-silver-900 mb-3">
                      Certifications & Qualifications
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {certList.map((cert) => (
                        <span key={cert} className="badge-green">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Google Reviews */}
                {vendor.googleRating && (
                  <div>
                    <h2 className="text-lg font-semibold text-silver-900 mb-3">Reviews</h2>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.round(vendor.googleRating!)
                                ? 'text-amber-400 fill-current'
                                : 'text-silver-300 fill-current'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-silver-900">
                        {vendor.googleRating.toFixed(1)}
                      </span>
                      {vendor.googleReviewCount && (
                        <span className="text-silver-500">
                          ({vendor.googleReviewCount} Google reviews)
                        </span>
                      )}
                    </div>
                    {vendor.googleBusinessUrl && (
                      <a
                        href={vendor.googleBusinessUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mt-2"
                      >
                        View on Google
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Connect CTA */}
                <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
                  <h3 className="font-semibold text-silver-900 mb-2">
                    Interested in this vendor?
                  </h3>
                  <p className="text-sm text-silver-600 mb-4">
                    Get a warm introduction with full contact details for both parties.
                  </p>
                  <Link
                    href={`/connect/${vendor.id}`}
                    className="btn-accent w-full text-center"
                  >
                    Get Connected — ${INTRODUCTION_FEE_DOLLARS}
                  </Link>
                  <p className="text-xs text-silver-400 mt-2 text-center">
                    One-time fee per introduction
                  </p>
                </div>

                {/* Quick facts */}
                <div className="bg-white border border-silver-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-silver-900">Quick Facts</h3>
                  <div className="space-y-3 text-sm">
                    {vendor.yearsInBusiness && (
                      <div className="flex justify-between">
                        <span className="text-silver-500">Experience</span>
                        <span className="font-medium text-silver-900">
                          {vendor.yearsInBusiness} years
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-silver-500">Location</span>
                      <span className="font-medium text-silver-900">
                        {vendor.city}, {vendor.state}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-silver-500">Bonded</span>
                      <span className={`font-medium ${vendor.bonded ? 'text-accent-600' : 'text-silver-400'}`}>
                        {vendor.bonded ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-silver-500">Insured</span>
                      <span className={`font-medium ${vendor.insured ? 'text-accent-600' : 'text-silver-400'}`}>
                        {vendor.insured ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {vendor.licenseNumber && (
                      <div className="flex justify-between">
                        <span className="text-silver-500">License #</span>
                        <span className="font-medium text-silver-900">
                          {vendor.licenseNumber}
                        </span>
                      </div>
                    )}
                  </div>
                  {vendor.website && (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700"
                    >
                      Visit Website
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
