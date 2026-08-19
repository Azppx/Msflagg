"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth-context";

export default function ComptePage() {
  const router = useRouter();
  const { account, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !account) router.push("/compte/connexion");
  }, [loading, account, router]);

  if (loading || !account) {
    return (
      <main className="mx-auto min-h-screen max-w-md px-5 pb-16 pt-12">
        <p className="text-sm text-white/40">Chargement…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="MON COMPTE" title="PROFIL" backHref="/" />
      <div className="px-5">
        <div className="glass-panel rounded-xl2 border border-panelBorder p-5">
          <p className="font-display text-xl">{account.name}</p>
          <p className="mt-1 text-sm text-white/50">{account.email}</p>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <MenuLink href="/compte/portefeuille" title="Portefeuille" subtitle={`${account.walletBalance.toFixed(2)} € de crédit`} />
          <MenuLink href="/compte/commandes" title="Mes commandes" subtitle="Historique et suivi" />
          <MenuLink href="/support" title="Aide" subtitle="Support & SAV" />
        </div>

        <button
          onClick={async () => {
            await logout();
            router.push("/");
          }}
          className="mt-8 w-full rounded-2xl border border-panelBorder bg-white/5 px-6 py-3.5 text-sm font-semibold tracking-wide text-white/70 transition-colors hover:bg-white/10"
        >
          Se déconnecter
        </button>
      </div>
    </main>
  );
}

function MenuLink({ href, title, subtitle }: { href: string; title: string; subtitle: string }) {
  return (
    <Link
      href={href}
      className="glass-panel flex items-center justify-between rounded-xl2 border border-panelBorder p-4 transition-colors hover:bg-white/5"
    >
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-white/40">{subtitle}</p>
      </div>
      <span className="text-white/30">→</span>
    </Link>
  );
}
