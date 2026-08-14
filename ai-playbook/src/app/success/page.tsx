"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SuccessFlow() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setVerifying(false);
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch("/api/verify-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (res.ok && data.paid) {
          setEmail(data.email);
          setVerified(true);
        } else {
          setError(data.error || "Could not verify payment.");
        }
      } catch {
        setError("Could not verify payment. Please contact support@theaiplaybook.com.");
      } finally {
        setVerifying(false);
      }
    }

    verifyPayment();
  }, [sessionId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          const loginRes = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (loginRes.ok) {
            router.push("/playbook");
            return;
          }

          setError("An account with this email already exists. Please log in.");
          return;
        }
        setError(data.error);
        return;
      }

      router.push("/playbook");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (verifying) {
    return (
      <div className="text-center">
        <div
          className="mb-6 inline-flex h-20 w-20 animate-pulse items-center justify-center rounded-full text-4xl"
          style={{ backgroundColor: "var(--teal-light)", color: "var(--teal)" }}
        >
          &#8987;
        </div>
        <h1
          className="mb-4 text-3xl font-bold tracking-tight"
          style={{ color: "var(--warm-gray-900)" }}
        >
          Verifying your payment...
        </h1>
        <p className="text-lg" style={{ color: "var(--warm-gray-600)" }}>
          This only takes a moment.
        </p>
      </div>
    );
  }

  if (!sessionId || !verified) {
    return (
      <div className="text-center">
        <h1
          className="mb-4 text-3xl font-bold tracking-tight"
          style={{ color: "var(--warm-gray-900)" }}
        >
          {error || "No payment session found"}
        </h1>
        <p className="mb-8 text-lg" style={{ color: "var(--warm-gray-600)" }}>
          If you&apos;ve already paid, please contact{" "}
          <a
            href="mailto:support@theaiplaybook.com"
            className="underline"
            style={{ color: "var(--teal)" }}
          >
            support@theaiplaybook.com
          </a>{" "}
          and we&apos;ll get you set up.
        </p>
        <Link
          href="/#pricing"
          className="btn-primary inline-block rounded-lg px-8 py-4 text-lg font-semibold text-white"
        >
          Get The AI Playbook
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div
          className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full text-4xl"
          style={{ backgroundColor: "var(--teal-light)", color: "var(--teal)" }}
        >
          &#10003;
        </div>
        <h1
          className="mb-2 text-3xl font-bold tracking-tight"
          style={{ color: "var(--warm-gray-900)" }}
        >
          Payment successful!
        </h1>
        <p className="text-lg" style={{ color: "var(--warm-gray-600)" }}>
          One last step — create a password to access your playbook anytime.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-8 shadow-sm"
        style={{ border: "1px solid var(--warm-gray-200)" }}
      >
        {error && (
          <div
            className="mb-6 rounded-lg p-4 text-base"
            style={{ backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }}
          >
            {error}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-base font-medium"
            style={{ color: "var(--warm-gray-700)" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            readOnly
            className="w-full rounded-lg border px-4 py-3 text-base"
            style={{
              borderColor: "var(--warm-gray-200)",
              color: "var(--warm-gray-500)",
              backgroundColor: "var(--warm-gray-50, #f9f8f6)",
            }}
          />
          <p className="mt-1 text-sm" style={{ color: "var(--warm-gray-500)" }}>
            This is the email from your payment.
          </p>
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2 block text-base font-medium"
            style={{ color: "var(--warm-gray-700)" }}
          >
            Create a password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-lg border px-4 py-3 text-base outline-none transition-colors focus:border-[var(--teal)]"
            style={{
              borderColor: "var(--warm-gray-200)",
              color: "var(--warm-gray-900)",
            }}
            placeholder="At least 8 characters"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-base font-medium"
            style={{ color: "var(--warm-gray-700)" }}
          >
            Confirm password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-lg border px-4 py-3 text-base outline-none transition-colors focus:border-[var(--teal)]"
            style={{
              borderColor: "var(--warm-gray-200)",
              color: "var(--warm-gray-900)",
            }}
            placeholder="Re-enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full cursor-pointer rounded-lg py-4 text-lg font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account & Access Playbook"}
        </button>

        <p
          className="mt-6 text-center text-base"
          style={{ color: "var(--warm-gray-600)" }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium underline"
            style={{ color: "var(--teal)" }}
          >
            Log in
          </Link>
        </p>
      </form>

      <p className="mt-8 text-center text-sm" style={{ color: "var(--warm-gray-500)" }}>
        Questions?{" "}
        <a
          href="mailto:support@theaiplaybook.com"
          className="underline"
          style={{ color: "var(--teal)" }}
        >
          support@theaiplaybook.com
        </a>
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 py-20"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <Suspense
        fallback={
          <div className="text-center text-lg" style={{ color: "var(--warm-gray-600)" }}>
            Loading...
          </div>
        }
      >
        <SuccessFlow />
      </Suspense>
    </div>
  );
}
