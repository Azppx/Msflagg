"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { Button, ButtonLink } from "@/components/Button";
import { useCart } from "@/lib/cart-context";

export default function InformationsPage() {
  const router = useRouter();
  const { items, totalPrice, hydrated } = useCart();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || name.trim().length < 2) {
      setError("Merci de renseigner un nom et un email valides.");
      return;
    }
    const params = new URLSearchParams({ email, name });
    router.push(`/checkout/paiement?${params.toString()}`);
  }

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ÉTAPE 2 / 4" title="TES INFORMATIONS" backHref="/panier" />

      <div className="px-5">
        <StepIndicator current={2} />

        {hydrated && items.length === 0 && (
          <div className="glass-panel mt-6 rounded-xl2 border border-panelBorder p-6 text-center">
            <p className="text-sm text-white/60">Ton panier est vide.</p>
            <ButtonLink href="/premium" variant="primary" className="mt-4">
              VOIR LE CATALOGUE
            </ButtonLink>
          </div>
        )}

        {items.length > 0 && (
          <div className="bounce-in">
            <div className="glass-panel mt-6 rounded-xl2 border border-panelBorder p-4">
              <p className="text-sm text-white/50">Produits sélectionnés</p>
              <div className="mt-2 space-y-1.5">
                {items.map((item) => (
                  <div key={item.slug} className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {item.name} {item.quantity > 1 && `×${item.quantity}`}
                    </span>
                    <span className="text-white/60">
                      {(item.unitPrice * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-px bg-panelBorder" />
              <div className="mt-3 flex items-center justify-between font-semibold">
                <span>Total</span>
                <span className="text-accent">{totalPrice.toFixed(2)} €</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/50">
                  NOM
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-panelBorder bg-white/5 px-4 py-3.5 text-base outline-none focus:border-electric"
                  placeholder="Ton nom"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/50">
                  EMAIL
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-panelBorder bg-white/5 px-4 py-3.5 text-base outline-none focus:border-electric"
                  placeholder="ton@email.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </label>

              {error && <p className="text-sm text-danger">{error}</p>}

              <Button type="submit" variant="primary" className="mt-2">
                CONTINUER →
              </Button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
