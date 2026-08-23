"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "waiting" | "revealing";

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

      // Étape clé : on démarre à "idle" (panneau hors-écran à gauche) puis
      // on passe à "covering" seulement au frame suivant. L'élément existe
      // déjà dans le DOM (voir plus bas, il est toujours monté), donc le
      // navigateur a bien un état de départ à partir duquel animer — sans
      // ça, le panneau apparaît directement "en place" sans transition.
      requestAnimationFrame(() => setPhase("covering"));
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Une fois le cercle a fini de recouvrir l'écran (fin réelle de la
  // transition CSS, pas une estimation par setTimeout), on navigue.
  function handleTransitionEnd(e: React.TransitionEvent) {
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
    }, 1500);
    return () => clearTimeout(timeout);
  }, [phase]);

  // L'élément reste TOUJOURS monté (même à l'état "idle", hors-écran à
  // gauche) : c'est ce qui permet à la transition CSS de partir d'un vrai
  // état de départ au lieu d'apparaître déjà "en place".
  //
  // Séquence du balayage :
  // - idle      : panneau caché hors-écran, à gauche (translateX(-100%))
  // - covering  : panneau glisse vers translateX(0%) → couvre tout l'écran
  // - waiting   : navigation déclenchée, panneau reste en place le temps
  //               que la nouvelle page soit montée
  // - revealing : panneau continue son glissement vers translateX(100%),
  //               sortant à droite → "ouvre" la nouvelle page derrière lui
  let translate = "-100%";
  if (phase === "covering" || phase === "waiting") translate = "0%";
  if (phase === "revealing") translate = "100%";

  return (
    <div
      aria-hidden
      onTransitionEnd={handleTransitionEnd}
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translateX(${translate})`,
          transition: phase === "idle" ? "none" : "transform 0.5s cubic-bezier(0.65,0,0.35,1)",
          background:
            "linear-gradient(100deg, rgba(8,5,13,0.98) 0%, rgba(139,53,255,0.35) 50%, rgba(8,5,13,0.98) 100%)",
        }}
      />
    </div>
  );
}
