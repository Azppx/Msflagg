"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useCart } from "@/lib/cart-context";

export default function PanierPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, hydrated } = useCart();

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="TON PANIER" title="PANIER" backHref="/produit" />

      <div className="px-5">
        {!hydrated && <p className="text-sm text-white/40">Chargement…</p>}

        {hydrated && items.length === 0 && (
          <div className="glass-panel mt-4 rounded-xl2 border border-panelBorder p-8 text-center">
            <p className="text-4xl">🛒</p>
            <p className="mt-3 font-semibold">Ton panier est vide</p>
            <p className="mt-1 text-sm text-white/50">
              Ajoute des produits depuis le catalogue pour commencer.
            </p>
            <ButtonLink href="/premium" variant="primary" className="mt-6">
              VOIR LE CATALOGUE
            </ButtonLink>
          </div>
        )}

        {hydrated && items.length > 0 && (
          <>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="glass-panel rounded-xl2 border border-panelBorder p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-white/50">
                        {item.unitPrice.toFixed(2)} {item.currency} / unité
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.slug)}
                      aria-label={`Retirer ${item.name}`}
                      className="text-white/30 transition-colors hover:text-danger"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.slug, q)}
                    />
                    <span className="font-display text-lg text-accent">
                      {(item.unitPrice * item.quantity).toFixed(2)} {item.currency}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-xs font-semibold tracking-wide text-white/30 hover:text-white/60"
            >
              Vider le panier
            </button>

            <div className="glass-panel mt-6 rounded-xl2 border border-panelBorder p-5">
              <div className="flex items-center justify-between">
                <span className="text-white/50">Total</span>
                <span className="font-display text-2xl text-accent">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href="/checkout/informations" variant="primary">
                PASSER COMMANDE →
              </ButtonLink>
              <Link
                href="/premium"
                className="text-center text-sm font-semibold text-white/50 hover:text-white/80"
              >
                ← Continuer mes achats
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
