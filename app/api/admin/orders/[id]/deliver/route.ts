import { NextRequest, NextResponse } from "next/server";
import { getOrder, deliverOrder } from "@/lib/orders";

const COOKIE_NAME = "pulse_admin";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = req.cookies.get(COOKIE_NAME)?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  if (!content) {
    return NextResponse.json({ error: "Contenu de livraison requis." }, { status: 400 });
  }

  const order = await getOrder(params.id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }

  const updated = await deliverOrder(params.id, content);
  return NextResponse.json({ ok: true, order: updated });
}
