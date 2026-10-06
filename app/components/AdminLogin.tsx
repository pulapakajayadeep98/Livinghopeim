"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        router.refresh();
        return;
      }
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Could not sign in.");
    } catch {
      setError("Could not reach the server.");
    }
    setBusy(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-sm rounded-2xl bg-white p-8 shadow-[0_15px_35px_rgba(11,26,58,0.12)]"
    >
      <h2 className="font-serif text-2xl font-semibold text-[#0b1a3a]">
        Sign in
      </h2>
      <label
        htmlFor="admin-password"
        className="mt-6 block text-xs font-semibold uppercase tracking-wide text-[#4b2a7a]"
      >
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        required
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-[#0b1a3a] outline-none focus:border-[#4b2a7a]"
      />
      {error ? (
        <p className="mt-3 text-sm font-semibold text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="mt-6 w-full rounded-full bg-[#d4af37] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40 transition-all hover:-translate-y-0.5 disabled:opacity-60"
      >
        {busy ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
