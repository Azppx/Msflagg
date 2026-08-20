"use client";

import { useState } from "react";
import { QulseLogo } from "@/components/QulseLogo";
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
        <QulseLogo />
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <a
            href={discordConfig.inviteUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Rejoindre le Discord"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-panelBorder bg-white/5 text-lg transition-colors hover:bg-white/10"
          >
            💬
          </a>
          <button
            onClick={() => setChatOpen(true)}
            aria-label="Ouvrir un ticket support"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-panelBorder bg-white/5 text-lg transition-colors hover:bg-white/10"
          >
            🎫
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-panelBorder bg-white/5 text-lg transition-colors hover:bg-white/10"
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
