import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [totalVendors, pendingVendors, approvedVendors, totalIntros, paidIntros, revenue] =
    await Promise.all([
      prisma.vendor.count(),
      prisma.vendor.count({ where: { status: 'pending' } }),
      prisma.vendor.count({ where: { status: 'approved' } }),
      prisma.introduction.count(),
      prisma.introduction.count({ where: { status: { in: ['paid', 'completed'] } } }),
      prisma.introduction.aggregate({
        where: { status: { in: ['paid', 'completed'] } },
        _sum: { amount: true },
      }),
    ]);

  const totalRevenue = (revenue._sum.amount || 0) / 100;

  const recentIntros = await prisma.introduction.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { vendor: { select: { businessName: true } } },
  });

  const recentVendors = await prisma.vendor.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      businessName: true,
      category: true,
      status: true,
      createdAt: true,
    },
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
            <Link href="/admin/vendors" className="text-sm text-silver-300 hover:text-white transition-colors">
              Vendors
            </Link>
            <Link href="/admin/introductions" className="text-sm text-silver-300 hover:text-white transition-colors">
              Introductions
            </Link>
            <Link href="/" className="text-sm text-silver-400 hover:text-white transition-colors">
              View Site
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Vendors', value: totalVendors, color: 'brand' },
            { label: 'Pending Review', value: pendingVendors, color: 'amber' },
            { label: 'Paid Introductions', value: paidIntros, color: 'accent' },
            { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'accent' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-silver-200 p-5">
              <p className="text-sm text-silver-500 font-medium">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${
                stat.color === 'accent' ? 'text-accent-600' :
                stat.color === 'amber' ? 'text-amber-600' :
                'text-brand-700'
              }`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Vendors */}
          <div className="bg-white rounded-xl border border-silver-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-silver-200 flex items-center justify-between">
              <h2 className="font-semibold text-silver-900">Recent Vendors</h2>
              <Link href="/admin/vendors" className="text-sm text-brand-600 hover:text-brand-700">
                View all
              </Link>
            </div>
            <div className="divide-y divide-silver-100">
              {recentVendors.map((vendor) => (
                <div key={vendor.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-silver-900">{vendor.businessName}</p>
                    <p className="text-xs text-silver-500">{vendor.category}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    vendor.status === 'approved' ? 'bg-accent-50 text-accent-700' :
                    vendor.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {vendor.status}
                  </span>
                </div>
              ))}
              {recentVendors.length === 0 && (
                <p className="px-6 py-4 text-sm text-silver-500">No vendors yet.</p>
              )}
            </div>
          </div>

          {/* Recent Introductions */}
          <div className="bg-white rounded-xl border border-silver-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-silver-200 flex items-center justify-between">
              <h2 className="font-semibold text-silver-900">Recent Introductions</h2>
              <Link href="/admin/introductions" className="text-sm text-brand-600 hover:text-brand-700">
                View all
              </Link>
            </div>
            <div className="divide-y divide-silver-100">
              {recentIntros.map((intro) => (
                <div key={intro.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-silver-900">
                      {intro.buyerCompany} → {intro.vendor.businessName}
                    </p>
                    <p className="text-xs text-silver-500">{intro.buyerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-accent-600">
                      ${(intro.amount / 100).toFixed(0)}
                    </p>
                    <span className={`text-xs font-medium ${
                      intro.status === 'completed' || intro.status === 'paid'
                        ? 'text-accent-600'
                        : 'text-amber-600'
                    }`}>
                      {intro.status}
                    </span>
                  </div>
                </div>
              ))}
              {recentIntros.length === 0 && (
                <p className="px-6 py-4 text-sm text-silver-500">No introductions yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
