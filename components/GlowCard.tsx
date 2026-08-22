"use client";

import { useTilt } from "@/lib/useTilt";

export function GlowCard({
  toneRgb = "46,110,255",
  className = "",
  children,
}: {
  toneRgb?: string;
  /** @deprecated les particules sont un effet de fond global, plus par carte. */
  particles?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, onPointerEnter, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`pulse-card border border-panelBorder ${className}`}
      style={
        {
          "--tone-rgb": toneRgb,
          "--tone-hover-border": `rgba(${toneRgb},0.4)`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
