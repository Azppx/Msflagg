export type Locale = "fr" | "en";

/**
 * Dictionnaire de traduction du site KYZEN (parcours client).
 * Les pages /admin/* restent volontairement en français uniquement.
 *
 * Convention de clés : "zone.sous_zone.element"
 */
export const dictionaries: Record<Locale, Record<string, string>> = {
  fr: {
    // ---------- Global / TopBar / SideMenu ----------
    "nav.join_discord": "Rejoindre le Discord",
    "nav.support": "Ouvrir un ticket support",
    "nav.menu": "Menu",
    "nav.close": "Fermer",
    "nav.choose_language": "Choisir la langue",
    "nav.profile": "Profil",
    "nav.profile_subtitle": "Mon compte KYZEN",
    "nav.orders": "Commandes",
    "nav.orders_subtitle": "Mes commandes en cours",
    "nav.login": "Se connecter",
    "nav.login_subtitle": "Accède à ton compte",
    "nav.signup": "S'inscrire",
    "nav.signup_subtitle": "Crée ton compte KYZEN",
    "nav.help": "Aide",
    "nav.help_subtitle": "Support & SAV",
    "nav.services": "Services KYZEN",
    "nav.services_subtitle": "Vos services en temps réel",
    "nav.reviews": "Avis Clients",
    "nav.reviews_subtitle": "Retours de la communauté",
    "nav.logout": "Se déconnecter",

    // ---------- Home ----------
    "home.cta_discover": "Découvrir l'offre",
    "home.cta_explore": "Explorer KYZEN",
    "home.status_label": "Statut",
    "home.status_value": "En ligne",
    "home.collection_label": "Collection",
    "home.collection_value": "Services Premium",
    "home.community_label": "Communauté",
    "home.community_value": "Discord KYZEN",
    "home.tagline": "Une expérience simple, rapide et pensée pour accéder à tous les services de KYZEN.",
    "home.card_services": "KYZEN services",
    "home.card_discord": "Discord",
    "home.featured_title": "Offre en vedette",
    "home.featured_subtitle": "Le bundle KYZEN du moment",
    "home.best_seller": "★ BEST SELLER",
    "home.pack_complete": "✦ PACK COMPLET",
    "home.pack1_title_line1": "BASIC FIT",
    "home.pack1_title_line2": "25€ avec 2 comptes Netflix offerts",
    "home.pack1_desc":
      "1 compte Basic-Fit Ultimate + 2 comptes Netflix Premium 4K, en pack, livraison immédiate après paiement.",
    "home.pack2_title_line1": "SPOTIFY + BASIC-FIT",
    "home.pack2_title_line2": "+ NETFLIX + YOUTUBE",
    "home.pack2_desc":
      "1 compte Spotify Premium + 1 compte Basic-Fit Ultimate + 1 compte Netflix Premium 4K + 1 compte YouTube Premium, en pack, livraison immédiate après paiement.",
    "home.per_bundle": "/ bundle",
    "home.order_cta": "Commander →",
    "home.rights": "TOUS DROITS RÉSERVÉS",
    "home.admin_link": "Admin",

    // ---------- Product page ----------
    "product.total_label": "au total · Activation instantanée",
    "product.join_discord": "REJOINDRE LE DISCORD",

    // ---------- Cart ----------
    "cart.eyebrow": "TON PANIER",
    "cart.title": "PANIER",
    "cart.loading": "Chargement…",
    "cart.empty_title": "Ton panier est vide",
    "cart.empty_subtitle": "Ajoute des produits depuis le catalogue pour commencer.",
    "cart.view_catalog": "VOIR LE CATALOGUE",
    "cart.per_unit": "/ unité",
    "cart.remove_item": "Retirer",
    "cart.clear": "Vider le panier",
    "cart.total": "Total",
    "cart.checkout_cta": "PASSER COMMANDE →",
    "cart.continue_shopping": "← Continuer mes achats",

    // ---------- Checkout: informations ----------
    "checkout.info.step": "ÉTAPE 2 / 4",
    "checkout.info.title": "TES INFORMATIONS",
    "checkout.info.empty_cart": "Ton panier est vide.",
    "checkout.info.selected_products": "Produits sélectionnés",
    "checkout.info.total": "Total",
    "checkout.info.first_name": "PRÉNOM",
    "checkout.info.first_name_placeholder": "Ton prénom",
    "checkout.info.last_name": "NOM",
    "checkout.info.last_name_placeholder": "Ton nom",
    "checkout.info.email": "EMAIL",
    "checkout.info.dob": "DATE DE NAISSANCE",
    "checkout.info.error": "Merci de renseigner tous les champs correctement.",
    "checkout.info.continue": "CONTINUER →",

    // ---------- Music ----------
    "nav.music": "Musique",
    "nav.music_subtitle": "Écouter la playlist KYZEN",
    "music.eyebrow": "AMBIANCE",
    "music.title": "MUSIQUE",
    "music.subtitle": "Clique sur une pochette pour lancer ou couper le son.",
  },
  en: {
    // ---------- Global / TopBar / SideMenu ----------
    "nav.join_discord": "Join our Discord",
    "nav.support": "Open a support ticket",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "nav.choose_language": "Choose language",
    "nav.profile": "Profile",
    "nav.profile_subtitle": "My KYZEN account",
    "nav.orders": "Orders",
    "nav.orders_subtitle": "My current orders",
    "nav.login": "Log in",
    "nav.login_subtitle": "Access your account",
    "nav.signup": "Sign up",
    "nav.signup_subtitle": "Create your KYZEN account",
    "nav.help": "Help",
    "nav.help_subtitle": "Support & assistance",
    "nav.services": "KYZEN services",
    "nav.services_subtitle": "Your services in real time",
    "nav.reviews": "Customer reviews",
    "nav.reviews_subtitle": "Feedback from the community",
    "nav.logout": "Log out",

    // ---------- Home ----------
    "home.cta_discover": "Discover the offer",
    "home.cta_explore": "Explore KYZEN",
    "home.status_label": "Status",
    "home.status_value": "Online",
    "home.collection_label": "Collection",
    "home.collection_value": "Premium services",
    "home.community_label": "Community",
    "home.community_value": "KYZEN Discord",
    "home.tagline": "A simple, fast experience designed to access every KYZEN service.",
    "home.card_services": "KYZEN services",
    "home.card_discord": "Discord",
    "home.featured_title": "Featured offer",
    "home.featured_subtitle": "This week's KYZEN bundle",
    "home.best_seller": "★ BEST SELLER",
    "home.pack_complete": "✦ FULL PACK",
    "home.pack1_title_line1": "BASIC FIT",
    "home.pack1_title_line2": "€25 with 2 free Netflix accounts",
    "home.pack1_desc":
      "1 Basic-Fit Ultimate account + 2 Netflix Premium 4K accounts, bundled, delivered instantly after payment.",
    "home.pack2_title_line1": "SPOTIFY + BASIC-FIT",
    "home.pack2_title_line2": "+ NETFLIX + YOUTUBE",
    "home.pack2_desc":
      "1 Spotify Premium account + 1 Basic-Fit Ultimate account + 1 Netflix Premium 4K account + 1 YouTube Premium account, bundled, delivered instantly after payment.",
    "home.per_bundle": "/ bundle",
    "home.order_cta": "Order →",
    "home.rights": "ALL RIGHTS RESERVED",
    "home.admin_link": "Admin",

    // ---------- Product page ----------
    "product.total_label": "total · Instant activation",
    "product.join_discord": "JOIN THE DISCORD",

    // ---------- Cart ----------
    "cart.eyebrow": "YOUR CART",
    "cart.title": "CART",
    "cart.loading": "Loading…",
    "cart.empty_title": "Your cart is empty",
    "cart.empty_subtitle": "Add products from the catalog to get started.",
    "cart.view_catalog": "VIEW CATALOG",
    "cart.per_unit": "/ unit",
    "cart.remove_item": "Remove",
    "cart.clear": "Clear cart",
    "cart.total": "Total",
    "cart.checkout_cta": "CHECKOUT →",
    "cart.continue_shopping": "← Continue shopping",

    // ---------- Checkout: informations ----------
    "checkout.info.step": "STEP 2 / 4",
    "checkout.info.title": "YOUR INFORMATION",
    "checkout.info.empty_cart": "Your cart is empty.",
    "checkout.info.selected_products": "Selected products",
    "checkout.info.total": "Total",
    "checkout.info.first_name": "FIRST NAME",
    "checkout.info.first_name_placeholder": "Your first name",
    "checkout.info.last_name": "LAST NAME",
    "checkout.info.last_name_placeholder": "Your last name",
    "checkout.info.email": "EMAIL",
    "checkout.info.dob": "DATE OF BIRTH",
    "checkout.info.error": "Please fill in all fields correctly.",
    "checkout.info.continue": "CONTINUE →",

    // ---------- Music ----------
    "nav.music": "Music",
    "nav.music_subtitle": "Listen to the KYZEN playlist",
    "music.eyebrow": "AMBIANCE",
    "music.title": "MUSIC",
    "music.subtitle": "Tap a cover to play or stop the track.",
  },
};
