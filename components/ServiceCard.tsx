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

  return (
    <Link
      href={href}
      className="card-glow group block rounded-xl2 border border-panelBorder bg-panel/70 p-6 text-center transition-transform duration-300 active:scale-[0.98]"
    >
      <div
        className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ${glow}`}
      >
        {icon}
      </div>
      <h3 className="font-display text-xl tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-white/50">{subtitle}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold tracking-widest text-white/70 group-hover:text-white">
        DÉCOUVRIR <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
