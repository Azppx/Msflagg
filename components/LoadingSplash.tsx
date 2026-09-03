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
    // opacity est la seule propriété animée désormais (voir style plus bas) :
    // plus besoin de filtrer sur clip-path.
    if (e.propertyName === "opacity" && wiping) {
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
        // On évite volontairement clip-path/backdrop-filter ici : combinées à
        // celles déjà présentes dans la TopBar en dessous, elles forcent le
        // navigateur à recomposer un masque à chaque frame, ce qui sature le
        // thread de rendu sur les téléphones moins puissants (effet de
        // freeze/saccade signalé). Une simple transition opacity + scale sur
        // les propriétés "transform"/"opacity" reste, elle, accélérée par le
        // GPU de façon fiable sur tous les mobiles.
        opacity: wiping ? 0 : 1,
        transform: wiping ? "scale(1.04)" : "scale(1)",
        pointerEvents: wiping ? "none" : "auto",
        transition: "opacity 0.45s ease, transform 0.45s ease",
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
