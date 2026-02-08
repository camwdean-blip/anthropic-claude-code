import Link from 'next/link';
import { VENDOR_CATEGORIES, CATEGORY_ICONS } from '@/lib/categories';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-silver-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-silver-900 via-brand-900/40 to-silver-900" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-accent-400 uppercase tracking-widest mb-4">
              Data Center Construction Network
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Verified Subcontractors{' '}
              <span className="text-silver-400">&amp;</span>{' '}
              Suppliers for Data Center Projects
            </h1>
            <p className="mt-5 text-base md:text-lg text-silver-400 leading-relaxed max-w-xl">
              The trusted directory connecting general contractors and developers
              with specialized data center vendors. Search. Verify. Connect.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/directory" className="inline-flex items-center justify-center px-6 py-3 bg-accent-600 text-white font-medium rounded hover:bg-accent-700 transition-colors text-sm">
                Browse Directory
              </Link>
              <Link href="/apply" className="inline-flex items-center justify-center px-6 py-3 bg-silver-800 text-silver-200 font-medium rounded border border-silver-700 hover:bg-silver-700 hover:text-white transition-colors text-sm">
                List Your Business — Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-silver-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs text-silver-500 font-medium">
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Verified Vendors' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Instant Introductions' },
              { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Free Listings for Vendors' },
              { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Data Center Specialized' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-silver-900 tracking-tight">Browse by Specialty</h2>
            <p className="text-sm text-silver-500 mt-2 max-w-lg mx-auto">
              Find the right subcontractor or supplier for every phase of your
              data center build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {VENDOR_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/directory?category=${category.id}`}
                className="group flex items-start gap-3 p-4 rounded-lg border border-silver-200 hover:border-brand-300 hover:bg-brand-50/50 transition-all"
              >
                <div className="w-9 h-9 rounded bg-silver-100 group-hover:bg-brand-100 flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-4 h-4 text-silver-500 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={CATEGORY_ICONS[category.id] || 'M13 10V3L4 14h7v7l9-11h-7z'} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-silver-900 group-hover:text-brand-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-silver-500 mt-0.5 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-silver-50 border-y border-silver-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-silver-900 tracking-tight">How It Works</h2>
            <p className="text-sm text-silver-500 mt-2">
              Three steps to connect with the right vendor for your project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Search the Directory',
                description:
                  'Browse verified subcontractors and suppliers by specialty, location, and certifications. Every listing is reviewed before going live.',
              },
              {
                step: '02',
                title: 'Review Profiles',
                description:
                  'Check vendor details, service areas, certifications, Google reviews, and years of experience. Make an informed decision.',
              },
              {
                step: '03',
                title: 'Get Connected',
                description:
                  'Request an introduction for $250. Both parties receive full contact details and your project brief. The vendor reaches out directly.',
              },
            ].map((item, i) => (
              <div key={item.step} className="bg-white rounded-lg border border-silver-200 p-6">
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded text-xs font-bold mb-4 ${
                  i === 2
                    ? 'bg-accent-100 text-accent-700'
                    : 'bg-silver-100 text-silver-600'
                }`}>
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-silver-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-silver-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for vendors */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-silver-900 rounded-lg p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Are You a Data Center Subcontractor or Supplier?
            </h2>
            <p className="text-sm text-silver-400 max-w-xl mx-auto mb-6">
              Get in front of the general contractors and developers who are
              actively building data centers. Listing is completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/apply" className="inline-flex items-center justify-center px-6 py-2.5 bg-accent-600 text-white font-medium rounded hover:bg-accent-700 transition-colors text-sm">
                List Your Business — Free
              </Link>
              <Link href="/directory" className="inline-flex items-center justify-center px-6 py-2.5 text-silver-300 font-medium rounded border border-silver-700 hover:bg-silver-800 hover:text-white transition-colors text-sm">
                View the Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-silver-50 border-t border-silver-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '$276B', label: 'Market Size' },
              { value: '7+', label: 'Vendor Categories' },
              { value: '$250', label: 'Per Introduction' },
              { value: 'Free', label: 'Vendor Listings' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-silver-900">
                  {stat.value}
                </div>
                <div className="text-xs text-silver-500 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
