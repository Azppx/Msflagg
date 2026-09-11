export type ProductCategory = "streaming" | "musique" | "gaming" | "ia" | "fitness" | "securite" | "iptv";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  unit: string;
  description: string;
  icon: string;
  tone: string;
  features: string[];
};

export const CATEGORY_META: Record<
  ProductCategory,
  { label: string; sub: string; icon: string; tint: string; border: string; glow: string }
> = {
  streaming: {
    label: "Streaming",
    sub: "Films, séries, animés — en illimité",
    icon: "film",
    tint: "rgba(255,107,74,0.14)",
    border: "rgba(255,107,74,0.32)",
    glow: "rgba(255,107,74,0.55)",
  },
  musique: {
    label: "Musique",
    sub: "Sans pub, qualité maximale",
    icon: "music",
    tint: "rgba(157,92,255,0.16)",
    border: "rgba(157,92,255,0.35)",
    glow: "rgba(157,92,255,0.6)",
  },
  gaming: {
    label: "Gaming & Social",
    sub: "Discord, comptes, accès communautaires",
    icon: "gamepad",
    tint: "rgba(93,255,176,0.14)",
    border: "rgba(93,255,176,0.32)",
    glow: "rgba(93,255,176,0.5)",
  },
  ia: {
    label: "IA & Créatif",
    sub: "Génération, montage, design",
    icon: "sparkle",
    tint: "rgba(255,214,90,0.14)",
    border: "rgba(255,214,90,0.32)",
    glow: "rgba(255,214,90,0.5)",
  },
  fitness: {
    label: "Fitness",
    sub: "Accès salle, tous clubs",
    icon: "dumbbell",
    tint: "rgba(93,255,176,0.14)",
    border: "rgba(93,255,176,0.32)",
    glow: "rgba(93,255,176,0.5)",
  },
  securite: {
    label: "Sécurité",
    sub: "Vie privée, navigation protégée",
    icon: "vpn",
    tint: "rgba(157,92,255,0.16)",
    border: "rgba(157,92,255,0.35)",
    glow: "rgba(157,92,255,0.6)",
  },
  iptv: {
    label: "IPTV",
    sub: "4K, milliers de chaînes",
    icon: "server",
    tint: "rgba(255,107,74,0.14)",
    border: "rgba(255,107,74,0.32)",
    glow: "rgba(255,107,74,0.55)",
  },
};

export const PRODUCTS: Product[] = [
  {
    slug: "spotify",
    name: "Spotify",
    category: "musique",
    categoryLabel: "Musique",
    price: 7,
    unit: "an",
    description: "Compte Spotify Premium pendant 12 mois, sans pub, qualité audio maximale, écoute hors-ligne illimitée.",
    icon: "music",
    tone: "var(--signal)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "deezer",
    name: "Deezer",
    category: "musique",
    categoryLabel: "Musique",
    price: 6,
    unit: "vie",
    description: "Compte Deezer Premium à vie, musique HiFi sans pub.",
    icon: "music",
    tone: "var(--signal)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "netflix",
    name: "Netflix",
    category: "streaming",
    categoryLabel: "Streaming",
    price: 8,
    unit: "mois",
    description: "Compte Netflix Premium en qualité 4K Ultra HD.",
    icon: "film",
    tone: "var(--ember)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "disney-plus",
    name: "Disney+",
    category: "streaming",
    categoryLabel: "Streaming",
    price: 8,
    unit: "mois",
    description: "Compte Disney+ Premium, catalogue complet Marvel, Star Wars, Pixar.",
    icon: "star",
    tone: "var(--ember)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "hbo-max",
    name: "HBO Max",
    category: "streaming",
    categoryLabel: "Streaming",
    price: 7,
    unit: "mois",
    description: "Compte HBO Max, séries et films exclusifs.",
    icon: "film",
    tone: "var(--ember)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "discord-nitro",
    name: "Discord Nitro",
    category: "gaming",
    categoryLabel: "Nitro",
    price: 4,
    unit: "mois",
    description: "Discord Nitro complet, emojis et stickers partout, boosts inclus.",
    icon: "discord",
    tone: "var(--mint)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "valorant",
    name: "Valorant Acc",
    category: "gaming",
    categoryLabel: "Compte",
    price: 10,
    unit: "",
    description: "Compte Valorant prêt à jouer.",
    icon: "gamepad",
    tone: "var(--mint)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "chatgpt-plus",
    name: "ChatGPT Plus",
    category: "ia",
    categoryLabel: "IA",
    price: 9,
    unit: "mois",
    description: "Accès ChatGPT Plus, GPT-4o prioritaire, sans coupure.",
    icon: "sparkle",
    tone: "var(--gold)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "canva-pro",
    name: "Canva Pro",
    category: "ia",
    categoryLabel: "Design",
    price: 6,
    unit: "an",
    description: "Canva Pro, tous les templates et fonds premium débloqués.",
    icon: "star",
    tone: "var(--gold)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "basic-fit",
    name: "Basic-Fit",
    category: "fitness",
    categoryLabel: "Fitness",
    price: 25,
    unit: "2 mois",
    description: "Abonnement Basic-Fit Ultimate 2 mois, accès à tous les clubs en Europe.",
    icon: "dumbbell",
    tone: "var(--mint)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "nordvpn",
    name: "NordVPN",
    category: "securite",
    categoryLabel: "Sécurité",
    price: 6,
    unit: "an",
    description: "Navigation chiffrée, sans logs, serveurs dans le monde entier.",
    icon: "vpn",
    tone: "var(--signal)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
  {
    slug: "iptv",
    name: "IPTV",
    category: "iptv",
    categoryLabel: "4K · 1 an",
    price: 45,
    unit: "an",
    description: "Serveur IPTV ultra rapide en 4K, milliers de chaînes et VOD.",
    icon: "server",
    tone: "var(--ember)",
    features: ["Accès immédiat après paiement", "Support dédié via Discord", "Garantie & remplacement en cas de souci"],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function getProductsByCategory(category: ProductCategory) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function formatPrice(p: Product) {
  return p.unit ? `${p.price} € / ${p.unit}` : `${p.price} €`;
}
