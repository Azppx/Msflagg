import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-black font-bold hover:bg-accent-soft active:scale-[0.98]",
  secondary:
    "bg-electric text-white font-bold hover:bg-electric-soft active:scale-[0.98]",
  ghost:
    "bg-white/5 text-white border border-panelBorder hover:bg-white/10 active:scale-[0.98]",
};

const base =
  "inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm tracking-wide transition-all duration-200 min-h-[52px]";

export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variantClasses[variant]}`}>
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
