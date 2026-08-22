/**
 * Notifications email (via Resend : https://resend.com).
 *
 * Pour activer, sur Vercel → Settings → Environment Variables, ajoute :
 *  - RESEND_API_KEY   : ta clé API Resend
 *  - NOTIFY_EMAIL_FROM : l'adresse d'envoi vérifiée sur Resend
 *                        (ex: commandes@ton-domaine.com — Resend exige un
 *                        domaine vérifié, tu ne peux pas envoyer directement
 *                        depuis une adresse Gmail/Proton).
 *
 * Si RESEND_API_KEY n'est pas configuré, cette fonction ne fait rien —
 * aucune erreur, la commande continue normalement sans notification.
 */

const NOTIFY_TO = "msflagg@proton.me";

export async function notifyOrderPending(order: {
  id: string;
  amount: string;
  currency: string;
  productName: string;
  customerName?: string;
  customerEmail?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_EMAIL_FROM;
  if (!apiKey || !from) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: NOTIFY_TO,
        subject: `Commande en attente — ${order.id}`,
        text: [
          `Une commande attend ta vérification.`,
          ``,
          `Référence : ${order.id}`,
          `Produit(s) : ${order.productName}`,
          `Montant : ${order.amount} ${order.currency}`,
          `Client : ${order.customerName || "—"} (${order.customerEmail || "—"})`,
          ``,
          `Vérifie et confirme depuis /admin/commandes.`,
        ].join("\n"),
      }),
    });
  } catch {
    // On ne bloque jamais le parcours client si l'email échoue.
  }
}
