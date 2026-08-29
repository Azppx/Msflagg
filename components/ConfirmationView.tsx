"use client";

import { ButtonLink } from "@/components/Button";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { discordConfig } from "@/lib/config";
import { useTranslation } from "@/lib/i18n/locale-context";

type OrderLike = {
  id: string;
  productName: string;
  status: string;
  fulfillment?: string;
  deliveryContent?: string;
  items?: { name: string; quantity: number }[];
} | null;

export function ConfirmationView({ order }: { order: OrderLike }) {
  const t = useTranslation();

  const isDelivered = order?.status === "PAID" && order?.fulfillment === "DELIVERED";
  const isPaidPending = order?.status === "PAID" && order?.fulfillment !== "DELIVERED";
  const isAwaitingVerification = order?.status === "AWAITING_VERIFICATION";
  const isFailed = order?.status === "FAILED";

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={t("confirm.step")} title={t("confirm.title")} />

      <div className="px-5 pt-6 text-center bounce-in">
        {isDelivered && (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-electric/15 text-4xl bounce-in">
              ✓
            </div>
            <h2 className="font-display mt-6 text-3xl">{t("confirm.delivered_title")}</h2>
            <p className="mt-3 text-white/60">{t("confirm.delivered_subtitle")}</p>

            <GlowCard toneRgb="46,110,255" particles className="mt-6 text-left">
              <p className="text-xs font-semibold tracking-widest text-electric-soft">
                {t("confirm.your_delivery")}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-white/90">
                {order?.deliveryContent}
              </p>
            </GlowCard>

            <GlowCard toneRgb="46,110,255" className="mt-4 text-left">
              <p className="text-xs font-semibold tracking-widest text-white/40">
                {t("confirm.order_number")}
              </p>
              <p className="mt-1 font-mono text-lg">{order?.id}</p>
              <div className="mt-4 h-px bg-panelBorder" />
              <p className="mt-4 text-xs font-semibold tracking-widest text-white/40">{t("confirm.products")}</p>
              <OrderItemsList order={order} />
            </GlowCard>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={discordConfig.inviteUrl} variant="secondary">
                {t("confirm.join_discord")}
              </ButtonLink>
              <ButtonLink href="/support" variant="ghost">
                {t("confirm.contact_support")}
              </ButtonLink>
            </div>
          </>
        )}

        {isPaidPending && (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-4xl bounce-in">
              ⏳
            </div>
            <h2 className="font-display mt-6 text-3xl">{t("confirm.paid_title")}</h2>
            <p className="mt-3 text-white/60">{t("confirm.paid_subtitle")}</p>

            <OrderRecap
              order={order}
              statusLabel={t("confirm.status_awaiting_delivery")}
              statusTone="accent-soft"
              t={t}
            />

            <div className="mt-6 space-y-3 text-left">
              <h3 className="text-sm font-semibold text-white/70">{t("confirm.next_steps")}</h3>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-white/60">
                <li>{t("confirm.step1")}</li>
                <li>{t("confirm.step2")}</li>
                <li>{t("confirm.step3")}</li>
              </ol>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={discordConfig.inviteUrl} variant="secondary">
                {t("confirm.join_discord")}
              </ButtonLink>
              <ButtonLink href="/support" variant="ghost">
                {t("confirm.contact_support")}
              </ButtonLink>
            </div>
          </>
        )}

        {isAwaitingVerification && (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-electric/15 text-4xl bounce-in">
              ⏳
            </div>
            <h2 className="font-display mt-6 text-3xl">{t("confirm.awaiting_title")}</h2>
            <p className="mt-3 text-white/60">{t("confirm.awaiting_subtitle")}</p>

            <OrderRecap
              order={order}
              statusLabel={t("confirm.status_verifying")}
              statusTone="electric-soft"
              t={t}
            />

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={discordConfig.inviteUrl} variant="secondary">
                {t("confirm.join_discord")}
              </ButtonLink>
              <ButtonLink href="/support" variant="ghost">
                {t("confirm.contact_support")}
              </ButtonLink>
            </div>
          </>
        )}

        {(isFailed || !order) && (
          <>
            <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-danger/15 text-4xl">
              ✕
            </div>
            <h2 className="font-display mt-6 text-2xl">{t("confirm.not_found_title")}</h2>
            <p className="mt-3 text-white/60">{t("confirm.not_found_subtitle")}</p>
            <div className="mt-8">
              <ButtonLink href="/produit" variant="primary">
                {t("confirm.back_to_catalog")}
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
  t,
}: {
  order: OrderLike;
  statusLabel: string;
  statusTone: "accent-soft" | "electric-soft";
  t: (key: string) => string;
}) {
  const toneRgb = statusTone === "accent-soft" ? "255,138,0" : "46,110,255";
  return (
    <GlowCard toneRgb={toneRgb} particles className="mt-6 text-left">
      <p className="text-xs font-semibold tracking-widest text-white/40">{t("confirm.order_number")}</p>
      <p className="mt-1 font-mono text-lg">{order?.id}</p>
      <div className="mt-4 h-px bg-panelBorder" />
      <p className="mt-4 text-xs font-semibold tracking-widest text-white/40">{t("confirm.products")}</p>
      <OrderItemsList order={order} />
      <div className="mt-4 h-px bg-panelBorder" />
      <p className={`mt-4 text-xs font-semibold tracking-widest text-${statusTone}`}>{t("confirm.status_label")}</p>
      <p className="mt-1">{statusLabel}</p>
    </GlowCard>
  );
}

function OrderItemsList({ order }: { order: OrderLike }) {
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
