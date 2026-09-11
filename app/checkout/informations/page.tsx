"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageNav } from "@/components/PageNav";
import { GlassField } from "@/components/GlassField";
import { ArrowRightIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";

export default function InformationsPage() {
  const router = useRouter();
  const { items, totalPrice, hydrated } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || firstName.trim().length < 2 || lastName.trim().length < 2 || !dob) {
      setError("Merci de renseigner tous les champs correctement.");
      return;
    }
    const name = `${firstName.trim()} ${lastName.trim()}`;
    const params = new URLSearchParams({ email, name, dob });
    router.push(`/checkout/paiement?${params.toString()}`);
  }

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Tes informations" />

      <p style={{ marginTop: 20, fontSize: 12.5, color: "var(--signal)", fontWeight: 600 }}>ÉTAPE 2 / 4</p>
      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", marginTop: 6 }}>
        Tes informations
      </h1>

      {hydrated && items.length === 0 && (
        <div className="liquid-glass" style={{ marginTop: 24, textAlign: "center", padding: 28, borderRadius: 22 }}>
          <p style={{ fontSize: 14, color: "var(--fog)" }}>Ton panier est vide.</p>
          <Link
            href="/premium"
            className="liquid-glass liquid-glass--signal"
            style={{ display: "inline-flex", marginTop: 16, padding: "12px 20px", borderRadius: 12, color: "var(--paper)", fontWeight: 600, fontSize: 13.5, textDecoration: "none" }}
          >
            Voir le catalogue
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="liquid-glass liquid-glass--signal" style={{ marginTop: 20, padding: 22, borderRadius: 22 }}>
            <p style={{ fontSize: 13, color: "var(--fog)" }}>Produits sélectionnés</p>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
              {items.map((item) => (
                <div key={item.slug} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13.5 }}>
                  <span style={{ fontWeight: 500 }}>
                    {item.name} {item.quantity > 1 && `×${item.quantity}`}
                  </span>
                  <span style={{ color: "var(--fog)" }}>{(item.unitPrice * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "var(--line)", margin: "12px 0" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: 600 }}>
              <span>Total</span>
              <span style={{ color: "var(--signal)" }}>{totalPrice.toFixed(2)} €</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <GlassField label="PRÉNOM" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ton prénom" autoComplete="given-name" />
              <GlassField label="NOM" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Ton nom" autoComplete="family-name" />
            </div>
            <GlassField label="EMAIL" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ton@email.com" autoComplete="email" inputMode="email" />
            <GlassField label="DATE DE NAISSANCE" type="date" value={dob} onChange={(e) => setDob(e.target.value)} autoComplete="bday" />

            {error && <p style={{ fontSize: 13, color: "var(--ember)", marginTop: -4, marginBottom: 12 }}>{error}</p>}

            <button
              type="submit"
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
                marginTop: 8,
              }}
            >
              Continuer <ArrowRightIcon width={15} height={15} />
            </button>
          </form>
        </>
      )}
    </main>
  );
}
