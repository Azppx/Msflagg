"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/lib/cart-context";
import { trackOrder } from "@/lib/order-tracking";
import { CatalogIcon, catalogToneRgb } from "@/components/catalog-icons";
import { getProductBySlug } from "@/lib/catalog";
import { GlowCard } from "@/components/GlowCard";

export function GlowPaymentPanel({
  items,
  customerName,
  customerEmail,
  customerDateOfBirth,
  wiseAccountHolder,
  wiseEmail,
  wiseIban,
  wisePaymentLink,
}: {
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  customerDateOfBirth?: string;
  wiseAccountHolder: string;
  wiseEmail: string;
  wiseIban: string;
  wisePaymentLink: string;
}) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>("EUR");
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function createOrder() {
      try {
        const res = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
            customerName,
            customerEmail,
            customerDateOfBirth,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur lors de la création de la commande");
        if (!cancelled) {
          setOrderId(data.orderId);
          setAmount(data.amount);
          setCurrency(data.currency);
          trackOrder(data.orderId);
          clearCart();
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Erreur");
      }
    }
    if (items.length > 0) createOrder();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleConfirmSent() {
    if (!orderId) return;
    setConfirming(true);
    const res = await fetch(`/api/orders/${orderId}/mark-sent`, { method: "POST" });
    setConfirming(false);
    if (!res.ok) {
      setError("Erreur lors de la confirmation, réessaie.");
      return;
    }
    router.push(`/checkout/confirmation?orderId=${orderId}`);
  }

  if (error) {
    return <p className="text-sm text-danger">{error}</p>;
  }

  if (!orderId || !amount) {
    return <p className="text-sm text-white/40">Préparation de ta commande…</p>;
  }

  const firstItem = items[0];
  const catalogItem = firstItem ? getProductBySlug(firstItem.slug) : null;
  const toneRgb = catalogItem ? catalogToneRgb[catalogItem.tone] || catalogToneRgb.electric : catalogToneRgb.electric;

  const displayTitle = items.length === 1 ? items[0].name : `${items.length} articles`;
  const displayDesc =
    items.length === 1
      ? catalogItem?.description || items[0].name
      : items.map((i) => `${i.name}${i.quantity > 1 ? ` ×${i.quantity}` : ""}`).join(" · ");
  const featureList = catalogItem?.features || [
    "Accès immédiat après paiement",
    "Support dédié via Discord",
    "Garantie & remplacement en cas de souci",
  ];

  return (
    <div className="space-y-5">
      {/* --- Carte "commande" --- */}
      <GlowCard toneRgb={toneRgb}>
        <p
          className="text-xs font-bold tracking-[3px] text-[rgb(var(--tone-rgb))]"
          style={{ textShadow: "0 0 12px rgba(var(--tone-rgb),0.5)" }}
        >
          COMMANDE
        </p>

        <div className="mt-2.5 flex items-start justify-between gap-3">
          <h2 className="text-[1.9rem] font-extrabold leading-tight tracking-tight text-white">
            {displayTitle}
          </h2>
          {catalogItem && (
            <div className="glow-icon-pulse flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <CatalogIcon name={catalogItem.icon} />
            </div>
          )}
        </div>

        <p className="mt-4 text-[15px] font-semibold leading-relaxed text-white/90">{displayDesc}</p>

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <p className="mb-3 text-xs font-bold tracking-[2.5px] text-white/40">STATUT</p>
        <div className="mb-5 flex items-center gap-2.5">
          <span
            className="h-2 w-2 shrink-0 animate-pulse rounded-full"
            style={{ background: `rgb(var(--tone-rgb))`, boxShadow: `0 0 10px 2px rgba(var(--tone-rgb),0.8)` }}
          />
          <span className="text-[15px] font-bold" style={{ color: `rgb(var(--tone-rgb))` }}>
            En attente de ton virement Wise
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {featureList.map((f) => (
            <div key={f} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[13px]"
                style={{
                  borderColor: `rgb(var(--tone-rgb))`,
                  color: `rgb(var(--tone-rgb))`,
                  boxShadow: `0 0 10px rgba(var(--tone-rgb),0.35)`,
                }}
              >
                ✓
              </span>
              <span className="text-sm font-medium text-white/70">{f}</span>
            </div>
          ))}
        </div>
      </GlowCard>

      {/* --- Carte "virement" --- */}
      <GlowCard toneRgb={toneRgb}>
        <p className="text-xs font-bold tracking-[2.5px] text-white/40">VIREMENT WISE</p>
        <p
          className="my-3 text-[44px] font-extrabold leading-none text-white"
          style={{ textShadow: `0 0 30px rgba(var(--tone-rgb),0.35)` }}
        >
          {amount}{currency === "EUR" ? "€" : ` ${currency}`}
        </p>

        <div className="mt-5 space-y-3 text-sm">
          <Row label="Bénéficiaire" value={wiseAccountHolder} toneRgb={toneRgb} />
          {wiseEmail && <Row label="Email Wise" value={wiseEmail} toneRgb={toneRgb} />}
          {wiseIban && <Row label="IBAN" value={wiseIban} toneRgb={toneRgb} />}
          <Row label="Référence à indiquer" value={orderId} toneRgb={toneRgb} emphasize />
        </div>

        {wisePaymentLink && (
          <a
            href={wisePaymentLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1 text-sm font-bold"
            style={{ color: `rgb(var(--tone-rgb))` }}
          >
            Ouvrir le lien de paiement Wise ↗
          </a>
        )}

        <p className="mt-6 text-xs leading-relaxed text-white/35">
          Une fois le virement envoyé, confirme ci-dessous. Ta commande sera vérifiée
          manuellement puis livrée sous 24h. Tu peux retrouver son statut à tout moment via
          l'icône 📦 en bas de l'écran.
        </p>

        <button
          onClick={handleConfirmSent}
          disabled={confirming}
          className="glow-cta relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-[19px] text-[17px] font-extrabold text-black disabled:opacity-60"
          style={{
            background: `linear-gradient(180deg, rgb(var(--tone-rgb)), rgba(var(--tone-rgb),0.75))`,
            boxShadow: `0 18px 40px -12px rgba(var(--tone-rgb),0.55)`,
          }}
        >
          {confirming ? "…" : "J'AI ENVOYÉ LE PAIEMENT"} <span>›</span>
        </button>
      </GlowCard>
    </div>
  );
}

function Row({
  label,
  value,
  toneRgb,
  emphasize = false,
}: {
  label: string;
  value: string;
  toneRgb: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/40">{label}</span>
      <span
        className={emphasize ? "font-mono font-bold" : "text-white/90"}
        style={emphasize ? { color: `rgb(${toneRgb})` } : undefined}
      >
        {value}
      </span>
    </div>
  );
}
