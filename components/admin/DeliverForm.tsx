"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeliverForm({
  orderId,
  alreadyDelivered,
  existingContent,
}: {
  orderId: string;
  alreadyDelivered: boolean;
  existingContent?: string;
}) {
  const router = useRouter();
  const [content, setContent] = useState(existingContent || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      setError("Renseigne le contenu à livrer (identifiants, lien, instructions...).");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Erreur lors de la livraison.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-panelBorder bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-electric"
        placeholder="Identifiants, lien de téléchargement, instructions..."
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="self-start rounded-xl bg-electric px-4 py-2 text-xs font-bold tracking-wide text-white transition-colors duration-200 hover:bg-electric-soft disabled:opacity-50"
      >
        {loading ? "Envoi…" : alreadyDelivered ? "Mettre à jour la livraison" : "Marquer comme livré"}
      </button>
    </form>
  );
}
