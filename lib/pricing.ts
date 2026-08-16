import { product } from "./config";

/**
 * Source de vérité côté serveur pour le prix.
 * Les routes API PayPal appellent CETTE fonction — jamais une valeur
 * envoyée par le navigateur — pour déterminer le montant à facturer.
 */
export function getServerPrice(productSlug: string): {
  amount: string;
  currency: string;
  name: string;
} {
  if (productSlug !== product.slug) {
    throw new Error("Produit inconnu");
  }
  return {
    amount: product.priceTotal.toFixed(2),
    currency: product.currency,
    name: `${product.name} — ${product.duration}`,
  };
}
