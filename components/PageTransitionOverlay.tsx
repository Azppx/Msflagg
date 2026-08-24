"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "waiting" | "revealing";

// Nombre de "lames" de verre qui balaient l'écran en cascade diagonale.
const PANEL_COUNT = 6;
const PANEL_DURATION_MS = 520;
const PANEL_STAGGER_MS = 42;

export function PageTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);

  const phaseRef = useRef<Phase>("idle");
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Intercepte les clics sur tout lien interne du site.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (phaseRef.current !== "idle") return;
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (anchor.target === "_blank") return;
      if (href === pathname) return;

      e.preventDefault();
      pendingHref.current = href;
      requestAnimationFrame(() => setPhase("covering"));
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Durée totale d'une cascade = durée d'une lame + le décalage cumulé de
  // la dernière lame + une petite marge. Minuteurs fixes (pas
  // `transitionend`, peu fiable en 3D/cascade sur mobile).
  const SWEEP_MS = PANEL_DURATION_MS + (PANEL_COUNT - 1) * PANEL_STAGGER_MS + 60;

  useEffect(() => {
    if (phase !== "covering") return;
    const timeout = setTimeout(() => {
      setPhase("waiting");
      if (pendingHref.current) router.push(pendingHref.current);
    }, SWEEP_MS);
    return () => clearTimeout(timeout);
  }, [phase, router]);

  useEffect(() => {
    if (phase === "waiting") {
      setPhase("revealing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const timeout = setTimeout(() => {
      setPhase("idle");
      pendingHref.current = null;
    }, SWEEP_MS);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Sécurité anti-blocage ultime.
  useEffect(() => {
    if (phase === "idle") return;
    const timeout = setTimeout(() => {
      setPhase("idle");
      pendingHref.current = null;
    }, 4500);
    return () => clearTimeout(timeout);
  }, [phase]);

  const noTransition = phase === "idle";
  const covering = phase === "covering" || phase === "waiting";
  const visible = phase !== "idle";

  // Position de chaque lame : hors-écran à gauche (idle), en place
  // (covering/waiting), hors-écran à droite (revealing).
  function panelTranslate(): string {
    if (phase === "revealing") return "140%";
    if (covering) return "0%";
    return "-140%";
  }

  const panelWidth = 100 / PANEL_COUNT + 6; // largeur généreuse : les lames
  // se chevauchent légèrement pour ne laisser aucun interstice visible une
  // fois inclinées (skew).

  const logoOpacity = covering ? 1 : 0;
  const logoDelay = phase === "covering" ? PANEL_DURATION_MS * 0.55 : 0;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {/* Lueur ambiante de fond, respire doucement */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, rgba(139,53,255,0.25), transparent 60%)",
          opacity: visible ? 1 : 0,
          transition: noTransition ? "none" : "opacity 0.5s ease-out",
        }}
      />

      {/* Les lames de verre, en cascade diagonale */}
      {Array.from({ length: PANEL_COUNT }).map((_, i) => {
        const delayMs = i * PANEL_STAGGER_MS;
        return (
          <div
            key={i}
            className="absolute top-0 h-full"
            style={{
              left: `${i * (100 / PANEL_COUNT) - 3}%`,
              width: `${panelWidth}%`,
              transform: `translateX(${panelTranslate()}) skewX(-16deg)`,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform",
              transition: noTransition
                ? "none"
                : `transform ${PANEL_DURATION_MS}ms cubic-bezier(0.65,0,0.35,1) ${delayMs}ms`,
              backgroundImage: `linear-gradient(${164 + i * 5}deg, rgba(8,5,13,0.97) 0%, rgba(139,53,255,${(0.22 + (i % 3) * 0.08).toFixed(2)}) 55%, rgba(8,5,13,0.97) 100%)`,
              boxShadow: "3px 0 26px rgba(139,53,255,0.4)",
            }}
          />
        );
      })}

      {/* Halo derrière le K, pulse doucement au pic de la couverture */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: "340px",
          height: "340px",
          marginLeft: "-170px",
          marginTop: "-170px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,53,255,0.55), transparent 70%)",
          filter: "blur(30px)",
          opacity: logoOpacity,
          transition: noTransition ? "none" : `opacity 0.4s ease-out ${logoDelay}ms`,
        }}
      />

      {/* Le K de la marque, flash au moment où l'écran est entièrement couvert */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: "120px",
          height: "150px",
          marginLeft: "-60px",
          marginTop: "-75px",
          opacity: logoOpacity,
          transform: `scale(${covering ? 1 : 0.75})`,
          transition: noTransition
            ? "none"
            : `opacity 0.4s ease-out ${logoDelay}ms, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${logoDelay}ms`,
        }}
      >
        <svg viewBox="0 0 70 100" width="100%" height="100%" fill="none">
          <defs>
            <linearGradient id="kyzenKGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c496ff" />
            </linearGradient>
          </defs>
          <path
            d="M10 6 L10 94 M10 50 L58 6 M10 50 L58 94"
            stroke="url(#kyzenKGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 14px rgba(196,150,255,0.9))" }}
          />
        </svg>
      </div>
    </div>
  );
}
