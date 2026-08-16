"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { product } from "@/lib/config";

declare global {
  interface Window {
    paypal?: any;
  }
}

export function PaypalButton({
  clientId,
  customerName,
  customerEmail,
}: {
  clientId: string;
  customerName: string;
  customerEmail: string;
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
          style: { layout: "vertical", color: "blue", shape: "pill", label: "paypal" },
          createOrder: async () => {
            setStatus("processing");
            setErrorMsg("");
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productSlug: product.slug }),
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
  }, [clientId, router]);

  if (!clientId) {
    return (
      <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-white/80">
        PayPal n'est pas configuré. Ajoute <code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> dans tes
        variables d'environnement.
      </div>
    );
  }

  return (
    <div>
      <div ref={containerRef} />
      {status === "processing" && (
        <p className="mt-2 text-center text-sm text-white/50">Traitement en cours…</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-center text-sm text-danger">{errorMsg}</p>
      )}
    </div>
  );
}
