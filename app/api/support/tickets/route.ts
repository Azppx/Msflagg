import { NextRequest, NextResponse } from "next/server";
import { createTicket } from "@/lib/tickets";
import { getAccountFromSessionToken } from "@/lib/accounts";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const subject = typeof body?.subject === "string" ? body.subject.trim() : "Demande de support";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  let customerName = typeof body?.name === "string" ? body.name.trim() : "";
  let customerEmail = typeof body?.email === "string" ? body.email.trim() : "";
  const customerDateOfBirth = typeof body?.dob === "string" ? body.dob.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Un message est requis." }, { status: 400 });
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const account = await getAccountFromSessionToken(token);
  if (account) {
    customerName = account.name;
    customerEmail = account.email;
  }

  if (!customerName || !customerEmail.includes("@")) {
    return NextResponse.json({ error: "Nom et email valides requis." }, { status: 400 });
  }

  const ticket = await createTicket({
    subject,
    customerName,
    customerEmail,
    customerDateOfBirth,
    accountId: account?.id,
    firstMessage: message,
  });

  return NextResponse.json({ ticket });
}
