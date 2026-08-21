export function GlowCard({
  toneRgb = "46,110,255",
  className = "",
  children,
}: {
  toneRgb?: string;
  /** @deprecated les particules sont maintenant un effet de fond global, plus par carte. */
  particles?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`glow-poster relative overflow-hidden rounded-[28px] border border-white/10 p-6 ${className}`}
      style={{ "--tone-rgb": toneRgb } as React.CSSProperties}
    >
      <div className="glow-poster-sheen" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
