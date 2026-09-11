"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductIcon } from "@/components/ProductIcon";
import { PageNav } from "@/components/PageNav";
import { BoltIcon, CartIcon, DiscordIcon, HeadsetIcon, MinusIcon, PlusIcon, ShieldIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/catalog";

const FEATURE_ICONS = [BoltIcon, HeadsetIcon, ShieldIcon];

export function ProductView({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    addItem({ slug: product.slug, name: product.name, unitPrice: product.price, currency: "EUR" }, quantity);
    router.push("/panier");
  }

  return (
    <>
      <PageNav title={product.name} />

      <div style={{ position: "relative", height: 240, margin: "12px 0 0", display: "flex", alignItems: "center", justifyContent: "center", perspective: 1000 }}>
        <div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(157,92,255,0.4), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="product-badge-3d liquid-glass" style={{ color: product.tone }}>
          <ProductIcon name={product.icon} width={62} height={62} />
        </div>
      </div>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--signal)", letterSpacing: "0.04em" }}>{product.categoryLabel}</p>
        <h1 className="font-display" style={{ fontWeight: 700, fontSize: 34, letterSpacing: "-0.02em", marginTop: 6 }}>{product.name}</h1>
        <p style={{ marginTop: 12, fontSize: 14.5, color: "var(--fog)", lineHeight: 1.65, maxWidth: "36ch", marginLeft: "auto", marginRight: "auto" }}>
          {product.description}
        </p>
      </div>

      <div style={{ marginTop: 28, textAlign: "center" }}>
        <p className="font-display" style={{ fontWeight: 700, fontSize: 52, letterSpacing: "-0.02em" }}>
          {product.price}€<sup style={{ fontSize: 16, color: "var(--fog)", fontWeight: 500 }}> au total</sup>
        </p>
      </div>

      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14 }}>
        {product.features.map((feature, i) => {
          const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
          return (
            <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span
                className="liquid-glass"
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--signal)",
                }}
              >
                <Icon width={13} height={13} />
              </span>
              <span style={{ fontSize: 14, color: "var(--paper)", paddingTop: 2 }}>{feature}</span>
            </div>
          );
        })}
      </div>

      <div
        className="liquid-glass"
        style={{
          marginTop: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          borderRadius: 18,
        }}
      >
        <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--fog)" }}>Quantité</span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <QtyButton onClick={() => setQuantity((q) => Math.max(1, q - 1))} ariaLabel="Diminuer">
            <MinusIcon width={13} height={13} />
          </QtyButton>
          <span className="font-display" style={{ fontWeight: 700, fontSize: 16, minWidth: 20, textAlign: "center" }}>{quantity}</span>
          <QtyButton onClick={() => setQuantity((q) => q + 1)} ariaLabel="Augmenter">
            <PlusIcon width={13} height={13} />
          </QtyButton>
        </div>
      </div>

      <div style={{ position: "sticky", bottom: 16, marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={handleAddToCart}
          className="liquid-glass liquid-glass--signal"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: 16,
            fontSize: 15,
            fontWeight: 600,
            color: "var(--paper)",
            borderRadius: 14,
            cursor: "pointer",
          }}
        >
          Ajouter au panier <CartIcon width={16} height={16} />
        </button>
        <a
          href="https://discord.gg/"
          target="_blank"
          rel="noreferrer"
          className="liquid-glass"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: 14,
            fontSize: 14.5,
            fontWeight: 600,
            color: "var(--paper)",
            borderRadius: 14,
            textDecoration: "none",
          }}
        >
          <DiscordIcon width={15} height={15} style={{ color: "var(--signal)" }} /> Rejoindre le Discord
        </a>
      </div>
    </>
  );
}

function QtyButton({ children, onClick, ariaLabel }: { children: React.ReactNode; onClick: () => void; ariaLabel: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="liquid-glass"
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        color: "var(--paper)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
