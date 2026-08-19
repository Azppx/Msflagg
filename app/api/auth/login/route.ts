import { NextRequest, NextResponse } from "next/server";
import { verifyLogin, createSession, toPublicAccount } from "@/lib/accounts";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
  }

  const account = await verifyLogin(email, password);
  if (!account) {
    return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
  }

  const token = await createSession(account.id);
  const res = NextResponse.json({ account: toPublicAccount(account) });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

