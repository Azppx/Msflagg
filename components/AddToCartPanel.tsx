"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useCart } from "@/lib/cart-context";

export function AddToCartPanel({
  slug,
  name,
  unitPrice,
  currency,
  ctaClass,
}: {
  slug: string;
  name: string;
  unitPrice: number;
  currency: string;
  ctaClass?: string;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem({ slug, name, unitPrice, currency }, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  function handleBuyNow() {
    addItem({ slug, name, unitPrice, currency }, quantity);
    router.push("/panier");
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest text-white/50">QUANTITÉ</span>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </div>

      <button
        onClick={handleBuyNow}
        className={`w-full rounded-2xl px-6 py-4 text-sm font-bold tracking-wide text-black transition-all duration-300 ${
          ctaClass || "bg-accent hover:bg-accent-soft"
        }`}
      >
        ACHETER — {(unitPrice * quantity).toFixed(2)}€
      </button>

      <button
        onClick={handleAdd}
        className="w-full rounded-2xl border border-panelBorder bg-white/5 px-6 py-3.5 text-sm font-semibold tracking-wide text-white/80 transition-colors hover:bg-white/10"
      >
        {justAdded ? "AJOUTÉ AU PANIER ✓" : "+ AJOUTER AU PANIER"}
      </button>
    </div>
  );
}
