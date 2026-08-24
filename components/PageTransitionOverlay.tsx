"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "waiting" | "revealing";

export function PageTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);

  // Miroir synchrone de `phase`, lisible dans le listener sans le recréer
  // à chaque changement de phase.
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

      // On démarre à "idle" (point invisible) puis on passe à "covering"
      // au frame suivant, pour que le navigateur ait un vrai état de
      // départ à partir duquel animer.
      requestAnimationFrame(() => setPhase("covering"));
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Minuteurs fixes plutôt que `transitionend` (peu fiable en 3D sur
  // mobile) : ils garantissent que la navigation et la disparition de
  // l'overlay se produisent toujours au bon moment, sur tous les appareils.
  const COVER_MS = 580;
  const REVEAL_MS = 580;

  useEffect(() => {
    if (phase !== "covering") return;
    const timeout = setTimeout(() => {
      setPhase("waiting");
      if (pendingHref.current) router.push(pendingHref.current);
    }, COVER_MS);
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
    }, REVEAL_MS);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Sécurité anti-blocage ultime.
  useEffect(() => {
    if (phase === "idle") return;
    const timeout = setTimeout(() => {
      setPhase("idle");
      pendingHref.current = null;
    }, 4000);
    return () => clearTimeout(timeout);
  }, [phase]);

  const noTransition = phase === "idle";
  const visible = phase !== "idle";

  // Échelle du volet net : part d'un point minuscule invisible au centre,
  // grossit pour couvrir tout l'écran (covering), puis continue de grossir
  // en s'effaçant pour "s'envoler" vers le spectateur et révéler la page
  // suivante derrière lui (revealing).
  let mainScale = 0.08;
  let mainOpacity = 0;
  if (phase === "covering" || phase === "waiting") {
    mainScale = 1;
    mainOpacity = 1;
  } else if (phase === "revealing") {
    mainScale = 2.5;
    mainOpacity = 0;
  }

  // L'aura suit la même trajectoire mais toujours un cran plus grande et
  // plus floue : elle déborde du volet net et crée le halo/glow tout
  // autour, renforçant l'impression de volume 3D.
  let auraScale = 0.08;
  let auraOpacity = 0;
  if (phase === "covering" || phase === "waiting") {
    auraScale = 1.4;
    auraOpacity = 0.8;
  } else if (phase === "revealing") {
    auraScale = 3;
    auraOpacity = 0;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95]"
      style={{ perspective: "1300px" }}
    >
      <style>{`
        @keyframes kyzenZoomPulse {
          0% { transform: scale(0.25); opacity: 0.9; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>

      {/* Lueur ambiante : respire doucement derrière tout le reste */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, rgba(139,53,255,0.28), transparent 62%)",
          opacity: visible ? 1 : 0,
          transition: noTransition ? "none" : "opacity 0.5s ease-out",
        }}
      />

      {/* Onde de choc : un anneau lumineux jaillit et s'estompe à chaque
          étape clé (covering, waiting, revealing) — `key={phase}` force le
          remontage pour relancer l'animation depuis le début à chaque fois. */}
      {phase !== "idle" && (
        <div
          key={phase}
          className="absolute left-1/2 top-1/2"
          style={{
            width: "60vmax",
            height: "60vmax",
            marginLeft: "-30vmax",
            marginTop: "-30vmax",
            borderRadius: "50%",
            border: "2px solid rgba(196,150,255,0.85)",
            boxShadow: "0 0 60px 10px rgba(139,53,255,0.5)",
            animation: "kyzenZoomPulse 0.6s cubic-bezier(0.25,0.8,0.4,1) forwards",
          }}
        />
      )}

      {/* Aura floutée : volume 3D + glow, déborde du volet net */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${auraScale})`,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity",
          opacity: auraOpacity,
          transition: noTransition
            ? "none"
            : "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease-out",
          background: "radial-gradient(circle at 50% 50%, rgba(139,53,255,0.55), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Volet net : couvre réellement l'écran en zoomant depuis le centre */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${mainScale})`,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity",
          opacity: mainOpacity,
          transition: noTransition
            ? "none"
            : "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease-out",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(139,53,255,0.35), transparent 65%), linear-gradient(135deg, rgba(8,5,13,0.98) 0%, rgba(30,12,48,0.98) 50%, rgba(8,5,13,0.98) 100%)",
        }}
      />
    </div>
  );
}
