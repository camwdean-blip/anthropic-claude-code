import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-block text-sm text-indigo-600 hover:underline">
          &larr; Back to home
        </Link>
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

          <h2 className="text-xl font-semibold text-gray-900">What We Collect</h2>
          <p>When you purchase The AI Playbook, Stripe (our payment processor) collects your email address and payment information. We receive your email address and confirmation of payment — we never see or store your credit card number.</p>

          <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
          <p>Your email is used only to: deliver your purchase, send important updates about the playbook, and respond to support requests. We will never sell your email or send spam.</p>

          <h2 className="text-xl font-semibold text-gray-900">Cookies</h2>
          <p>This site uses minimal cookies for basic functionality. We do not use advertising trackers or sell data to third parties.</p>

          <h2 className="text-xl font-semibold text-gray-900">Third-Party Services</h2>
          <p>We use Stripe for payment processing. Stripe&apos;s privacy policy governs how they handle your payment data. We use Vercel for hosting.</p>

          <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
          <p>For privacy questions, email <a href="mailto:support@theaiplaybook.com" className="text-indigo-600 underline">support@theaiplaybook.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
