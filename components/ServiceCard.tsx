"use client";

import Link from "next/link";
import { useTilt } from "@/lib/useTilt";

type Accent = "electric" | "accent" | "danger";

const toneVars: Record<Accent, { rgb: string; hover: string }> = {
  electric: { rgb: "46,110,255", hover: "rgba(46,110,255,0.4)" },
  accent: { rgb: "255,138,0", hover: "rgba(255,138,0,0.4)" },
  danger: { rgb: "255,59,59", hover: "rgba(255,59,59,0.4)" },
};

export function ServiceCard({
  icon,
  eyebrow,
  title,
  description,
  href,
  accent = "electric",
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  /** @deprecated conservé pour compat, plus affiché — le style .svc-card n'a pas de badge */
  badge?: string;
  href: string;
  accent?: Accent;
}) {
  const tone = toneVars[accent];
  const { ref, onPointerEnter, onPointerMove, onPointerLeave } = useTilt<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={href}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="pulse-card svc-card-style group block border border-panelBorder"
      style={
        {
          "--tone-rgb": tone.rgb,
          "--tone-hover-border": tone.hover,
        } as React.CSSProperties
      }
    >
      <div className="icon-ring-84 mx-auto flex items-center justify-center">{icon}</div>

      <h2 className="font-heading mt-[22px] text-[23px] font-bold leading-tight tracking-tight">
        {title}
      </h2>
      <p className="mt-2 text-[13.5px] text-white/55">{description}</p>

      <span className="pulse-explore mt-[22px] inline-flex items-center justify-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white/35">
        Découvrir
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M17 7H8M17 7v9" />
        </svg>
      </span>
    </Link>
  );
}
