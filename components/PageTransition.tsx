"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Stage = "idle" | "leaving" | "entering";

const LEAVE_MS = 300;
const ENTER_MS = 380;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [stage, setStage] = useState<Stage>("idle");
  const pendingHref = useRef<string | null>(null);
  const stageRef = useRef<Stage>("idle");

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Intercepte les clics sur tout lien interne du site.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (stageRef.current !== "idle") return;
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (anchor.target === "_blank") return;
      if (href === pathname) return;

      e.preventDefault();
      pendingHref.current = href;
      setStage("leaving");
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Le contenu actuel s'estompe/se floute, puis on navigue réellement.
  useEffect(() => {
    if (stage !== "leaving") return;
    const t = setTimeout(() => {
      if (pendingHref.current) router.push(pendingHref.current);
      setStage("entering");
    }, LEAVE_MS);
    return () => clearTimeout(t);
  }, [stage, router]);

  // La nouvelle page (déjà montée sous le contenu flouté) redevient nette.
  useEffect(() => {
    if (stage !== "entering") return;
    const t = setTimeout(() => {
      setStage("idle");
      pendingHref.current = null;
    }, ENTER_MS);
    return () => clearTimeout(t);
  }, [stage]);

  // Sécurité anti-blocage.
  useEffect(() => {
    if (stage === "idle") return;
    const t = setTimeout(() => {
      setStage("idle");
      pendingHref.current = null;
    }, 3000);
    return () => clearTimeout(t);
  }, [stage]);

  const leaving = stage === "leaving";

  return (
    <>
      {/* Fine barre de progression, discrète, en haut de l'écran */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-[2px] rounded-r-full"
        style={{
          width: stage === "idle" ? "0%" : stage === "leaving" ? "65%" : "100%",
          opacity: stage === "idle" ? 0 : 1,
          background: "linear-gradient(90deg, #8b35ff, #b85cff)",
          boxShadow: "0 0 10px 1px rgba(139,53,255,0.75)",
          transition:
            stage === "leaving"
              ? `width ${LEAVE_MS}ms ease-out`
              : stage === "entering"
              ? `width ${ENTER_MS * 0.5}ms ease-out, opacity ${ENTER_MS * 0.5}ms ease ${ENTER_MS * 0.5}ms`
              : "none",
        }}
      />

      {/* Contenu de la page : fondu + léger flou + zoom, sans voile coloré */}
      <div
        style={{
          opacity: leaving ? 0 : 1,
          filter: leaving ? "blur(7px)" : "blur(0px)",
          transform: leaving ? "scale(0.975)" : "scale(1)",
          transition:
            stage === "idle"
              ? "none"
              : `opacity ${leaving ? LEAVE_MS : ENTER_MS}ms ease, filter ${
                  leaving ? LEAVE_MS : ENTER_MS
                }ms ease, transform ${leaving ? LEAVE_MS : ENTER_MS}ms cubic-bezier(0.22,1,0.36,1)`,
        }}
      >
        {children}
      </div>
    </>
  );
}
