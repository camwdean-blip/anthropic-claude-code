'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getCategoryName } from '@/lib/categories';

interface Vendor {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  state: string;
  status: string;
  featured: boolean;
  createdAt: string;
}

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const loadVendors = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/vendors-list');
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      setVendors(data);
    } catch {
      console.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  async function updateVendor(id: string, updates: Record<string, unknown>) {
    try {
      await fetch(`/api/admin/vendors/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      loadVendors();
    } catch {
      console.error('Failed to update vendor');
    }
  }

  const filteredVendors = vendors.filter((v) => {
    if (filter === 'all') return true;
    return v.status === filter;
  });

  return (
    <div className="min-h-screen bg-silver-50">
      {/* Admin header */}
      <div className="bg-silver-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-silver-300 hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/admin/vendors" className="text-sm text-white font-medium">
              Vendors
            </Link>
            <Link href="/admin/introductions" className="text-sm text-silver-300 hover:text-white transition-colors">
              Introductions
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-silver-900">Manage Vendors</h1>
          <div className="flex items-center gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                  filter === f
                    ? 'bg-brand-700 text-white'
                    : 'bg-white text-silver-600 border border-silver-300 hover:bg-silver-50'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-silver-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-silver-50 border-b border-silver-200">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Business</th>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Category</th>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Location</th>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Contact</th>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Status</th>
                    <th className="text-right px-6 py-3 font-semibold text-silver-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-silver-100">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-silver-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-silver-900">{vendor.businessName}</p>
                          {vendor.featured && (
                            <span className="badge-green text-[10px]">Featured</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-silver-600">
                        {getCategoryName(vendor.category)}
                      </td>
                      <td className="px-6 py-4 text-silver-600">
                        {vendor.city}, {vendor.state}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-silver-900">{vendor.contactName}</p>
                        <p className="text-xs text-silver-500">{vendor.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          vendor.status === 'approved' ? 'bg-accent-50 text-accent-700' :
                          vendor.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {vendor.status !== 'approved' && (
                            <button
                              onClick={() => updateVendor(vendor.id, { status: 'approved' })}
                              className="px-3 py-1 text-xs font-medium bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          {vendor.status !== 'rejected' && (
                            <button
                              onClick={() => updateVendor(vendor.id, { status: 'rejected' })}
                              className="px-3 py-1 text-xs font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => updateVendor(vendor.id, { featured: !vendor.featured })}
                            className="px-3 py-1 text-xs font-medium bg-silver-100 text-silver-600 rounded-lg hover:bg-silver-200 transition-colors"
                          >
                            {vendor.featured ? 'Unfeature' : 'Feature'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredVendors.length === 0 && (
              <p className="text-center py-8 text-silver-500">
                No {filter === 'all' ? '' : filter} vendors found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
