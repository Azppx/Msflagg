import { listOrders } from "@/lib/orders";
import { DeliverForm } from "@/components/admin/DeliverForm";
import { ConfirmPaymentButton } from "@/components/admin/ConfirmPaymentButton";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-electric-soft">ADMIN</p>
          <h1 className="font-display text-3xl">Commandes</h1>
          <p className="mt-1 text-sm text-white/50">{orders.length} commande(s)</p>
        </div>
        <LogoutButton />
      </div>

      {orders.length === 0 && (
        <p className="mt-8 text-sm text-white/40">Aucune commande pour l'instant.</p>
      )}

      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="glass-panel rounded-xl2 border border-panelBorder p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-sm text-white/70">{o.id}</span>
              <StatusBadge status={o.status} fulfillment={o.fulfillment} />
            </div>

            <div className="mt-3">
              {o.items && o.items.length > 0 ? (
                <ul className="space-y-0.5">
                  {o.items.map((it, i) => (
                    <li key={i} className="font-semibold">
                      {it.name} {it.quantity > 1 && `×${it.quantity}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-semibold">{o.productName}</p>
              )}
            </div>
            <p className="text-sm text-white/50">
              {o.customerName || "—"} · {o.customerEmail || "—"}
            </p>
            <p className="text-sm text-white/50">
              {o.amount} {o.currency}
            </p>

            {o.status === "PAID" && (
              <DeliverForm
                orderId={o.id}
                alreadyDelivered={o.fulfillment === "DELIVERED"}
                existingContent={o.deliveryContent}
              />
            )}
            {o.status === "AWAITING_VERIFICATION" && (
              <>
                <p className="mt-3 text-xs text-accent-soft">
                  Le client dit avoir envoyé le virement Wise — vérifie ton compte Wise avant de
                  confirmer.
                </p>
                <ConfirmPaymentButton orderId={o.id} />
              </>
            )}
            {o.status === "CREATED" && (
              <p className="mt-3 text-xs text-white/30">
                En attente que le client envoie son virement Wise.
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

function StatusBadge({
  status,
  fulfillment,
}: {
  status: string;
  fulfillment: string;
}) {
  if (status === "AWAITING_VERIFICATION") {
    return (
      <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-soft">
        VIREMENT ANNONCÉ
      </span>
    );
  }
  if (status !== "PAID") {
    return (
      <span className="rounded-full border border-panelBorder bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/50">
        {status}
      </span>
    );
  }
  if (fulfillment === "DELIVERED") {
    return (
      <span className="rounded-full border border-electric/40 bg-electric/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-electric-soft">
        LIVRÉE
      </span>
    );
  }
  return (
    <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-soft">
      PAYÉE — EN ATTENTE
    </span>
  );
}
