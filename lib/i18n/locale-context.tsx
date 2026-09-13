"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Locale } from "@/lib/i18n/dictionaries";

const STORAGE_KEY = "kyzen-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: (key: string) => key,
});

function readStoredLocale(): Locale {
  if (typeof document === "undefined") return "fr";
  const match = document.cookie.match(/(?:^|; )kyzen-locale=([^;]*)/);
  const fromCookie = match ? decodeURIComponent(match[1]) : null;
  if (fromCookie === "en" || fromCookie === "fr") return fromCookie;
  return "fr";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // On démarre toujours en "fr" côté serveur pour éviter un mismatch
  // d'hydratation, puis on applique la préférence stockée une fois monté.
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000`;
      document.documentElement.lang = next;
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const t = useCallback(
    (key: string) => {
      const dict = dictionaries[locale];
      return dict[key] ?? dictionaries.fr[key] ?? key;
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

/** Raccourci pour accéder uniquement à la fonction de traduction. */
export function useTranslation() {
  const { t } = useContext(LocaleContext);
  return t;
}
