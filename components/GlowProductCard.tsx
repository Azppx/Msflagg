"use client";

import Link from "next/link";
import { catalogToneRgb } from "@/components/catalog-icons";
import { ProductLogo } from "@/components/ProductLogo";
import type { CatalogProduct } from "@/lib/catalog";

export function GlowProductCard({
  item,
  index,
}: {
  item: CatalogProduct;
  /** Numéro affiché en eyebrow ("01 / CATÉGORIE"). */
  index?: number;
}) {
  const toneRgb = catalogToneRgb[item.tone];
  const num = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link
      href={`/produit/${item.slug}`}
      className="kyzen-service-card group block"
      style={{ "--tone-rgb": toneRgb } as React.CSSProperties}
    >
      <div className="relative flex items-start justify-between">
        {num && (
          <span className="kyzen-service-num">
            {num} / {item.category.toUpperCase()}
          </span>
        )}
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-white/80">
          {item.priceTotal}€
        </span>
      </div>

      <div className="kyzen-service-icon">
        <ProductLogo logo={item.logo} icon={item.icon} size={26} />
      </div>

      <h2 className="relative mt-[18px] text-[22px] font-bold leading-tight tracking-tight text-white">
        {item.name}
      </h2>
      <p className="relative mt-[7px] max-w-[420px] text-[13px] leading-relaxed text-white/55">
        {item.description}
      </p>

      <span className="kyzen-service-more">
        Découvrir
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H8M17 7v9" />
        </svg>
      </span>
    </Link>
  );
}
