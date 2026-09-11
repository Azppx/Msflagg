"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageNav } from "@/components/PageNav";
import { CartIcon, ChevronDiagIcon, HeadsetIcon, UserIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth-context";

export default function AccountPage() {
  const router = useRouter();
  const { account, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !account) router.push("/compte/connexion");
  }, [loading, account, router]);

  if (loading || !account) {
    return (
      <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
        <p style={{ fontSize: 14, color: "var(--fog)" }}>Chargement…</p>
      </main>
    );
  }

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Mon compte" />

      <div className="liquid-glass liquid-glass--signal" style={{ marginTop: 20, padding: 24, borderRadius: 24, display: "flex", alignItems: "center", gap: 16 }}>
        <div
          className="liquid-glass"
          style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--signal)", flexShrink: 0 }}
        >
          <UserIcon width={24} height={24} />
        </div>
        <div style={{ minWidth: 0 }}>
          <p className="font-display" style={{ fontWeight: 700, fontSize: 19 }}>{account.name}</p>
          <p style={{ fontSize: 13, color: "var(--fog)", marginTop: 2 }}>{account.email}</p>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <MenuLink href="/compte/commandes" icon={<CartIcon width={17} height={17} />} title="Mes commandes" subtitle="Historique et suivi" />
        <MenuLink href="/support" icon={<HeadsetIcon width={17} height={17} />} title="Aide" subtitle="Support & SAV" />
      </div>

      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        style={{ marginTop: 28, width: "100%", background: "none", border: "none", color: "rgba(184,174,214,0.5)", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}
      >
        Se déconnecter
      </button>
    </main>
  );
}

function MenuLink({ href, icon, title, subtitle }: { href: string; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <Link
      href={href}
      className="liquid-glass"
      style={{ display: "flex", alignItems: "center", gap: 14, padding: 18, borderRadius: 18, textDecoration: "none", color: "inherit" }}
    >
      <span style={{ color: "var(--signal)" }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 14.5 }}>{title}</p>
        <p style={{ fontSize: 12, color: "var(--fog)" }}>{subtitle}</p>
      </div>
      <ChevronDiagIcon width={13} height={13} style={{ color: "rgba(184,174,214,0.4)" }} />
    </Link>
  );
}
