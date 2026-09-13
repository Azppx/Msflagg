import { NextRequest, NextResponse } from "next/server";
import { getTicket, addTicketMessage } from "@/lib/tickets";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const ticket = await getTicket(params.id);
  if (!ticket) return NextResponse.json({ error: "Ticket introuvable." }, { status: 404 });
  return NextResponse.json({ ticket });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => ({}));
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text) return NextResponse.json({ error: "Message vide." }, { status: 400 });

  const ticket = await addTicketMessage(params.id, "customer", text);
  if (!ticket) return NextResponse.json({ error: "Ticket introuvable." }, { status: 404 });
  return NextResponse.json({ ticket });
}
