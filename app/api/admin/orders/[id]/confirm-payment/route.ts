import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/lib/orders";

const COOKIE_NAME = "pulse_admin";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = req.cookies.get(COOKIE_NAME)?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const order = getOrder(params.id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }

  const updated = updateOrder(params.id, { status: "PAID" });
  return NextResponse.json({ ok: true, order: updated });
}
