"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth-context";
import type { Order } from "@/lib/orders";

export default function CommandesPage() {
  const router = useRouter();
  const { account, loading } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (!loading && !account) router.push("/compte/connexion");
  }, [loading, account, router]);

  useEffect(() => {
    if (!account) return;
    fetch("/api/account/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []));
  }, [account]);

  if (loading || !account) {
    return (
      <main className="mx-auto min-h-screen max-w-md px-5 pb-16 pt-12">
        <p className="text-sm text-white/40">Chargement…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="MON COMPTE" title="MES COMMANDES" backHref="/compte" />
      <div className="px-5">
        {orders === null && <p className="text-sm text-white/40">Chargement…</p>}

        {orders !== null && orders.length === 0 && (
          <p className="text-sm text-white/40">Aucune commande pour l'instant.</p>
        )}

        <div className="space-y-3">
          {orders?.map((o) => (
            <Link
              key={o.id}
              href={`/checkout/confirmation?orderId=${o.id}`}
              className="glass-panel block rounded-xl2 border border-panelBorder p-4 transition-colors hover:bg-white/5"
            >
              <p className="font-mono text-xs text-white/40">{o.id}</p>
              <p className="mt-1 font-semibold">{o.productName}</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-white/50">{o.amount} {o.currency}</span>
                <span className="text-white/40">
                  {o.status === "PAID" && o.fulfillment === "DELIVERED"
                    ? "Livrée ✓"
                    : o.status === "PAID"
                    ? "En cours"
                    : "En attente"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
