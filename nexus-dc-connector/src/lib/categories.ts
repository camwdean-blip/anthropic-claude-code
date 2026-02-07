export const VENDOR_CATEGORIES = [
  {
    id: 'electrical',
    name: 'Electrical Subcontractors',
    description: 'High-voltage systems, power distribution, switchgear, busway, and electrical infrastructure',
    icon: '⚡',
  },
  {
    id: 'mechanical',
    name: 'Mechanical / HVAC',
    description: 'HVAC systems, piping, plumbing, and mechanical infrastructure for data centers',
    icon: '🔧',
  },
  {
    id: 'fire-protection',
    name: 'Fire Protection',
    description: 'Fire suppression systems, clean agent systems, fire detection, and alarm systems',
    icon: '🔥',
  },
  {
    id: 'cabling',
    name: 'Structured Cabling',
    description: 'Fiber optic, copper cabling, cable management, and network infrastructure',
    icon: '🔌',
  },
  {
    id: 'generators',
    name: 'Generator & Power Equipment',
    description: 'Backup generators, UPS systems, PDUs, and power equipment suppliers',
    icon: '🏭',
  },
  {
    id: 'cooling',
    name: 'Cooling Systems',
    description: 'Precision cooling, CRAC/CRAH units, liquid cooling, and thermal management',
    icon: '❄️',
  },
  {
    id: 'permitting',
    name: 'Permitting & Compliance',
    description: 'Local government permitting specialists, code compliance, and regulatory consultants',
    icon: '📋',
  },
] as const;

export type CategoryId = (typeof VENDOR_CATEGORIES)[number]['id'];

export function getCategoryById(id: string) {
  return VENDOR_CATEGORIES.find((c) => c.id === id);
}

export function getCategoryName(id: string): string {
  return getCategoryById(id)?.name ?? id;
}

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
