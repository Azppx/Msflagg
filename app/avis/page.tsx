import { PageNav } from "@/components/PageNav";
import { StarIcon } from "@/components/icons";

const REVIEWS = [
  { rating: 5, text: "Livraison en 3 minutes, compte Spotify nickel. Je recommande.", author: "T. — client vérifié" },
  { rating: 5, text: "Super service, support Discord hyper réactif quand j'ai eu un souci.", author: "M. — client vérifié" },
  { rating: 4, text: "Bon rapport qualité prix sur le pack Netflix, rien à redire.", author: "L. — client vérifié" },
  { rating: 5, text: "Deuxième commande, toujours aussi rapide et fiable.", author: "K. — client vérifié" },
];

export default function ReviewsPage() {
  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Avis clients" />

      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", marginTop: 24 }}>
        Ce qu&apos;ils en pensent
      </h1>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        {REVIEWS.map((r, i) => (
          <div key={i} className="liquid-glass" style={{ padding: 20, borderRadius: 20 }}>
            <div style={{ display: "flex", gap: 3, color: "var(--gold)" }}>
              {Array.from({ length: 5 }).map((_, s) => (
                <StarIcon key={s} width={14} height={14} style={{ opacity: s < r.rating ? 1 : 0.2 }} />
              ))}
            </div>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: "var(--paper)" }}>« {r.text} »</p>
            <p style={{ marginTop: 10, fontSize: 12, color: "var(--fog)" }}>{r.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
