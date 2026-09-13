import { Redis } from "@upstash/redis";

let client: Redis | null = null;

export function getRedis(): Redis {
  if (client) return client;

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Base de données non configurée : ajoute l'intégration \"Upstash for Redis\" " +
        "depuis Vercel → ton projet → Storage → Marketplace Database Providers, " +
        "puis redéploie."
    );
  }

  client = new Redis({ url, token });
  return client;
}
