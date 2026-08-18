/**
 * Coordonnées Wise à afficher au client pour effectuer son virement.
 * Ce ne sont pas des secrets (le client doit les voir pour payer), donc on
 * utilise des variables NEXT_PUBLIC_* lisibles côté navigateur.
 * Configure ces variables d'environnement (Vercel → Settings → Environment Variables) :
 *  - NEXT_PUBLIC_WISE_ACCOUNT_HOLDER : le nom du titulaire du compte Wise
 *  - NEXT_PUBLIC_WISE_EMAIL          : l'email Wise (pour un envoi "vers un ami/email")
 *  - NEXT_PUBLIC_WISE_IBAN           : (optionnel) IBAN si tu préfères un virement classique
 *  - NEXT_PUBLIC_WISE_PAYMENT_LINK   : (optionnel) un lien de paiement Wise Business
 */
export function getWiseConfig() {
  return {
    accountHolder:
      process.env.NEXT_PUBLIC_WISE_ACCOUNT_HOLDER || "⚠️ NEXT_PUBLIC_WISE_ACCOUNT_HOLDER non configuré",
    email: process.env.NEXT_PUBLIC_WISE_EMAIL || "",
    iban: process.env.NEXT_PUBLIC_WISE_IBAN || "",
    paymentLink: process.env.NEXT_PUBLIC_WISE_PAYMENT_LINK || "",
  };
}
