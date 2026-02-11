import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-block text-sm text-indigo-600 hover:underline">
          &larr; Back to home
        </Link>
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Terms of Service</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

          <h2 className="text-xl font-semibold text-gray-900">1. Product</h2>
          <p>The AI Playbook is a digital educational product. Upon purchase, you receive lifetime access to the content available at the time of purchase plus any future updates.</p>

          <h2 className="text-xl font-semibold text-gray-900">2. Payment</h2>
          <p>Payment is processed securely via Stripe. We do not store your credit card information. The price is a one-time payment of $29.99 USD.</p>

          <h2 className="text-xl font-semibold text-gray-900">3. Refund Policy</h2>
          <p>We offer a 7-day money-back guarantee. If you are not satisfied with your purchase, email support@theaiplaybook.com within 7 days for a full refund.</p>

          <h2 className="text-xl font-semibold text-gray-900">4. Intellectual Property</h2>
          <p>All content in The AI Playbook is for personal use only. You may not redistribute, resell, or share your access with others.</p>

          <h2 className="text-xl font-semibold text-gray-900">5. Disclaimer</h2>
          <p>The AI Playbook provides educational content about AI tools. We are not affiliated with OpenAI, Anthropic, Google, or any other AI company mentioned. Results may vary based on the tools and versions available at the time of use.</p>

          <h2 className="text-xl font-semibold text-gray-900">6. Contact</h2>
          <p>For questions about these terms, email <a href="mailto:support@theaiplaybook.com" className="text-indigo-600 underline">support@theaiplaybook.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
