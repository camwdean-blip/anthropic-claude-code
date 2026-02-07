/**
 * Email service for Nexus DC Connector.
 *
 * In production, replace the console.log calls with your preferred email provider
 * (SendGrid, AWS SES, Resend, etc.). The interface stays the same.
 */

interface IntroductionEmailParams {
  vendorName: string;
  vendorEmail: string;
  vendorPhone: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCompany: string;
  projectDescription: string;
}

export async function sendIntroductionEmails(params: IntroductionEmailParams) {
  const {
    vendorName,
    vendorEmail,
    vendorPhone,
    buyerName,
    buyerEmail,
    buyerPhone,
    buyerCompany,
    projectDescription,
  } = params;

  // Email to vendor
  const vendorEmailContent = {
    to: vendorEmail,
    subject: `New Project Lead from Nexus DC Connector — ${buyerCompany}`,
    body: `
Hi ${vendorName},

Great news — a verified buyer wants to connect with you through Nexus DC Connector.

BUYER DETAILS:
Name: ${buyerName}
Company: ${buyerCompany}
Email: ${buyerEmail}
Phone: ${buyerPhone}

PROJECT DESCRIPTION:
${projectDescription}

This introduction has been paid for and verified. Please reach out to the buyer at your earliest convenience.

Best regards,
Nexus DC Connector
    `.trim(),
  };

  // Email to buyer
  const buyerEmailContent = {
    to: buyerEmail,
    subject: `Your Nexus DC Connector Introduction — ${vendorName}`,
    body: `
Hi ${buyerName},

Your introduction has been confirmed. Here are the vendor details:

VENDOR DETAILS:
Business: ${vendorName}
Email: ${vendorEmail}
Phone: ${vendorPhone}

Your project description has been shared with the vendor, and they will be reaching out to you shortly.

Thank you for using Nexus DC Connector.

Best regards,
Nexus DC Connector
    `.trim(),
  };

  // TODO: Replace with actual email sending in production
  console.log('=== INTRODUCTION EMAIL TO VENDOR ===');
  console.log(JSON.stringify(vendorEmailContent, null, 2));
  console.log('=== INTRODUCTION EMAIL TO BUYER ===');
  console.log(JSON.stringify(buyerEmailContent, null, 2));

  return { vendorEmail: vendorEmailContent, buyerEmail: buyerEmailContent };
}

export async function sendVendorApprovalEmail(vendorEmail: string, vendorName: string) {
  const emailContent = {
    to: vendorEmail,
    subject: 'Your Nexus DC Connector Listing is Live!',
    body: `
Hi ${vendorName},

Your business listing on Nexus DC Connector has been approved and is now live in our directory.

General contractors and data center developers can now find your profile and request introductions.

View the directory: ${process.env.NEXT_PUBLIC_APP_URL}/directory

Thank you for joining Nexus DC Connector.

Best regards,
Nexus DC Connector
    `.trim(),
  };

  console.log('=== VENDOR APPROVAL EMAIL ===');
  console.log(JSON.stringify(emailContent, null, 2));

  return emailContent;
}
