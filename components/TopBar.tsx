"use client";

import { useState } from "react";
import Image from "next/image";
import { KyzenLogo } from "@/components/KyzenLogo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SideMenu } from "@/components/SideMenu";
import { SupportChatModal } from "@/components/SupportChatModal";
import { discordConfig } from "@/lib/config";

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="sticky top-3 z-30 mx-3 mt-3 flex items-center justify-between rounded-[20px] border border-white/10 bg-panel/80 px-4 py-2.5 shadow-[0_18px_60px_rgba(0,0,0,0.35),0_0_50px_rgba(120,40,255,0.08)] backdrop-blur-xl">
        <KyzenLogo />
        <div className="flex items-center gap-2">
          <LanguageSelector />

          <a
            href={discordConfig.inviteUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Rejoindre le Discord"
            className="icon-glow-btn flex h-10 w-10 items-center justify-center rounded-full border border-electric/40 bg-electric/10 transition-transform hover:scale-105 active:scale-90"
            style={{ "--icon-glow-rgb": "139,53,255" } as React.CSSProperties}
          >
            <Image src="/icons/discord-mark.png" alt="Discord" width={20} height={20} className="object-contain" />
          </a>

          <button
            onClick={() => setChatOpen(true)}
            aria-label="Ouvrir un ticket support"
            className="icon-glow-btn flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-electric/40 bg-electric/10 transition-transform hover:scale-105 active:scale-90"
            style={{ "--icon-glow-rgb": "139,53,255" } as React.CSSProperties}
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
