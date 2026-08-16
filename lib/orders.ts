/**
 * Stockage des commandes.
 *
 * Implémentation en mémoire fournie pour que le projet soit exécutable
 * immédiatement. En production, remplace ce module par une vraie base
 * de données (Postgres, SQLite, Supabase, etc.) — l'interface ci-dessous
 * reste la même, seule l'implémentation change.
 */

export type Order = {
  id: string;
  productSlug: string;
  productName: string;
  amount: string;
  currency: string;
  status: "CREATED" | "PAID" | "FAILED";
  paypalOrderId?: string;
  customerEmail?: string;
  createdAt: string;
};

const orders = new Map<string, Order>();

export function createOrder(order: Order) {
  orders.set(order.id, order);
  return order;
}

export function getOrder(id: string) {
  return orders.get(id) || null;
}

export function updateOrder(id: string, patch: Partial<Order>) {
  const existing = orders.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  orders.set(id, updated);
  return updated;
}

export function generateOrderId() {
  return `CMD-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}
