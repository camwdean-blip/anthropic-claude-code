import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-6 text-6xl">🎉</div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
          You&apos;re in!
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Your payment was successful. You now have full access to The AI
          Playbook. Bookmark this page — or better yet, dive in right now.
        </p>

        <Link
          href="/playbook"
          className="inline-block rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-indigo-700"
        >
          Open Your Playbook
        </Link>

        <p className="mt-6 text-sm text-gray-500">
          Questions? Email us at{" "}
          <a
            href="mailto:support@theaiplaybook.com"
            className="text-indigo-600 underline"
          >
            support@theaiplaybook.com
          </a>
        </p>
      </div>
    </div>
  );
}
