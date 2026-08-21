import { PageHeader } from "@/components/PageHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { ButtonLink } from "@/components/Button";
import { AddToCartPanel } from "@/components/AddToCartPanel";
import { GlowCard } from "@/components/GlowCard";
import { product } from "@/lib/config";

const ACCENT_RGB = "255,138,0";

export default function ProductPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={product.category} title={product.name.toUpperCase()} backHref="/" showCart />

      <div className="px-5">
        <StepIndicator current={1} />

        <GlowCard toneRgb={ACCENT_RGB} particles className="bounce-in mt-6">
          <span className="absolute -top-3 right-5 rounded-full bg-accent px-3 py-1 text-[11px] font-bold tracking-widest text-black">
            {product.badge}
          </span>

          <p
            className="text-xs font-bold tracking-[3px] text-accent-soft"
            style={{ textShadow: "0 0 12px rgba(255,138,0,0.5)" }}
          >
            {product.duration.toUpperCase()}
          </p>
          <h2 className="mt-2 text-[1.9rem] font-extrabold leading-tight tracking-tight text-white">
            {product.duration}
          </h2>

          <p
            className="mt-5 text-[46px] font-extrabold leading-none text-white"
            style={{ textShadow: "0 0 30px rgba(255,138,0,0.35)" }}
          >
            {product.priceTotal.toFixed(0)}€
          </p>
          <p className="mb-6 mt-2 text-sm font-medium text-white/45">
            {product.priceTotal.toFixed(2)}€ au total
          </p>

          <div className="flex flex-col gap-4">
            {product.features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent text-[13px] text-accent-soft shadow-[0_0_10px_rgba(255,138,0,0.35)]">
                  ✓
                </span>
                <span className="text-sm font-medium text-white/70">{f}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <AddToCartPanel
              slug={product.slug}
              name={`${product.name} — ${product.duration}`}
              unitPrice={product.priceTotal}
              currency={product.currency}
            />
            <ButtonLink href="/discord" variant="ghost">
              REJOINDRE LE DISCORD
            </ButtonLink>
          </div>
        </GlowCard>

        <p className="mt-6 px-1 text-sm leading-relaxed text-white/50">{product.description}</p>
      </div>
    </main>
  );
}
