import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";
import { getStripeClient, isStripeEnabled } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!isStripeEnabled()) {
    return NextResponse.json(
      { error: "Le paiement par carte n'est pas disponible pour le moment." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const orderId = typeof body?.orderId === "string" ? body.orderId : "";
    if (!orderId) {
      return NextResponse.json({ error: "orderId manquant" }, { status: 400 });
    }

    // Le montant n'est jamais lu depuis le client : on relit la commande
    // déjà créée côté serveur (via /api/orders/create) pour connaître le
    // montant qui fait foi.
    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    const stripe = getStripeClient();
    const origin = req.headers.get("origin") || new URL(req.url).origin;
    const amountInCents = Math.round(parseFloat(order.amount) * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: order.currency.toLowerCase(),
            product_data: { name: order.productName },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      customer_email: order.customerEmail || undefined,
      metadata: { orderId: order.id },
      success_url: `${origin}/checkout/confirmation?orderId=${order.id}`,
      cancel_url: `${origin}/checkout/paiement?item=${order.productSlug}&name=${encodeURIComponent(
        order.customerName || ""
      )}&email=${encodeURIComponent(order.customerEmail || "")}`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Erreur lors de la création du paiement" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
