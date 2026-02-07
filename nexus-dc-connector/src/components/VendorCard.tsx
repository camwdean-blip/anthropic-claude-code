import Link from 'next/link';
import { getCategoryName } from '@/lib/categories';

interface VendorCardProps {
  vendor: {
    id: string;
    businessName: string;
    category: string;
    city: string;
    state: string;
    description: string;
    yearsInBusiness: number | null;
    googleRating: number | null;
    googleReviewCount: number | null;
    bonded: boolean;
    insured: boolean;
    certifications: string | null;
    featured: boolean;
  };
}

export default function VendorCard({ vendor }: VendorCardProps) {
  const certList = vendor.certifications
    ? vendor.certifications.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  return (
    <Link href={`/vendor/${vendor.id}`} className="card p-6 block group relative">
      {vendor.featured && (
        <div className="absolute top-4 right-4 badge-green">
          Featured
        </div>
      )}
      <div className="flex items-start gap-4">
        {/* Avatar placeholder */}
        <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-brand-700">
            {vendor.businessName.charAt(0)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-silver-900 group-hover:text-brand-700 transition-colors truncate">
            {vendor.businessName}
          </h3>
          <p className="text-sm text-brand-600 font-medium">
            {getCategoryName(vendor.category)}
          </p>
          <p className="text-sm text-silver-500 mt-0.5">
            {vendor.city}, {vendor.state}
            {vendor.yearsInBusiness && (
              <span> &middot; {vendor.yearsInBusiness} yrs experience</span>
            )}
          </p>
        </div>
      </div>

      <p className="text-sm text-silver-600 mt-3 line-clamp-2 leading-relaxed">
        {vendor.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {vendor.googleRating && (
          <span className="inline-flex items-center gap-1 text-sm text-silver-600">
            <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {vendor.googleRating.toFixed(1)}
            {vendor.googleReviewCount && (
              <span className="text-silver-400">({vendor.googleReviewCount})</span>
            )}
          </span>
        )}
        {vendor.bonded && <span className="badge-blue">Bonded</span>}
        {vendor.insured && <span className="badge-blue">Insured</span>}
        {certList.slice(0, 2).map((cert) => (
          <span key={cert} className="badge-green">{cert}</span>
        ))}
        {certList.length > 2 && (
          <span className="text-xs text-silver-400">+{certList.length - 2} more</span>
        )}
      </div>
    </Link>
  );
}
