"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n/locale-context";

export default function ConnexionPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const t = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || t("auth.login_error"));
      return;
    }
    await refresh();
    router.push("/compte");
  }

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={t("account.eyebrow")} title={t("auth.login_title")} backHref="/" />
      <div className="px-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/50">
              {t("auth.email")}
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
              {t("auth.password")}
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-panelBorder bg-white/5 px-4 py-3.5 text-base outline-none focus:border-electric"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button type="submit" variant="primary" className="mt-2" disabled={loading}>
            {loading ? "…" : t("auth.login_cta")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          {t("auth.no_account")}{" "}
          <Link href="/compte/inscription" className="font-semibold text-electric-soft">
            {t("auth.signup_link")}
          </Link>
        </p>
      </div>
    </main>
  );
}
