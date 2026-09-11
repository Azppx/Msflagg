"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageNav } from "@/components/PageNav";
import { ProductIcon } from "@/components/ProductIcon";
import { useCart, type CartItem } from "@/lib/cart-context";
import { getProductBySlug } from "@/lib/catalog";

// Identifiant de commande généré côté client pour cette démo (pas de
// backend dans ce projet neuf) — à remplacer par un vrai appel API créant
// la commande côté serveur le jour où un back-end est branché.
function generateOrderId() {
  return `KZ-${Date.now().toString(36).toUpperCase()}`;
}

export default function PaiementPage() {
  return (
    <Suspense fallback={null}>
      <PaiementContent />
    </Suspense>
  );
}

function PaiementContent() {
  const router = useRouter();
  const params = useSearchParams();
  const name = params.get("name") || "";
  const cart = useCart();

  const [snapshot, setSnapshot] = useState<CartItem[] | null>(null);
  const [orderId] = useState(generateOrderId);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (cart.hydrated && snapshot === null) setSnapshot(cart.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.hydrated]);

  const items = snapshot ?? [];
  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const firstItem = items[0];
  const catalogItem = firstItem ? getProductBySlug(firstItem.slug) : null;

  function handleConfirm() {
    setConfirming(true);
    try {
      const order = {
        id: orderId,
        productName: items.length === 1 ? items[0].name : `${items.length} articles`,
        amount: total.toFixed(2),
        currency: "EUR",
        date: new Date().toISOString(),
      };
      const raw = localStorage.getItem("kyzen-orders");
      const existing = raw ? JSON.parse(raw) : [];
      localStorage.setItem("kyzen-orders", JSON.stringify([order, ...existing]));
    } catch {
      // non bloquant si le stockage échoue
    }
    cart.clearCart();
    setTimeout(() => {
      router.push(`/checkout/confirmation?orderId=${orderId}&name=${encodeURIComponent(name)}`);
    }, 600);
  }

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Paiement" />

      <p style={{ marginTop: 20, fontSize: 12.5, color: "var(--signal)", fontWeight: 600 }}>ÉTAPE 3 / 4</p>
      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", marginTop: 6 }}>Paiement</h1>

      {snapshot === null && <p style={{ marginTop: 24, fontSize: 14, color: "var(--fog)" }}>Chargement…</p>}

      {snapshot !== null && items.length > 0 && (
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="liquid-glass liquid-glass--signal" style={{ padding: 24, borderRadius: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <p className="font-display" style={{ fontWeight: 700, fontSize: 24 }}>
                {items.length === 1 ? items[0].name : `${items.length} articles`}
              </p>
              {catalogItem && (
                <div
                  className="liquid-glass"
                  style={{ width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  <ProductIcon name={catalogItem.icon} width={26} height={26} style={{ color: "var(--signal)" }} />
                </div>
              )}
            </div>
            <div style={{ height: 1, background: "var(--line)", margin: "18px 0" }} />
            <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em", color: "var(--fog)" }}>MONTANT</p>
            <p className="font-display" style={{ fontWeight: 700, fontSize: 40, marginTop: 6 }}>{total.toFixed(2)}€</p>
          </div>

          <div className="liquid-glass" style={{ padding: 22, borderRadius: 22 }}>
            <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em", color: "var(--fog)" }}>VIREMENT</p>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5 }}>
              <Row label="Bénéficiaire" value="KYZEN SERVICES" />
              <Row label="Référence à indiquer" value={orderId} emphasize />
            </div>
            <p style={{ marginTop: 18, fontSize: 12, lineHeight: 1.6, color: "var(--fog)" }}>
              Une fois le virement envoyé, confirme ci-dessous. Ta commande sera vérifiée puis livrée sous 24h.
            </p>
          </div>

          <button
            onClick={handleConfirm}
            disabled={confirming}
            className="liquid-glass liquid-glass--signal"
            style={{
              width: "100%",
              padding: 16,
              fontSize: 15,
              fontWeight: 600,
              color: "var(--paper)",
              borderRadius: 14,
              cursor: confirming ? "default" : "pointer",
              opacity: confirming ? 0.6 : 1,
            }}
          >
            {confirming ? "…" : "J'ai envoyé le paiement"}
          </button>
        </div>
      )}
    </main>
  );
}

function Row({ label, value, emphasize }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ color: "var(--fog)" }}>{label}</span>
      <span style={{ fontWeight: emphasize ? 700 : 500, color: emphasize ? "var(--signal)" : "var(--paper)", fontFamily: emphasize ? "monospace" : "inherit" }}>
        {value}
      </span>
    </div>
  );
}
