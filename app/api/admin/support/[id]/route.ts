import { NextRequest, NextResponse } from "next/server";
import { addTicketMessage, closeTicket } from "@/lib/tickets";

const COOKIE_NAME = "pulse_admin";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = req.cookies.get(COOKIE_NAME)?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  if (body?.action === "close") {
    const ticket = await closeTicket(params.id);
    return NextResponse.json({ ticket });
  }

  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text) return NextResponse.json({ error: "Message vide." }, { status: 400 });

  const ticket = await addTicketMessage(params.id, "admin", text);
  if (!ticket) return NextResponse.json({ error: "Ticket introuvable." }, { status: 404 });
  return NextResponse.json({ ticket });
}

