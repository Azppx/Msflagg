"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { PaypalButton } from "@/components/PaypalButton";
import { product } from "@/lib/config";
import { paypalClientIdPublic } from "@/lib/paypal";

export default function PaiementPage() {
  return (
    <Suspense fallback={null}>
      <PaiementContent />
    </Suspense>
  );
}

function PaiementContent() {
  const params = useSearchParams();
  const name = params.get("name") || "";
  const email = params.get("email") || "";

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ÉTAPE 3 / 4" title="PAIEMENT" backHref="/checkout/informations" />

      <div className="px-5">
        <StepIndicator current={3} />

        <div className="mt-6 rounded-xl2 border border-panelBorder bg-panel/60 p-5">
          <h2 className="font-display text-lg">RÉCAPITULATIF</h2>
          <div className="mt-4 space-y-3 text-sm">
            <Row label="Produit" value={product.name} />
            <Row label="Durée" value={product.duration} />
            <Row label="Client" value={`${name} · ${email}`} />
            <div className="h-px bg-panelBorder" />
            <Row
              label="Montant total"
              value={`${product.priceTotal.toFixed(2)} €`}
              emphasize
            />
          </div>
        </div>

        <p className="mt-4 px-1 text-xs text-white/40">
          Le montant facturé est vérifié côté serveur avant tout paiement.
        </p>

        <div className="mt-6">
          <PaypalButton
            clientId={paypalClientIdPublic}
            customerName={name}
            customerEmail={email}
          />
        </div>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50">{label}</span>
      <span className={emphasize ? "font-display text-xl text-accent" : "font-medium"}>
        {value}
      </span>
    </div>
  );
}
