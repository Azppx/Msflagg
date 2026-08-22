import Link from "next/link";
import { catalogProducts } from "@/lib/catalog";
import { CartHeaderLink } from "@/components/CartHeaderLink";
import { GlowProductCard } from "@/components/GlowProductCard";

export default function PremiumCatalogPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-16 pt-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Retour"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-panelBorder bg-panel/60 text-white/70"
        >
          ←
        </Link>
        <span className="rounded-full border border-electric/40 bg-electric/10 px-3 py-1.5 text-[11px] font-semibold text-electric-soft">
          ● En ligne
        </span>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-electric-soft">
          Catalogue
        </p>
        <h1 className="font-heading mt-2 text-[1.75rem] font-bold leading-tight tracking-tight">
          Vos services, en un accès.
        </h1>
        <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-white/55">
          Choisissez un service, l'accès est livré automatiquement après paiement.
        </p>
      </div>

      <div className="mt-3 flex justify-end">
        <CartHeaderLink />
      </div>

      <div className="mt-4 space-y-[22px]">
        {catalogProducts.map((item, i) => (
          <div key={item.slug}>
            {item.slug === "basic-fit" && <PromoBanner />}
            <GlowProductCard item={item} delay={(i % 5) * 0.4} />
          </div>
        ))}
      </div>
    </main>
  );
}

function PromoBanner() {
  return (
    <div className="sweep-banner relative mb-[22px] overflow-hidden rounded-[24px] border border-accent/50 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent p-5 text-center">
      <p className="text-[11px] font-bold tracking-[2px] text-accent-soft">🔥 OFFRE LIMITÉE</p>
      <p className="mt-2 text-lg font-extrabold leading-snug text-white">
        Achète 2 comptes,
        <br />
        un compte Netflix <span className="text-accent-soft">offert</span> —
        <br />
        seulement <span className="text-2xl">25€</span> !
      </p>
      <p className="mt-1.5 text-xs text-white/50">Offre unique, dans la limite des stocks.</p>
    </div>
  );
}
