import Link from "next/link";

export default function SuccessPage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 py-20"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="mx-auto max-w-xl text-center">
        <div
          className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full text-4xl"
          style={{ backgroundColor: "var(--teal-light)", color: "var(--teal)" }}
        >
          &#10003;
        </div>
        <h1
          className="mb-4 text-4xl font-bold tracking-tight"
          style={{ color: "var(--warm-gray-900)" }}
        >
          Payment successful!
        </h1>
        <p
          className="mb-8 text-lg leading-relaxed"
          style={{ color: "var(--warm-gray-600)" }}
        >
          You now have lifetime access to The AI Playbook. Create your account
          below so you can log in and access it anytime.
        </p>

        <Link
          href="/register"
          className="btn-primary inline-block rounded-lg px-8 py-4 text-lg font-semibold text-white"
        >
          Create Your Account
        </Link>

        <p
          className="mt-6 text-base"
          style={{ color: "var(--warm-gray-600)" }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium underline"
            style={{ color: "var(--teal)" }}
          >
            Log in here
          </Link>
        </p>

        <p className="mt-8 text-sm" style={{ color: "var(--warm-gray-500)" }}>
          A confirmation email has been sent to your inbox. Questions?{" "}
          <a
            href="mailto:support@theaiplaybook.com"
            className="underline"
            style={{ color: "var(--teal)" }}
          >
            support@theaiplaybook.com
          </a>
        </p>
      </div>
    </div>
  );
}
