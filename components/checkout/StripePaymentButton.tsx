"use client";

import { useState } from "react";

export function StripePaymentButton({
  orderId,
  amount,
  currency,
}: {
  orderId: string;
  amount: string;
  currency: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Erreur lors de la création du paiement");
      }
      window.location.href = data.url;
    } catch (e: any) {
      setLoading(false);
      setError(e.message || "Erreur lors de la création du paiement");
    }
  }

  return (
    <div className="space-y-5">
      <div className="glass-panel rounded-xl2 border border-electric/40 p-5">
        <p className="text-xs font-semibold tracking-widest text-electric-soft">
          CARTE BANCAIRE
        </p>
        <p className="mt-2 text-sm text-white/60">
          Paiement sécurisé via Stripe pour{" "}
          <span className="font-bold text-white">
            {amount} {currency}
          </span>
          . Tu seras redirigé vers une page de paiement sécurisée.
        </p>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full rounded-2xl bg-accent px-6 py-4 text-sm font-bold tracking-wide text-black transition-all duration-300 hover:bg-accent-soft disabled:opacity-50"
      >
        {loading ? "Redirection…" : "PAYER PAR CARTE →"}
      </button>
    </div>
  );
}
