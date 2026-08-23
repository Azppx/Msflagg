"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "waiting" | "revealing";

export function PageTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
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

      const rect = anchor.getBoundingClientRect();
      setOrigin({
        x: `${rect.left + rect.width / 2}px`,
        y: `${rect.top + rect.height / 2}px`,
      });
      pendingHref.current = href;

      // Étape clé : on démarre à "idle" (cercle fermé, rayon 0) puis on
      // passe à "covering" seulement au frame suivant. L'élément existe
      // déjà dans le DOM (voir plus bas, il est toujours monté), donc le
      // navigateur a bien un état de départ à partir duquel animer — sans
      // ça, le cercle apparaît directement "explosé" sans transition.
      requestAnimationFrame(() => setPhase("covering"));
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Une fois le cercle a fini de recouvrir l'écran (fin réelle de la
  // transition CSS, pas une estimation par setTimeout), on navigue.
  function handleTransitionEnd(e: React.TransitionEvent) {
    if (e.propertyName !== "clip-path") return;
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

  // L'élément reste TOUJOURS monté (même à l'état "idle", rayon 0 et
  // invisible) : c'est ce qui permet à la transition CSS de partir d'un
  // vrai état de départ au lieu d'apparaître déjà "explosée".
  const covering = phase === "covering" || phase === "waiting";

  return (
    <div
      aria-hidden
      onTransitionEnd={handleTransitionEnd}
      className="pointer-events-none fixed inset-0 z-[95]"
      style={{
        clipPath: `circle(${covering ? "150%" : "0%"} at ${origin.x} ${origin.y})`,
        transition: phase === "idle" ? "none" : "clip-path 0.45s cubic-bezier(0.65,0,0.35,1)",
        background:
          "radial-gradient(circle at center, rgba(139,53,255,0.35), rgba(8,5,13,0.98) 70%)",
      }}
    />
  );
}
