"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { ButtonLink } from "@/components/Button";
import { WisePaymentPanel } from "@/components/WisePaymentPanel";
import { useCart, CartItem } from "@/lib/cart-context";
import { getWiseConfig } from "@/lib/wise";

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
  const wise = getWiseConfig();
  const cart = useCart();

  // On fige le contenu du panier au moment où l'étape paiement démarre :
  // WisePaymentPanel vide le panier dès que la commande est créée, il ne
  // faut donc pas re-lire le panier "en direct" ensuite (il redeviendrait vide).
  const [snapshot, setSnapshot] = useState<CartItem[] | null>(null);
  useEffect(() => {
    if (cart.hydrated && snapshot === null) {
      setSnapshot(cart.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.hydrated]);

  const items = snapshot ?? [];
  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ÉTAPE 3 / 4" title="PAIEMENT" backHref="/checkout/informations" />

      <div className="px-5">
        <StepIndicator current={3} />

        {snapshot === null && <p className="mt-6 text-sm text-white/40">Chargement…</p>}

        {snapshot !== null && items.length === 0 && (
          <div className="glass-panel mt-6 rounded-xl2 border border-panelBorder p-6 text-center">
            <p className="text-sm text-white/60">Ton panier est vide.</p>
            <ButtonLink href="/premium" variant="primary" className="mt-4">
              VOIR LE CATALOGUE
            </ButtonLink>
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="glass-panel mt-6 rounded-xl2 border border-panelBorder p-5">
              <h2 className="font-display text-lg">RÉCAPITULATIF</h2>
              <div className="mt-4 space-y-2 text-sm">
                {items.map((item) => (
                  <div key={item.slug} className="flex items-center justify-between">
                    <span className="text-white/70">
                      {item.name} {item.quantity > 1 && `×${item.quantity}`}
                    </span>
                    <span>{(item.unitPrice * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
                <div className="h-px bg-panelBorder" />
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Client</span>
                  <span className="font-medium">{name} · {email}</span>
                </div>
                <div className="h-px bg-panelBorder" />
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Montant total</span>
                  <span className="font-display text-xl text-accent">{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            <p className="mt-4 px-1 text-xs text-white/40">
              Le montant facturé est vérifié côté serveur avant tout paiement.
            </p>

            <div className="mt-6">
              <WisePaymentPanel
                items={items}
                customerName={name}
                customerEmail={email}
                wiseAccountHolder={wise.accountHolder}
                wiseEmail={wise.email}
                wiseIban={wise.iban}
                wisePaymentLink={wise.paymentLink}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
