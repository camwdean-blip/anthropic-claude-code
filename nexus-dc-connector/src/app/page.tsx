import Link from 'next/link';
import { VENDOR_CATEGORIES } from '@/lib/categories';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-silver-900 via-brand-900 to-silver-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-600/20 border border-accent-500/30 rounded-full text-accent-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              Serving the $276B data center construction market
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Find Verified Data Center{' '}
              <span className="text-accent-400">Subcontractors</span> &{' '}
              <span className="text-brand-300">Suppliers</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-silver-300 leading-relaxed max-w-2xl">
              The trusted directory connecting general contractors and developers
              with specialized data center subcontractors and equipment suppliers.
              Search. Verify. Connect.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/directory" className="btn-accent text-base py-3.5 px-8">
                Browse Directory
              </Link>
              <Link href="/apply" className="btn-secondary !text-white !border-silver-500 hover:!bg-white/10 text-base py-3.5 px-8">
                List Your Business — Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-silver-50 border-b border-silver-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-silver-500 font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Verified Vendors
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Instant Introductions
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Free Listings for Vendors
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Data Center Specialized
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Browse by Specialty</h2>
            <p className="section-subheading mx-auto">
              Find the right subcontractor or supplier for every phase of your
              data center build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {VENDOR_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/directory?category=${category.id}`}
                className="card p-5 group hover:border-brand-300"
              >
                <div className="text-2xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-silver-900 group-hover:text-brand-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-silver-500 mt-1 leading-relaxed">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-silver-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading mx-auto">
              Three simple steps to connect with the right vendor for your
              project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Search the Directory',
                description:
                  'Browse verified subcontractors and suppliers by specialty, location, and certifications. Every listing is reviewed before going live.',
                color: 'brand',
              },
              {
                step: '02',
                title: 'Review Profiles',
                description:
                  'Check vendor details, service areas, certifications, Google reviews, and years of experience. Make an informed decision.',
                color: 'brand',
              },
              {
                step: '03',
                title: 'Get Connected',
                description:
                  'Request an introduction for $250. Both parties receive full contact details and your project brief. The vendor reaches out directly.',
                color: 'accent',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-xl p-8 border border-silver-200 h-full">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                      item.color === 'accent'
                        ? 'bg-accent-100 text-accent-700'
                        : 'bg-brand-100 text-brand-700'
                    } font-bold text-lg mb-5`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-silver-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-silver-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for vendors */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Are You a Data Center Subcontractor or Supplier?
            </h2>
            <p className="text-lg text-brand-200 max-w-2xl mx-auto mb-8">
              Get in front of the general contractors and developers who are
              actively building data centers. Listing is completely free —
              you only benefit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="btn-accent text-base py-3.5 px-8">
                List Your Business — Free
              </Link>
              <Link href="/directory" className="inline-flex items-center justify-center px-8 py-3.5 text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-all">
                See the Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-silver-50 border-t border-silver-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '$276B', label: 'Market Size' },
              { value: '7+', label: 'Vendor Categories' },
              { value: '$250', label: 'Per Introduction' },
              { value: 'Free', label: 'Vendor Listings' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-brand-700">
                  {stat.value}
                </div>
                <div className="text-sm text-silver-500 mt-1 font-medium">
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
