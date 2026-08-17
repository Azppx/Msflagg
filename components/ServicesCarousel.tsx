"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Tone = "electric" | "violet" | "gold" | "teal";

type ServiceCategory = {
  id: string;
  tabLabel: string;
  badge?: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  features: string[];
  ctaLabel: string;
  href?: string;
  disabled?: boolean;
  tone: Tone;
  captionEyebrow: string;
  captionText: string;
};

const toneClasses: Record<
  Tone,
  {
    badge: string;
    iconBox: string;
    eyebrow: string;
    check: string;
    cta: string;
    cardBorder: string;
    cardShadow: string;
    caption: string;
    dot: string;
  }
> = {
  electric: {
    badge: "border-electric/40 bg-electric/10 text-electric-soft",
    iconBox:
      "border-electric/40 text-electric-soft shadow-[0_0_40px_-8px_rgba(46,110,255,0.6)]",
    eyebrow: "text-electric-soft",
    check: "border-electric/40 text-electric-soft",
    cta: "bg-electric text-white hover:bg-electric-soft",
    cardBorder: "border-electric/40",
    cardShadow: "shadow-[0_0_90px_-12px_rgba(46,110,255,0.65)]",
    caption: "text-electric-soft",
    dot: "bg-electric",
  },
  violet: {
    badge: "border-violet/40 bg-violet/10 text-violet-soft",
    iconBox:
      "border-violet/40 text-violet-soft shadow-[0_0_40px_-8px_rgba(139,92,246,0.6)]",
    eyebrow: "text-violet-soft",
    check: "border-violet/40 text-violet-soft",
    cta: "bg-violet text-white hover:bg-violet-soft",
    cardBorder: "border-violet/40",
    cardShadow: "shadow-[0_0_90px_-12px_rgba(139,92,246,0.65)]",
    caption: "text-violet-soft",
    dot: "bg-violet",
  },
  gold: {
    badge: "border-gold/40 bg-gold/10 text-gold-soft",
    iconBox: "border-gold/40 text-gold-soft shadow-[0_0_40px_-8px_rgba(245,197,24,0.6)]",
    eyebrow: "text-gold-soft",
    check: "border-gold/40 text-gold-soft",
    cta: "border border-dashed border-gold/50 bg-transparent text-gold-soft",
    cardBorder: "border-gold/40",
    cardShadow: "shadow-[0_0_90px_-12px_rgba(245,197,24,0.6)]",
    caption: "text-gold-soft",
    dot: "bg-gold",
  },
  teal: {
    badge: "border-teal/40 bg-teal/10 text-teal-soft",
    iconBox: "border-teal/40 text-teal-soft shadow-[0_0_40px_-8px_rgba(45,212,191,0.6)]",
    eyebrow: "text-teal-soft",
    check: "border-teal/40 text-teal-soft",
    cta: "bg-teal text-black hover:bg-teal-soft",
    cardBorder: "border-teal/40",
    cardShadow: "shadow-[0_0_90px_-12px_rgba(45,212,191,0.65)]",
    caption: "text-teal-soft",
    dot: "bg-teal",
  },
};

const categories: ServiceCategory[] = [
  {
    id: "premium",
    tabLabel: "Services キティちゃん",
    badge: "RECOMMANDÉ",
    icon: <CrownIcon />,
    title: "Premium",
    subtitle: "Le meilleur de nos services.",
    features: [
      "Accès complet fournisseur",
      "Fonctionnalités avancées",
      "Support prioritaire",
      "Escrow disponible",
    ],
    ctaLabel: "Découvrir Premium",
    href: "/premium",
    tone: "electric",
    captionEyebrow: "LE SAVOIR-FAIRE DES PROS",
    captionText: "Le meilleur de nos services.",
  },
  {
    id: "abonnement",
    tabLabel: "Abonnement",
    icon: <RefreshIcon />,
    title: "Abonnement",
    subtitle: "Abonnement à prix cassé.",
    features: ["Prix réduit", "Livraison rapide", "Escrow disponible"],
    ctaLabel: "Découvrir Abonnement",
    href: "/produit",
    tone: "violet",
    captionEyebrow: "ÉCONOMISE SUR TES APPS PRÉFÉRÉES",
    captionText: "Abonnement à prix cassé.",
  },
  {
    id: "vip",
    tabLabel: "VIP",
    badge: "BIENTÔT DISPONIBLE",
    icon: <DiamondIcon />,
    title: "VIP",
    subtitle: "Pronostics, Poker & Casino.",
    features: [
      "Section Pronostics",
      "Section Poker",
      "Section Casino",
      "Accès Discord privé",
    ],
    ctaLabel: "Bientôt disponible",
    disabled: true,
    tone: "gold",
    captionEyebrow: "SALON PRIVÉ",
    captionText: "Pronostics, Poker & Casino.",
  },
  {
    id: "fournisseur",
    tabLabel: "Fournisseur",
    icon: <TruckIcon />,
    title: "Fournisseur",
    subtitle: "Tous les fournisseurs vérifiés.",
    features: ["Sourcing direct", "Contacts vérifiés", "Escrow disponible"],
    ctaLabel: "Découvrir Fournisseur",
    href: "/produit",
    tone: "teal",
    captionEyebrow: "SOURCING DIRECT & CONTACTS",
    captionText: "Tous les fournisseurs vérifiés.",
  },
];

export function ServicesCarousel() {
  const [current, setCurrent] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackWrapperRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState<number | null>(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = trackWrapperRef.current;
    if (!el) return;
    const update = () => setCardWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const heights = cardRefs.current.map((el) => el?.scrollHeight ?? 0);
    const max = Math.max(0, ...heights);
    if (max > 0 && max !== cardHeight) setCardHeight(max);
  }, [cardWidth]);

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(categories.length - 1, index));
    setCurrent(clamped);
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  const active = categories[current];
  const tone = toneClasses[active.tone];

  return (
    <section className="animate-fadeUp">
      {/* Horizontal category tabs */}
      <div
        className="edge-fade-x flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat, i) => {
          const t = toneClasses[cat.tone];
          const isActive = i === current;
          return (
            <button
              key={cat.id}
              onClick={() => goTo(i)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold tracking-widest transition-colors duration-200 ${
                isActive
                  ? t.badge
                  : "border-panelBorder bg-panel/60 text-white/40 hover:text-white/70"
              }`}
            >
              {cat.tabLabel.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Swipeable card carousel */}
      <div ref={trackWrapperRef} className="relative mt-5">
        <button
          aria-label="Catégorie précédente"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="absolute left-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition-opacity disabled:opacity-0"
        >
          ‹
        </button>
        <button
          aria-label="Catégorie suivante"
          onClick={() => goTo(current + 1)}
          disabled={current === categories.length - 1}
          className="absolute right-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition-opacity disabled:opacity-0"
        >
          ›
        </button>

        <div
          className="flex snap-x snap-mandatory overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat, i) => {
            const t = toneClasses[cat.tone];
            return (
              <div
                key={cat.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  width: cardWidth ? `${cardWidth}px` : "100%",
                  minHeight: cardHeight ? `${cardHeight}px` : undefined,
                  flex: "0 0 auto",
                }}
                className={`card-glow relative flex snap-center flex-col rounded-xl2 border bg-panel p-6 text-center ${t.cardBorder} ${t.cardShadow}`}
              >
                {cat.badge && (
                  <span
                    className={`mx-auto mb-5 inline-block rounded-full border px-3 py-1 text-[11px] font-bold tracking-widest ${t.badge}`}
                  >
                    {cat.badge}
                  </span>
                )}
                <div
                  className={`icon-halo relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/5 ${t.iconBox}`}
                >
                  {cat.icon}
                </div>
                <p className={`text-xs font-semibold tracking-widest ${t.eyebrow}`}>
                  SERVICE
                </p>
                <h3 className="font-display mt-2 text-3xl">{cat.title}</h3>
                <p className="mt-2 text-sm text-white/50">{cat.subtitle}</p>

                <div className="mt-5 h-px bg-panelBorder" />

                <ul className="mt-5 space-y-3 text-left">
                  {cat.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${t.check}`}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  {cat.disabled ? (
                    <span
                      className={`block cursor-not-allowed rounded-xl px-5 py-3.5 text-sm font-semibold tracking-wide ${t.cta}`}
                    >
                      ⏱ {cat.ctaLabel}
                    </span>
                  ) : (
                    <Link
                      href={cat.href ?? "#"}
                      className={`block rounded-xl px-5 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 ${t.cta}`}
                    >
                      {cat.ctaLabel} →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Caption + pagination */}
      <div className="mt-6 text-center">
        <p className={`text-xs font-semibold tracking-widest ${tone.caption}`}>
          {active.captionEyebrow}
        </p>
        <p className="mt-1 text-sm text-white/50">{active.captionText}</p>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          {categories.map((cat, i) => (
            <span
              key={cat.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? `w-6 ${toneClasses[cat.tone].dot}` : "w-1.5 bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CrownIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M3 8l4 3 5-6 5 6 4-3-1.5 10h-15L3 8z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M4 12a8 8 0 0 1 13.7-5.7L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.7L4 16M4 20v-4h4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function DiamondIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l4-6h10l4 6-11 12L3 9z" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M3 9h18M9.5 3l-2 6 4.5 12 4.5-12-2-6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 8h11v8H2zM13 11h4l4 3v2h-8z" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="6.5" cy="18" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="18" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
