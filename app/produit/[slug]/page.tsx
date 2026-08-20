import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { ButtonLink } from "@/components/Button";
import { AddToCartPanel } from "@/components/AddToCartPanel";
import { catalogProducts, getProductBySlug } from "@/lib/catalog";
import { CatalogIcon, catalogToneClasses } from "@/components/catalog-icons";

export function generateStaticParams() {
  return catalogProducts.map((p) => ({ slug: p.slug }));
}

export default function CatalogProductPage({ params }: { params: { slug: string } }) {
  const item = getProductBySlug(params.slug);
  if (!item) notFound();

  const t = catalogToneClasses[item.tone];

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={item.category} title={item.name.toUpperCase()} backHref="/premium" showCart />

      <div className="px-5">
        <StepIndicator current={1} />

        <div
          className={`card-glow bounce-in glass-panel relative mt-6 rounded-xl2 border border-panelBorder p-6 ${t.glow}`}
        >
          <div
            className={`icon-halo flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/5 ${t.iconBox}`}
          >
            <CatalogIcon name={item.icon} />
          </div>

          <p className={`mt-5 text-xs font-semibold tracking-widest ${t.category}`}>
            {item.category}
          </p>
          <h2 className="font-display mt-2 text-3xl">{item.name}</h2>

          <div className="mt-5 flex items-end gap-2">
            <span className="font-display text-6xl text-white">{item.priceTotal}€</span>
          </div>
          <p className="mt-1 text-sm text-white/50">{item.priceTotal.toFixed(2)}€ au total</p>

          <ul className="mt-6 space-y-2">
            {item.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-0.5 text-electric-soft">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <AddToCartPanel
              slug={item.slug}
              name={item.name}
              unitPrice={item.priceTotal}
              currency={item.currency}
              ctaClass={t.cta}
            />
            <ButtonLink href="/discord" variant="ghost">
              REJOINDRE LE DISCORD
            </ButtonLink>
          </div>
        </div>

        <p className="mt-6 px-1 text-sm leading-relaxed text-white/50">{item.description}</p>
      </div>
    </main>
  );
}
