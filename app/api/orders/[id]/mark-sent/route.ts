import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/lib/orders";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = await getOrder(params.id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }
  const updated = await updateOrder(params.id, { status: "AWAITING_VERIFICATION" });
  return NextResponse.json({ ok: true, order: updated });
}
