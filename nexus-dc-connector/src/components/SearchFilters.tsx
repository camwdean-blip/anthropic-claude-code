'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { VENDOR_CATEGORIES, US_STATES } from '@/lib/categories';
import { useCallback } from 'react';

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentState = searchParams.get('state') || '';
  const currentSearch = searchParams.get('q') || '';

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/directory?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilters = () => {
    router.push('/directory');
  };

  const hasFilters = currentCategory || currentState || currentSearch;

  return (
    <div className="bg-white rounded-xl border border-silver-200 p-4 md:p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-silver-700 mb-1.5">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search vendors by name or keyword..."
            className="input-field"
            defaultValue={currentSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateFilters('q', (e.target as HTMLInputElement).value);
              }
            }}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-silver-700 mb-1.5">
            Specialty
          </label>
          <select
            id="category"
            className="select-field"
            value={currentCategory}
            onChange={(e) => updateFilters('category', e.target.value)}
          >
            <option value="">All Specialties</option>
            {VENDOR_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-silver-700 mb-1.5">
            State
          </label>
          <select
            id="state"
            className="select-field"
            value={currentState}
            onChange={(e) => updateFilters('state', e.target.value)}
          >
            <option value="">All States</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-silver-500">Active filters:</span>
          {currentCategory && (
            <button
              onClick={() => updateFilters('category', '')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full hover:bg-brand-100 transition-colors"
            >
              {VENDOR_CATEGORIES.find((c) => c.id === currentCategory)?.name}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {currentState && (
            <button
              onClick={() => updateFilters('state', '')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full hover:bg-brand-100 transition-colors"
            >
              {currentState}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={clearFilters}
            className="text-xs text-silver-400 hover:text-silver-600 underline ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
