"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartHeaderLink() {
  const { totalCount, hydrated } = useCart();

  return (
    <Link
      href="/panier"
      aria-label="Voir le panier"
      className="relative mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-panelBorder bg-white/5 text-lg text-white/80 transition-all duration-200 ease-out hover:bg-white/10 active:scale-90"
    >
      🛒
      {hydrated && totalCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-black">
          {totalCount}
        </span>
      )}
    </Link>
  );
}
