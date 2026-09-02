"use client";

import { ButtonLink } from "@/components/Button";
import { AddToCartPanel } from "@/components/AddToCartPanel";
import { catalogToneRgb } from "@/components/catalog-icons";
import { ProductLogo } from "@/components/ProductLogo";
import { useTranslation } from "@/lib/i18n/locale-context";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductView({ item }: { item: CatalogProduct }) {
  const t = useTranslation();
  const toneRgb = catalogToneRgb[item.tone];

  return (
    <div className="bounce-in">
      {/* ---------- Héro ---------- */}
      <section className="pt-2 text-center">
        <p
          className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
          style={{ color: `rgb(${toneRgb})` }}
        >
          KYZEN / {item.category.toUpperCase()}
        </p>
        <h1 className="mt-3 text-[38px] font-black leading-[0.9] tracking-tight text-white">
          {item.name}.
          <br />
          <span className="kyzen-stroke-text">Notre identité.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[32ch] text-[13px] leading-[1.85] text-white/55">
          {item.description}
        </p>

        <div className="mt-6 flex justify-center">
          <div className="kyzen-tilt-box" style={{ "--tone-rgb": toneRgb } as React.CSSProperties}>
            <span className="badge">EXCLUSIF</span>
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/50">
              KYZEN / {item.category.toUpperCase()}
            </p>
            <div className="flex flex-1 items-center justify-center">
              <ProductLogo logo={item.logo} icon={item.icon} size={72} />
            </div>
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/50">
              ÉDITION 2026
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 01 — Offre ---------- */}
      <section className="mt-12">
        <SectionHead index="01" title="Offre" tag="Disponible maintenant" />

        <div
          className="kyzen-offer-row"
          style={{ "--tone-rgb": toneRgb } as React.CSSProperties}
        >
          <p
            className="text-[9px] font-extrabold uppercase tracking-[0.16em]"
            style={{ color: `rgb(${toneRgb})` }}
          >
            KYZEN / MEILLEURE OFFRE
          </p>
          <h3 className="mt-2.5 text-[24px] font-extrabold leading-tight tracking-tight text-white">
            {item.name}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">{item.description}</p>

          <div className="mt-5 border-t border-white/10 pt-5">
            <p
              className="text-[40px] font-extrabold leading-none tracking-tight text-white"
              style={{ textShadow: `0 0 30px rgba(${toneRgb},0.3)` }}
            >
              {item.priceTotal}€
            </p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/35">
              {t("product.total_label")}
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <AddToCartPanel
                slug={item.slug}
                name={item.name}
                unitPrice={item.priceTotal}
                currency={item.currency}
                ctaClass="text-white"
                ctaStyle={{
                  background: `linear-gradient(180deg, rgb(${toneRgb}), rgba(${toneRgb},0.75))`,
                  boxShadow: `0 18px 40px -12px rgba(${toneRgb},0.55)`,
                }}
              />
              <ButtonLink href="/discord" variant="ghost">
                {t("product.join_discord")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 02 — Détails ---------- */}
      <section className="mt-12">
        <SectionHead index="02" title="Détails" tag="Les avantages" />

        <div className="flex flex-col gap-2.5">
          {item.features.map((f) => (
            <div key={f} className="kyzen-detail-card">
              <div
                className="mb-3 flex h-[37px] w-[37px] items-center justify-center rounded-[10px] border text-[15px]"
                style={{
                  color: `rgb(${toneRgb})`,
                  background: `rgba(${toneRgb},0.08)`,
                  borderColor: `rgba(${toneRgb},0.2)`,
                }}
              >
                ✓
              </div>
              <p className="text-[13px] font-medium leading-snug text-white/75">{f}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 03 — FAQ ---------- */}
      <section className="mt-12 pb-4">
        <SectionHead index="03" title="FAQ" tag="Questions fréquentes" />

        <div className="kyzen-faq">
          <details>
            <summary>Comment je reçois mon produit ?</summary>
            <p>
              Une fois ton virement Wise confirmé, ta commande est vérifiée manuellement puis
              livrée directement sur le site, sous 24h.
            </p>
          </details>
          <details>
            <summary>Comment contacter le support ?</summary>
            <p>
              Via le bouton "Ouvrir un ticket" sur la page Support, ou directement sur notre
              serveur Discord.
            </p>
          </details>
          <details>
            <summary>Quels moyens de paiement sont acceptés ?</summary>
            <p>Le virement bancaire via Wise, avec vérification manuelle avant livraison.</p>
          </details>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ index, title, tag }: { index: string; title: string; tag: string }) {
  return (
    <div className="mb-4 flex items-end justify-between border-b border-[#292033] pb-3">
      <h2 className="text-[19px] font-bold tracking-tight text-white">
        {index} — {title}
      </h2>
      <span className="text-[9px] font-semibold uppercase tracking-widest text-white/35">
        {tag}
      </span>
    </div>
  );
}
