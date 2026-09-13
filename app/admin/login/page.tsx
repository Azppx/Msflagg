"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Erreur de connexion.");
      return;
    }
    router.push("/admin/commandes");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <p className="text-xs font-semibold tracking-widest text-electric-soft">ADMIN</p>
      <h1 className="font-display mt-1 text-3xl">Accès commandes</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-panelBorder bg-white/5 px-4 py-3.5 text-base outline-none focus:border-electric"
          placeholder="Mot de passe admin"
          autoFocus
        />
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-accent px-6 py-4 text-sm font-bold tracking-wide text-black transition-all duration-300 hover:bg-accent-soft disabled:opacity-50"
        >
          {loading ? "Connexion…" : "SE CONNECTER"}
        </button>
      </form>
    </main>
  );
}