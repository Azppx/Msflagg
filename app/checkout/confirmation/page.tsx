"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageNav } from "@/components/PageNav";
import { CheckIcon, DiscordIcon, HeadsetIcon } from "@/components/icons";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") || "—";
  const name = params.get("name") || "";
  const firstName = name.split(" ")[0];

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Confirmation" />

      <p style={{ marginTop: 20, fontSize: 12.5, color: "var(--signal)", fontWeight: 600, textAlign: "center" }}>ÉTAPE 4 / 4</p>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <div
          className="liquid-glass liquid-glass--signal"
          style={{
            width: 76,
            height: 76,
            margin: "0 auto",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--signal)",
            boxShadow: "0 0 60px -14px rgba(157,92,255,0.7)",
          }}
        >
          <CheckIcon width={32} height={32} />
        </div>
        <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, marginTop: 22 }}>
          Paiement confirmé{firstName ? `, ${firstName}` : ""} !
        </h1>
        <p style={{ marginTop: 10, fontSize: 14, color: "var(--fog)", lineHeight: 1.6 }}>
          Ta commande est en cours de vérification. Elle sera livrée directement sur cette page sous 24h.
        </p>
      </div>

      <div className="liquid-glass" style={{ marginTop: 28, padding: 22, borderRadius: 22, textAlign: "left" }}>
        <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em", color: "var(--fog)" }}>NUMÉRO DE COMMANDE</p>
        <p style={{ marginTop: 6, fontFamily: "monospace", fontSize: 17, fontWeight: 700, color: "var(--signal)" }}>{orderId}</p>
        <div style={{ height: 1, background: "var(--line)", margin: "16px 0" }} />
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--paper)" }}>Prochaines étapes</p>
        <ol style={{ marginTop: 10, paddingLeft: 18, fontSize: 13, color: "var(--fog)", lineHeight: 1.8 }}>
          <li>Garde ce numéro de commande précieusement.</li>
          <li>Ta commande sera livrée directement ici sous 24h.</li>
          <li>Contacte le support si tu n&apos;as pas de nouvelles passé ce délai.</li>
        </ol>
      </div>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
        <a
          href="https://discord.gg/"
          target="_blank"
          rel="noreferrer"
          className="liquid-glass liquid-glass--signal"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, fontSize: 14.5, fontWeight: 600, color: "var(--paper)", borderRadius: 14, textDecoration: "none" }}
        >
          <DiscordIcon width={15} height={15} /> Rejoindre le Discord
        </a>
        <Link
          href="/support"
          className="liquid-glass"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, fontSize: 14.5, fontWeight: 600, color: "var(--paper)", borderRadius: 14, textDecoration: "none" }}
        >
          <HeadsetIcon width={15} height={15} style={{ color: "var(--signal)" }} /> Contacter le support
        </Link>
      </div>
    </main>
  );
}
