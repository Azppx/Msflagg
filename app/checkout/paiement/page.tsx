"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { GlowPaymentPanel } from "@/components/GlowPaymentPanel";
import { GlowCard } from "@/components/GlowCard";
import { catalogToneRgb } from "@/components/catalog-icons";
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
  const dob = params.get("dob") || "";
  const wise = getWiseConfig();
  const cart = useCart();

  // On fige le contenu du panier au moment où l'étape paiement démarre :
  // le panneau vide le panier dès que la commande est créée, il ne faut
  // donc pas re-lire le panier "en direct" ensuite (il redeviendrait vide).
  const [snapshot, setSnapshot] = useState<CartItem[] | null>(null);
  useEffect(() => {
    if (cart.hydrated && snapshot === null) {
      setSnapshot(cart.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.hydrated]);

  const items = snapshot ?? [];

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ÉTAPE 3 / 4" title="PAIEMENT" backHref="/checkout/informations" />

      <div className="px-5">

        {snapshot === null && <p className="mt-6 text-sm text-white/40">Chargement…</p>}

        {snapshot !== null && items.length === 0 && (
          <GlowCard toneRgb={catalogToneRgb.electric} className="bounce-in mt-6 text-center">
            <p className="text-sm text-white/60">Ton panier est vide.</p>
            <ButtonLink href="/premium" variant="custom" className="btn-glow-blue mt-4">
              VOIR LE CATALOGUE
            </ButtonLink>
          </GlowCard>
        )}

        {items.length > 0 && (
          <div className="bounce-in mt-6">
            <GlowPaymentPanel
              items={items}
              customerName={name}
              customerEmail={email}
              customerDateOfBirth={dob}
              wiseAccountHolder={wise.accountHolder}
              wiseEmail={wise.email}
              wiseIban={wise.iban}
              wisePaymentLink={wise.paymentLink}
            />
          </div>
        )}
      </div>
    </main>
  );
}
