"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Locale } from "@/lib/i18n/dictionaries";

const LANGS: { code: Locale; flag: string; label: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  function select(code: Locale) {
    setOpen(false);
    setLocale(code);
  }

  const current = LANGS.find((l) => l.code === locale) ?? LANGS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("nav.choose_language")}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-panelBorder bg-white/5 text-lg transition-colors hover:bg-white/10"
      >
        {current.flag}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-30 w-40 overflow-hidden rounded-xl border border-panelBorder bg-midnight/95 backdrop-blur">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => select(l.code)}
              className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-white/10 ${
                l.code === locale ? "text-white" : "text-white/80"
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
              {l.code === locale && <span className="ml-auto text-white/40">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
