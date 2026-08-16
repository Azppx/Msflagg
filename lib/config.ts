/**
 * Configuration centrale du site.
 * Modifie ces valeurs pour adapter la boutique à un autre produit.
 * Le prix affiché ici est indicatif pour le frontend uniquement :
 * la valeur qui fait foi pour le paiement est toujours recalculée
 * côté serveur dans lib/pricing.ts (jamais confiance au client).
 */

export const siteConfig = {
  brandName: "キ",
  brandTagline: "NOS SERVICES",
};

export const product = {
  slug: "premium-membership",
  name: "Basic fit ultimate",
  category: "ABONNEMENT · ULTIMATE",
  duration: "2 mois",
  priceTotal: 10.0,
  currency: "EUR",
  badge: "OFFRE POPULAIRE",
  description:
    "Un accès complet à l'offre Basic fit Ultimate, sans engagement long, pensé pour démarrer rapidement.",
  features: [
    "Accès complet pendant toute la durée de l'offre",
    "Activation rapide après paiement",
    "Support dédié via Discord",
  ],
};

export const discordConfig = {
  // Remplace par ta véritable invitation Discord.
  inviteUrl: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || "https://discord.gg/k4ayxpryJb",
};

export const reviews = [
  { author: "Client vérifié", rating: 5, text: "Très rapide et simple." },
  { author: "Client vérifié", rating: 5, text: "Service propre et efficace." },
  { author: "Client vérifié", rating: 5, text: "Commande facile." },
];
