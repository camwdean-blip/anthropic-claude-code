import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Introduction Confirmed | Nexus DC Connector',
};

export default async function ConnectSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ intro?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="bg-silver-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-xl border border-silver-200 shadow-sm p-8 md:p-12">
          <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-silver-900 mb-3">
            Introduction Confirmed!
          </h1>
          <p className="text-silver-600 leading-relaxed max-w-md mx-auto mb-2">
            Your payment has been processed successfully. Both you and the vendor
            will receive an introduction email with full contact details shortly.
          </p>
          {params.intro && (
            <p className="text-sm text-silver-400 mb-6">
              Reference ID: {params.intro}
            </p>
          )}

          <div className="bg-silver-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-silver-900 mb-3">What happens next?</h2>
            <ol className="space-y-3 text-sm text-silver-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-semibold text-xs">1</span>
                <span>Both parties receive an introduction email with contact details and your project brief.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-semibold text-xs">2</span>
                <span>The vendor will reach out to you directly to discuss your project needs.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-semibold text-xs">3</span>
                <span>Work directly with the vendor — Nexus DC Connector steps back and lets you build.</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/directory" className="btn-primary">
              Browse More Vendors
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
