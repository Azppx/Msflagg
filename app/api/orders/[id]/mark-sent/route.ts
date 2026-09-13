import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/lib/orders";
import { notifyOrderPending } from "@/lib/email";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = await getOrder(params.id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }
  const updated = await updateOrder(params.id, { status: "AWAITING_VERIFICATION" });
  if (updated) {
    notifyOrderPending({
      id: updated.id,
      amount: updated.amount,
      currency: updated.currency,
      productName: updated.productName,
      customerName: updated.customerName,
      customerEmail: updated.customerEmail,
    });
  }
  return NextResponse.json({ ok: true, order: updated });
}
