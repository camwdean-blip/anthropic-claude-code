'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-silver-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
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
              <span className="text-lg font-bold text-silver-900 leading-tight tracking-tight">
                Nexus DC
              </span>
              <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-widest -mt-0.5">
                Connector
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/directory"
              className="text-sm font-medium text-silver-600 hover:text-brand-700 transition-colors"
            >
              Find Vendors
            </Link>
            <Link
              href="/apply"
              className="text-sm font-medium text-silver-600 hover:text-brand-700 transition-colors"
            >
              List Your Business
            </Link>
            <Link href="/directory" className="btn-primary text-sm py-2 px-4">
              Browse Directory
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-silver-600 hover:text-silver-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-silver-200 py-4 space-y-3">
            <Link
              href="/directory"
              className="block text-sm font-medium text-silver-600 hover:text-brand-700 py-2"
              onClick={() => setMobileOpen(false)}
            >
              Find Vendors
            </Link>
            <Link
              href="/apply"
              className="block text-sm font-medium text-silver-600 hover:text-brand-700 py-2"
              onClick={() => setMobileOpen(false)}
            >
              List Your Business
            </Link>
            <Link
              href="/directory"
              className="btn-primary text-sm py-2 px-4 w-full text-center"
              onClick={() => setMobileOpen(false)}
            >
              Browse Directory
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
