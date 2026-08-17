import { PageHeader } from "@/components/PageHeader";
import { reviews } from "@/lib/config";

export default function AvisPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="TÉMOIGNAGES" title="AVIS CLIENTS" backHref="/" />

      <div className="flex flex-col gap-4 px-5">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="card-glow glass-panel rounded-xl2 border border-panelBorder p-5"
          >
            <div className="text-accent" aria-label={`${r.rating} étoiles`}>
              {"★".repeat(r.rating)}
              <span className="text-white/15">{"★".repeat(5 - r.rating)}</span>
            </div>
            <p className="mt-3 text-white/80">« {r.text} »</p>
            <p className="mt-2 text-xs text-white/40">{r.author}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 px-5 text-xs text-white/30">
        Avis de démonstration — remplace le tableau <code>reviews</code> dans{" "}
        <code>lib/config.ts</code> par de vrais avis vérifiés.
      </p>
    </main>
  );
}
