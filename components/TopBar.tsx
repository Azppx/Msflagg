"use client";

import { useState } from "react";
import Image from "next/image";
import { QluseLogo } from "@/components/QluseLogo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SideMenu } from "@/components/SideMenu";
import { SupportChatModal } from "@/components/SupportChatModal";
import { discordConfig } from "@/lib/config";

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-panelBorder/60 bg-midnight/80 px-5 py-3 backdrop-blur-md">
        <QluseLogo />
        <div className="flex items-center gap-2">
          <LanguageSelector />

          <a
            href={discordConfig.inviteUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Rejoindre le Discord"
            className="icon-glow-btn flex h-10 w-10 items-center justify-center rounded-full border border-indigo/40 bg-indigo/10 transition-transform hover:scale-105 active:scale-90"
            style={{ "--icon-glow-rgb": "88,101,242" } as React.CSSProperties}
          >
            <Image src="/icons/discord-mark.png" alt="Discord" width={20} height={20} className="object-contain" />
          </a>

          <button
            onClick={() => setChatOpen(true)}
            aria-label="Ouvrir un ticket support"
            className="icon-glow-btn flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-electric/40 bg-electric/10 transition-transform hover:scale-105 active:scale-90"
            style={{ "--icon-glow-rgb": "46,110,255" } as React.CSSProperties}
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
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-panelBorder bg-white/5 text-lg transition-colors hover:bg-white/10 active:scale-90"
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
