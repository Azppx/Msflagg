import { NextRequest, NextResponse } from "next/server";
import { getServerPriceForItems } from "@/lib/pricing";
import { createOrder, generateOrderId } from "@/lib/orders";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const requestedItems = Array.isArray(body?.items) ? body.items : [];
    const customerName = typeof body?.customerName === "string" ? body.customerName : "";
    const customerEmail = typeof body?.customerEmail === "string" ? body.customerEmail : "";
    const customerDateOfBirth =
      typeof body?.customerDateOfBirth === "string" ? body.customerDateOfBirth : "";

    // Le prix n'est JAMAIS lu depuis le corps de la requête : il est
    // recalculé ici, côté serveur, à partir des slugs + quantités uniquement.
    const priced = getServerPriceForItems(
      requestedItems.map((i: any) => ({ slug: i?.slug, quantity: i?.quantity }))
    );

    const order = await createOrder({
      id: generateOrderId(),
      items: priced.items.map((i) => ({
        slug: i.slug,
        name: i.name,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
      })),
      productName: priced.summary,
      amount: priced.amount,
      currency: priced.currency,
      status: "CREATED",
      fulfillment: "PENDING",
      customerName,
      customerEmail,
      customerDateOfBirth,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      orderId: order.id,
      amount: priced.amount,
      currency: priced.currency,
      summary: priced.summary,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erreur lors de la création de la commande" },
      { status: 400 }
    );
  }
}
