"use client";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 50,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-xl border border-panelBorder bg-white/5">
      <button
        type="button"
        aria-label="Diminuer la quantité"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-11 w-11 items-center justify-center text-lg text-white/70 transition-colors hover:text-white disabled:opacity-30"
      >
        −
      </button>
      <span className="w-10 text-center font-display text-lg tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Augmenter la quantité"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-11 w-11 items-center justify-center text-lg text-white/70 transition-colors hover:text-white disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
