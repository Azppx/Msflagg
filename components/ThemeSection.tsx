import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ProductIcon } from "@/components/ProductIcon";
import { CATEGORY_META, formatPrice, type Product, type ProductCategory } from "@/lib/catalog";

export function ThemeSection({ category, products }: { category: ProductCategory; products: Product[] }) {
  const meta = CATEGORY_META[category];

  return (
    <Reveal className="theme-section">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          className="liquid-glass"
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            padding: 11,
            color: "var(--signal)",
            background: meta.tint,
            borderTopColor: meta.border,
            boxShadow: `0 0 24px -6px ${meta.glow}`,
          }}
        >
          <ProductIcon name={meta.icon} width={22} height={22} />
        </div>
        <div>
          <p className="font-display" style={{ fontWeight: 700, fontSize: 21, letterSpacing: "-0.01em" }}>{meta.label}</p>
          <p style={{ fontSize: 12, color: "var(--fog)", marginTop: 1 }}>{meta.sub}</p>
        </div>
      </div>

      <div style={{ marginTop: 16, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${meta.border}, transparent)` }} />

      <div className="theme-rail" style={{ marginTop: 18 }}>
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/produit/${p.slug}`}
            className="theme-card liquid-glass"
            style={{ borderTopColor: meta.border }}
          >
            <div className="theme-card-logo">
              <ProductIcon name={p.icon} width={20} height={20} />
            </div>
            <p className="theme-card-name">{p.name}</p>
            <p className="theme-card-price">{formatPrice(p)}</p>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
