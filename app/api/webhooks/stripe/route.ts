import { NextRequest, NextResponse } from "next/server";
import { updateOrder } from "@/lib/orders";
import { getStripeClient, isStripeEnabled } from "@/lib/stripe";

// Stripe a besoin du corps brut (non parsé) pour vérifier la signature.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!isStripeEnabled() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook Stripe non configuré." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  const rawBody = await req.text();
  const stripe = getStripeClient();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return NextResponse.json({ error: `Signature invalide: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { metadata?: { orderId?: string }; payment_status?: string };
    const orderId = session.metadata?.orderId;
    if (orderId && session.payment_status === "paid") {
      await updateOrder(orderId, { status: "PAID" });
    }
  }

  return NextResponse.json({ received: true });
}
