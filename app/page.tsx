"use client";

import Link from "next/link";
import Image from "next/image";
import { GlowCard } from "@/components/GlowCard";
import { siteConfig } from "@/lib/config";
import { catalogToneRgb } from "@/components/catalog-icons";
import { useTranslation } from "@/lib/i18n/locale-context";

export default function HomePage() {
  const t = useTranslation();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-16 pt-10">
      {/* ---------- HERO 3D ---------- */}
      <section className="relative text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/produit/pack-basicfit-netflix"
            className="btn-glow-purple rounded-xl px-5 py-3.5 text-[13px] font-bold transition-transform"
          >
            {t("home.cta_discover")}
          </Link>
          <Link
            href="/premium"
            className="rounded-xl border border-panelBorder bg-white/[0.035] px-5 py-3.5 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            {t("home.cta_explore")}
          </Link>
        </div>

        <div className="kyzen-orbit-stage mt-6">
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

      <p className="mt-14 text-center text-[11px] tracking-widest text-white/25">
        © 2026 {siteConfig.brandName} — {t("home.rights")}
      </p>
      <Link
        href="/admin/login"
        className="mt-2 block text-center text-[11px] tracking-widest text-white/15 transition-colors hover:text-white/40"
      >
        {t("home.admin_link")}
      </Link>
    </main>
  );
}
