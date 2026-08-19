import { NextRequest, NextResponse } from "next/server";
import { getAccountFromSessionToken } from "@/lib/accounts";
import { createOrder, generateOrderId } from "@/lib/orders";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const account = await getAccountFromSessionToken(token);
  if (!account) {
    return NextResponse.json({ error: "Connecte-toi pour recharger ton portefeuille." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const amount = Math.round(Number(body?.amount) * 100) / 100;

  if (!Number.isFinite(amount) || amount < 5 || amount > 500) {
    return NextResponse.json({ error: "Montant invalide (entre 5€ et 500€)." }, { status: 400 });
  }

  const order = await createOrder({
    id: generateOrderId(),
    items: [
      {
        slug: "wallet-recharge",
        name: "Recharge portefeuille Qulse",
        unitPrice: amount,
        quantity: 1,
      },
    ],
    productName: `Recharge portefeuille — ${amount.toFixed(2)} €`,
    amount: amount.toFixed(2),
    currency: "EUR",
    status: "CREATED",
    fulfillment: "PENDING",
    customerName: account.name,
    customerEmail: account.email,
    createdAt: new Date().toISOString(),
    type: "WALLET_RECHARGE",
    accountId: account.id,
  });

  return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency });
}

