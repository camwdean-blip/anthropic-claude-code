import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-silver-900 text-silver-400 border-t border-silver-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 border-2 border-accent-500 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white">Conduit Partners</span>
            </div>
            <p className="text-xs text-silver-500 leading-relaxed">
              The verified directory connecting data center projects with
              specialized subcontractors and equipment suppliers.
            </p>
          </div>

          {/* For Buyers */}
          <div>
            <h4 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-3">
              For Buyers
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/directory" className="text-xs hover:text-white transition-colors">
                  Browse Directory
                </Link>
              </li>
              <li>
                <Link href="/directory?category=electrical" className="text-xs hover:text-white transition-colors">
                  Electrical Contractors
                </Link>
              </li>
              <li>
                <Link href="/directory?category=mechanical" className="text-xs hover:text-white transition-colors">
                  Mechanical / HVAC
                </Link>
              </li>
              <li>
                <Link href="/directory?category=cooling" className="text-xs hover:text-white transition-colors">
                  Cooling Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-3">
              For Vendors
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/apply" className="text-xs hover:text-white transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <span className="text-xs text-silver-600">Free Listing</span>
              </li>
              <li>
                <span className="text-xs text-silver-600">Verified Profiles</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-3">
              Company
            </h4>
            <ul className="space-y-2">
              <li><span className="text-xs text-silver-600">About</span></li>
              <li><span className="text-xs text-silver-600">Contact</span></li>
              <li><span className="text-xs text-silver-600">Privacy Policy</span></li>
              <li><span className="text-xs text-silver-600">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-silver-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-silver-600">
            &copy; {new Date().getFullYear()} Conduit Partners LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
