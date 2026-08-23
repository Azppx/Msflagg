"use client";

import { useEffect, useState } from "react";

export function LoadingSplash() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    // Progression fluide et non-linéaire (accélère puis ralentit en approchant 100%),
    // pour un effet plus "vivant" qu'un simple remplissage linéaire.
    let raf: number;
    const start = performance.now();
    const duration = 1000;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setWiping(true), 150);
        setTimeout(() => setVisible(false), 750);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight"
      style={{
        clipPath: wiping ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
        transition: "clip-path 0.6s cubic-bezier(0.65,0,0.35,1)",
      }}
    >
      <span className="kyzen-k-outline" style={{ fontSize: "56px", animation: "none" }}>
        K
      </span>

      <div className="mt-7 h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #8b35ff, #b85cff)",
            boxShadow: "0 0 12px 1px rgba(139,53,255,0.7)",
          }}
        />
      </div>

      <p className="mt-4 text-[11px] font-semibold tracking-widest text-white/40">
        CHARGEMENT DE KYZEN — {Math.round(progress)}%
      </p>
    </div>
  );
}
