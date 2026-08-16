import { ServiceCard } from "@/components/ServiceCard";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { siteConfig, product } from "@/lib/config";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-16 pt-12">
      <ServicesCarousel />

      <div className="mt-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-electric-soft">
          ✦ EXPLORE
        </span>
        <h1 className="font-display mt-6 text-5xl tracking-tight text-white">
          {siteConfig.brandTagline}
        </h1>
        <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-electric to-transparent" />
      </div>

      <div className="mt-10 flex flex-col gap-6 animate-fadeUp">
        <ServiceCard
          href={`/produit`}
          accent="accent"
          title={product.name}
          subtitle={`${product.duration} · ${product.priceTotal.toFixed(0)}€ au total`}
          icon={<DumbbellIcon />}
        />
        <ServiceCard
          href="/avis"
          accent="electric"
          title="Avis Clients"
          subtitle="Consultez les retours clients"
          icon={<StarIcon />}
        />
        <ServiceCard
          href="/discord"
          accent="electric"
          title="Discord"
          subtitle="Rejoindre notre communauté"
          icon={<DiscordIcon />}
        />
        <ServiceCard
          href="/support"
          accent="danger"
          title="Support"
          subtitle="Besoin d'aide ? Contactez-nous"
          icon={<SupportIcon />}
        />
      </div>

      <p className="mt-12 text-center text-[11px] tracking-widest text-white/25">
        {siteConfig.brandName} — PLATEFORME INDÉPENDANTE
      </p>
    </main>
  );
}

function DumbbellIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path
        d="M4 9v6M2 10v4M20 9v6M22 10v4M7 8.5v7M17 8.5v7M7 12h10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LightningIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function DiscordIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <circle cx="9" cy="12" r="1.2" fill="white" stroke="none" />
      <circle cx="15" cy="12" r="1.2" fill="white" stroke="none" />
      <path d="M7 5c3.3-1 6.7-1 10 0l1 4c1 3 1 6-.5 9-1.5-1-2.5-2-2.5-2s-1.5 1-3 1-3-1-3-1-1 1-2.5 2C5 18 5 15 6 12l1-7z" strokeLinejoin="round" />
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v.01M12 8a2.5 2.5 0 0 1 2.5 2.5c0 1.5-2.5 2-2.5 3.5" strokeLinecap="round" />
    </svg>
  );
}
