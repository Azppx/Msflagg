"use client";

import { PageHeader } from "@/components/PageHeader";
import { reviews } from "@/lib/config";
import { useTranslation } from "@/lib/i18n/locale-context";

export default function AvisPage() {
  const t = useTranslation();

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16 sm:max-w-2xl lg:max-w-4xl">
      <PageHeader eyebrow={t("reviews.eyebrow")} title={t("reviews.title")} backHref="/" />

      <div className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-2">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="card-glow glass-panel rounded-xl2 border border-panelBorder p-5"
          >
            <div className="text-accent" aria-label={`${r.rating} ${t("reviews.stars_label")}`}>
              {"★".repeat(r.rating)}
              <span className="text-white/15">{"★".repeat(5 - r.rating)}</span>
            </div>
            <p className="mt-3 text-white/80">« {r.text} »</p>
            <p className="mt-2 text-xs text-white/40">{r.author}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 px-5 text-xs text-white/30">
        {t("reviews.demo_note_1")} <code>reviews</code> {t("reviews.demo_note_2")}{" "}
        <code>lib/config.ts</code> {t("reviews.demo_note_3")}
      </p>
    </main>
  );
}
