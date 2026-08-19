/**
 * Configuration centrale du site.
 * Modifie ces valeurs pour adapter la boutique à un autre produit.
 * Le prix affiché ici est indicatif pour le frontend uniquement :
 * la valeur qui fait foi pour le paiement est toujours recalculée
 * côté serveur dans lib/pricing.ts (jamais confiance au client).
 */

export const siteConfig = {
  brandName: "Qulse",
  brandTagline: "NOS SERVICES",
};

export const product = {
  slug: "basic-fit",
  name: "Basic-Fit Ultimate",
  category: "ABONNEMENT · ULTIMATE",
  duration: "2 mois",
  priceTotal: 10.0,
  currency: "EUR",
  badge: "OFFRE POPULAIRE",
  description:
    "Abonnement Basic-Fit Ultimate 2 mois, accès à tous les clubs en Europe, sans engagement long.",
  features: [
    "Accès à tous les clubs Basic-Fit en Europe",
    "Activation rapide après paiement",
    "Support dédié via Discord",
  ],
};

export const discordConfig = {
  // Remplace par ta véritable invitation Discord.
  inviteUrl: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || "https://discord.gg/REMPLACER",
};

export const reviews = [
  { author: "Client vérifié", rating: 5, text: "Très rapide et simple." },
  { author: "Client vérifié", rating: 5, text: "Service propre et efficace." },
  { author: "Client vérifié", rating: 5, text: "Commande facile." },
];
