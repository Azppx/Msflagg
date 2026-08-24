"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "revealing";

// Timing piloté par minuteurs fixes de bout en bout (pas de dépendance à
// usePathname pour enchaîner les étapes — évite tout blocage si le
// changement de route n'est pas détecté à temps).
const BLOOM_MS = 620;
const HOLD_MS = 140;
const EXIT_MS = 560;

export function PageTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
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
      const rect = anchor.getBoundingClientRect();
      setOrigin({
        x: `${rect.left + rect.width / 2}px`,
        y: `${rect.top + rect.height / 2}px`,
      });
      pendingHref.current = href;
      requestAnimationFrame(() => setPhase("covering"));
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Le halo finit de fleurir → on navigue après une courte pause, puis on
  // repart en sens inverse pour révéler la page.
  useEffect(() => {
    if (phase !== "covering") return;
    const t = setTimeout(() => {
      if (pendingHref.current) router.push(pendingHref.current);
      setTimeout(() => setPhase("revealing"), HOLD_MS);
    }, BLOOM_MS);
    return () => clearTimeout(t);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const t = setTimeout(() => {
      setPhase("idle");
      pendingHref.current = null;
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Sécurité anti-blocage ultime.
  useEffect(() => {
    if (phase === "idle") return;
    const t = setTimeout(() => {
      setPhase("idle");
      pendingHref.current = null;
    }, 4000);
    return () => clearTimeout(t);
  }, [phase]);

  const noTransition = phase === "idle";
  const visible = phase !== "idle";
  const covering = phase === "covering";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      {/* Voile de fond — s'assombrit pendant que le halo grossit */}
      <div
        className="absolute inset-0"
        style={{
          background: "#0a0612",
          opacity: visible ? 0.94 : 0,
          transition: noTransition ? "none" : `opacity ${covering ? BLOOM_MS : EXIT_MS}ms ease`,
        }}
      />

      {/* Halo violet qui fleurit depuis le point cliqué et recouvre l'écran */}
      <div
        className="absolute"
        style={{
          left: origin.x,
          top: origin.y,
          width: "60px",
          height: "60px",
          marginLeft: "-30px",
          marginTop: "-30px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,53,255,0.9) 0%, rgba(139,53,255,0.5) 35%, transparent 70%)",
          filter: "blur(20px)",
          transform: `scale(${covering ? 45 : 0.3})`,
          opacity: visible ? 1 : 0,
          transition: noTransition
            ? "none"
            : `transform ${covering ? BLOOM_MS : EXIT_MS}ms cubic-bezier(0.65,0,0.35,1), opacity ${
                covering ? BLOOM_MS : EXIT_MS
              }ms ease`,
        }}
      />

      {/* Anneau en orbite, identique au héro — tourne doucement pendant la transition */}
      <div
        className="kyzen-orbit-ring"
        style={{
          left: origin.x,
          top: origin.y,
          width: "220px",
          height: "130px",
          marginLeft: "-110px",
          marginTop: "-65px",
          opacity: covering ? 0.8 : 0,
          transition: noTransition ? "none" : "opacity 0.35s ease",
          animation: "orbitSpin1 3.5s linear infinite",
        }}
      />

      {/* Le K de la marque, pulse au pic de la couverture */}
      <div
        className="absolute"
        style={{
          left: origin.x,
          top: origin.y,
          width: "84px",
          height: "104px",
          marginLeft: "-42px",
          marginTop: "-52px",
          opacity: covering ? 1 : 0,
          transform: `scale(${covering ? 1 : 0.6})`,
          transition: noTransition
            ? "none"
            : `opacity 0.35s ease ${covering ? BLOOM_MS * 0.45 : 0}ms, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${
                covering ? BLOOM_MS * 0.45 : 0
              }ms`,
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
