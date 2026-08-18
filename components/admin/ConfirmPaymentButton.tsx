"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ConfirmPaymentButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/admin/orders/${orderId}/confirm-payment`, {
      method: "POST",
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Erreur.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="mt-3">
      <button
        onClick={handleConfirm}
        disabled={loading}
        className="rounded-xl bg-accent px-4 py-2 text-xs font-bold tracking-wide text-black transition-colors duration-200 hover:bg-accent-soft disabled:opacity-50"
      >
        {loading ? "…" : "Confirmer paiement reçu"}
      </button>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
