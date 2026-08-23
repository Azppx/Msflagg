"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "waiting" | "revealing";

// -1 = hors-écran à gauche (repos, avant tout clic)
//  0 = couvre l'écran (le volet est "à plat", pile en face de nous)
//  1 = hors-écran à droite (après la sortie)
// Le balayage va toujours de gauche à droite ; combiné à une légère
// rotation 3D (rotateY) et à un recul en profondeur (translateZ), ça donne
// l'impression d'un volet qui pivote légèrement en glissant, plutôt qu'un
// simple aplat qui traverse l'écran à plat.
function phaseValue(phase: Phase): number {
  if (phase === "idle") return -1;
  if (phase === "revealing") return 1;
  return 0; // covering / waiting
}

export function PageTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);

  // Miroir synchrone de `phase`, lisible dans le listener sans avoir à le
  // recréer à chaque changement de phase.
  const phaseRef = useRef<Phase>("idle");
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Intercepte les clics sur tout lien interne du site.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Ignore si une transition est déjà en cours, pour éviter tout
      // chevauchement/course entre deux clics rapides.
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

      // On démarre à "idle" (hors-écran) puis on passe à "covering"
      // seulement au frame suivant, pour que le navigateur ait un vrai état
      // de départ à partir duquel animer.
      requestAnimationFrame(() => setPhase("covering"));
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // La couche "aura" (halo flou) est volontairement la plus lente des trois
  // couches : elle termine son mouvement en dernier. Son `transitionend`
  // marque donc la vraie fin visuelle du balayage — c'est elle qui pilote
  // la machine à états, pas le volet net (plus rapide).
  function handleAuraTransitionEnd(e: React.TransitionEvent) {
    if (e.propertyName !== "transform") return;
    if (phase === "covering") {
      setPhase("waiting");
      if (pendingHref.current) router.push(pendingHref.current);
    } else if (phase === "revealing") {
      setPhase("idle");
      pendingHref.current = null;
    }
  }

  // Dès que la nouvelle page est montée (pathname changé) pendant qu'on
  // attend, on lance la révélation.
  useEffect(() => {
    if (phase === "waiting") {
      setPhase("revealing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Sécurité anti-blocage : si jamais transitionend ne se déclenche pas
  // (onglet en arrière-plan, changement d'onglet...), on force la sortie.
  useEffect(() => {
    if (phase === "idle") return;
    const timeout = setTimeout(() => {
      setPhase("idle");
      pendingHref.current = null;
    }, 2200);
    return () => clearTimeout(timeout);
  }, [phase]);

  const value = phaseValue(phase);
  const noTransition = phase === "idle";
  const visible = phase !== "idle";

  // Volet net (couche du dessus) : rapide, c'est lui qui couvre réellement
  // l'écran. Recul en profondeur (translateZ négatif) uniquement pendant le
  // trajet, à plat (0) une fois en place — c'est ce qui crée l'arc 3D.
  const mainTransform = `translate3d(${value * 100}%, 0, ${-Math.abs(value) * 140}px) rotateY(${value * 16}deg)`;
  // Halo flouté (couche du dessous) : plus lent et légèrement plus reculé
  // en permanence, il "rattrape" le volet net et donne l'impression de
  // traînée lumineuse + de volume derrière le bord d'attaque.
  const auraTransform = `translate3d(${value * 100}%, 0, ${-Math.abs(value) * 140 - 70}px) rotateY(${value * 22}deg)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95]"
      style={{ perspective: "1300px" }}
    >
      {/* Lueur ambiante : respire doucement derrière tout le reste */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, rgba(139,53,255,0.28), transparent 62%)",
          opacity: visible ? 1 : 0,
          transition: noTransition ? "none" : "opacity 0.6s ease-out",
        }}
      />

      {/* Aura floutée : volume 3D + traînée lumineuse, la plus lente */}
      <div
        onTransitionEnd={handleAuraTransitionEnd}
        className="absolute inset-0"
        style={{
          transform: auraTransform,
          transformStyle: "preserve-3d",
          opacity: visible ? 0.85 : 0,
          transition: noTransition
            ? "none"
            : "transform 0.58s cubic-bezier(0.65,0,0.35,1), opacity 0.4s ease-out",
          background: "radial-gradient(circle at 50% 50%, rgba(139,53,255,0.55), transparent 72%)",
          filter: "blur(46px)",
        }}
      />

      {/* Volet net : couvre réellement l'écran, arrive en premier */}
      <div
        className="absolute inset-0"
        style={{
          transform: mainTransform,
          transformStyle: "preserve-3d",
          transition: noTransition ? "none" : "transform 0.42s cubic-bezier(0.65,0,0.35,1)",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.07), transparent 30%), linear-gradient(100deg, rgba(8,5,13,0.98) 0%, rgba(139,53,255,0.42) 55%, rgba(8,5,13,0.98) 100%)",
        }}
      >
        {/* Halo large et doux juste devant le bord d'attaque */}
        <div
          className="absolute top-0 h-full"
          style={{
            right: "-160px",
            width: "260px",
            background:
              "linear-gradient(90deg, rgba(139,53,255,0.55), rgba(255,255,255,0.35) 45%, transparent 100%)",
            filter: "blur(40px)",
            mixBlendMode: "screen",
            opacity: visible ? 1 : 0,
            transition: noTransition ? "none" : "opacity 0.15s ease-out",
          }}
        />
        {/* Lame nette : le trait de lumière qui découpe l'écran en avançant */}
        <div
          className="absolute top-0 h-full"
          style={{
            right: "-3px",
            width: "6px",
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.95), transparent)",
            boxShadow: "0 0 24px 6px rgba(196,150,255,0.9), 0 0 60px 18px rgba(139,53,255,0.5)",
            opacity: visible ? 1 : 0,
            transition: noTransition ? "none" : "opacity 0.15s ease-out",
          }}
        />
      </div>
    </div>
  );
}
