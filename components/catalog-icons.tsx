import type { CatalogTone } from "@/lib/catalog";

export const catalogToneRgb: Record<CatalogTone, string> = {
  electric: "46,110,255",
  violet: "139,92,246",
  gold: "245,197,24",
  teal: "45,212,191",
  danger: "255,59,59",
  accent: "255,138,0",
  green: "34,197,94",
};

export const catalogToneClasses: Record<
  CatalogTone,
  { glow: string; iconBox: string; category: string; cta: string; pill: string; dot: string }
> = {
  electric: {
    glow: "shadow-[0_0_90px_-15px_rgba(46,110,255,0.7)]",
    iconBox: "border-electric/40 text-electric-soft",
    category: "text-electric-soft",
    cta: "bg-electric text-white hover:bg-electric-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-electric",
  },
  violet: {
    glow: "shadow-[0_0_90px_-15px_rgba(139,92,246,0.7)]",
    iconBox: "border-violet/40 text-violet-soft",
    category: "text-violet-soft",
    cta: "bg-violet text-white hover:bg-violet-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-violet",
  },
  gold: {
    glow: "shadow-[0_0_90px_-15px_rgba(245,197,24,0.65)]",
    iconBox: "border-gold/40 text-gold-soft",
    category: "text-gold-soft",
    cta: "bg-gold text-black hover:bg-gold-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-gold",
  },
  teal: {
    glow: "shadow-[0_0_90px_-15px_rgba(45,212,191,0.7)]",
    iconBox: "border-teal/40 text-teal-soft",
    category: "text-teal-soft",
    cta: "bg-teal text-black hover:bg-teal-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-teal",
  },
  danger: {
    glow: "shadow-[0_0_90px_-15px_rgba(255,59,59,0.65)]",
    iconBox: "border-danger/40 text-danger",
    category: "text-danger",
    cta: "bg-danger text-white hover:opacity-90",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-danger",
  },
  accent: {
    glow: "shadow-[0_0_90px_-15px_rgba(255,138,0,0.7)]",
    iconBox: "border-accent/40 text-accent-soft",
    category: "text-accent-soft",
    cta: "bg-accent text-black hover:bg-accent-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-accent",
  },
  green: {
    glow: "shadow-[0_0_90px_-15px_rgba(34,197,94,0.7)]",
    iconBox: "border-green/40 text-green-soft",
    category: "text-green-soft",
    cta: "bg-green text-black hover:bg-green-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-green",
  },
};

export function CatalogIcon({ name }: { name: string }) {
  switch (name) {
    case "heart":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21s-7.5-4.7-10-9.3C.4 8.4 2 5 5.4 5c2 0 3.4 1.1 4.1 2.3.7-1.2 2.1-2.3 4.1-2.3 3.4 0 5 3.4 3.4 6.7C19.5 16.3 12 21 12 21z" />
        </svg>
      );
    case "spotify":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="10" />
          <path
            d="M7 9.5c3-1 7-.6 9.3.9M7.3 12.7c2.5-.8 5.7-.5 7.9.8M7.6 15.6c2-.6 4.6-.4 6.3.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "dumbbell":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 9v6M2 10v4M20 9v6M22 10v4M7 8.5v7M17 8.5v7M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "tv":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M8 21h8M9 3l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "netflix":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 2h4l6 14V2h4v20h-4L9 8v14H5z" />
        </svg>
      );
    case "moon":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
        </svg>
      );
    case "canva":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 13a4 4 0 0 0 6 2.3" strokeLinecap="round" />
        </svg>
      );
    case "adobe":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 4h5l7 16h-4L9 6 5 20H2z" strokeLinejoin="round" />
        </svg>
      );
    case "capcut":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          <circle cx="6" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
        </svg>
      );
    case "office":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l12-1v18l-12-1z" strokeLinejoin="round" />
          <path d="M16 5.5h4v13h-4" strokeLinejoin="round" />
        </svg>
      );
    case "play":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4l14 8-14 8z" />
        </svg>
      );
    case "shield":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" strokeLinejoin="round" />
        </svg>
      );
    case "spark":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
        </svg>
      );
    case "mountain":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 19l6-10 4 6 2-3 6 7z" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );
    case "star":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M12 3l2.6 5.6 6.2.6-4.6 4.2 1.3 6.1L12 16.9 6.5 19.5l1.3-6.1L3.2 9.2l6.2-.6z"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clapper":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10l16-3 1 4-16 3z" strokeLinejoin="round" />
          <rect x="3" y="11" width="18" height="9" rx="1" />
        </svg>
      );
    case "discord":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M6 8c3-2 9-2 12 0l1 8c-2 1.5-4 2-4 2l-.7-1.3c-1.5.5-4.6.5-6.1 0L7.5 18s-2-.5-4-2z"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="12.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="12.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "owl":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
          <circle cx="9" cy="11" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15" cy="11" r="1.4" fill="currentColor" stroke="none" />
          <path d="M10.5 15a2.5 2 0 0 0 3 0" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
