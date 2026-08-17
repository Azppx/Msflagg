import Link from "next/link";

export function ServiceCard({
  icon,
  title,
  subtitle,
  href,
  accent = "electric",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  accent?: "electric" | "accent" | "danger";
}) {
  const glow = {
    electric: "shadow-[0_0_40px_-10px_rgba(46,110,255,0.6)]",
    accent: "shadow-[0_0_40px_-10px_rgba(255,138,0,0.6)]",
    danger: "shadow-[0_0_40px_-10px_rgba(255,59,59,0.55)]",
  }[accent];

  const borderHover = {
    electric: "hover:border-electric/50",
    accent: "hover:border-accent/50",
    danger: "hover:border-danger/50",
  }[accent];

  return (
    <Link
      href={href}
      className={`card-glow glass-panel group relative block overflow-hidden rounded-xl2 border border-panelBorder p-6 text-center transition-all duration-300 ease-out will-change-transform hover:-translate-y-1 hover:backdrop-brightness-125 active:translate-y-0 active:scale-[0.97] active:duration-100 ${borderHover}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <div
        className={`icon-halo relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95 ${glow}`}
      >
        {icon}
      </div>
      <h3 className="relative font-display text-xl tracking-tight">{title}</h3>
      <p className="relative mt-1 text-sm text-white/50">{subtitle}</p>
      <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold tracking-widest text-white/70 transition-colors duration-300 group-hover:text-white">
        DÉCOUVRIR{" "}
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}
