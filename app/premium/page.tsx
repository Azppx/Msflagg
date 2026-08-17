import Link from "next/link";
import { catalogProducts } from "@/lib/catalog";
import { CatalogIcon, catalogToneClasses } from "@/components/catalog-icons";

export default function PremiumCatalogPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-16 pt-12">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="Retour"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-panelBorder bg-panel/60 text-white/70"
        >
          ←
        </Link>
        <div>
          <p className="text-xs font-semibold tracking-widest text-electric-soft">
            PULSE · PREMIUM
          </p>
          <h1 className="font-display text-2xl">Service Premium</h1>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {catalogProducts.map((item) => {
          const t = catalogToneClasses[item.tone];
          return (
            <div
              key={item.slug}
              className={`card-glow relative rounded-xl2 border border-panelBorder bg-panel/70 p-6 ${t.glow}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`icon-halo flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/5 ${t.iconBox}`}
                >
                  <CatalogIcon name={item.icon} />
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide ${t.pill}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                  {item.priceTotal} €
                </span>
              </div>

              <p className={`mt-5 text-xs font-semibold tracking-widest ${t.category}`}>
                {item.category}
              </p>
              <h2 className="font-display mt-1 text-2xl">{item.name}</h2>
              <p className="mt-2 text-sm text-white/50">{item.description}</p>

              <Link
                href={`/produit/${item.slug}`}
                className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white`}
              >
                Explorer <span aria-hidden>↗</span>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
