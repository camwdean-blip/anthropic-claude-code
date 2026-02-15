"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="no-print cursor-pointer rounded-lg border px-4 py-2 text-base font-medium transition-colors hover:bg-gray-50"
      style={{
        borderColor: "var(--warm-gray-200)",
        color: "var(--warm-gray-600)",
      }}
    >
      Log Out
    </button>
  );
}
