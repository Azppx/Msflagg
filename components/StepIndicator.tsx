export function StepIndicator({ current }: { current: number }) {
  const steps = ["Produit", "Informations", "Paiement", "Confirmation"];

  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const stepNumber = i + 1;
        const filled = stepNumber <= current;
        return (
          <div key={s} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all duration-700 ease-out"
              style={{
                width: filled ? "100%" : "0%",
                transitionDelay: filled ? `${i * 90}ms` : "0ms",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
