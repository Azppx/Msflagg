/**
 * Comptes clients (email + mot de passe) et portefeuille "crédit interne".
 *
 * ⚠️ Le solde du portefeuille N'EST PAS de la monnaie électronique au sens
 * légal : il ne peut être ni transféré, ni remboursé, ni retiré en cash —
 * uniquement dépensé sur ce site, comme une carte cadeau. C'est un choix
 * volontaire pour éviter d'avoir besoin d'un agrément d'établissement de
 * monnaie électronique (EME). Ne transforme pas ce solde en un vrai système
 * de retrait/transfert sans validation juridique préalable.
 */
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";
import { getRedis } from "./redis";

export type Account = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  walletBalance: number;
  createdAt: string;
};

export type PublicAccount = Omit<Account, "passwordHash">;

const ACCOUNT_PREFIX = "account:";
const EMAIL_INDEX_PREFIX = "account:email:";
const SESSION_PREFIX = "session:";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 jours

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

export function toPublicAccount(account: Account): PublicAccount {
  const { passwordHash, ...pub } = account;
  return pub;
}

export async function createAccount(
  email: string,
  password: string,
  name: string
): Promise<Account> {
  const redis = getRedis();
  const normalizedEmail = email.trim().toLowerCase();

  const existingId = await redis.get<string>(`${EMAIL_INDEX_PREFIX}${normalizedEmail}`);
  if (existingId) {
    throw new Error("Un compte existe déjà avec cet email.");
  }

  const account: Account = {
    id: `usr_${randomUUID()}`,
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    name: name.trim(),
    walletBalance: 0,
    createdAt: new Date().toISOString(),
  };

  await redis.set(`${ACCOUNT_PREFIX}${account.id}`, account);
  await redis.set(`${EMAIL_INDEX_PREFIX}${normalizedEmail}`, account.id);
  return account;
}

export async function getAccountById(id: string): Promise<Account | null> {
  const redis = getRedis();
  return (await redis.get<Account>(`${ACCOUNT_PREFIX}${id}`)) ?? null;
}

export async function getAccountByEmail(email: string): Promise<Account | null> {
  const redis = getRedis();
  const id = await redis.get<string>(`${EMAIL_INDEX_PREFIX}${email.trim().toLowerCase()}`);
  if (!id) return null;
  return getAccountById(id);
}

export async function verifyLogin(email: string, password: string): Promise<Account | null> {
  const account = await getAccountByEmail(email);
  if (!account) return null;
  if (!verifyPassword(password, account.passwordHash)) return null;
  return account;
}

/**
 * Modifie le solde crédit de `delta` (positif pour créditer, négatif pour débiter).
 * Le solde ne descend jamais sous 0.
 */
export async function adjustWalletBalance(
  accountId: string,
  delta: number
): Promise<Account | null> {
  const redis = getRedis();
  const account = await getAccountById(accountId);
  if (!account) return null;
  const nextBalance = Math.max(0, Math.round((account.walletBalance + delta) * 100) / 100);
  const updated = { ...account, walletBalance: nextBalance };
  await redis.set(`${ACCOUNT_PREFIX}${accountId}`, updated);
  return updated;
}

// --- Sessions ---

export async function createSession(accountId: string): Promise<string> {
  const redis = getRedis();
  const token = randomUUID();
  await redis.set(`${SESSION_PREFIX}${token}`, accountId, { ex: SESSION_TTL_SECONDS });
  return token;
}

export async function getAccountFromSessionToken(
  token: string | undefined | null
): Promise<Account | null> {
  if (!token) return null;
  const redis = getRedis();
  const accountId = await redis.get<string>(`${SESSION_PREFIX}${token}`);
  if (!accountId) return null;
  return getAccountById(accountId);
}

export async function destroySession(token: string): Promise<void> {
  const redis = getRedis();
  await redis.del(`${SESSION_PREFIX}${token}`);
}
