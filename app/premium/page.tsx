import Link from "next/link";
import { catalogProducts } from "@/lib/catalog";
import { CartHeaderLink } from "@/components/CartHeaderLink";
import { GlowProductCard } from "@/components/GlowProductCard";

export default function PremiumCatalogPage() {
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

      <div className="mt-6 flex flex-col">
        {catalogProducts.map((item, i) => (
          <FloatingCard key={item.slug} index={i}>
            <GlowProductCard item={item} delay={(i % 5) * 0.4} />
          </FloatingCard>
        ))}
      </div>
    </main>
  );
}

// Décalage horizontal + légère rotation, différents pour chaque carte, pour
// casser l'alignement rigide en liste et donner une sensation de flottement.
const SCATTER = [
  { x: 0, rot: -1.4, mt: 0 },
  { x: 18, rot: 1.1, mt: -6 },
  { x: -14, rot: -0.9, mt: -4 },
  { x: 10, rot: 1.6, mt: -8 },
  { x: -20, rot: -1.3, mt: -2 },
  { x: 6, rot: 0.8, mt: -6 },
];

function FloatingCard({ index, children }: { index: number; children: React.ReactNode }) {
  const s = SCATTER[index % SCATTER.length];
  return (
    <div
      className="relative"
      style={{
        transform: `translateX(${s.x}px) rotate(${s.rot}deg)`,
        marginTop: index === 0 ? 0 : `${22 + s.mt}px`,
      }}
    >
      {children}
    </div>
  );
}
