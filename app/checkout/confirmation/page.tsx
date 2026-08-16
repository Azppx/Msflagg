import { PageHeader } from "@/components/PageHeader";
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

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ÉTAPE 4 / 4" title="CONFIRMATION" />

      <div className="px-5 text-center">
        {isPaid ? (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-electric/15 text-4xl">
              ✓
            </div>
            <h2 className="font-display mt-6 text-3xl">PAIEMENT CONFIRMÉ ✓</h2>
            <p className="mt-3 text-white/60">Merci pour votre commande.</p>

            <div className="mt-6 rounded-xl2 border border-panelBorder bg-panel/60 p-5 text-left">
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

            <div className="mt-6 space-y-3 text-left">
              <h3 className="text-sm font-semibold text-white/70">Prochaines étapes</h3>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-white/60">
                <li>Rejoins le Discord pour récupérer ton accès.</li>
                <li>Garde ton numéro de commande à portée de main.</li>
                <li>Contacte le support si tu n'as pas de nouvelles sous 24h.</li>
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
