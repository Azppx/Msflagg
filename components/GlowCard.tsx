export function GlowCard({
  toneRgb = "46,110,255",
  particles = false,
  className = "",
  children,
}: {
  toneRgb?: string;
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
      {particles && (
        <>
          <span className="glow-particle" style={{ top: "10%", left: "8%" }} />
          <span className="glow-particle" style={{ top: "70%", left: "90%", animationDelay: "1.2s" }} />
          <span className="glow-particle" style={{ top: "85%", left: "18%", animationDelay: "2.4s" }} />
        </>
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
