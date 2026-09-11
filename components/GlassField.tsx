import type { InputHTMLAttributes } from "react";

export function GlassField({
  label,
  ...inputProps
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <span style={{ display: "block", marginBottom: 7, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", color: "var(--fog)" }}>
        {label}
      </span>
      <input className="glass-input liquid-glass" {...inputProps} />
    </label>
  );
}
