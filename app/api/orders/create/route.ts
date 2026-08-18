import { NextRequest, NextResponse } from "next/server";
import { getServerPrice } from "@/lib/pricing";
import { createOrder } from "@/lib/orders";

function generateOrderId() {
  return `PLS-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productSlug = body?.productSlug;
    const customerName = typeof body?.customerName === "string" ? body.customerName : "";
    const customerEmail = typeof body?.customerEmail === "string" ? body.customerEmail : "";

    // Le prix n'est JAMAIS lu depuis le corps de la requête : il est
    // recalculé ici, côté serveur, à partir du slug produit uniquement.
    const price = getServerPrice(productSlug);

    const order = await createOrder({
      id: generateOrderId(),
      productSlug,
      productName: price.name,
      amount: price.amount,
      currency: price.currency,
      status: "CREATED",
      fulfillment: "PENDING",
      customerName,
      customerEmail,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ orderId: order.id, amount: price.amount, currency: price.currency });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erreur lors de la création de la commande" },
      { status: 400 }
    );
  }
}
