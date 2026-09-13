"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { SupportChatModal } from "@/components/SupportChatModal";
import { discordConfig } from "@/lib/config";
import { useTranslation } from "@/lib/i18n/locale-context";

export default function SupportPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const t = useTranslation();

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={t("support.eyebrow")} title={t("support.title")} backHref="/" />
      <div className="px-5 text-center">
        <p className="text-white/60">{t("support.intro")}</p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => setChatOpen(true)}
            className="w-full rounded-2xl bg-accent px-6 py-4 text-sm font-bold tracking-wide text-black transition-all duration-300 hover:bg-accent-soft"
          >
            {t("support.open_ticket")}
          </button>
          <ButtonLink href={discordConfig.inviteUrl} variant="ghost">
            {t("support.open_discord")}
          </ButtonLink>
        </div>
      </div>

      {chatOpen && <SupportChatModal onClose={() => setChatOpen(false)} />}
    </main>
  );
}
