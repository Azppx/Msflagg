"use client";

import { useEffect, useState } from "react";
import { WisePaymentPanel } from "@/components/WisePaymentPanel";
import { StripePaymentButton } from "@/components/checkout/StripePaymentButton";

type Method = "wise" | "stripe";

export function PaymentMethodPanel({
  productSlug,
  customerName,
  customerEmail,
  stripeEnabled,
  wiseAccountHolder,
  wiseEmail,
  wiseIban,
  wisePaymentLink,
}: {
  productSlug: string;
  customerName: string;
  customerEmail: string;
  stripeEnabled: boolean;
  wiseAccountHolder: string;
  wiseEmail: string;
  wiseIban: string;
  wisePaymentLink: string;
}) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>("EUR");
  const [error, setError] = useState("");
  const [method, setMethod] = useState<Method>("wise");

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

  if (error) {
    return <p className="text-sm text-danger">{error}</p>;
  }

  if (!orderId || !amount) {
    return <p className="text-sm text-white/40">Préparation de ta commande…</p>;
  }

  return (
    <div className="space-y-5">
      {stripeEnabled && (
        <div className="flex gap-2">
          <button
            onClick={() => setMethod("wise")}
            className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 ${
              method === "wise"
                ? "border-electric/40 bg-electric/10 text-electric-soft"
                : "border-panelBorder bg-white/5 text-white/50 hover:text-white/80"
            }`}
          >
            Virement Wise
          </button>
          <button
            onClick={() => setMethod("stripe")}
            className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 ${
              method === "stripe"
                ? "border-electric/40 bg-electric/10 text-electric-soft"
                : "border-panelBorder bg-white/5 text-white/50 hover:text-white/80"
            }`}
          >
            Carte bancaire
          </button>
        </div>
      )}

      {method === "wise" || !stripeEnabled ? (
        <WisePaymentPanel
          orderId={orderId}
          amount={amount}
          currency={currency}
          wiseAccountHolder={wiseAccountHolder}
          wiseEmail={wiseEmail}
          wiseIban={wiseIban}
          wisePaymentLink={wisePaymentLink}
        />
      ) : (
        <StripePaymentButton orderId={orderId} amount={amount} currency={currency} />
      )}
    </div>
  );
}
