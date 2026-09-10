"use client";

import Link from "next/link";
import { ProductIcon } from "@/components/ProductIcon";
import { ChevronDiagIcon } from "@/components/icons";
import type { Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType === "touch") return;
    setGlow(e);
  }
  function handlePointerDown(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "touch") return;
    setGlow(e);
  }
  function setGlow(e: React.PointerEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="prod-card liquid-glass"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
    >
      <div className="prod-logo-frame">
        <ProductIcon name={product.icon} width={26} height={26} />
      </div>
      <span
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          fontSize: 11,
          fontWeight: 700,
          color: "var(--paper)",
          background: "rgba(157,92,255,0.18)",
          border: "1px solid rgba(157,92,255,0.35)",
          padding: "5px 10px",
          borderRadius: 999,
        }}
      >
        {product.price} €
      </span>
      <p style={{ position: "relative", marginTop: 16, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: "var(--signal)", textTransform: "uppercase" }}>
        {product.categoryLabel}
      </p>
      <p className="font-display" style={{ position: "relative", marginTop: 4, fontWeight: 700, fontSize: 17, letterSpacing: "-0.01em" }}>
        {product.name}
      </p>
      <p style={{ position: "relative", marginTop: 6, fontSize: 12, color: "var(--fog)", lineHeight: 1.5 }}>{product.description}</p>
      <span style={{ position: "relative", marginTop: 14, display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600 }}>
        Voir l&apos;offre <ChevronDiagIcon width={12} height={12} style={{ color: "var(--signal)" }} />
      </span>
    </Link>
  );
}
