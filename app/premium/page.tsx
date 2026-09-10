"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductIcon } from "@/components/ProductIcon";
import { PRODUCTS, type ProductCategory } from "@/lib/catalog";

const FILTERS: { key: ProductCategory | "all"; label: string; icon: string }[] = [
  { key: "all", label: "Tout", icon: "sparkle" },
  { key: "streaming", label: "Streaming", icon: "film" },
  { key: "musique", label: "Musique", icon: "music" },
  { key: "gaming", label: "Gaming", icon: "gamepad" },
  { key: "ia", label: "IA", icon: "sparkle" },
];

export default function CataloguePage() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <section style={{ marginTop: 8 }}>
        <p style={{ fontSize: 12.5, color: "var(--signal)", fontWeight: 600 }}>Catalogue complet</p>
        <h1 className="font-display" style={{ fontWeight: 700, fontSize: 36, letterSpacing: "-0.02em", marginTop: 6, lineHeight: 1.02 }}>
          Tous les accès,
          <br />
          un seul endroit.
        </h1>
        <p style={{ marginTop: 10, fontSize: 14, color: "var(--fog)", maxWidth: "34ch", lineHeight: 1.6 }}>
          25+ services premium, livrés automatiquement après paiement.
        </p>
      </section>

      <div style={{ marginTop: 24, display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={active ? "liquid-glass liquid-glass--signal" : "liquid-glass"}
              style={{
                flex: "0 0 auto",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                color: active ? "var(--paper)" : "var(--fog)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <ProductIcon name={f.icon} width={13} height={13} />
              {f.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
