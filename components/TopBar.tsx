"use client";

import { useState } from "react";
import Image from "next/image";
import { KyzenLogo } from "@/components/KyzenLogo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SideMenu } from "@/components/SideMenu";
import { SupportChatModal } from "@/components/SupportChatModal";
import { discordConfig } from "@/lib/config";
import { useTranslation } from "@/lib/i18n/locale-context";

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const t = useTranslation();

  return (
    <>
      <div className="sticky top-3 z-30 mx-3 mt-3 flex items-center justify-between rounded-[20px] bg-midnight px-4 py-2.5 shadow-[8px_8px_18px_rgba(163,155,194,0.5),-8px_-8px_18px_rgba(255,255,255,0.85)]">
        <KyzenLogo />
        <div className="flex items-center gap-2">
          <LanguageSelector />

          <a
            href={discordConfig.inviteUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={t("nav.join_discord")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight shadow-[4px_4px_10px_rgba(163,155,194,0.5),-4px_-4px_10px_rgba(255,255,255,0.85)] transition-transform hover:scale-105 active:scale-95 active:shadow-[inset_3px_3px_7px_rgba(163,155,194,0.5),inset_-3px_-3px_7px_rgba(255,255,255,0.85)]"
          >
            <Image src="/icons/discord-mark.png" alt="Discord" width={20} height={20} className="object-contain" />
          </a>

          <button
            onClick={() => setChatOpen(true)}
            aria-label={t("nav.support")}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-midnight shadow-[4px_4px_10px_rgba(163,155,194,0.5),-4px_-4px_10px_rgba(255,255,255,0.85)] transition-transform hover:scale-105 active:scale-95 active:shadow-[inset_3px_3px_7px_rgba(163,155,194,0.5),inset_-3px_-3px_7px_rgba(255,255,255,0.85)]"
          >
            <Image
              src="/icons/support-chat.png"
              alt="Support"
              width={26}
              height={26}
              className="rounded-md object-contain"
            />
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label={t("nav.menu")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight text-lg text-ink shadow-[4px_4px_10px_rgba(163,155,194,0.5),-4px_-4px_10px_rgba(255,255,255,0.85)] transition-transform active:scale-95 active:shadow-[inset_3px_3px_7px_rgba(163,155,194,0.5),inset_-3px_-3px_7px_rgba(255,255,255,0.85)]"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
      {chatOpen && <SupportChatModal onClose={() => setChatOpen(false)} />}
    </>
  );
}
