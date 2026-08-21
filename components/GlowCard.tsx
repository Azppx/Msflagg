export function GlowCard({
  toneRgb = "46,110,255",
  particles = true,
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
          <span className="glow-particle" style={{ top: "8%", left: "6%" }} />
          <span className="glow-particle" style={{ top: "18%", right: "10%", animationDelay: "0.8s" }} />
          <span className="glow-particle" style={{ top: "62%", right: "8%", animationDelay: "1.6s" }} />
          <span className="glow-particle" style={{ bottom: "12%", left: "14%", animationDelay: "2.4s" }} />
          <span className="glow-particle" style={{ bottom: "22%", right: "22%", animationDelay: "3.2s" }} />
        </>
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
