import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "custom";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-midnight text-ink font-bold shadow-[7px_7px_16px_rgba(163,155,194,0.55),-7px_-7px_16px_rgba(255,255,255,0.9)] hover:-translate-y-0.5 hover:shadow-[9px_9px_20px_rgba(163,155,194,0.55),-9px_-9px_20px_rgba(255,255,255,0.9)] active:translate-y-0 active:shadow-[inset_5px_5px_12px_rgba(163,155,194,0.55),inset_-5px_-5px_12px_rgba(255,255,255,0.9)] active:duration-100",
  secondary:
    "bg-midnight text-ink font-bold shadow-[7px_7px_16px_rgba(163,155,194,0.55),-7px_-7px_16px_rgba(255,255,255,0.9)] hover:-translate-y-0.5 hover:shadow-[9px_9px_20px_rgba(163,155,194,0.55),-9px_-9px_20px_rgba(255,255,255,0.9)] active:translate-y-0 active:shadow-[inset_5px_5px_12px_rgba(163,155,194,0.55),inset_-5px_-5px_12px_rgba(255,255,255,0.9)] active:duration-100",
  ghost:
    "bg-midnight text-ink-soft shadow-[inset_4px_4px_10px_rgba(163,155,194,0.4),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] hover:text-ink active:duration-100",
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
