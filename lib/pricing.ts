import { product } from "./config";
import { getProductBySlug } from "./catalog";

/**
 * Source de vérité côté serveur pour le prix.
 * Les routes API de commande appellent CETTE fonction — jamais une valeur
 * envoyée par le navigateur — pour déterminer le montant à facturer.
 */
export function getServerPrice(productSlug: string): {
  amount: string;
  currency: string;
  name: string;
} {
  if (productSlug === product.slug) {
    return {
      amount: product.priceTotal.toFixed(2),
      currency: product.currency,
      name: `${product.name} — ${product.duration}`,
    };
  }

  const catalogItem = getProductBySlug(productSlug);
  if (catalogItem) {
    return {
      amount: catalogItem.priceTotal.toFixed(2),
      currency: catalogItem.currency,
      name: `${catalogItem.name} — ${catalogItem.category}`,
    };
  }

  throw new Error("Produit inconnu");
}
