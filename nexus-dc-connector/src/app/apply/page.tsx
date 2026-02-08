'use client';

import { useState } from 'react';
import { VENDOR_CATEGORIES, US_STATES } from '@/lib/categories';

export default function ApplyPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Convert checkbox values
    data.bonded = formData.get('bonded') ? 'true' : 'false';
    data.insured = formData.get('insured') ? 'true' : 'false';

    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Something went wrong');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-silver-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-xl border border-silver-200 shadow-sm p-8 md:p-12">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-silver-900 mb-3">
              Application Submitted!
            </h1>
            <p className="text-silver-600 leading-relaxed max-w-md mx-auto">
              Thank you for applying to Conduit Partners. Our team will review
              your listing and get back to you within 1-2 business days. Once
              approved, your profile will be live in the directory.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-silver-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-silver-900">
            List Your Business
          </h1>
          <p className="text-silver-500 mt-1">
            Join the Conduit Partners directory — completely free. Get in front
            of general contractors and data center developers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Information */}
          <div className="bg-white rounded-xl border border-silver-200 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-silver-900 mb-6">
              Business Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label htmlFor="businessName" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Business Name *
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Atlas Electrical Systems"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Specialty Category *
                </label>
                <select id="category" name="category" required className="select-field">
                  <option value="">Select a category</option>
                  {VENDOR_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Years in Business
                </label>
                <input
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  type="number"
                  min="0"
                  className="input-field"
                  placeholder="e.g. 15"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Business Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Describe your services, specializations, and what makes your business stand out in the data center space..."
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  className="input-field"
                  placeholder="https://www.example.com"
                />
              </div>
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-silver-700 mb-1.5">
                  License Number
                </label>
                <input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  className="input-field"
                  placeholder="e.g. CA-ELC-12345"
                />
              </div>
              <div>
                <label htmlFor="certifications" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Certifications
                </label>
                <input
                  id="certifications"
                  name="certifications"
                  type="text"
                  className="input-field"
                  placeholder="e.g. BICSI, NFPA, LEED (comma-separated)"
                />
              </div>
              <div className="flex items-center gap-6 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="bonded"
                    className="w-4 h-4 rounded border-silver-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm font-medium text-silver-700">Bonded</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="insured"
                    className="w-4 h-4 rounded border-silver-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm font-medium text-silver-700">Insured</span>
                </label>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl border border-silver-200 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-silver-900 mb-6">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Contact Name *
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. John Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="input-field"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl border border-silver-200 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-silver-900 mb-6">
              Location & Service Area
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Street Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="input-field"
                  placeholder="123 Main St, Suite 100"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-silver-700 mb-1.5">
                  City *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Dallas"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-silver-700 mb-1.5">
                  State *
                </label>
                <select id="state" name="state" required className="select-field">
                  <option value="">Select state</option>
                  {US_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-silver-700 mb-1.5">
                  ZIP Code *
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. 75201"
                />
              </div>
              <div>
                <label htmlFor="serviceArea" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Service Area *
                </label>
                <input
                  id="serviceArea"
                  name="serviceArea"
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Texas, Oklahoma, Louisiana"
                />
              </div>
            </div>
          </div>

          {/* Google Reviews */}
          <div className="bg-white rounded-xl border border-silver-200 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-semibold text-silver-900 mb-2">
              Google Reviews
            </h2>
            <p className="text-sm text-silver-500 mb-6">
              Help buyers trust your listing by sharing your Google Business profile.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label htmlFor="googleBusinessUrl" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Google Business URL
                </label>
                <input
                  id="googleBusinessUrl"
                  name="googleBusinessUrl"
                  type="url"
                  className="input-field"
                  placeholder="https://g.page/your-business"
                />
              </div>
              <div>
                <label htmlFor="googleRating" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Google Rating
                </label>
                <input
                  id="googleRating"
                  name="googleRating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  className="input-field"
                  placeholder="e.g. 4.8"
                />
              </div>
              <div>
                <label htmlFor="googleReviewCount" className="block text-sm font-medium text-silver-700 mb-1.5">
                  Number of Reviews
                </label>
                <input
                  id="googleReviewCount"
                  name="googleReviewCount"
                  type="number"
                  min="0"
                  className="input-field"
                  placeholder="e.g. 47"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-silver-500">
              Free to list. No hidden fees.
            </p>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
