/**
 * HubSpot CRM Integration for Conduit Partners.
 *
 * Creates contacts and deals in HubSpot when:
 * 1. A vendor submits an application → creates a contact (Vendor pipeline)
 * 2. A buyer requests an introduction → creates a contact + deal (Buyer pipeline)
 *
 * Uses HubSpot's REST API directly — no SDK needed.
 */

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

function getToken(): string | null {
  return process.env.HUBSPOT_ACCESS_TOKEN || null;
}

async function hubspotRequest(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH',
  body?: Record<string, unknown>
) {
  const token = getToken();
  if (!token) {
    console.log(`[HUBSPOT STUB] ${method} ${endpoint}`, body ? JSON.stringify(body).slice(0, 200) : '');
    return { stub: true };
  }

  try {
    const res = await fetch(`${HUBSPOT_API_BASE}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`HubSpot API error (${res.status}):`, errorText);
      return { error: true, status: res.status, message: errorText };
    }

    return await res.json();
  } catch (err) {
    console.error('HubSpot request failed:', err);
    return { error: true, message: String(err) };
  }
}

// ─── Vendor Application ─────────────────────────────────────────────

interface VendorContactParams {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  category: string;
  city: string;
  state: string;
  description: string;
}

export async function createVendorContact(params: VendorContactParams) {
  const [firstName, ...lastParts] = params.contactName.split(' ');
  const lastName = lastParts.join(' ') || '-';

  const contact = await hubspotRequest('/crm/v3/objects/contacts', 'POST', {
    properties: {
      email: params.email,
      firstname: firstName,
      lastname: lastName,
      phone: params.phone,
      company: params.businessName,
      website: params.website || '',
      city: params.city,
      state: params.state,
      lifecyclestage: 'lead',
      hs_lead_status: 'NEW',
      // Custom note in the description
      notes_last_contacted: new Date().toISOString(),
    },
  });

  // Create a note with full details
  if (contact?.id) {
    await hubspotRequest('/crm/v3/objects/notes', 'POST', {
      properties: {
        hs_note_body: `<strong>Vendor Application — Conduit Partners</strong><br><br>` +
          `<strong>Business:</strong> ${params.businessName}<br>` +
          `<strong>Category:</strong> ${params.category}<br>` +
          `<strong>Location:</strong> ${params.city}, ${params.state}<br>` +
          `<strong>Description:</strong> ${params.description}<br><br>` +
          `<em>Status: Pending Review</em>`,
        hs_timestamp: new Date().toISOString(),
      },
      associations: [
        {
          to: { id: contact.id },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
        },
      ],
    });
  }

  console.log(`HubSpot: Created vendor contact for ${params.businessName}`, contact?.id || '(stub)');
  return contact;
}

// ─── Buyer Introduction ─────────────────────────────────────────────

interface BuyerDealParams {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCompany: string;
  buyerTitle?: string;
  vendorName: string;
  projectDescription: string;
  projectBudget?: string;
  projectTimeline?: string;
  amount: number; // cents
}

export async function createBuyerDeal(params: BuyerDealParams) {
  const [firstName, ...lastParts] = params.buyerName.split(' ');
  const lastName = lastParts.join(' ') || '-';

  // 1. Create or update buyer contact
  const contact = await hubspotRequest('/crm/v3/objects/contacts', 'POST', {
    properties: {
      email: params.buyerEmail,
      firstname: firstName,
      lastname: lastName,
      phone: params.buyerPhone,
      company: params.buyerCompany,
      jobtitle: params.buyerTitle || '',
      lifecyclestage: 'customer',
    },
  });

  // 2. Create a deal
  const dealAmount = params.amount / 100;
  const deal = await hubspotRequest('/crm/v3/objects/deals', 'POST', {
    properties: {
      dealname: `Introduction: ${params.buyerCompany} → ${params.vendorName}`,
      amount: String(dealAmount),
      dealstage: 'closedwon',
      pipeline: 'default',
      closedate: new Date().toISOString(),
      description: `Buyer: ${params.buyerName} (${params.buyerCompany})\n` +
        `Vendor: ${params.vendorName}\n` +
        `Budget: ${params.projectBudget || 'Not specified'}\n` +
        `Timeline: ${params.projectTimeline || 'Not specified'}\n\n` +
        `Project: ${params.projectDescription}`,
    },
    associations: contact?.id
      ? [
          {
            to: { id: contact.id },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
          },
        ]
      : [],
  });

  console.log(
    `HubSpot: Created deal "${params.buyerCompany} → ${params.vendorName}" ($${dealAmount})`,
    deal?.id || '(stub)'
  );
  return { contact, deal };
}
