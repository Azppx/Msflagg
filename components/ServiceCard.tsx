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
  badge,
  href,
  accent = "electric",
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
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
      className="pulse-card group block border border-panelBorder"
      style={
        {
          "--tone-rgb": tone.rgb,
          "--tone-hover-border": tone.hover,
        } as React.CSSProperties
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="pulse-logo flex h-[60px] w-[60px] items-center justify-center">
          {icon}
        </div>
        <span className="pulse-badge">
          <span className="dot" />
          {badge}
        </span>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-widest text-accent-soft">
        {eyebrow}
      </p>
      <h3 className="font-heading mt-1.5 text-[1.7rem] leading-tight tracking-tight">
        {title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-white/55">{description}</p>

      <span className="pulse-explore mt-5 inline-flex items-center text-[0.95rem] font-bold text-accent">
        Explorer
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M17 7H8M17 7v9" />
        </svg>
      </span>
    </Link>
  );
}
