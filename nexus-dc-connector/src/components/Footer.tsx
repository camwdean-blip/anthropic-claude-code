import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-silver-900 text-silver-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white leading-tight">
                  Nexus DC
                </span>
                <span className="text-[9px] font-semibold text-brand-400 uppercase tracking-widest -mt-0.5">
                  Connector
                </span>
              </div>
            </div>
            <p className="text-sm text-silver-400 leading-relaxed">
              The verified directory connecting data center projects with
              specialized subcontractors and equipment suppliers.
            </p>
          </div>

          {/* For Buyers */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Buyers
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/directory" className="text-sm hover:text-white transition-colors">
                  Browse Directory
                </Link>
              </li>
              <li>
                <Link href="/directory?category=electrical" className="text-sm hover:text-white transition-colors">
                  Electrical Contractors
                </Link>
              </li>
              <li>
                <Link href="/directory?category=mechanical" className="text-sm hover:text-white transition-colors">
                  Mechanical / HVAC
                </Link>
              </li>
              <li>
                <Link href="/directory?category=cooling" className="text-sm hover:text-white transition-colors">
                  Cooling Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Vendors
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/apply" className="text-sm hover:text-white transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <span className="text-sm text-silver-500">
                  Free Listing
                </span>
              </li>
              <li>
                <span className="text-sm text-silver-500">
                  Verified Badge
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-silver-500">About</span>
              </li>
              <li>
                <span className="text-sm text-silver-500">Contact</span>
              </li>
              <li>
                <span className="text-sm text-silver-500">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-silver-500">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-silver-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-silver-500">
            &copy; {new Date().getFullYear()} Nexus DC Connector. All rights reserved.
          </p>
          <p className="text-xs text-silver-600">
            Powering the $276B data center construction market.
          </p>
        </div>
      </div>
    </footer>
  );
}
