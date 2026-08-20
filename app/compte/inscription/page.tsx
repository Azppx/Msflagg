"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { useAuth } from "@/lib/auth-context";

export default function InscriptionPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Erreur lors de la création du compte.");
      return;
    }
    await refresh();
    router.push("/compte");
  }

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="MON COMPTE" title="INSCRIPTION" backHref="/" />
      <div className="px-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/50">
              NOM
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-panelBorder bg-white/5 px-4 py-3.5 text-base outline-none focus:border-electric"
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/50">
              EMAIL
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-panelBorder bg-white/5 px-4 py-3.5 text-base outline-none focus:border-electric"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/50">
              MOT DE PASSE
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-panelBorder bg-white/5 px-4 py-3.5 text-base outline-none focus:border-electric"
              autoComplete="new-password"
            />
            <span className="mt-1 block text-xs text-white/30">8 caractères minimum.</span>
          </label>

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button type="submit" variant="primary" className="mt-2" disabled={loading}>
            {loading ? "…" : "CRÉER MON COMPTE →"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Déjà un compte ?{" "}
          <Link href="/compte/connexion" className="font-semibold text-electric-soft">
            Connecte-toi
          </Link>
        </p>
      </div>
    </main>
  );
}
