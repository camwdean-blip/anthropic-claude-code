"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterForm() {
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  return (
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
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border px-4 py-3 text-base outline-none transition-colors focus:border-[var(--teal)]"
          style={{
            borderColor: "var(--warm-gray-200)",
            color: "var(--warm-gray-900)",
          }}
          placeholder="you@example.com"
        />
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
  );
}

export default function RegisterPage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 py-20"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">The AI Playbook</span>
          </Link>
          <h1
            className="mt-6 text-3xl font-bold"
            style={{ color: "var(--warm-gray-900)" }}
          >
            Create your account
          </h1>
          <p className="mt-2 text-base" style={{ color: "var(--warm-gray-600)" }}>
            Set up your login to access the playbook anytime
          </p>
        </div>

        <Suspense fallback={<div className="text-center" style={{ color: "var(--warm-gray-600)" }}>Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
