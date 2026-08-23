"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const EXPAND_MS = 420;
const SHRINK_MS = 500;

export function PageTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [radius, setRadius] = useState("0%");
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const pendingHref = useRef<string | null>(null);
  const navigatedRef = useRef(false);

  // Intercepte les clics sur tout lien interne du site, où qu'il soit.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (anchor.target === "_blank") return;
      if (href === pathname) return;

      e.preventDefault();

      const rect = anchor.getBoundingClientRect();
      setOrigin({
        x: `${rect.left + rect.width / 2}px`,
        y: `${rect.top + rect.height / 2}px`,
      });
      pendingHref.current = href;
      navigatedRef.current = false;
      setRadius("0%");
      setActive(true);

      // Double rAF : laisse le navigateur peindre le cercle à radius 0 avant
      // de lancer la transition vers 150%, sinon le navigateur fusionne les
      // deux états et l'animation ne se joue pas.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setRadius("150%"));
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Une fois le cercle a fini de recouvrir l'écran, on navigue réellement.
  useEffect(() => {
    if (!active || radius !== "150%" || navigatedRef.current) return;
    navigatedRef.current = true;
    const t = setTimeout(() => {
      if (pendingHref.current) router.push(pendingHref.current);
    }, EXPAND_MS);
    return () => clearTimeout(t);
  }, [radius, active, router]);

  // Dès que la nouvelle page est montée (le pathname a changé), on referme
  // le cercle pour la révéler.
  useEffect(() => {
    if (!navigatedRef.current) return;
    setRadius("0%");
    const t = setTimeout(() => {
      setActive(false);
      navigatedRef.current = false;
    }, SHRINK_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!active) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95]"
      style={{
        clipPath: `circle(${radius} at ${origin.x} ${origin.y})`,
        transition: `clip-path ${radius === "150%" ? EXPAND_MS : SHRINK_MS}ms cubic-bezier(0.65,0,0.35,1)`,
        background:
          "radial-gradient(circle at center, rgba(139,53,255,0.35), rgba(8,5,13,0.98) 70%)",
      }}
    />
  );
}
