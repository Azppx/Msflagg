"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductIcon } from "@/components/ProductIcon";
import { ArrowLeftIcon, ArrowRightIcon, CartIcon, CloseIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import { getProductBySlug } from "@/lib/catalog";

export default function CartPage() {
  const router = useRouter();
  const { items, hydrated, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <nav
        className="liquid-glass liquid-glass--signal"
        style={{
          position: "sticky",
          top: 12,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderRadius: 20,
          marginBottom: 12,
        }}
      >
        <button
          onClick={() => router.back()}
          aria-label="Retour"
          className="liquid-glass"
          style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fog)", cursor: "pointer" }}
        >
          <ArrowLeftIcon width={16} height={16} />
        </button>
        <p className="font-display" style={{ fontWeight: 700, fontSize: 16 }}>Panier</p>
        <div style={{ width: 38 }} />
      </nav>

      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 30, letterSpacing: "-0.02em", marginTop: 20 }}>Ton panier</h1>
      <p style={{ marginTop: 6, fontSize: 13.5, color: "var(--fog)" }}>
        {hydrated ? `${items.length} article${items.length > 1 ? "s" : ""} sélectionné${items.length > 1 ? "s" : ""}` : "Chargement…"}
      </p>

      {hydrated && items.length === 0 && (
        <div className="liquid-glass" style={{ marginTop: 40, textAlign: "center", padding: 32, borderRadius: 24 }}>
          <div
            className="liquid-glass"
            style={{
              width: 64,
              height: 64,
              margin: "0 auto",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--signal)",
            }}
          >
            <CartIcon width={26} height={26} />
          </div>
          <p className="font-display" style={{ fontWeight: 700, fontSize: 18, marginTop: 18 }}>Ton panier est vide</p>
          <p style={{ fontSize: 13.5, color: "var(--fog)", marginTop: 6 }}>Ajoute des produits depuis le catalogue.</p>
          <Link
            href="/premium"
            className="liquid-glass liquid-glass--signal"
            style={{
              display: "inline-flex",
              marginTop: 20,
              padding: "12px 22px",
              borderRadius: 12,
              color: "var(--paper)",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Voir le catalogue
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item) => {
              const catalogItem = getProductBySlug(item.slug);
              return (
                <div key={item.slug} className="liquid-glass" style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 20 }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.95)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 11,
                      color: "#221a33",
                    }}
                  >
                    {catalogItem && <ProductIcon name={catalogItem.icon} width={24} height={24} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 14.5 }}>{item.name}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        aria-label="Diminuer"
                        className="liquid-glass"
                        style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--paper)", cursor: "pointer" }}
                      >
                        <MinusIcon width={10} height={10} />
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 600, minWidth: 14, textAlign: "center" }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        aria-label="Augmenter"
                        className="liquid-glass"
                        style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--paper)", cursor: "pointer" }}
                      >
                        <PlusIcon width={10} height={10} />
                      </button>
                      <span style={{ fontSize: 12.5, color: "var(--fog)" }}>
                        {(item.unitPrice * item.quantity).toFixed(2)} {item.currency}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.slug)}
                    aria-label={`Retirer ${item.name}`}
                    style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,107,74,0.1)", border: "1px solid rgba(255,107,74,0.3)", color: "var(--ember)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  >
                    <CloseIcon width={13} height={13} />
                  </button>
                </div>
              );
            })}
          </div>

          <div
            className="liquid-glass liquid-glass--signal"
            style={{ marginTop: 28, padding: 24, borderRadius: 24, boxShadow: "0 20px 50px -26px rgba(157,92,255,0.5)" }}
          >
            <Row label="Sous-total" value={`${totalPrice.toFixed(2)} €`} />
            <Row label="Frais" value="0,00 €" />
            <div style={{ height: 1, background: "var(--line)", margin: "16px 0" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>Total</span>
              <span className="font-display" style={{ fontWeight: 700, fontSize: 26, color: "var(--signal)" }}>{totalPrice.toFixed(2)} €</span>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <Link
              href="/checkout/informations"
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
                textDecoration: "none",
              }}
            >
              Passer commande <ArrowRightIcon width={15} height={15} />
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13.5, color: "var(--fog)", marginTop: 6 }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
