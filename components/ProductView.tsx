"use client";

import { ButtonLink } from "@/components/Button";
import { AddToCartPanel } from "@/components/AddToCartPanel";
import { GlowCard } from "@/components/GlowCard";
import { catalogToneRgb } from "@/components/catalog-icons";
import { ProductLogo } from "@/components/ProductLogo";
import { useTranslation } from "@/lib/i18n/locale-context";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductView({ item }: { item: CatalogProduct }) {
  const t = useTranslation();
  const toneRgb = catalogToneRgb[item.tone];

  return (
    <GlowCard toneRgb={toneRgb} particles className="bounce-in mt-6">
      <p
        className="text-xs font-bold tracking-[3px]"
        style={{ color: `rgb(${toneRgb})`, textShadow: `0 0 12px rgba(${toneRgb},0.5)` }}
      >
        {item.category.toUpperCase()}
      </p>

      <div className="mt-2.5 flex items-start justify-between gap-3">
        <h2 className="text-[1.9rem] font-extrabold leading-tight tracking-tight text-white">
          {item.name}
        </h2>
        <div className="kyzen-logo-frame kyzen-logo-frame--lg" style={{ "--tone-rgb": toneRgb } as React.CSSProperties}>
          <span className="kyzen-logo-frame-inner">
            <ProductLogo logo={item.logo} icon={item.icon} size={40} />
          </span>
        </div>
      </div>

      <p className="mt-4 text-[15px] font-semibold leading-relaxed text-white/90">
        {item.description}
      </p>

      <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <p
        className="text-[46px] font-extrabold leading-none text-white"
        style={{ textShadow: `0 0 30px rgba(${toneRgb},0.35)` }}
      >
        {item.priceTotal}€
      </p>
      <p className="mb-6 mt-2 text-sm font-medium text-white/45">
        {item.priceTotal.toFixed(2)}€ {t("product.total_label")}
      </p>

      <div className="flex flex-col gap-4">
        {item.features.map((f) => (
          <div key={f} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[13px]"
              style={{
                borderColor: `rgb(${toneRgb})`,
                color: `rgb(${toneRgb})`,
                boxShadow: `0 0 10px rgba(${toneRgb},0.35)`,
              }}
            >
              ✓
            </span>
            <span className="text-sm font-medium text-white/70">{f}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <AddToCartPanel
          slug={item.slug}
          name={item.name}
          unitPrice={item.priceTotal}
          currency={item.currency}
          ctaClass={`text-white`}
          ctaStyle={{
            background: `linear-gradient(180deg, rgb(${toneRgb}), rgba(${toneRgb},0.75))`,
            boxShadow: `0 18px 40px -12px rgba(${toneRgb},0.55)`,
          }}
        />
        <ButtonLink href="/discord" variant="ghost">
          {t("product.join_discord")}
        </ButtonLink>
      </div>
    </GlowCard>
  );
}
