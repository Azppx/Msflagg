"use client";

import { useEffect, useState } from "react";

const BAR_DURATION = 900;

export function LoadingSplash() {
  const [visible, setVisible] = useState(true);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    // Pendant l'écran de chargement, on met en pause toutes les animations
    // continues du reste du site (anneaux du héro, halos, flottements...).
    // Sans ça, elles tournent déjà en arrière-plan pendant que la barre de
    // progression s'anime, ce qui sature le thread principal sur téléphone
    // et donne cette impression de freeze.
    document.body.classList.add("kyzen-splash-active");

    // Une seule minuterie (pas de boucle par frame) : la barre elle-même
    // est animée en CSS pur, gérée par le compositeur du navigateur.
    const t = setTimeout(() => setWiping(true), BAR_DURATION + 150);
    return () => clearTimeout(t);
  }, []);

  function handleTransitionEnd(e: React.TransitionEvent) {
    if (e.propertyName === "clip-path" && wiping) {
      setVisible(false);
      document.body.classList.remove("kyzen-splash-active");
    }
  }

  if (!visible) return null;

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className="kyzen-splash-root fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight"
      style={{
        clipPath: wiping ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
        transition: "clip-path 0.6s cubic-bezier(0.65,0,0.35,1)",
      }}
    >
      <span className="kyzen-k-outline" style={{ fontSize: "56px", animation: "none" }}>
        K
      </span>

      <div className="mt-7 h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
        <div className="kyzen-splash-bar h-full w-full origin-left rounded-full" />
      </div>

      <p className="mt-4 text-[11px] font-semibold tracking-widest text-white/40">
        CHARGEMENT DE KYZEN
      </p>
    </div>
  );
}
