import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "pulse_admin";

export async function POST(req: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD n'est pas configuré côté serveur." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const password = typeof body?.password === "string" ? body.password : "";

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });
  return res;
}