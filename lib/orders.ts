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
  status: "CREATED" | "AWAITING_VERIFICATION" | "PAID" | "FAILED";
  fulfillment: "PENDING" | "DELIVERED";
  deliveryContent?: string;
  deliveredAt?: string;
  customerName?: string;
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

export function listOrders(): Order[] {
  return Array.from(orders.values()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function updateOrder(id: string, patch: Partial<Order>) {
  const existing = orders.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  orders.set(id, updated);
  return updated;
}

export function deliverOrder(id: string, content: string) {
  return updateOrder(id, {
    fulfillment: "DELIVERED",
    deliveryContent: content,
    deliveredAt: new Date().toISOString(),
  });
}

export function generateOrderId() {
  return `CMD-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}
