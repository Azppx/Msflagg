"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { QuantityStepper } from "@/components/QuantityStepper";
import { GlowCard } from "@/components/GlowCard";
import { useCart } from "@/lib/cart-context";
import { getProductBySlug } from "@/lib/catalog";
import { catalogToneRgb } from "@/components/catalog-icons";
import { useTranslation } from "@/lib/i18n/locale-context";

export default function PanierPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, hydrated } = useCart();
  const firstTone = items[0] ? getProductBySlug(items[0].slug)?.tone : undefined;
  const totalToneRgb = firstTone ? catalogToneRgb[firstTone] : catalogToneRgb.electric;
  const t = useTranslation();

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={t("cart.eyebrow")} title={t("cart.title")} backHref="/premium" />

      <div className="px-5">
        {!hydrated && <p className="text-sm text-white/40">{t("cart.loading")}</p>}

        {hydrated && items.length === 0 && (
          <GlowCard toneRgb={catalogToneRgb.electric} className="bounce-in mt-4 text-center">
            <p className="text-4xl">🛒</p>
            <p className="mt-3 font-semibold">{t("cart.empty_title")}</p>
            <p className="mt-1 text-sm text-white/50">{t("cart.empty_subtitle")}</p>
            <ButtonLink href="/premium" variant="custom" className="btn-glow-blue mt-6">
              {t("cart.view_catalog")}
            </ButtonLink>
          </GlowCard>
        )}

        {hydrated && items.length > 0 && (
          <>
            <div className="mt-4 space-y-3">
              {items.map((item) => {
                const tone = getProductBySlug(item.slug)?.tone;
                const toneRgb = tone ? catalogToneRgb[tone] : catalogToneRgb.electric;
                return (
                  <GlowCard key={item.slug} toneRgb={toneRgb} className="bounce-in p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-white/50">
                          {item.unitPrice.toFixed(2)} {item.currency} {t("cart.per_unit")}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug)}
                        aria-label={`${t("cart.remove_item")} ${item.name}`}
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
                      <span
                        className="font-display text-lg"
                        style={{ color: `rgb(${toneRgb})` }}
                      >
                        {(item.unitPrice * item.quantity).toFixed(2)} {item.currency}
                      </span>
                    </div>
                  </GlowCard>
                );
              })}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-xs font-semibold tracking-wide text-white/30 hover:text-white/60"
            >
              {t("cart.clear")}
            </button>

            <GlowCard toneRgb={totalToneRgb} particles className="bounce-in mt-6">
              <div className="flex items-center justify-between">
                <span className="text-white/50">{t("cart.total")}</span>
                <span
                  className="font-display text-2xl"
                  style={{ color: `rgb(${totalToneRgb})` }}
                >
                  {totalPrice.toFixed(2)} €
                </span>
              </div>
            </GlowCard>

            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href="/checkout/informations" variant="custom" className="btn-glow-blue">
                {t("cart.checkout_cta")}
              </ButtonLink>
              <Link
                href="/premium"
                className="text-center text-sm font-semibold text-white/50 hover:text-white/80"
              >
                {t("cart.continue_shopping")}
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
