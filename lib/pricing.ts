import { product } from "./config";
import { getProductBySlug } from "./catalog";

/**
 * Source de vérité côté serveur pour les prix.
 * Les routes API de commande appellent CES fonctions — jamais une valeur
 * envoyée par le navigateur — pour déterminer le montant à facturer.
 */

export type PricedItem = {
  slug: string;
  name: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type PricedCart = {
  items: PricedItem[];
  amount: string;
  currency: string;
  summary: string;
};

function resolveUnitPriceAndName(slug: string): { name: string; unitPrice: number; currency: string } {
  if (slug === product.slug) {
    return {
      name: `${product.name} — ${product.duration}`,
      unitPrice: product.priceTotal,
      currency: product.currency,
    };
  }
  const catalogItem = getProductBySlug(slug);
  if (catalogItem) {
    return {
      name: catalogItem.name,
      unitPrice: catalogItem.priceTotal,
      currency: catalogItem.currency,
    };
  }
  throw new Error(`Produit inconnu : ${slug}`);
}

/**
 * Calcule le prix d'un panier à partir d'une liste { slug, quantity }.
 * Le prix unitaire et le nom viennent TOUJOURS du catalogue serveur,
 * jamais du client — seuls le slug et la quantité sont lus depuis la requête.
 */
export function getServerPriceForItems(
  requested: { slug: string; quantity: number }[]
): PricedCart {
  if (!Array.isArray(requested) || requested.length === 0) {
    throw new Error("Le panier est vide.");
  }

  let currency = "EUR";
  const items: PricedItem[] = requested.map((r) => {
    const slug = String(r?.slug || "");
    const quantity = Math.max(1, Math.min(50, Math.floor(Number(r?.quantity)) || 1));
    const { name, unitPrice, currency: itemCurrency } = resolveUnitPriceAndName(slug);
    currency = itemCurrency;
    return {
      slug,
      name,
      unitPrice,
      quantity,
      lineTotal: Math.round(unitPrice * quantity * 100) / 100,
    };
  });

  const total = items.reduce((sum, i) => sum + i.lineTotal, 0);

  const summary =
    items.length === 1
      ? `${items[0].name}${items[0].quantity > 1 ? ` ×${items[0].quantity}` : ""}`
      : `${items[0].name} + ${items.length - 1} autre${items.length - 1 > 1 ? "s" : ""} article${
          items.length - 1 > 1 ? "s" : ""
        }`;

  return { items, amount: total.toFixed(2), currency, summary };
}
