import { Resend } from 'resend';

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY || '');
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'Conduit Partners <onboarding@resend.dev>';

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

async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[EMAIL STUB] To: ${to} | Subject: ${subject}`);
    console.log(html);
    return { success: true, stub: true };
  }

  try {
    const { data, error } = await getResendClient().emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log(`Email sent to ${to}: ${data?.id}`);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error('Failed to send email:', err);
    return { success: false, error: err };
  }
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
  const vendorResult = await sendEmail(
    vendorEmail,
    `New Project Lead from Conduit Partners — ${buyerCompany}`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #334e68; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Project Lead</h1>
        <p style="color: #bcccdc; margin: 4px 0 0 0; font-size: 14px;">Conduit Partners</p>
      </div>
      <div style="padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <p>Hi ${vendorName},</p>
        <p>Great news — a verified buyer wants to connect with you through Conduit Partners.</p>

        <div style="background: #f0f4f8; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px 0; color: #334e68; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Buyer Details</h3>
          <p style="margin: 4px 0;"><strong>Name:</strong> ${buyerName}</p>
          <p style="margin: 4px 0;"><strong>Company:</strong> ${buyerCompany}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${buyerEmail}" style="color: #486581;">${buyerEmail}</a></p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${buyerPhone}</p>
        </div>

        <div style="background: #e6fff6; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px 0; color: #065f46; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Project Description</h3>
          <p style="margin: 0; line-height: 1.6;">${projectDescription}</p>
        </div>

        <p>This introduction has been paid for and verified. Please reach out to the buyer at your earliest convenience.</p>

        <p style="color: #64748b; font-size: 13px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          Best regards,<br/>Conduit Partners
        </p>
      </div>
    </div>
    `
  );

  // Email to buyer
  const buyerResult = await sendEmail(
    buyerEmail,
    `Your Conduit Partners Introduction — ${vendorName}`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #334e68; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Introduction Confirmed</h1>
        <p style="color: #bcccdc; margin: 4px 0 0 0; font-size: 14px;">Conduit Partners</p>
      </div>
      <div style="padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <p>Hi ${buyerName},</p>
        <p>Your introduction has been confirmed. Here are the vendor details:</p>

        <div style="background: #f0f4f8; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px 0; color: #334e68; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Vendor Details</h3>
          <p style="margin: 4px 0;"><strong>Business:</strong> ${vendorName}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${vendorEmail}" style="color: #486581;">${vendorEmail}</a></p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${vendorPhone}</p>
        </div>

        <p>Your project description has been shared with the vendor, and they will be reaching out to you shortly.</p>

        <p style="color: #64748b; font-size: 13px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          Thank you for using Conduit Partners.<br/>Best regards,<br/>Conduit Partners
        </p>
      </div>
    </div>
    `
  );

  return { vendorResult, buyerResult };
}

export async function sendVendorApprovalEmail(vendorEmail: string, vendorName: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return sendEmail(
    vendorEmail,
    'Your Conduit Partners Listing is Live!',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #334e68; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">You're Live!</h1>
        <p style="color: #bcccdc; margin: 4px 0 0 0; font-size: 14px;">Conduit Partners</p>
      </div>
      <div style="padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <p>Hi ${vendorName},</p>
        <p>Your business listing on Conduit Partners has been <strong style="color: #059669;">approved</strong> and is now live in our directory.</p>
        <p>General contractors and data center developers can now find your profile and request introductions.</p>

        <div style="text-align: center; margin: 28px 0;">
          <a href="${appUrl}/directory" style="display: inline-block; background: #334e68; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            View the Directory
          </a>
        </div>

        <p style="color: #64748b; font-size: 13px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          Thank you for joining Conduit Partners.<br/>Best regards,<br/>Conduit Partners
        </p>
      </div>
    </div>
    `
  );
}

export async function sendVendorApplicationReceipt(vendorEmail: string, vendorName: string) {
  return sendEmail(
    vendorEmail,
    'Application Received — Conduit Partners',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #334e68; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Application Received</h1>
        <p style="color: #bcccdc; margin: 4px 0 0 0; font-size: 14px;">Conduit Partners</p>
      </div>
      <div style="padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <p>Hi ${vendorName},</p>
        <p>Thank you for applying to be listed on Conduit Partners.</p>
        <p>Our team will review your application and get back to you within <strong>1-2 business days</strong>. Once approved, your profile will be live and visible to general contractors and data center developers actively searching for vendors like you.</p>

        <div style="background: #f0f4f8; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px; color: #475569;">
          No action needed from you right now. We'll email you as soon as your listing is approved.
        </div>

        <p style="color: #64748b; font-size: 13px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          Best regards,<br/>Conduit Partners
        </p>
      </div>
    </div>
    `
  );
}
