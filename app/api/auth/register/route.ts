import { NextRequest, NextResponse } from "next/server";
import { createAccount, createSession, toPublicAccount } from "@/lib/accounts";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!email.includes("@") || password.length < 8 || name.length < 2) {
    return NextResponse.json(
      { error: "Email valide, nom et mot de passe (8 caractères min.) requis." },
      { status: 400 }
    );
  }

  try {
    const account = await createAccount(email, password, name);
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
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erreur lors de la création du compte." },
      { status: 400 }
    );
  }
}
