"use client";

import Link from "next/link";
import Image from "next/image";
import { GlowCard } from "@/components/GlowCard";
import { siteConfig, discordConfig } from "@/lib/config";
import { catalogToneRgb } from "@/components/catalog-icons";
import { useTranslation } from "@/lib/i18n/locale-context";

export default function HomePage() {
  const t = useTranslation();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-16 pt-10">
      {/* ---------- HERO ---------- */}
      <section className="relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-electric-soft">
          <span className="kyzen-badge-live" /> Boutique premium
        </span>

        <h1 className="mt-5 text-[40px] font-black leading-[0.95] tracking-tight text-white">
          Bienvenue
          <br />
          chez <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-electric-soft to-electric">KYZEN</span>.
        </h1>

        <p className="mx-auto mt-4 max-w-[30ch] text-[13px] leading-relaxed text-white/55">
          Meilleurs prix. Produits premium. Support 24/7.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/premium"
            className="btn-glow-purple rounded-xl px-5 py-3.5 text-[13px] font-bold transition-transform"
          >
            {t("home.cta_explore")} →
          </Link>
          <a
            href={discordConfig.inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-panelBorder bg-white/[0.035] px-5 py-3.5 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Discord
          </a>
        </div>

        <div className="mx-auto mt-7 grid max-w-[360px] grid-cols-3 gap-2">
          <MiniFeature icon="⚡" title="Instant" subtitle="Livraison digitale" />
          <MiniFeature icon="🛡" title="Sécurisé" subtitle="Paiement protégé" />
          <MiniFeature icon="🎧" title="24/7" subtitle="Support communauté" />
        </div>

        <div className="kyzen-orbit-stage mt-8">
          <div className="kyzen-orbit-ring kyzen-orbit-ring--1" />
          <div className="kyzen-orbit-ring kyzen-orbit-ring--2" />
          <span className="kyzen-k-outline">K</span>

          <div className="kyzen-float-badge" style={{ top: "6%", right: "0%" }}>
            <span className="label">{t("home.status_label")}</span>
            <span className="value">
              <span className="kyzen-badge-live" /> {t("home.status_value")}
            </span>
          </div>
          <div className="kyzen-float-badge" style={{ bottom: "8%", left: "-2%", animationDelay: "1.5s" }}>
            <span className="label">{t("home.collection_label")}</span>
            <span className="value">{t("home.collection_value")}</span>
          </div>
          <div className="kyzen-float-badge" style={{ bottom: "0%", right: "2%", animationDelay: "3s" }}>
            <span className="label">{t("home.community_label")}</span>
            <span className="value">{t("home.community_value")}</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3.5">
          <Link href="/premium" className="kyzen-mini-card">
            <div className="kyzen-mini-icon">
              <Image src="/icons/logo-k.png" alt="KYZEN" width={26} height={26} priority />
            </div>
            <h2 className="mt-[18px] text-[17px] font-semibold">{t("home.card_services")}</h2>
            <span className="kyzen-mini-arrow">→</span>
          </Link>
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noreferrer"
            className="kyzen-mini-card kyzen-mini-card--discord"
          >
            <div className="kyzen-mini-icon">
              <Image src="/icons/discord-mark.png" alt="Discord" width={22} height={22} />
            </div>
            <h2 className="mt-[18px] text-[17px] font-semibold">{t("home.card_discord")}</h2>
            <span className="kyzen-mini-arrow">→</span>
          </a>
        </div>
      </section>

      {/* ---------- OFFRE EN VEDETTE ---------- */}
      <section className="mt-14">
        <p className="text-[22px] font-bold tracking-tight">{t("home.featured_title")}</p>
        <p className="mt-1 text-xs text-white/40">{t("home.featured_subtitle")}</p>

        <Link href="/produit/pack-basicfit-netflix" className="mt-5 block">
          <GlowCard toneRgb={catalogToneRgb.electric} className="text-left">
            <span className="inline-block rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-violet-soft">
              {t("home.best_seller")}
            </span>
            <h3 className="mt-4 text-[28px] font-extrabold leading-[1.05] tracking-tight text-white">
              <span className="text-violet-soft">{t("home.pack1_title_line1")}</span>
              <br />
              {t("home.pack1_title_line2")}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-white/50">{t("home.pack1_desc")}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <p>
                <span className="text-3xl font-extrabold tracking-tight">25€</span>
                <span className="ml-1 text-[11px] text-white/40">{t("home.per_bundle")}</span>
              </p>
              <span className="btn-glow-purple rounded-xl px-4 py-3 text-[12px] font-bold">
                {t("home.order_cta")}
              </span>
            </div>
          </GlowCard>
        </Link>
      </section>

      {/* ---------- 2E PACK ---------- */}
      <section className="mt-8">
        <Link href="/produit/pack-spotify-basicfit-netflix-youtube" className="block">
          <GlowCard toneRgb={catalogToneRgb.violet} className="text-left">
            <span className="inline-block rounded-full border border-violet/30 bg-violet/10 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-violet-soft">
              {t("home.pack_complete")}
            </span>
            <h3 className="mt-4 text-[28px] font-extrabold leading-[1.05] tracking-tight text-white">
              <span className="text-violet-soft">{t("home.pack2_title_line1")}</span>
              <br />
              {t("home.pack2_title_line2")}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-white/50">{t("home.pack2_desc")}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <p>
                <span className="text-3xl font-extrabold tracking-tight">35€</span>
                <span className="ml-1 text-[11px] text-white/40">{t("home.per_bundle")}</span>
              </p>
              <span className="btn-glow-purple rounded-xl px-4 py-3 text-[12px] font-bold">
                {t("home.order_cta")}
              </span>
            </div>
          </GlowCard>
        </Link>
      </section>

      {/* ---------- POURQUOI KYZEN ---------- */}
      <section className="mt-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-panelBorder bg-white/[0.03] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50">
          ✨ Pourquoi nous choisir
        </span>
        <h2 className="mt-4 text-[26px] font-black leading-tight tracking-tight text-white">
          Tout est <span className="text-electric-soft">géré</span> pro.
        </h2>
        <p className="mx-auto mt-2 max-w-[30ch] text-[12.5px] text-white/45">
          Un parcours d'achat clair, une livraison rapide, et un support fiable.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <WhyCard icon="↺" title="Support 24/7" text="Notre équipe répond vite, de façon professionnelle et efficace." />
          <WhyCard icon="💳" title="Paiement sécurisé" text="Le virement Wise est vérifié manuellement avant chaque livraison." />
          <WhyCard icon="🚚" title="Livraison rapide" text="Accès livré directement sur le site après confirmation du paiement." />
        </div>
      </section>

      {/* ---------- BANDEAU DISCORD ---------- */}
      <section className="mt-10">
        <div className="rounded-2xl border border-electric/25 bg-gradient-to-br from-electric/10 via-transparent to-transparent p-7 text-center">
          <h3 className="text-[20px] font-extrabold tracking-tight text-white">
            Rejoins la <span className="text-electric-soft">communauté</span> Discord
          </h3>
          <p className="mx-auto mt-2 max-w-[28ch] text-[12px] text-white/50">
            Retrouve les annonces, le support et les membres KYZEN.
          </p>
          <a
            href={discordConfig.inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-glow-purple mt-5 inline-block rounded-xl px-6 py-3.5 text-[13px] font-bold"
          >
            Rejoindre le Discord
          </a>
        </div>
      </section>

      <footer className="mt-14 border-t border-panelBorder pt-8 text-center">
        <p className="text-[11px] leading-relaxed text-white/35">
          Produits premium. Livraison instantanée après vérification.
          <br />
          Support disponible 24/7.
        </p>
        <p className="mt-6 text-center text-[11px] tracking-widest text-white/25">
          © 2026 {siteConfig.brandName} — {t("home.rights")}
        </p>
        <Link
          href="/admin/login"
          className="mt-2 block text-center text-[11px] tracking-widest text-white/15 transition-colors hover:text-white/40"
        >
          {t("home.admin_link")}
        </Link>
      </footer>
    </main>
  );
}

function WhyCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-panelBorder bg-white/[0.025] p-5 text-left">
      <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-electric/25 bg-electric/10 text-lg text-electric-soft">
        {icon}
      </div>
      <p className="mt-3.5 text-[14px] font-bold text-white">{title}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-white/45">{text}</p>
    </div>
  );
}

function MiniFeature({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-panelBorder bg-white/[0.025] px-2.5 py-3.5 text-center">
      <p className="text-base leading-none">{icon}</p>
      <p className="mt-2 text-[11px] font-bold text-white">{title}</p>
      <p className="mt-0.5 text-[9.5px] leading-snug text-white/40">{subtitle}</p>
    </div>
  );
}
