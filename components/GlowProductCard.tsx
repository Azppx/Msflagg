"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";

// Mapping des couleurs par "tone" du catalogue
const toneStyles: Record<string, { border: string; shadow: string; text: string; glow: string }> = {
  electric: {
    border: "hover:border-[#FF2D78]/50",
    shadow: "hover:shadow-[0_12px_35px_rgba(255,45,120,0.18)]",
    text: "text-[#FF2D78]",
    glow: "rgba(255,45,120,0.4)",
  },
  violet: {
    border: "hover:border-[#D6336C]/50",
    shadow: "hover:shadow-[0_12px_35px_rgba(214,51,108,0.18)]",
    text: "text-[#D6336C]",
    glow: "rgba(214,51,108,0.4)",
  },
  gold: {
    border: "hover:border-[#FF4D6D]/50",
    shadow: "hover:shadow-[0_12px_35px_rgba(255,77,109,0.18)]",
    text: "text-[#FF4D6D]",
    glow: "rgba(255,77,109,0.4)",
  },
  teal: {
    border: "hover:border-[#C2185B]/50",
    shadow: "hover:shadow-[0_12px_35px_rgba(194,24,91,0.18)]",
    text: "text-[#C2185B]",
    glow: "rgba(194,24,91,0.4)",
  },
  danger: {
    border: "hover:border-[#FF3B3B]/50",
    shadow: "hover:shadow-[0_12px_35px_rgba(255,59,59,0.18)]",
    text: "text-[#FF3B3B]",
    glow: "rgba(255,59,59,0.4)",
  },
  accent: {
    border: "hover:border-[#EC1663]/50",
    shadow: "hover:shadow-[0_12px_35px_rgba(236,22,99,0.18)]",
    text: "text-[#EC1663]",
    glow: "rgba(236,22,99,0.4)",
  },
  green: {
    border: "hover:border-[#FF2D78]/50",
    shadow: "hover:shadow-[0_12px_35px_rgba(255,45,120,0.18)]",
    text: "text-[#FF2D78]",
    glow: "rgba(255,45,120,0.4)",
  },
};

export function GlowProductCard({
  item,
  index,
}: {
  item: CatalogProduct;
  index?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const tone = toneStyles[item.tone] || toneStyles.electric;
  const num = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  // Vérifie si un vrai logo est disponible, sinon on utilise l'icône SVG
  const hasLogo = !!item.logo;

  return (
    <Link
      href={`/produit/${item.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#14141c] to-[#0f0f15] shadow-lg transition-all duration-500 ease-out hover:-translate-y-1.5 ${tone.border} ${tone.shadow}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge numéro + prix en haut */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
        {num && (
          <span className="rounded-full border border-white/10 bg-black/40 px-2 py-1 text-[10px] font-bold tracking-wider text-white/60 backdrop-blur-sm">
            {num}
          </span>
        )}
      </div>
      <span className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-bold text-white/90 backdrop-blur-sm">
        {item.priceTotal}€
      </span>

      {/* Zone du Logo / Icône */}
      <div className="flex h-28 shrink-0 items-center justify-center border-b border-white/5 bg-white/[0.02] p-4 transition-colors duration-300 group-hover:bg-white/[0.04]">
        {hasLogo ? (
          <div className="relative h-14 w-full">
            <Image
              src={item.logo!}
              alt={item.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className={`text-5xl font-black opacity-20 transition-transform duration-500 group-hover:scale-110 ${tone.text}`}>
            {item.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Contenu Texte */}
      <div className="flex grow flex-col p-5">
        <h3 className="mb-2 text-[15px] font-bold leading-tight text-white">
          {item.name}
        </h3>

        {/* Détails qui apparaissent au survol */}
        <div
          className={`flex grow flex-col gap-2 transition-all duration-500 ease-out ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-[12.5px] leading-relaxed text-gray-400 line-clamp-3">
            {item.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className={`text-lg font-extrabold ${tone.text}`}>
              {item.priceTotal}€
            </span>
            <span className={`text-[12px] font-bold transition-all duration-300 group-hover:tracking-wider ${tone.text}`}>
              Découvrir ↗
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}