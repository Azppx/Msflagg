"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    paypal?: any;
  }
}

export function PaypalButton({
  clientId,
  customerName,
  customerEmail,
  productSlug,
}: {
  clientId: string;
  customerName: string;
  customerEmail: string;
  productSlug: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!clientId) return;

    const scriptId = "paypal-sdk";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

    function render() {
      if (!window.paypal || !containerRef.current) return;
      containerRef.current.innerHTML = "";

      window.paypal
        .Buttons({
          style: { layout: "vertical", color: "black", shape: "pill", label: "pay", height: 48 },
          createOrder: async () => {
            setStatus("processing");
            setErrorMsg("");
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productSlug, customerName, customerEmail }),
            });
            const data = await res.json();
            if (!res.ok) {
              setStatus("error");
              setErrorMsg(data.error || "Erreur lors de la création de la commande.");
              throw new Error(data.error);
            }
            containerRef.current?.setAttribute("data-local-order-id", data.localOrderId);
            return data.paypalOrderId;
          },
          onApprove: async (data: any) => {
            const localOrderId = containerRef.current?.getAttribute("data-local-order-id");
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                localOrderId,
                paypalOrderId: data.orderID,
              }),
            });
            const result = await res.json();

            if (!res.ok) {
              setStatus("error");
              setErrorMsg(result.error || "Paiement refusé.");
              return;
            }

            router.push(`/checkout/confirmation?orderId=${result.orderId}`);
          },
          onError: () => {
            setStatus("error");
            setErrorMsg("Une erreur est survenue avec PayPal. Réessaie.");
          },
          onCancel: () => {
            setStatus("idle");
          },
        })
        .render(containerRef.current);
    }

    if (existing) {
      render();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&intent=capture`;
    script.onload = render;
    document.body.appendChild(script);
  }, [clientId, router, productSlug]);

  if (!clientId) {
    return (
      <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-white/80">
        PayPal n'est pas configuré. Ajoute <code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> dans tes
        variables d'environnement.
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border border-panelBorder bg-panel/60 p-5 shadow-[0_0_40px_-15px_rgba(255,138,0,0.35)]">
      <div className="mb-4 flex items-center justify-center gap-2">
        <svg
          className="h-4 w-4 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="text-xs font-medium uppercase tracking-wider text-white/50">
          Paiement 100% sécurisé
        </span>
      </div>

      <div className="overflow-hidden rounded-xl bg-white p-3">
        <div ref={containerRef} />
      </div>

      {status === "processing" && (
        <p className="mt-3 text-center text-sm text-white/50">Traitement en cours…</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-center text-sm text-danger">{errorMsg}</p>
      )}

      <p className="mt-4 text-center text-[11px] text-white/30">
        Transaction chiffrée · Vos données ne sont jamais stockées
      </p>
    </div>
  );
}
