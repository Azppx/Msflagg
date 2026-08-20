"use client";

import { useState } from "react";

const LANGS = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("fr");
  const [notice, setNotice] = useState(false);

  function select(code: string) {
    setOpen(false);
    if (code !== "fr") {
      // Le site n'est pour l'instant disponible qu'en français.
      setNotice(true);
      setTimeout(() => setNotice(false), 2000);
      return;
    }
    setLang(code);
  }

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Choisir la langue"
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
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10"
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}

      {notice && (
        <div className="absolute right-0 top-12 z-30 w-48 rounded-xl border border-panelBorder bg-midnight/95 p-3 text-xs text-white/60">
          Bientôt disponible en anglais 🙂
        </div>
      )}
    </div>
  );
}
