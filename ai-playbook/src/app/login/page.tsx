"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
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
            Welcome back
          </h1>
          <p className="mt-2 text-base" style={{ color: "var(--warm-gray-600)" }}>
            Log in to access your playbook
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

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-base font-medium"
              style={{ color: "var(--warm-gray-700)" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border px-4 py-3 text-base outline-none transition-colors focus:border-[var(--teal)]"
              style={{
                borderColor: "var(--warm-gray-200)",
                color: "var(--warm-gray-900)",
              }}
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full cursor-pointer rounded-lg py-4 text-lg font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p
            className="mt-6 text-center text-base"
            style={{ color: "var(--warm-gray-600)" }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/#pricing"
              className="font-medium underline"
              style={{ color: "var(--teal)" }}
            >
              Purchase the playbook
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
