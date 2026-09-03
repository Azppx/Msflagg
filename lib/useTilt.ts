"use client";

import { useCallback, useRef } from "react";

/**
 * Reproduit l'effet de tilt 3D au pointeur des maquettes HTML (glow-card /
 * svc-card) : légère rotation qui suit le curseur + halo lumineux positionné
 * via les variables CSS --mx/--my.
 *
 * Au tactile, il n'y a pas de "survol" prolongé qui permettrait de suivre le
 * doigt comme une souris : un tap est un contact bref suivi d'un
 * relâchement. On y répond donc par une impulsion de tilt basée sur le point
 * de contact (au pointerdown), suivie d'un retour en douceur à plat (au
 * pointerup), plutôt qu'un suivi continu qui ne se produirait jamais.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const onPointerEnter = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  const applyTiltFromPoint = useCallback((clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    if (!rectRef.current) rectRef.current = el.getBoundingClientRect();
    const rect = rectRef.current;
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 10;
    el.style.transition = "";
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-4px)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return; // le tactile passe par onPointerDown ci-dessous
      applyTiltFromPoint(e.clientX, e.clientY);
    },
    [applyTiltFromPoint]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") return;
      rectRef.current = ref.current?.getBoundingClientRect() ?? null;
      ref.current?.classList.add("is-active");
      applyTiltFromPoint(e.clientX, e.clientY);
    },
    [applyTiltFromPoint]
  );

  const resetTilt = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "";
    el.classList.remove("is-active");
  }, []);

  const onPointerLeave = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return; // géré par onPointerUp pour rester bref au tap
      resetTilt();
    },
    [resetTilt]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") return;
      resetTilt();
    },
    [resetTilt]
  );

  const onPointerCancel = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") return;
      resetTilt();
    },
    [resetTilt]
  );

  return {
    ref,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
  };
}
