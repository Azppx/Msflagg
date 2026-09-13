"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(`/api/admin/orders/${orderId}/delete`, { method: "POST" });
    setLoading(false);
    if (res.ok) router.refresh();
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-xs font-semibold text-white/30 hover:text-danger"
      >
        Supprimer
      </button>
    );
  }

  return (
    <span className="flex items-center gap-2 text-xs">
      <span className="text-white/50">Confirmer ?</span>
      <button onClick={handleDelete} disabled={loading} className="font-semibold text-danger">
        {loading ? "…" : "Oui"}
      </button>
      <button onClick={() => setConfirming(false)} className="text-white/40">
        Annuler
      </button>
    </span>
  );
}
