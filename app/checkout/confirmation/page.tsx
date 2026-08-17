import { PageHeader } from "@/components/PageHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { ButtonLink } from "@/components/Button";
import { getOrder } from "@/lib/orders";
import { discordConfig } from "@/lib/config";

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const order = searchParams.orderId ? getOrder(searchParams.orderId) : null;
  const isPaid = order?.status === "PAID";
  const isDelivered = isPaid && order?.fulfillment === "DELIVERED";

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ÉTAPE 4 / 4" title="CONFIRMATION" />

      <div className="px-5">
        <StepIndicator current={4} />
      </div>

      <div className="px-5 pt-6 text-center animate-fadeUp">
        {isPaid ? (
          isDelivered ? (
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
                <p className="mt-4 text-xs font-semibold tracking-widest text-white/40">
                  PRODUIT
                </p>
                <p className="mt-1">{order?.productName}</p>
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
          ) : (
            <>
              <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-4xl animate-fadeUp">
                ⏳
              </div>
              <h2 className="font-display mt-6 text-3xl">PAIEMENT CONFIRMÉ ✓</h2>
              <p className="mt-3 text-white/60">
                Ta commande est en cours de préparation. Elle sera livrée directement ici sous
                24h.
              </p>

              <div className="glass-panel mt-6 rounded-xl2 border border-panelBorder p-5 text-left">
                <p className="text-xs font-semibold tracking-widest text-white/40">
                  NUMÉRO DE COMMANDE
                </p>
                <p className="mt-1 font-mono text-lg">{order?.id}</p>
                <div className="mt-4 h-px bg-panelBorder" />
                <p className="mt-4 text-xs font-semibold tracking-widest text-white/40">
                  PRODUIT
                </p>
                <p className="mt-1">{order?.productName}</p>
                <div className="mt-4 h-px bg-panelBorder" />
                <p className="mt-4 text-xs font-semibold tracking-widest text-accent-soft">
                  STATUT
                </p>
                <p className="mt-1">En attente de livraison</p>
              </div>

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
          )
        ) : (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-danger/15 text-4xl">
              ✕
            </div>
            <h2 className="font-display mt-6 text-2xl">PAIEMENT NON CONFIRMÉ</h2>
            <p className="mt-3 text-white/60">
              Nous n'avons pas pu confirmer ce paiement. Aucun montant n'a été débité si
              la transaction a échoué.
            </p>
            <div className="mt-8">
              <ButtonLink href="/produit" variant="primary">
                RÉESSAYER
              </ButtonLink>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
