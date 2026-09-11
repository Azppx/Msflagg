import Link from "next/link";
import { ThemeSection } from "@/components/ThemeSection";
import { ArrowRightIcon, BoltIcon, DiscordIcon, HeadsetIcon, PackageIcon, StarIcon } from "@/components/icons";
import { getProductsByCategory } from "@/lib/catalog";

export default function HomePage() {
  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      {/* ---------- Hero ---------- */}
      <section style={{ marginTop: 8 }}>
        <div className="hero-stage">
          <div className="ring ring--2" />
          <div className="ring ring--1">
            <span className="ring-dot" />
          </div>
          <div className="orb" />
          <div className="hero-floating-badge hero-floating-badge--1 liquid-glass" style={{ borderRadius: 12 }}>
            <BoltIcon width={13} height={13} style={{ color: "var(--signal)" }} /> <b>En ligne</b>
          </div>
          <div className="hero-floating-badge hero-floating-badge--2 liquid-glass" style={{ borderRadius: 12 }}>
            <PackageIcon width={13} height={13} style={{ color: "var(--signal)" }} /> Livraison &lt;10min
          </div>
        </div>

        <p style={{ marginTop: 8, fontSize: 13, color: "var(--fog)", fontWeight: 500 }}>
          Accès instantané · <b style={{ color: "var(--signal)", fontWeight: 600 }}>200+ membres actifs</b>
        </p>
        <h1 className="font-display" style={{ fontWeight: 700, fontSize: 50, lineHeight: 0.96, letterSpacing: "-0.03em", marginTop: 14 }}>
          Un accès.
          <br />
          Tous{" "}
          <span style={{ WebkitTextStroke: "1.5px rgba(157, 92, 255, 0.5)", color: "transparent" }}>tes comptes</span>.
        </h1>
        <p style={{ marginTop: 20, maxWidth: "34ch", fontSize: 15, lineHeight: 1.65, color: "var(--fog)" }}>
          Spotify, Netflix, ChatGPT, Discord Nitro et bien plus — livrés en quelques minutes après paiement, sans engagement.
        </p>

        <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
          <Link
            href="/premium"
            className="liquid-glass liquid-glass--signal"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--paper)",
              fontWeight: 600,
              fontSize: 14.5,
              padding: "14px 22px",
              borderRadius: 14,
              textDecoration: "none",
            }}
          >
            Voir le catalogue <ArrowRightIcon width={15} height={15} />
          </Link>
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--paper)",
              fontWeight: 600,
              fontSize: 14.5,
              padding: "14px 20px",
              borderRadius: 14,
              textDecoration: "none",
            }}
          >
            <DiscordIcon width={15} height={15} style={{ color: "var(--signal)" }} /> Discord
          </a>
        </div>
      </section>

      {/* ---------- Stat strip ---------- */}
      <section
        className="liquid-glass"
        style={{
          marginTop: 44,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderRadius: 20,
          padding: "18px 0",
        }}
      >
        <Stat icon={<PackageIcon width={18} height={18} />} value="25+" label="Services" />
        <Stat icon={<BoltIcon width={18} height={18} />} value="<10min" label="Livraison" divider />
        <Stat icon={<HeadsetIcon width={18} height={18} />} value="24/7" label="Support" />
      </section>

      {/* ---------- Offre en vedette ---------- */}
      <section style={{ marginTop: 56 }}>
        <p className="font-display" style={{ fontWeight: 700, fontSize: 23, letterSpacing: "-0.01em" }}>En vedette</p>
        <Link
          href="/produit/basic-fit"
          className="liquid-glass liquid-glass--signal"
          style={{
            marginTop: 20,
            position: "relative",
            display: "block",
            borderRadius: 26,
            padding: 28,
            textDecoration: "none",
            color: "inherit",
            boxShadow: "0 25px 60px -25px rgba(157, 92, 255, 0.55)",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11.5,
              fontWeight: 600,
              color: "var(--ember)",
              background: "rgba(255, 107, 74, 0.12)",
              border: "1px solid rgba(255, 107, 74, 0.3)",
              padding: "5px 12px",
              borderRadius: 999,
            }}
          >
            <StarIcon width={12} height={12} /> Le plus demandé
          </span>
          <p className="font-display" style={{ fontWeight: 700, fontSize: 29, lineHeight: 1.05, marginTop: 16, letterSpacing: "-0.02em" }}>
            Pack Basic-Fit
            <br />+ 2 Netflix
          </p>
          <p style={{ marginTop: 10, fontSize: 14, color: "var(--fog)", maxWidth: "32ch", lineHeight: 1.6 }}>
            1 compte Basic-Fit Ultimate + 2 comptes Netflix Premium 4K, livrés ensemble.
          </p>
          <div style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p className="font-display" style={{ fontWeight: 700, fontSize: 29 }}>
              25<sup style={{ fontSize: 13, color: "var(--fog)", fontWeight: 500 }}>€ / bundle</sup>
            </p>
            <span
              className="liquid-glass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 600,
                fontSize: 13,
                padding: "11px 18px",
                borderRadius: 12,
              }}
            >
              Commander <ArrowRightIcon width={13} height={13} />
            </span>
          </div>
        </Link>
      </section>

      {/* ---------- Sections thématiques ---------- */}
      <div style={{ marginTop: 4 }}>
        <ThemeSection category="streaming" products={getProductsByCategory("streaming")} />
        <ThemeSection category="musique" products={getProductsByCategory("musique")} />
        <ThemeSection category="gaming" products={getProductsByCategory("gaming")} />
        <ThemeSection category="ia" products={getProductsByCategory("ia")} />
      </div>

      <footer style={{ marginTop: 64, textAlign: "center" }}>
        <p style={{ fontSize: 10.5, letterSpacing: "0.08em", color: "rgba(184,174,214,0.35)" }}>
          © 2026 KYZEN — TOUS DROITS RÉSERVÉS
        </p>
      </footer>
    </main>
  );
}

function Stat({ icon, value, label, divider }: { icon: React.ReactNode; value: string; label: string; divider?: boolean }) {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        borderLeft: divider ? "1px solid var(--line)" : "none",
        borderRight: divider ? "1px solid var(--line)" : "none",
      }}
    >
      <span style={{ color: "var(--signal)" }}>{icon}</span>
      <p className="font-display" style={{ fontWeight: 700, fontSize: 20 }}>{value}</p>
      <p style={{ fontSize: 11, color: "var(--fog)" }}>{label}</p>
    </div>
  );
}
