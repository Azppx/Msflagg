"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function WisePaymentPanel({
  productSlug,
  customerName,
  customerEmail,
  wiseAccountHolder,
  wiseEmail,
  wiseIban,
  wisePaymentLink,
}: {
  productSlug: string;
  customerName: string;
  customerEmail: string;
  wiseAccountHolder: string;
  wiseEmail: string;
  wiseIban: string;
  wisePaymentLink: string;
}) {
  const router = useRouter();
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
          body: JSON.stringify({ productSlug, customerName, customerEmail }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur lors de la création de la commande");
        if (!cancelled) {
          setOrderId(data.orderId);
          setAmount(data.amount);
          setCurrency(data.currency);
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Erreur");
      }
    }
    createOrder();
    return () => {
      cancelled = true;
    };
  }, [productSlug, customerName, customerEmail]);

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

  if (!orderId) {
    return <p className="text-sm text-white/40">Préparation de ta commande…</p>;
  }

  return (
    <div className="space-y-5">
      <div className="glass-panel rounded-xl2 border border-electric/40 p-5">
        <p className="text-xs font-semibold tracking-widest text-electric-soft">
          VIREMENT WISE
        </p>
        <p className="mt-2 text-sm text-white/60">
          Envoie exactement <span className="font-bold text-white">{amount} {currency}</span> via
          Wise, en indiquant bien la référence ci-dessous.
        </p>

        <div className="mt-4 space-y-3 text-sm">
          <Row label="Bénéficiaire" value={wiseAccountHolder} />
          {wiseEmail && <Row label="Email Wise" value={wiseEmail} />}
          {wiseIban && <Row label="IBAN" value={wiseIban} />}
          <Row label="Référence à indiquer" value={orderId} emphasize />
        </div>

        {wisePaymentLink && (
          <a
            href={wisePaymentLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-soft"
          >
            Ouvrir le lien de paiement Wise ↗
          </a>
        )}
      </div>

      <p className="px-1 text-xs text-white/40">
        Une fois le virement envoyé, clique ci-dessous. Ta commande sera vérifiée manuellement
        puis livrée sous 24h.
      </p>

      <button
        onClick={handleConfirmSent}
        disabled={confirming}
        className="w-full rounded-2xl bg-accent px-6 py-4 text-sm font-bold tracking-wide text-black transition-all duration-300 hover:bg-accent-soft disabled:opacity-50"
      >
        {confirming ? "…" : "J'AI ENVOYÉ LE PAIEMENT"}
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/40">{label}</span>
      <span className={emphasize ? "font-mono font-bold text-accent-soft" : "text-white/90"}>
        {value}
      </span>
    </div>
  );
}
