"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { Button } from "@/components/Button";
import { product } from "@/lib/config";
import { getProductBySlug } from "@/lib/catalog";
import { catalogToneClasses } from "@/components/catalog-icons";

export default function InformationsPage() {
  return (
    <Suspense fallback={null}>
      <InformationsContent />
    </Suspense>
  );
}

function InformationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemSlug = searchParams.get("item");
  const catalogItem = getProductBySlug(itemSlug);
  const displayName = catalogItem ? catalogItem.name : product.name;
  const displayDuration = catalogItem ? catalogItem.category : product.duration;
  const ctaClass = catalogItem ? catalogToneClasses[catalogItem.tone].cta : "";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || name.trim().length < 2) {
      setError("Merci de renseigner un nom et un email valides.");
      return;
    }
    const params = new URLSearchParams({ email, name });
    if (itemSlug) params.set("item", itemSlug);
    router.push(`/checkout/paiement?${params.toString()}`);
  }

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader
        eyebrow="ÉTAPE 2 / 4"
        title="TES INFORMATIONS"
        backHref={catalogItem ? `/produit/${catalogItem.slug}` : "/produit"}
      />

      <div className="px-5">
        <StepIndicator current={2} />

        <div className="glass-panel mt-6 rounded-xl2 border border-panelBorder p-4">
          <p className="text-sm text-white/50">Produit sélectionné</p>
          <p className="mt-1 font-semibold">{displayName} — {displayDuration}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/50">
              NOM
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-panelBorder bg-white/5 px-4 py-3.5 text-base outline-none focus:border-electric"
              placeholder="Ton nom"
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/50">
              EMAIL
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-panelBorder bg-white/5 px-4 py-3.5 text-base outline-none focus:border-electric"
              placeholder="ton@email.com"
              autoComplete="email"
              inputMode="email"
            />
          </label>

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button
            type="submit"
            variant={catalogItem ? "custom" : "primary"}
            className={`mt-2 ${ctaClass}`}
          >
            CONTINUER →
          </Button>
        </form>
      </div>
    </main>
  );
}

