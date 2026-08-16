import { NextRequest, NextResponse } from "next/server";
import { capturePaypalOrder } from "@/lib/paypal";
import { getOrder, updateOrder } from "@/lib/orders";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { localOrderId, paypalOrderId } = body || {};

    if (!localOrderId || !paypalOrderId) {
      return NextResponse.json(
        { error: "Paramètres manquants" },
        { status: 400 }
      );
    }

    const localOrder = getOrder(localOrderId);
    if (!localOrder) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    const result = await capturePaypalOrder(paypalOrderId);

    const captureStatus = result.data?.status;

    if (!result.ok || captureStatus !== "COMPLETED") {
      updateOrder(localOrderId, { status: "FAILED" });
      return NextResponse.json(
        {
          error: "Paiement refusé ou incomplet",
          status: captureStatus || "UNKNOWN",
        },
        { status: 402 }
      );
    }

    const updated = updateOrder(localOrderId, { status: "PAID" });

    return NextResponse.json({
      status: "PAID",
      orderId: updated?.id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erreur lors de la capture du paiement" },
      { status: 500 }
    );
  }
}
