import Link from "next/link";
import { GlowCard } from "@/components/GlowCard";
import { siteConfig } from "@/lib/config";
import { catalogToneRgb } from "@/components/catalog-icons";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-16 pt-10">
      {/* ---------- HERO 3D ---------- */}
      <section className="relative text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/produit/pack-basicfit-netflix"
            className="btn-glow-purple rounded-xl px-5 py-3.5 text-[13px] font-bold transition-transform"
          >
            Découvrir l'offre
          </Link>
          <Link
            href="/premium"
            className="rounded-xl border border-panelBorder bg-white/[0.035] px-5 py-3.5 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Explorer KYZEN
          </Link>
        </div>

        <div className="kyzen-orbit-stage mt-6">
          <div className="kyzen-orbit-ring kyzen-orbit-ring--1" />
          <div className="kyzen-orbit-ring kyzen-orbit-ring--2" />
          <span className="kyzen-k-outline">K</span>

          <div className="kyzen-float-badge" style={{ top: "6%", right: "0%" }}>
            <span className="label">Statut</span>
            <span className="value">
              <span className="kyzen-badge-live" /> En ligne
            </span>
          </div>
          <div className="kyzen-float-badge" style={{ bottom: "8%", left: "-2%", animationDelay: "1.5s" }}>
            <span className="label">Collection</span>
            <span className="value">Services Premium</span>
          </div>
          <div className="kyzen-float-badge" style={{ bottom: "0%", right: "2%", animationDelay: "3s" }}>
            <span className="label">Communauté</span>
            <span className="value">Discord KYZEN</span>
          </div>
        </div>

        <h1 className="kyzen-wordmark mt-8 text-white">
          ky<span className="accent">zen</span>
        </h1>

        <p className="relative mx-auto mt-5 max-w-[32ch] text-[14px] leading-[1.7] text-white/50">
          Une expérience simple, rapide et pensée pour accéder à tous les services de KYZEN.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3.5">
          <Link href="/premium" className="kyzen-mini-card">
            <div className="kyzen-mini-icon">✦</div>
            <h2 className="mt-[18px] text-[17px] font-semibold">KYZEN services</h2>
            <span className="kyzen-mini-arrow">→</span>
          </Link>
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noreferrer"
            className="kyzen-mini-card"
          >
            <div className="kyzen-mini-icon">◌</div>
            <h2 className="mt-[18px] text-[17px] font-semibold">Discord</h2>
            <span className="kyzen-mini-arrow">→</span>
          </a>
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
          <MiniFeature icon="⚡" label="Livraison" text="" />
          <MiniFeature icon="✦" label="Qualité" text="" />
          <MiniFeature icon="◆" label="Support" text="" />
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
