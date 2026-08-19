"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth-context";
import { getWiseConfig } from "@/lib/wise";

const PRESET_AMOUNTS = [5, 10, 20, 50, 100];

export default function PortefeuillePage() {
  const router = useRouter();
  const { account, loading, refresh } = useAuth();
  const wise = getWiseConfig();

  const [customAmount, setCustomAmount] = useState("");
  const [pendingOrder, setPendingOrder] = useState<{ id: string; amount: string } | null>(null);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!loading && !account) router.push("/compte/connexion");
  }, [loading, account, router]);

  async function startRecharge(amount: number) {
    setError("");
    const res = await fetch("/api/wallet/recharge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Erreur");
      return;
    }
    setPendingOrder({ id: data.orderId, amount: data.amount });
  }

  async function handleConfirmSent() {
    if (!pendingOrder) return;
    setConfirming(true);
    const res = await fetch(`/api/orders/${pendingOrder.id}/mark-sent`, { method: "POST" });
    setConfirming(false);
    if (!res.ok) {
      setError("Erreur lors de la confirmation, réessaie.");
      return;
    }
    setPendingOrder(null);
    await refresh();
    router.push(`/checkout/confirmation?orderId=${pendingOrder.id}`);
  }

  if (loading || !account) {
    return (
      <main className="mx-auto min-h-screen max-w-md px-5 pb-16 pt-12">
        <p className="text-sm text-white/40">Chargement…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="MON COMPTE" title="PORTEFEUILLE" backHref="/compte" />
      <div className="px-5">
        <div className="glass-panel rounded-xl2 border border-electric/40 p-5">
          <p className="text-xs font-semibold tracking-widest text-white/40">SOLDE DISPONIBLE</p>
          <p className="mt-1 font-display text-4xl">{account.walletBalance.toFixed(2)} €</p>
          <p className="mt-2 text-xs text-white/40">
            Crédit interne utilisable uniquement sur Qulse — non remboursable, non transférable.
          </p>
        </div>

        {!pendingOrder && (
          <>
            <p className="mt-6 text-xs font-semibold tracking-widest text-white/50">
              RECHARGER MON COMPTE
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => startRecharge(amt)}
                  className="rounded-xl border border-panelBorder bg-white/5 py-4 text-center font-display text-lg transition-colors hover:bg-white/10"
                >
                  {amt}€
                </button>
              ))}
              <div className="flex items-center gap-1 rounded-xl border border-dashed border-panelBorder px-2">
                <input
                  type="number"
                  min={5}
                  max={500}
                  placeholder="Libre"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-transparent py-4 text-center text-sm outline-none placeholder:text-white/30"
                />
              </div>
            </div>
            {customAmount && (
              <button
                onClick={() => startRecharge(parseFloat(customAmount))}
                className="mt-3 w-full rounded-xl bg-accent px-6 py-3 text-sm font-bold text-black"
              >
                RECHARGER {customAmount}€
              </button>
            )}
          </>
        )}

        {error && <p className="mt-4 text-sm text-danger">{error}</p>}

        {pendingOrder && (
          <div className="mt-6 space-y-5">
            <div className="glass-panel rounded-xl2 border border-electric/40 p-5">
              <p className="text-xs font-semibold tracking-widest text-electric-soft">
                VIREMENT WISE
              </p>
              <p className="mt-2 text-sm text-white/60">
                Envoie exactement{" "}
                <span className="font-bold text-white">{pendingOrder.amount} EUR</span> via Wise,
                en indiquant la référence ci-dessous.
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <Row label="Bénéficiaire" value={wise.accountHolder} />
                {wise.email && <Row label="Email Wise" value={wise.email} />}
                {wise.iban && <Row label="IBAN" value={wise.iban} />}
                <Row label="Référence à indiquer" value={pendingOrder.id} emphasize />
              </div>
              {wise.paymentLink && (
                <a
                  href={wise.paymentLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-soft"
                >
                  Ouvrir le lien de paiement Wise ↗
                </a>
              )}
            </div>

            <p className="px-1 text-xs text-white/40">
              Une fois le virement envoyé, ton solde sera crédité après vérification manuelle
              (généralement sous 24h).
            </p>

            <button
              onClick={handleConfirmSent}
              disabled={confirming}
              className="w-full rounded-2xl bg-accent px-6 py-4 text-sm font-bold tracking-wide text-black disabled:opacity-50"
            >
              {confirming ? "…" : "J'AI ENVOYÉ LE PAIEMENT"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function Row({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/40">{label}</span>
      <span className={emphasize ? "font-mono font-bold text-accent-soft" : "text-white/90"}>
        {value}
      </span>
    </div>
  );
}

