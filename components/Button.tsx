import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "custom";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-black font-bold shadow-[0_8px_24px_-8px_rgba(255,138,0,0.5)] hover:bg-accent-soft hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(255,138,0,0.6)] active:translate-y-0 active:scale-[0.97] active:duration-100",
  secondary:
    "bg-electric text-white font-bold shadow-[0_8px_24px_-8px_rgba(46,110,255,0.5)] hover:bg-electric-soft hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(46,110,255,0.6)] active:translate-y-0 active:scale-[0.97] active:duration-100",
  ghost:
    "bg-white/5 text-white border border-panelBorder hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] active:duration-100",
  custom:
    "font-bold hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] active:duration-100",
};

const base =
  "inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm tracking-wide transition-all duration-300 ease-out min-h-[52px]";

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variantClasses[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}