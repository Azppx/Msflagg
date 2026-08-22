import Link from "next/link";
import { GlowCard } from "@/components/GlowCard";
import { ServiceCard } from "@/components/ServiceCard";
import { siteConfig } from "@/lib/config";
import { catalogToneRgb } from "@/components/catalog-icons";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-16 pt-10">
      {/* ---------- HERO ---------- */}
      <section className="relative text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/4 rounded-full blur-[8px]"
          style={{ background: "radial-gradient(circle, rgba(139,53,255,.22), transparent 68%)" }}
        />

        <span className="relative inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-white/80">
          <span className="kyzen-badge-live" />
          KYZEN • SERVICES PREMIUM
        </span>

        <h1 className="relative mt-6 text-[56px] font-[850] leading-[0.88] tracking-tighter text-white">
          Simple.
          <br />
          <span className="text-kyzen-gradient">Premium.</span>
          <br />
          KYZEN.
        </h1>

        <p className="relative mx-auto mt-5 max-w-[32ch] text-[14px] leading-[1.7] text-white/50">
          Découvre les services KYZEN, nos offres et notre communauté. Une expérience rapide,
          élégante et pensée pour rester minimaliste.
        </p>

        <div className="relative mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/produit/pack-basicfit-netflix"
            className="btn-glow-purple rounded-xl px-5 py-3.5 text-[13px] font-bold transition-transform"
          >
            Voir l'offre
          </Link>
          <Link
            href="/premium"
            className="rounded-xl border border-panelBorder bg-white/[0.035] px-5 py-3.5 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Nos services
          </Link>
        </div>
      </section>

      {/* ---------- OFFRE EN VEDETTE ---------- */}
      <section className="mt-14">
        <p className="text-[22px] font-bold tracking-tight">Offre en vedette</p>
        <p className="mt-1 text-xs text-white/40">Le bundle KYZEN du moment</p>

        <Link href="/produit/pack-basicfit-netflix" className="mt-5 block">
          <GlowCard toneRgb={catalogToneRgb.electric} className="text-left">
            <span className="inline-block rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-violet-soft">
              ★ BEST SELLER
            </span>
            <h3 className="mt-4 text-[28px] font-extrabold leading-[1.05] tracking-tight text-white">
              <span className="text-violet-soft">BASIC FIT</span>
              <br />
              25€ avec 2 comptes Netflix offerts
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-white/50">
              1 compte Basic-Fit Ultimate + 2 comptes Netflix Premium 4K, en pack, livraison
              immédiate après paiement.
            </p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <p>
                <span className="text-3xl font-extrabold tracking-tight">25€</span>
                <span className="ml-1 text-[11px] text-white/40">/ bundle</span>
              </p>
              <span className="btn-glow-purple rounded-xl px-4 py-3 text-[12px] font-bold">
                Commander →
              </span>
            </div>
          </GlowCard>
        </Link>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <MiniFeature icon="⚡" label="Livraison" text="Traitement rapide" />
          <MiniFeature icon="✦" label="Qualité" text="Présentation premium" />
          <MiniFeature icon="◆" label="Support" text="Assistance dispo" />
        </div>
      </section>

      {/* ---------- SERVICES KYZEN ---------- */}
      <section className="mt-14">
        <p className="text-[22px] font-bold tracking-tight">Services KYZEN</p>
        <p className="mt-1 text-xs text-white/40">Tout ce dont tu as besoin, au même endroit.</p>

        <div className="mt-5 flex flex-col gap-5">
          <ServiceCard
            href="/premium"
            accent="electric"
            eyebrow="Catalogue"
            title="Services KYZEN"
            description="Retrouve ici tous les services, offres et produits disponibles chez KYZEN."
            icon={<LightningIcon />}
          />
          <ServiceCard
            href="/support"
            accent="electric"
            eyebrow="Assistance"
            title="Support"
            description="Une question sur une commande ou un service ? Contacte facilement notre support."
            icon={<SupportIcon />}
          />
          <ServiceCard
            href="/discord"
            accent="electric"
            eyebrow="Communauté"
            title="Discord"
            description="Rejoins le serveur KYZEN pour les annonces, nouveautés, offres et communauté."
            icon={<DiscordGlyphIcon />}
          />
        </div>
      </section>

      {/* ---------- POURQUOI KYZEN ---------- */}
      <section className="mt-14">
        <p className="text-[22px] font-bold tracking-tight">Pourquoi KYZEN ?</p>
        <p className="mt-1 text-xs text-white/40">Une interface simple, sans surcharge.</p>

        <div className="mt-5 flex flex-col gap-5">
          <ServiceCard
            href="/premium"
            accent="electric"
            eyebrow="Design"
            title="Minimaliste"
            description="Une identité sombre et violette avec des effets glow subtils pour garder une interface propre."
            icon={<DiamondIcon />}
          />
          <ServiceCard
            href="/premium"
            accent="electric"
            eyebrow="Expérience"
            title="Immersif"
            description="Profondeur, halos lumineux, particules et interactions pour une sensation premium."
            icon={<CubeIcon />}
          />
          <ServiceCard
            href="/premium"
            accent="electric"
            eyebrow="Partout"
            title="Responsive"
            description="Le design s'adapte automatiquement au téléphone, à la tablette et à l'ordinateur."
            icon={<ArrowIcon />}
          />
        </div>
      </section>

      <p className="mt-14 text-center text-[11px] tracking-widest text-white/25">
        © 2026 {siteConfig.brandName} — TOUS DROITS RÉSERVÉS
      </p>
      <Link
        href="/admin/login"
        className="mt-2 block text-center text-[11px] tracking-widest text-white/15 transition-colors hover:text-white/40"
      >
        Admin
      </Link>
    </main>
  );
}

function MiniFeature({ icon, label, text }: { icon: string; label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-panelBorder bg-white/[0.025] p-3.5">
      <p className="text-[13px] font-bold text-white">
        {icon} {label}
      </p>
      <p className="mt-1 text-[10.5px] leading-snug text-white/45">{text}</p>
    </div>
  );
}

function LightningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v.01M12 8a2.5 2.5 0 0 1 2.5 2.5c0 1.5-2.5 2-2.5 3.5" strokeLinecap="round" />
    </svg>
  );
}
function DiscordGlyphIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
      <path
        d="M7 5c3.3-1 6.7-1 10 0l1 4c1 3 1 6-.5 9-1.5-1-2.5-2-2.5-2s-1.5 1-3 1-3-1-3-1-1 1-2.5 2C5 18 5 15 6 12l1-7z"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="12" r="1.1" fill="white" stroke="none" />
      <circle cx="15" cy="12" r="1.1" fill="white" stroke="none" />
    </svg>
  );
}
function DiamondIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
      <path d="M3 9l4-6h10l4 6-11 12L3 9z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function CubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" strokeLinejoin="round" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
