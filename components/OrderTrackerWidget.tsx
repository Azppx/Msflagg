"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getTrackedOrders, untrackOrder, TrackedOrder } from "@/lib/order-tracking";
import type { Order } from "@/lib/orders";

type TrackedWithOrder = TrackedOrder & { order: Order | null };

export function OrderTrackerWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [tracked, setTracked] = useState<TrackedWithOrder[]>([]);

  const refresh = useCallback(async () => {
    const base = getTrackedOrders();
    if (base.length === 0) {
      setTracked([]);
      return;
    }
    const results = await Promise.all(
      base.map(async (t) => {
        try {
          const res = await fetch(`/api/orders/${t.id}`, { cache: "no-store" });
          if (!res.ok) return { ...t, order: null };
          const order = (await res.json()) as Order;
          return { ...t, order };
        } catch {
          return { ...t, order: null };
        }
      })
    );
    setTracked(results);
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();
    const interval = setInterval(refresh, 30000);
    // Se met aussi à jour quand on revient sur l'onglet, pour un statut frais.
    function onFocus() {
      refresh();
    }
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  if (!mounted || tracked.length === 0) return null;

  const pendingCount = tracked.filter(
    (t) => !t.order || !(t.order.status === "PAID" && t.order.fulfillment === "DELIVERED")
  ).length;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Mes commandes en cours"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl border border-panelBorder bg-midnight/95 text-2xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        📦
        {pendingCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-black">
            {pendingCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="glass-panel max-h-[80vh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-panelBorder p-5 sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl">MES COMMANDES</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {tracked.map((t) => (
                <TrackedOrderRow
                  key={t.id}
                  tracked={t}
                  onRemove={() => {
                    untrackOrder(t.id);
                    refresh();
                  }}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TrackedOrderRow({
  tracked,
  onRemove,
  onNavigate,
}: {
  tracked: TrackedWithOrder;
  onRemove: () => void;
  onNavigate: () => void;
}) {
  const { id, order } = tracked;
  const { label, tone } = statusInfo(order);

  return (
    <div className="rounded-xl border border-panelBorder bg-white/5 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs text-white/50">{id}</p>
          <p className="mt-1 font-semibold">{order ? summarize(order) : "Commande introuvable"}</p>
        </div>
        <button
          onClick={onRemove}
          aria-label="Retirer du suivi"
          className="shrink-0 text-xs text-white/30 hover:text-white/60"
        >
          ✕
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${tone}`}
        >
          {label}
        </span>
        <Link
          href={`/checkout/confirmation?orderId=${id}`}
          onClick={onNavigate}
          className="text-xs font-semibold text-electric-soft"
        >
          Voir →
        </Link>
      </div>
    </div>
  );
}

function summarize(order: Order): string {
  if (order.items && order.items.length > 0) {
    if (order.items.length === 1) {
      const it = order.items[0];
      return `${it.name}${it.quantity > 1 ? ` ×${it.quantity}` : ""}`;
    }
    return `${order.items[0].name} + ${order.items.length - 1} autre(s)`;
  }
  return order.productName || "Commande";
}

function statusInfo(order: Order | null): { label: string; tone: string } {
  if (!order) {
    return { label: "INTROUVABLE", tone: "border-panelBorder text-white/40" };
  }
  if (order.status === "PAID" && order.fulfillment === "DELIVERED") {
    return { label: "LIVRÉE ✓", tone: "border-electric/40 bg-electric/10 text-electric-soft" };
  }
  if (order.status === "PAID") {
    return {
      label: "EN COURS DE LIVRAISON",
      tone: "border-accent/40 bg-accent/10 text-accent-soft",
    };
  }
  if (order.status === "AWAITING_VERIFICATION") {
    return {
      label: "VÉRIFICATION EN COURS",
      tone: "border-accent/40 bg-accent/10 text-accent-soft",
    };
  }
  if (order.status === "FAILED") {
    return { label: "ÉCHOUÉE", tone: "border-danger/40 bg-danger/10 text-danger" };
  }
  return {
    label: "EN ATTENTE DE PAIEMENT",
    tone: "border-white/20 bg-white/5 text-white/50",
  };
}
