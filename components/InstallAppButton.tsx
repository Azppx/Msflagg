"use client";

import { useEffect, useState } from "react";

export function InstallAppButton({ className }: { className?: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream);

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e);
    }
    function onInstalled() {
      setInstalled(true);
      setDeferredPrompt(null);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function handleClick() {
    if (isIOS) {
      setShowIOSHint(true);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }

  if (installed) return null;
  if (!isIOS && !deferredPrompt) return null; // pas d'invite dispo (déjà installé, ou navigateur non compatible)

  return (
    <>
      <button
        onClick={handleClick}
        className={
          className ||
          "flex items-center gap-2 rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
        }
      >
        ⬇ Installer l'appli
      </button>

      {showIOSHint && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          onClick={() => setShowIOSHint(false)}
        >
          <div
            className="glass-panel max-w-xs rounded-xl2 border border-panelBorder p-5 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-semibold">Installer sur iPhone</p>
            <p className="mt-2 text-sm text-white/60">
              Appuie sur l'icône Partager <span className="font-bold">⬆</span> en bas de Safari,
              puis « Sur l'écran d'accueil ».
            </p>
            <button
              onClick={() => setShowIOSHint(false)}
              className="mt-4 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-black"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}
