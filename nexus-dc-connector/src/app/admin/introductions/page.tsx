'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Introduction {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerCompany: string;
  projectDescription: string;
  projectBudget: string | null;
  amount: number;
  status: string;
  createdAt: string;
  vendor: {
    businessName: string;
    category: string;
  };
}

export default function AdminIntroductionsPage() {
  const [intros, setIntros] = useState<Introduction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/introductions-list')
      .then((res) => {
        if (res.status === 401) {
          window.location.href = '/admin/login';
          return [];
        }
        return res.json();
      })
      .then((data) => setIntros(data))
      .catch(() => console.error('Failed to load introductions'))
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = intros
    .filter((i) => i.status === 'paid' || i.status === 'completed')
    .reduce((sum, i) => sum + i.amount, 0) / 100;

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
            <Link href="/admin/vendors" className="text-sm text-silver-300 hover:text-white transition-colors">
              Vendors
            </Link>
            <Link href="/admin/introductions" className="text-sm text-white font-medium">
              Introductions
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-silver-900">Introductions</h1>
          <div className="bg-accent-50 border border-accent-200 rounded-lg px-4 py-2">
            <span className="text-sm text-accent-700 font-semibold">
              Total Revenue: ${totalRevenue.toLocaleString()}
            </span>
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
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Date</th>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Buyer</th>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Vendor</th>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Project</th>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Budget</th>
                    <th className="text-left px-6 py-3 font-semibold text-silver-600">Status</th>
                    <th className="text-right px-6 py-3 font-semibold text-silver-600">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-silver-100">
                  {intros.map((intro) => (
                    <tr key={intro.id} className="hover:bg-silver-50 transition-colors">
                      <td className="px-6 py-4 text-silver-500 whitespace-nowrap">
                        {new Date(intro.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-silver-900">{intro.buyerName}</p>
                        <p className="text-xs text-silver-500">{intro.buyerCompany}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-silver-900">{intro.vendor.businessName}</p>
                        <p className="text-xs text-silver-500">{intro.vendor.category}</p>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-silver-600 truncate">{intro.projectDescription}</p>
                      </td>
                      <td className="px-6 py-4 text-silver-600">
                        {intro.projectBudget || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          intro.status === 'completed' || intro.status === 'paid'
                            ? 'bg-accent-50 text-accent-700'
                            : intro.status === 'pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {intro.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-silver-900">
                        ${(intro.amount / 100).toFixed(0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {intros.length === 0 && (
              <p className="text-center py-8 text-silver-500">
                No introductions yet. They&apos;ll appear here when buyers connect with vendors.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
