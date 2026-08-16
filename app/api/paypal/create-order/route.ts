import { NextRequest, NextResponse } from "next/server";
import { getServerPrice } from "@/lib/pricing";
import { createPaypalOrder } from "@/lib/paypal";
import { createOrder, generateOrderId } from "@/lib/orders";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productSlug = body?.productSlug;

    // Le prix n'est JAMAIS lu depuis le corps de la requête : il est
    // recalculé ici, côté serveur, à partir du slug produit uniquement.
    const price = getServerPrice(productSlug);

    const localOrderId = generateOrderId();

    const paypalOrder = await createPaypalOrder({
      amount: price.amount,
      currency: price.currency,
      reference: localOrderId,
      description: price.name,
    });

    createOrder({
      id: localOrderId,
      productSlug,
      productName: price.name,
      amount: price.amount,
      currency: price.currency,
      status: "CREATED",
      paypalOrderId: paypalOrder.id,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      localOrderId,
      paypalOrderId: paypalOrder.id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erreur lors de la création de la commande" },
      { status: 400 }
    );
  }
}
