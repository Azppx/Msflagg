import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { product } from "@/lib/config";

export default function ProductPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={product.category} title={product.name.toUpperCase()} backHref="/" />

      <div className="px-5">
        <div className="card-glow-accent relative rounded-xl2 border border-accent/40 bg-panel p-6">
          <span className="absolute -top-3 right-5 rounded-full bg-accent px-3 py-1 text-[11px] font-bold tracking-widest text-black">
            {product.badge}
          </span>

          <p className="text-xs font-semibold tracking-widest text-accent-soft">
            {product.duration.toUpperCase()}
          </p>
          <h2 className="font-display mt-2 text-4xl">{product.duration}</h2>

          <div className="mt-5 flex items-end gap-2">
            <span className="font-display text-6xl text-white">
              {product.priceTotal.toFixed(0)}€
            </span>
          </div>
          <p className="mt-1 text-sm text-white/50">
            {product.priceTotal.toFixed(2)}€ au total
          </p>

          <ul className="mt-6 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-0.5 text-electric-soft">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href="/checkout/informations" variant="primary">
              ACHETER — {product.priceTotal.toFixed(0)}€
            </ButtonLink>
            <ButtonLink href="/discord" variant="ghost">
              REJOINDRE LE DISCORD
            </ButtonLink>
          </div>
        </div>

        <p className="mt-6 px-1 text-sm leading-relaxed text-white/50">
          {product.description}
        </p>
      </div>
    </main>
  );
}
