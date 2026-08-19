/**
 * Intégration Stripe (paiement par carte bancaire).
 * Vient s'ajouter au virement Wise existant — les deux moyens de paiement
 * cohabitent, le client choisit celui qu'il préfère à l'étape paiement.
 *
 * Variables d'environnement requises (Vercel → Settings → Environment Variables) :
 *  - STRIPE_SECRET_KEY      : clé secrète Stripe (sk_live_... / sk_test_...)
 *  - STRIPE_WEBHOOK_SECRET  : secret du endpoint webhook (whsec_...), généré
 *                             quand tu crées le webhook dans le dashboard Stripe
 *                             pointant vers /api/webhooks/stripe
 *
 * Si STRIPE_SECRET_KEY n'est pas configuré, l'option carte bancaire est
 * simplement masquée côté client et seul Wise reste disponible — rien ne casse.
 */
import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function isStripeEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY n'est pas configuré côté serveur.");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}
