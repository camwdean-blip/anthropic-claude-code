'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface VendorInfo {
  id: string;
  businessName: string;
  category: string;
  city: string;
  state: string;
}

export default function ConnectPage() {
  const params = useParams();
  const vendorId = params.vendorId as string;
  const [vendor, setVendor] = useState<VendorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`/api/vendors/${vendorId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Vendor not found');
        return res.json();
      })
      .then((data) => setVendor(data))
      .catch(() => setVendor(null))
      .finally(() => setLoading(false));
  }, [vendorId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      vendorId,
      buyerName: formData.get('buyerName'),
      buyerEmail: formData.get('buyerEmail'),
      buyerPhone: formData.get('buyerPhone'),
      buyerCompany: formData.get('buyerCompany'),
      buyerTitle: formData.get('buyerTitle'),
      projectDescription: formData.get('projectDescription'),
      projectTimeline: formData.get('projectTimeline'),
      projectBudget: formData.get('projectBudget'),
    };

    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        // Fallback if Stripe isn't configured
        window.location.href = `/connect/success?intro=${result.introductionId}`;
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (loading) {
    return (
      <div className="bg-silver-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="bg-silver-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-silver-900 mb-3">Vendor Not Found</h1>
          <p className="text-silver-500 mb-6">This vendor may no longer be available.</p>
          <Link href="/directory" className="btn-primary">Back to Directory</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-silver-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/directory" className="text-brand-600 hover:text-brand-700">Directory</Link>
          <span className="mx-2 text-silver-400">/</span>
          <Link href={`/vendor/${vendor.id}`} className="text-brand-600 hover:text-brand-700">{vendor.businessName}</Link>
          <span className="mx-2 text-silver-400">/</span>
          <span className="text-silver-500">Connect</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl border border-silver-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-silver-900">
                Connect with {vendor.businessName}
              </h1>
              <p className="text-silver-500 mt-1">
                Fill out your details below. After payment of $250, both you and
                the vendor will receive a warm introduction email with full contact
                information.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Information */}
          <div className="bg-white rounded-xl border border-silver-200 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-silver-900 mb-6">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="buyerName" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Full Name *
                </label>
                <input id="buyerName" name="buyerName" type="text" required className="input-field" placeholder="John Smith" />
              </div>
              <div>
                <label htmlFor="buyerEmail" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Email *
                </label>
                <input id="buyerEmail" name="buyerEmail" type="email" required className="input-field" placeholder="john@company.com" />
              </div>
              <div>
                <label htmlFor="buyerPhone" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Phone *
                </label>
                <input id="buyerPhone" name="buyerPhone" type="tel" required className="input-field" placeholder="(555) 123-4567" />
              </div>
              <div>
                <label htmlFor="buyerCompany" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Company *
                </label>
                <input id="buyerCompany" name="buyerCompany" type="text" required className="input-field" placeholder="e.g. Turner Construction" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="buyerTitle" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Job Title
                </label>
                <input id="buyerTitle" name="buyerTitle" type="text" className="input-field" placeholder="e.g. Project Manager" />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-xl border border-silver-200 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-silver-900 mb-6">Project Details</h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Project Description *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  required
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Describe your project, what you need from this vendor, scope of work, etc."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="projectTimeline" className="block text-sm font-medium text-silver-700 mb-1.5">
                    Timeline
                  </label>
                  <select id="projectTimeline" name="projectTimeline" className="select-field">
                    <option value="">Select timeline</option>
                    <option value="Immediate (within 30 days)">Immediate (within 30 days)</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                    <option value="Planning phase">Planning phase</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="projectBudget" className="block text-sm font-medium text-silver-700 mb-1.5">
                    Estimated Budget Range
                  </label>
                  <select id="projectBudget" name="projectBudget" className="select-field">
                    <option value="">Select range</option>
                    <option value="Under $100K">Under $100K</option>
                    <option value="$100K - $500K">$100K - $500K</option>
                    <option value="$500K - $1M">$500K - $1M</option>
                    <option value="$1M - $5M">$1M - $5M</option>
                    <option value="$5M - $10M">$5M - $10M</option>
                    <option value="$10M+">$10M+</option>
                    <option value="TBD">To be determined</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Payment notice */}
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-brand-800">
                  Introduction Fee: $250
                </h3>
                <p className="text-sm text-brand-700 mt-1">
                  You&apos;ll be redirected to a secure Stripe checkout. After payment,
                  both you and the vendor will receive a professional introduction
                  email with full contact details.
                </p>
              </div>
            </div>
          </div>

          {/* Error */}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-accent text-base py-3.5 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                'Continue to Payment — $250'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
