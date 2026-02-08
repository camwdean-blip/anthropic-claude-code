'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-silver-900 border-b border-silver-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 border-2 border-accent-500 rounded flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-accent-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-base font-semibold text-white tracking-tight">
              Conduit Partners
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/directory"
              className="text-sm text-silver-400 hover:text-white transition-colors"
            >
              Directory
            </Link>
            <Link
              href="/apply"
              className="text-sm text-silver-400 hover:text-white transition-colors"
            >
              List Your Business
            </Link>
            <Link href="/directory" className="text-sm px-4 py-1.5 bg-accent-600 text-white rounded hover:bg-accent-700 transition-colors font-medium">
              Browse Vendors
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-silver-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-silver-800 py-3 space-y-2">
            <Link
              href="/directory"
              className="block text-sm text-silver-400 hover:text-white py-1.5"
              onClick={() => setMobileOpen(false)}
            >
              Directory
            </Link>
            <Link
              href="/apply"
              className="block text-sm text-silver-400 hover:text-white py-1.5"
              onClick={() => setMobileOpen(false)}
            >
              List Your Business
            </Link>
            <Link
              href="/directory"
              className="block text-sm px-4 py-1.5 bg-accent-600 text-white rounded text-center font-medium mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Browse Vendors
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
