export const VENDOR_CATEGORIES = [
  {
    id: 'electrical',
    name: 'Electrical Subcontractors',
    description: 'High-voltage systems, power distribution, switchgear, busway, and electrical infrastructure',
  },
  {
    id: 'mechanical',
    name: 'Mechanical / HVAC',
    description: 'HVAC systems, piping, plumbing, and mechanical infrastructure for data centers',
  },
  {
    id: 'fire-protection',
    name: 'Fire Protection',
    description: 'Fire suppression systems, clean agent systems, fire detection, and alarm systems',
  },
  {
    id: 'cabling',
    name: 'Structured Cabling',
    description: 'Fiber optic, copper cabling, cable management, and network infrastructure',
  },
  {
    id: 'generators',
    name: 'Generator & Power Equipment',
    description: 'Backup generators, UPS systems, PDUs, and power equipment suppliers',
  },
  {
    id: 'cooling',
    name: 'Cooling Systems',
    description: 'Precision cooling, CRAC/CRAH units, liquid cooling, and thermal management',
  },
  {
    id: 'permitting',
    name: 'Permitting & Compliance',
    description: 'Local government permitting specialists, code compliance, and regulatory consultants',
  },
] as const;

export type CategoryId = (typeof VENDOR_CATEGORIES)[number]['id'];

export function getCategoryById(id: string) {
  return VENDOR_CATEGORIES.find((c) => c.id === id);
}

export function getCategoryName(id: string): string {
  return getCategoryById(id)?.name ?? id;
}

export const CATEGORY_ICONS: Record<string, string> = {
  electrical: 'M13 10V3L4 14h7v7l9-11h-7z',
  mechanical: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'fire-protection': 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z',
  cabling: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  generators: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  cooling: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  permitting: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
};

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
] as const;
