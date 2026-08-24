"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { SupportChatModal } from "@/components/SupportChatModal";
import { discordConfig } from "@/lib/config";

export default function SupportPage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow="ASSISTANCE" title="SUPPORT" backHref="/" />
      <div className="px-5 text-center">
        <p className="text-white/60">
          Une question sur ta commande ou ton accès ? Ouvre un ticket directement ici, ou
          rejoins le Discord pour une réponse plus rapide.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => setChatOpen(true)}
            className="w-full rounded-2xl bg-accent px-6 py-4 text-sm font-bold tracking-wide text-black transition-all duration-300 hover:bg-accent-soft"
          >
            OUVRIR UN TICKET
          </button>
          <ButtonLink href={discordConfig.inviteUrl} variant="ghost">
            OUVRIR LE DISCORD
          </ButtonLink>
        </div>
      </div>

      {chatOpen && <SupportChatModal onClose={() => setChatOpen(false)} />}
    </main>
  );
}
