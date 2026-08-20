import { PageHeader } from "@/components/PageHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { ButtonLink } from "@/components/Button";
import { getOrder } from "@/lib/orders";
import { discordConfig } from "@/lib/config";

// Cette page affiche le statut EN TEMPS RÉEL d'une commande (le client peut y
// revenir plusieurs fois pendant que l'admin traite sa commande) : elle ne
// doit donc jamais être mise en cache, sous peine d'afficher un statut périmé.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const order = searchParams.orderId ? await getOrder(searchParams.orderId) : null;
  const isDelivered = order?.status === "PAID" && order?.fulfillment === "DELIVERED";
  const isPaidPending = order?.status === "PAID" && order?.fulfillment !== "DELIVERED";
  const isAwaitingVerification = order?.status === "AWAITING_VERIFICATION";
  const isFailed = order?.status === "FAILED";

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ÉTAPE 4 / 4" title="CONFIRMATION" />

      <div className="px-5">
        <StepIndicator current={4} />
      </div>

      <div className="px-5 pt-6 text-center animate-fadeUp">
        {isDelivered && (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-electric/15 text-4xl animate-fadeUp">
              ✓
            </div>
            <h2 className="font-display mt-6 text-3xl">COMMANDE LIVRÉE ✓</h2>
            <p className="mt-3 text-white/60">Voici tes accès, merci pour ta commande.</p>

            <div className="glass-panel mt-6 rounded-xl2 border border-electric/40 p-5 text-left">
              <p className="text-xs font-semibold tracking-widest text-electric-soft">
                TA LIVRAISON
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-white/90">
                {order?.deliveryContent}
              </p>
            </div>

            <div className="glass-panel mt-4 rounded-xl2 border border-panelBorder p-5 text-left">
              <p className="text-xs font-semibold tracking-widest text-white/40">
                NUMÉRO DE COMMANDE
              </p>
              <p className="mt-1 font-mono text-lg">{order?.id}</p>
              <div className="mt-4 h-px bg-panelBorder" />
              <p className="mt-4 text-xs font-semibold tracking-widest text-white/40">PRODUIT(S)</p>
              <OrderItemsList order={order} />
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={discordConfig.inviteUrl} variant="secondary">
                REJOINDRE LE DISCORD
              </ButtonLink>
              <ButtonLink href="/support" variant="ghost">
                CONTACTER LE SUPPORT
              </ButtonLink>
            </div>
          </>
        )}

        {isPaidPending && (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-4xl animate-fadeUp">
              ⏳
            </div>
            <h2 className="font-display mt-6 text-3xl">PAIEMENT CONFIRMÉ ✓</h2>
            <p className="mt-3 text-white/60">
              Ta commande est en cours de préparation. Elle sera livrée directement ici sous 24h.
            </p>

            <OrderRecap order={order} statusLabel="En attente de livraison" statusTone="accent-soft" />

            <div className="mt-6 space-y-3 text-left">
              <h3 className="text-sm font-semibold text-white/70">Prochaines étapes</h3>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-white/60">
                <li>Garde ce lien ou ton numéro de commande précieusement.</li>
                <li>Ta commande sera livrée directement sur cette page sous 24h.</li>
                <li>Contacte le support si tu n'as pas de nouvelles passé ce délai.</li>
              </ol>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={discordConfig.inviteUrl} variant="secondary">
                REJOINDRE LE DISCORD
              </ButtonLink>
              <ButtonLink href="/support" variant="ghost">
                CONTACTER LE SUPPORT
              </ButtonLink>
            </div>
          </>
        )}

        {isAwaitingVerification && (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-electric/15 text-4xl animate-fadeUp">
              ⏳
            </div>
            <h2 className="font-display mt-6 text-3xl">VIREMENT ANNONCÉ</h2>
            <p className="mt-3 text-white/60">
              Nous vérifions la réception de ton virement Wise. Reviens sur cette page un peu
              plus tard — la suite (livraison sous 24h) se passera ici automatiquement.
            </p>

            <OrderRecap order={order} statusLabel="Vérification en cours" statusTone="electric-soft" />

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={discordConfig.inviteUrl} variant="secondary">
                REJOINDRE LE DISCORD
              </ButtonLink>
              <ButtonLink href="/support" variant="ghost">
                CONTACTER LE SUPPORT
              </ButtonLink>
            </div>
          </>
        )}

        {(isFailed || !order) && (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-danger/15 text-4xl">
              ✕
            </div>
            <h2 className="font-display mt-6 text-2xl">COMMANDE INTROUVABLE</h2>
            <p className="mt-3 text-white/60">
              Nous n'avons pas retrouvé cette commande. Vérifie le lien ou repars du catalogue.
            </p>
            <div className="mt-8">
              <ButtonLink href="/produit" variant="primary">
                RETOUR AU CATALOGUE
              </ButtonLink>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function OrderRecap({
  order,
  statusLabel,
  statusTone,
}: {
  order: { id: string; productName: string; items?: { name: string; quantity: number }[] } | null;
  statusLabel: string;
  statusTone: "accent-soft" | "electric-soft";
}) {
  return (
    <div className="glass-panel mt-6 rounded-xl2 border border-panelBorder p-5 text-left">
      <p className="text-xs font-semibold tracking-widest text-white/40">NUMÉRO DE COMMANDE</p>
      <p className="mt-1 font-mono text-lg">{order?.id}</p>
      <div className="mt-4 h-px bg-panelBorder" />
      <p className="mt-4 text-xs font-semibold tracking-widest text-white/40">PRODUIT(S)</p>
      <OrderItemsList order={order} />
      <div className="mt-4 h-px bg-panelBorder" />
      <p className={`mt-4 text-xs font-semibold tracking-widest text-${statusTone}`}>STATUT</p>
      <p className="mt-1">{statusLabel}</p>
    </div>
  );
}

function OrderItemsList({
  order,
}: {
  order: { productName: string; items?: { name: string; quantity: number }[] } | null;
}) {
  if (order?.items && order.items.length > 0) {
    return (
      <ul className="mt-1 space-y-1">
        {order.items.map((item, i) => (
          <li key={i} className="text-sm">
            {item.name} {item.quantity > 1 && `×${item.quantity}`}
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-1">{order?.productName}</p>;
}