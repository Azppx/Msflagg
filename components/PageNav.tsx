"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";

export function PageNav({ title }: { title: string }) {
  const router = useRouter();

  return (
    <nav
      className="liquid-glass liquid-glass--signal"
      style={{
        position: "sticky",
        top: 12,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        borderRadius: 20,
        marginBottom: 12,
      }}
    >
      <button
        onClick={() => router.back()}
        aria-label="Retour"
        className="liquid-glass"
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--fog)",
          cursor: "pointer",
        }}
      >
        <ArrowLeftIcon width={16} height={16} />
      </button>
      <p className="font-display" style={{ fontWeight: 700, fontSize: 16 }}>{title}</p>
      <div style={{ width: 38 }} />
    </nav>
  );
}
