"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageNav } from "@/components/PageNav";
import { useAuth } from "@/lib/auth-context";

type StoredOrder = { id: string; productName: string; amount: string; currency: string; date: string };

export default function OrdersPage() {
  const router = useRouter();
  const { account, loading } = useAuth();
  const [orders, setOrders] = useState<StoredOrder[] | null>(null);

  useEffect(() => {
    if (!loading && !account) router.push("/compte/connexion");
  }, [loading, account, router]);

  useEffect(() => {
    if (!account) return;
    try {
      const raw = localStorage.getItem("kyzen-orders");
      setOrders(raw ? JSON.parse(raw) : []);
    } catch {
      setOrders([]);
    }
  }, [account]);

  if (loading || !account) {
    return (
      <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
        <p style={{ fontSize: 14, color: "var(--fog)" }}>Chargement…</p>
      </main>
    );
  }

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Mes commandes" />

      {orders === null && <p style={{ marginTop: 24, fontSize: 14, color: "var(--fog)" }}>Chargement…</p>}

      {orders !== null && orders.length === 0 && (
        <p style={{ marginTop: 24, fontSize: 14, color: "var(--fog)" }}>Aucune commande pour l&apos;instant.</p>
      )}

      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {orders?.map((o) => (
          <Link
            key={o.id}
            href={`/checkout/confirmation?orderId=${o.id}`}
            className="liquid-glass"
            style={{ display: "block", padding: 18, borderRadius: 18, textDecoration: "none", color: "inherit" }}
          >
            <p style={{ fontFamily: "monospace", fontSize: 12, color: "var(--fog)" }}>{o.id}</p>
            <p style={{ fontWeight: 600, fontSize: 14.5, marginTop: 4 }}>{o.productName}</p>
            <p style={{ fontSize: 13, color: "var(--signal)", marginTop: 4 }}>{o.amount} {o.currency}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
