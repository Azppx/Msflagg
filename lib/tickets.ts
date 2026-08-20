import { randomUUID } from "crypto";
import { getRedis } from "./redis";

export type TicketMessage = {
  id: string;
  from: "customer" | "admin";
  text: string;
  createdAt: string;
};

export type Ticket = {
  id: string;
  subject: string;
  customerName: string;
  customerEmail: string;
  accountId?: string;
  status: "OPEN" | "CLOSED";
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
};

const TICKET_PREFIX = "ticket:";
const INDEX_KEY = "tickets:index";

export async function createTicket(input: {
  subject: string;
  customerName: string;
  customerEmail: string;
  accountId?: string;
  firstMessage: string;
}): Promise<Ticket> {
  const redis = getRedis();
  const now = new Date().toISOString();
  const ticket: Ticket = {
    id: `TCK-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`,
    subject: input.subject,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    accountId: input.accountId,
    status: "OPEN",
    messages: [{ id: randomUUID(), from: "customer", text: input.firstMessage, createdAt: now }],
    createdAt: now,
    updatedAt: now,
  };
  await redis.set(`${TICKET_PREFIX}${ticket.id}`, ticket);
  await redis.zadd(INDEX_KEY, { score: Date.parse(now), member: ticket.id });
  return ticket;
}

export async function getTicket(id: string): Promise<Ticket | null> {
  const redis = getRedis();
  return (await redis.get<Ticket>(`${TICKET_PREFIX}${id}`)) ?? null;
}

export async function listTickets(): Promise<Ticket[]> {
  const redis = getRedis();
  const ids = await redis.zrange<string[]>(INDEX_KEY, 0, -1, { rev: true });
  if (!ids || ids.length === 0) return [];
  const tickets = await Promise.all(ids.map((id) => getTicket(id)));
  return tickets.filter((t): t is Ticket => t !== null);
}

export async function addTicketMessage(
  id: string,
  from: "customer" | "admin",
  text: string
): Promise<Ticket | null> {
  const redis = getRedis();
  const ticket = await getTicket(id);
  if (!ticket) return null;
  const now = new Date().toISOString();
  const updated: Ticket = {
    ...ticket,
    messages: [...ticket.messages, { id: randomUUID(), from, text, createdAt: now }],
    updatedAt: now,
  };
  await redis.set(`${TICKET_PREFIX}${id}`, updated);
  return updated;
}

export async function closeTicket(id: string): Promise<Ticket | null> {
  const redis = getRedis();
  const ticket = await getTicket(id);
  if (!ticket) return null;
  const updated: Ticket = { ...ticket, status: "CLOSED", updatedAt: new Date().toISOString() };
  await redis.set(`${TICKET_PREFIX}${id}`, updated);
  return updated;
}
