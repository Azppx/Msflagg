/**
 * Stockage des commandes — Upstash Redis (via l'intégration Vercel Marketplace
 * "Upstash for Redis"). Persiste réellement les commandes entre les requêtes,
 * contrairement à un stockage en mémoire qui se réinitialise sur Vercel.
 *
 * Configuration requise (Vercel → Storage → ajouter "Upstash for Redis") :
 * ça injecte automatiquement les variables d'environnement nécessaires.
 */

import { Redis } from "@upstash/redis";

export type OrderItem = {
  slug: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  productSlug?: string;
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
  type?: "PURCHASE" | "WALLET_RECHARGE";
  accountId?: string;
};

const ORDER_PREFIX = "order:";
const INDEX_KEY = "orders:index";

let redisClient: Redis | null = null;

function getRedis(): Redis {
  if (redisClient) return redisClient;

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Base de données non configurée : ajoute l'intégration \"Upstash for Redis\" " +
        "depuis Vercel → ton projet → Storage → Marketplace Database Providers, " +
        "puis redéploie."
    );
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

export async function createOrder(order: Order): Promise<Order> {
  const redis = getRedis();
  await redis.set(`${ORDER_PREFIX}${order.id}`, order);
  await redis.zadd(INDEX_KEY, { score: Date.parse(order.createdAt), member: order.id });
  if (order.accountId) {
    await redis.zadd(`orders:by-account:${order.accountId}`, {
      score: Date.parse(order.createdAt),
      member: order.id,
    });
  }
  return order;
}

export async function listOrdersByAccount(accountId: string): Promise<Order[]> {
  const redis = getRedis();
  const ids = await redis.zrange<string[]>(`orders:by-account:${accountId}`, 0, -1, {
    rev: true,
  });
  if (!ids || ids.length === 0) return [];
  const orders = await Promise.all(ids.map((id) => getOrder(id)));
  return orders.filter((o): o is Order => o !== null);
}

export async function getOrder(id: string): Promise<Order | null> {
  const redis = getRedis();
  const order = await redis.get<Order>(`${ORDER_PREFIX}${id}`);
  return order ?? null;
}

export async function listOrders(): Promise<Order[]> {
  const redis = getRedis();
  const ids = await redis.zrange<string[]>(INDEX_KEY, 0, -1, { rev: true });
  if (!ids || ids.length === 0) return [];
  const orders = await Promise.all(ids.map((id) => getOrder(id)));
  return orders.filter((o): o is Order => o !== null);
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  const existing = await getOrder(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  const redis = getRedis();
  await redis.set(`${ORDER_PREFIX}${id}`, updated);
  return updated;
}

export async function deliverOrder(id: string, content: string): Promise<Order | null> {
  return updateOrder(id, {
    fulfillment: "DELIVERED",
    deliveryContent: content,
    deliveredAt: new Date().toISOString(),
  });
}

export function generateOrderId() {
  return `PLS-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}
