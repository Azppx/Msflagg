"use client";

import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { PaymentMethodPanel } from "@/components/checkout/PaymentMethodPanel";
import { product } from "@/lib/config";
import { getProductBySlug } from "@/lib/catalog";
import { getWiseConfig } from "@/lib/wise";

export function PaiementClient({ stripeEnabled }: { stripeEnabled: boolean }) {
  const params = useSearchParams();
  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const itemSlug = params.get("item");
  const catalogItem = getProductBySlug(itemSlug);
  const wise = getWiseConfig();

  const productSlug = catalogItem ? catalogItem.slug : product.slug;
  const productName = catalogItem ? catalogItem.name : product.name;
  const productDuration = catalogItem ? catalogItem.category : product.duration;
  const priceTotal = catalogItem ? catalogItem.priceTotal : product.priceTotal;

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ÉTAPE 3 / 4" title="PAIEMENT" backHref="/checkout/informations" />

      <div className="px-5">
        <StepIndicator current={3} />

        <div className="glass-panel mt-6 rounded-xl2 border border-panelBorder p-5">
          <h2 className="font-display text-lg">RÉCAPITULATIF</h2>
          <div className="mt-4 space-y-3 text-sm">
            <Row label="Produit" value={productName} />
            <Row label="Durée" value={productDuration} />
            <Row label="Client" value={`${name} · ${email}`} />
            <div className="h-px bg-panelBorder" />
            <Row label="Montant total" value={`${priceTotal.toFixed(2)} €`} emphasize />
          </div>
        </div>

        <p className="mt-4 px-1 text-xs text-white/40">
          Le montant facturé est vérifié côté serveur avant tout paiement.
        </p>

        <div className="mt-6">
          <PaymentMethodPanel
            productSlug={productSlug}
            customerName={name}
            customerEmail={email}
            stripeEnabled={stripeEnabled}
            wiseAccountHolder={wise.accountHolder}
            wiseEmail={wise.email}
            wiseIban={wise.iban}
            wisePaymentLink={wise.paymentLink}
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
