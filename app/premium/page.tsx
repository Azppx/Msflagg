import Link from "next/link";
import { catalogProducts } from "@/lib/catalog";
import { CatalogIcon, catalogToneClasses, catalogToneRgb } from "@/components/catalog-icons";
import { CartHeaderLink } from "@/components/CartHeaderLink";

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
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-widest text-electric-soft">
            PULSE · PREMIUM
          </p>
          <h1 className="font-display text-2xl">Service Premium</h1>
        </div>
        <CartHeaderLink />
      </div>

      <div className="mt-8 space-y-5">
        {catalogProducts.map((item) => {
          const t = catalogToneClasses[item.tone];
          return (
            <Link
              key={item.slug}
              href={`/produit/${item.slug}`}
              className="pulse-card glass-panel group block border border-panelBorder"
              style={
                {
                  "--tone-rgb": catalogToneRgb[item.tone],
                  "--tone-hover-border": `rgba(${catalogToneRgb[item.tone]},0.4)`,
                } as React.CSSProperties
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`pulse-logo flex h-[60px] w-[60px] items-center justify-center ${t.iconBox}`}
                >
                  <CatalogIcon name={item.icon} />
                </div>
                <span className="pulse-badge">
                  <span className="dot" />
                  {item.priceTotal} €
                </span>
              </div>

              <p className={`mt-5 text-xs font-bold uppercase tracking-widest ${t.category}`}>
                {item.category}
              </p>
              <h2 className="font-display mt-1.5 text-[1.7rem] leading-tight tracking-tight">
                {item.name}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-white/55">{item.description}</p>

              <span className="pulse-explore mt-5 inline-flex items-center text-[0.95rem] font-bold text-white/80 group-hover:text-white">
                Explorer
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
