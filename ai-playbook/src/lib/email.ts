import { Resend } from "resend";

const FROM_EMAIL = process.env.EMAIL_FROM || "hello@theaiplaybook.com";

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(key);
}

export async function sendPurchaseConfirmation(to: string, loginUrl: string) {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: `The AI Playbook <${FROM_EMAIL}>`,
      to,
      subject: "Your AI Playbook is ready!",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #1e3a5f; font-size: 28px; margin-bottom: 16px;">Welcome to The AI Playbook!</h1>
          <p style="color: #4a4541; font-size: 16px; line-height: 1.7;">
            Your payment was successful. You now have lifetime access to the full AI Playbook —
            25+ step-by-step guides, copy-paste prompts, and bonus content.
          </p>
          <p style="color: #4a4541; font-size: 16px; line-height: 1.7;">
            <strong>Next step:</strong> Create your account so you can access the playbook anytime.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${loginUrl}" style="background-color: #1e3a5f; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: 600;">
              Set Up Your Account
            </a>
          </div>
          <p style="color: #6b6560; font-size: 14px; line-height: 1.7;">
            Questions? Reply to this email or contact us at support@theaiplaybook.com.
          </p>
          <hr style="border: none; border-top: 1px solid #e0dbd3; margin: 32px 0;" />
          <p style="color: #6b6560; font-size: 12px;">
            &copy; ${new Date().getFullYear()} The AI Playbook. All rights reserved.
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
