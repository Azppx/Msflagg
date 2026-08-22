"use client";

import { useEffect, useState } from "react";

export function LoadingSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 900);
    const hideTimer = setTimeout(() => setVisible(false), 1300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight transition-opacity duration-400 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="font-display text-2xl tracking-tight text-white">Qluse</span>
      <div className="splash-dashes mt-6">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <p className="mt-5 text-xs font-semibold tracking-widest text-white/40">
        CHARGEMENT DE QLUSE SERVICES
      </p>
    </div>
  );
}
