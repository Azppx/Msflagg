import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  backHref,
}: {
  eyebrow: string;
  title: string;
  backHref?: string;
}) {
  return (
    <header className="mb-8 flex items-start gap-4 px-5 pt-6">
      {backHref && (
        <Link
          href={backHref}
          aria-label="Retour"
          className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-panelBorder bg-white/5 text-white/80"
        >
          ←
        </Link>
      )}
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-white/40">
          {eyebrow}
        </p>
        <h1 className="font-display mt-1 text-3xl leading-tight tracking-tight">
          {title}
        </h1>
        <span className="mt-3 block h-1 w-14 rounded-full bg-accent" />
      </div>
    </header>
  );
}
