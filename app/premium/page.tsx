"use client";

import Link from "next/link";
import { catalogProducts } from "@/lib/catalog";
import { CartHeaderLink } from "@/components/CartHeaderLink";
import { GlowProductCard } from "@/components/GlowProductCard";
import { useTranslation } from "@/lib/i18n/locale-context";

export default function PremiumCatalogPage() {
  const t = useTranslation();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col overflow-x-hidden px-5 pb-16 pt-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Retour"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-panelBorder bg-panel/60 text-white/70"
        >
          ←
        </Link>
        <CartHeaderLink />
      </div>

      <div className="mt-8 text-center">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#bd8aff]">
          KYZEN / SERVICES
        </p>
        <h1 className="mt-3 text-[42px] font-black leading-[0.9] tracking-tight text-white">
          Tout ce dont
          <br />
          <span className="kyzen-stroke-text">tu as besoin.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[34ch] text-[13px] leading-[1.8] text-white/55">
          {t("premium.subtitle")}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3.5">
        {catalogProducts.map((item, i) => (
          <GlowProductCard key={item.slug} item={item} index={i} />
        ))}
      </div>
    </main>
  );
}
