"use client";

import { useCallback, useRef } from "react";

/**
 * Reproduit l'effet de tilt 3D au pointeur des maquettes HTML (glow-card /
 * svc-card) : légère rotation qui suit le curseur + halo lumineux positionné
 * via les variables CSS --mx/--my.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const onPointerEnter = useCallback(() => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!rectRef.current) rectRef.current = el.getBoundingClientRect();
    const rect = rectRef.current;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 10;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-4px)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }, []);

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return { ref, onPointerEnter, onPointerMove, onPointerLeave };
}
