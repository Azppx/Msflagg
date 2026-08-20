import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/lib/orders";
import { adjustWalletBalance } from "@/lib/accounts";

const COOKIE_NAME = "pulse_admin";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = req.cookies.get(COOKIE_NAME)?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const order = await getOrder(params.id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }

  // Une recharge de portefeuille déjà confirmée ne doit jamais être créditée deux fois.
  if (order.type === "WALLET_RECHARGE" && order.status === "PAID") {
    return NextResponse.json({ ok: true, order });
  }

  const updated = await updateOrder(params.id, { status: "PAID" });

  // Recharge de portefeuille : pas de "livraison" manuelle, on crédite direct
  // et on marque la commande comme traitée.
  if (order.type === "WALLET_RECHARGE" && order.accountId) {
    await adjustWalletBalance(order.accountId, parseFloat(order.amount));
    const delivered = await updateOrder(params.id, {
      fulfillment: "DELIVERED",
      deliveryContent: "Crédité automatiquement sur le portefeuille du client.",
      deliveredAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, order: delivered });
  }

  return NextResponse.json({ ok: true, order: updated });
}
