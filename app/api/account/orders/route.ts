import { NextRequest, NextResponse } from "next/server";
import { getAccountFromSessionToken } from "@/lib/accounts";
import { listOrdersByAccount } from "@/lib/orders";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const account = await getAccountFromSessionToken(token);
  if (!account) return NextResponse.json({ error: "Non connecté." }, { status: 401 });

  const orders = await listOrdersByAccount(account.id);
  return NextResponse.json({ orders });
}

