import { NextRequest, NextResponse } from "next/server";
import { getAccountFromSessionToken, toPublicAccount } from "@/lib/accounts";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const account = await getAccountFromSessionToken(token);
  if (!account) return NextResponse.json({ account: null });
  return NextResponse.json({ account: toPublicAccount(account) });
}

