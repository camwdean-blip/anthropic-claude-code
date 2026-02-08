import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...\n');

  // Create admin user
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'Conduit2024!',
    12
  );

  const admin = await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@conduitpartners.com' },
    update: { passwordHash },
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@conduitpartners.com',
      passwordHash,
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // Seed vendors
  const vendors = [
    {
      businessName: 'Titan Electrical Systems',
      contactName: 'Marcus Chen',
      email: 'marcus@titanelectrical.com',
      phone: '(214) 555-0101',
      website: 'https://www.titanelectrical.com',
      category: 'electrical',
      description:
        'Specializing in high-voltage electrical systems for hyperscale and enterprise data centers. Over 200 data center projects completed including switchgear installation, busway systems, power distribution units, and emergency power systems. Licensed in 12 states with 24/7 emergency response capability.',
      serviceArea: 'Texas, Oklahoma, Louisiana, Arkansas, New Mexico',
      address: '4500 Commerce Blvd',
      city: 'Dallas',
      state: 'Texas',
      zipCode: '75201',
      yearsInBusiness: 22,
      certifications: 'NECA, BICSI RCDD, UL508A, OSHA 30',
      bonded: true,
      insured: true,
      licenseNumber: 'TX-ELC-88421',
      googleRating: 4.8,
      googleReviewCount: 67,
      status: 'approved',
      featured: true,
    },
    {
      businessName: 'ArcticFlow Cooling Solutions',
      contactName: 'Sarah Mitchell',
      email: 'sarah@arcticflow.com',
      phone: '(703) 555-0202',
      website: 'https://www.arcticflow.com',
      category: 'cooling',
      description:
        'Industry-leading provider of precision cooling and thermal management solutions for data centers. We design, install, and maintain CRAC/CRAH units, chilled water systems, hot/cold aisle containment, rear-door heat exchangers, and direct liquid cooling systems. Certified by all major equipment manufacturers.',
      serviceArea: 'Virginia, Maryland, Washington DC, North Carolina, Georgia',
      address: '1200 Tech Park Way',
      city: 'Ashburn',
      state: 'Virginia',
      zipCode: '20147',
      yearsInBusiness: 15,
      certifications: 'ASHRAE, EPA 608, LEED AP, Uptime Institute ATD',
      bonded: true,
      insured: true,
      licenseNumber: 'VA-MEC-55123',
      googleRating: 4.9,
      googleReviewCount: 43,
      status: 'approved',
      featured: true,
    },
    {
      businessName: 'FireShield Protection Inc.',
      contactName: 'David Park',
      email: 'david@fireshieldpro.com',
      phone: '(480) 555-0303',
      website: 'https://www.fireshieldpro.com',
      category: 'fire-protection',
      description:
        'Full-service fire protection contractor specializing in data center environments. We install and service clean agent suppression systems (FM-200, Novec 1230), VESDA early warning detection, pre-action sprinkler systems, and fire alarm monitoring. NICET Level IV certified technicians on staff.',
      serviceArea: 'Arizona, Nevada, California, Utah, Colorado',
      address: '890 Safety Ln',
      city: 'Phoenix',
      state: 'Arizona',
      zipCode: '85004',
      yearsInBusiness: 18,
      certifications: 'NICET Level IV, NFPA, AFSA, ICC',
      bonded: true,
      insured: true,
      licenseNumber: 'AZ-FP-77234',
      googleRating: 4.7,
      googleReviewCount: 31,
      status: 'approved',
      featured: false,
    },
    {
      businessName: 'NexGen Cabling Solutions',
      contactName: 'Jennifer Torres',
      email: 'jen@nexgencabling.com',
      phone: '(312) 555-0404',
      website: 'https://www.nexgencabling.com',
      category: 'cabling',
      description:
        'Structured cabling experts for mission-critical data center environments. We install single-mode and multi-mode fiber optic systems, Cat 6A copper, overhead and underfloor cable management, and full cable plant documentation. BICSI certified installers with data center-specific experience.',
      serviceArea: 'Illinois, Indiana, Wisconsin, Michigan, Ohio',
      address: '2100 Network Dr',
      city: 'Chicago',
      state: 'Illinois',
      zipCode: '60601',
      yearsInBusiness: 12,
      certifications: 'BICSI RCDD, BICSI Installer 2, Corning Certified, CommScope',
      bonded: true,
      insured: true,
      licenseNumber: 'IL-LV-44821',
      googleRating: 4.6,
      googleReviewCount: 52,
      status: 'approved',
      featured: false,
    },
    {
      businessName: 'PowerGuard Generators',
      contactName: 'Robert Williams',
      email: 'rob@powerguardgen.com',
      phone: '(972) 555-0505',
      website: 'https://www.powerguardgen.com',
      category: 'generators',
      description:
        'Premier supplier and installer of backup power systems for data centers. We provide diesel and natural gas generators, UPS systems, automatic transfer switches, paralleling switchgear, and fuel systems. Authorized dealer for Caterpillar, Cummins, and Generac. Full lifecycle support from design through commissioning.',
      serviceArea: 'Texas, Oklahoma, Louisiana, Mississippi, Alabama',
      address: '5600 Power Plant Rd',
      city: 'Fort Worth',
      state: 'Texas',
      zipCode: '76102',
      yearsInBusiness: 25,
      certifications: 'EGSA, Cat Dealer Certified, Cummins Authorized, NFPA 110',
      bonded: true,
      insured: true,
      licenseNumber: 'TX-GEN-91002',
      googleRating: 4.9,
      googleReviewCount: 78,
      status: 'approved',
      featured: true,
    },
    {
      businessName: 'Summit Mechanical Group',
      contactName: 'Lisa Andersen',
      email: 'lisa@summitmech.com',
      phone: '(503) 555-0606',
      website: 'https://www.summitmech.com',
      category: 'mechanical',
      description:
        'Full-service mechanical contractor for data center construction and retrofit projects. Our capabilities include chilled water piping, process cooling, humidification systems, air handling units, building management system integration, and commissioning. We specialize in LEED-certified and energy-efficient mechanical designs.',
      serviceArea: 'Oregon, Washington, California, Idaho, Montana',
      address: '3400 Industrial Blvd',
      city: 'Portland',
      state: 'Oregon',
      zipCode: '97201',
      yearsInBusiness: 19,
      certifications: 'MCAA, UA Pipefitters, SMACNA, LEED AP',
      bonded: true,
      insured: true,
      licenseNumber: 'OR-MEC-62199',
      googleRating: 4.7,
      googleReviewCount: 39,
      status: 'approved',
      featured: false,
    },
    {
      businessName: 'Clearance Permitting Consultants',
      contactName: 'Angela Morrison',
      email: 'angela@clearancepermit.com',
      phone: '(571) 555-0707',
      website: 'https://www.clearancepermit.com',
      category: 'permitting',
      description:
        'Specialized permitting and regulatory compliance consultants for data center projects. We handle building permits, zoning variances, environmental impact assessments, utility interconnection agreements, and AHJ (Authority Having Jurisdiction) coordination. Deep relationships with local government agencies in major data center markets.',
      serviceArea: 'Virginia, Maryland, Washington DC, North Carolina, South Carolina',
      address: '700 Government Center Dr',
      city: 'Reston',
      state: 'Virginia',
      zipCode: '20190',
      yearsInBusiness: 10,
      certifications: 'ICC Certified, PMP, AICP',
      bonded: false,
      insured: true,
      licenseNumber: null,
      googleRating: 4.5,
      googleReviewCount: 22,
      status: 'approved',
      featured: false,
    },
    {
      businessName: 'Volt-Arc Electrical Contractors',
      contactName: 'James Patterson',
      email: 'james@voltarc.com',
      phone: '(702) 555-0808',
      category: 'electrical',
      description:
        'Data center electrical infrastructure specialists based in Las Vegas. Medium and high-voltage electrical installations, transformer yards, generator paralleling, and power monitoring systems. Experienced with Tier III and Tier IV data center builds.',
      serviceArea: 'Nevada, Arizona, California, Utah',
      address: '1800 Volt Way',
      city: 'Las Vegas',
      state: 'Nevada',
      zipCode: '89101',
      yearsInBusiness: 14,
      certifications: 'NECA, IBEW, OSHA 30, Arc Flash Certified',
      bonded: true,
      insured: true,
      licenseNumber: 'NV-ELC-33891',
      googleRating: 4.6,
      googleReviewCount: 55,
      status: 'approved',
      featured: false,
    },
    {
      businessName: 'CoolTech Systems International',
      contactName: 'Maria Santos',
      email: 'maria@cooltechsys.com',
      phone: '(404) 555-0909',
      website: 'https://www.cooltechsys.com',
      category: 'cooling',
      description:
        'Advanced cooling technology provider specializing in liquid cooling solutions for high-density data centers. We offer immersion cooling systems, direct-to-chip liquid cooling, rear-door cooling units, and custom cooling solutions for AI/ML computing environments. Partners with leading server manufacturers.',
      serviceArea: 'Georgia, Florida, Alabama, Tennessee, South Carolina',
      address: '950 Innovation Park',
      city: 'Atlanta',
      state: 'Georgia',
      zipCode: '30301',
      yearsInBusiness: 8,
      certifications: 'ASHRAE, Open Compute Project, Green Grid Member',
      bonded: true,
      insured: true,
      licenseNumber: 'GA-MEC-19432',
      googleRating: 4.8,
      googleReviewCount: 28,
      status: 'approved',
      featured: false,
    },
    {
      businessName: 'Greenfield Permitting Services',
      contactName: 'Thomas Burke',
      email: 'tom@greenfieldpermit.com',
      phone: '(512) 555-1010',
      category: 'permitting',
      description:
        'Texas-based permitting and compliance firm specializing in large-scale data center developments. We manage the full permitting lifecycle: site selection analysis, zoning compliance, building permits, fire marshal approvals, utility applications, and certificate of occupancy. Established relationships with municipalities across Texas data center corridors.',
      serviceArea: 'Texas, Oklahoma, New Mexico',
      address: '200 Capitol View Dr',
      city: 'Austin',
      state: 'Texas',
      zipCode: '78701',
      yearsInBusiness: 6,
      certifications: 'ICC, AICP, PMP',
      bonded: false,
      insured: true,
      licenseNumber: null,
      googleRating: 4.4,
      googleReviewCount: 15,
      status: 'approved',
      featured: false,
    },
    {
      businessName: 'Ridge Mechanical Contractors',
      contactName: 'Kevin O\'Brien',
      email: 'kevin@ridgemech.com',
      phone: '(602) 555-1111',
      category: 'mechanical',
      description:
        'Mechanical contractor providing comprehensive HVAC and plumbing services for data center construction. Process piping, chilled water plants, cooling tower installations, and building automation. Known for meeting aggressive schedules on fast-track data center projects.',
      serviceArea: 'Arizona, Nevada, New Mexico, Colorado',
      address: '4200 Ridge Rd',
      city: 'Scottsdale',
      state: 'Arizona',
      zipCode: '85251',
      yearsInBusiness: 16,
      certifications: 'MCAA, SMACNA, LEED AP BD+C',
      bonded: true,
      insured: true,
      licenseNumber: 'AZ-MEC-44872',
      googleRating: 4.7,
      googleReviewCount: 34,
      status: 'approved',
      featured: false,
    },
    // One pending vendor to show in admin
    {
      businessName: 'Apex Cable Infrastructure',
      contactName: 'Daniel Kim',
      email: 'daniel@apexcable.com',
      phone: '(469) 555-1212',
      category: 'cabling',
      description:
        'Structured cabling and fiber optic installation for data center and enterprise environments. Looking to expand into the data center directory market.',
      serviceArea: 'Texas, Louisiana',
      city: 'Plano',
      state: 'Texas',
      zipCode: '75024',
      yearsInBusiness: 5,
      certifications: 'BICSI Installer 1',
      bonded: true,
      insured: true,
      status: 'pending',
      featured: false,
    },
  ];

  for (const vendor of vendors) {
    await prisma.vendor.create({ data: vendor });
  }
  console.log(`Created ${vendors.length} vendors`);

  // Create a sample completed introduction
  const titanVendor = await prisma.vendor.findFirst({
    where: { businessName: 'Titan Electrical Systems' },
  });

  if (titanVendor) {
    await prisma.introduction.create({
      data: {
        vendorId: titanVendor.id,
        buyerName: 'Michael Reynolds',
        buyerEmail: 'mreynolds@turnerdc.com',
        buyerPhone: '(214) 555-9999',
        buyerCompany: 'Turner Data Center Division',
        buyerTitle: 'Senior Project Manager',
        projectDescription:
          'New 50MW hyperscale data center campus in North Texas. Looking for electrical subcontractor for Phase 1 — medium voltage distribution, switchgear, and generator paralleling. Target start Q2 2025.',
        projectTimeline: '3-6 months',
        projectBudget: '$5M - $10M',
        amount: 25000,
        status: 'completed',
      },
    });
    console.log('Created sample introduction');
  }

  console.log('\nSeeding complete!');
  console.log('------------------');
  console.log(`Admin login: ${process.env.ADMIN_EMAIL || 'admin@conduitpartners.com'}`);
  console.log(`Admin password: ${process.env.ADMIN_PASSWORD || 'Conduit2024!'}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
