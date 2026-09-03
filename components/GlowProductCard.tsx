"use client";

import Link from "next/link";
import { useTilt } from "@/lib/useTilt";
import { catalogToneClasses, catalogToneRgb } from "@/components/catalog-icons";
import { ProductLogo } from "@/components/ProductLogo";
import type { CatalogProduct } from "@/lib/catalog";

export function GlowProductCard({ item, delay }: { item: CatalogProduct; delay?: number }) {
  const t = catalogToneClasses[item.tone];
  const { ref, onPointerEnter, onPointerMove, onPointerLeave, onPointerDown, onPointerUp, onPointerCancel } =
    useTilt<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/produit/${item.slug}`}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      className="pulse-card group block border border-panelBorder"
      style={
        {
          "--tone-rgb": catalogToneRgb[item.tone],
          "--tone-hover-border": `rgba(${catalogToneRgb[item.tone]},0.4)`,
          animationDelay: delay ? `${delay}s` : undefined,
        } as React.CSSProperties
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="kyzen-logo-frame">
          <span className="kyzen-logo-frame-inner">
            <ProductLogo logo={item.logo} icon={item.icon} size={34} />
          </span>
        </div>
        <span className="pulse-badge">
          <span className="dot" />
          {item.priceTotal} €
        </span>
      </div>

      <p className={`mt-6 text-xs font-bold uppercase tracking-widest ${t.category}`}>
        {item.category}
      </p>
      <h2 className="font-heading mt-1.5 text-[1.7rem] leading-tight tracking-tight">
        {item.name}
      </h2>
      <p className="mt-2.5 text-sm leading-relaxed text-white/55">{item.description}</p>

      <span className="pulse-explore mt-5 inline-flex items-center text-[0.95rem] font-bold text-white/80 group-hover:text-white">
        Explorer
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M17 7H8M17 7v9" />
        </svg>
      </span>
    </Link>
  );
}
