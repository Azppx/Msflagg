"use client";

import { useState } from "react";
import { PageNav } from "@/components/PageNav";
import { GlassField } from "@/components/GlassField";
import { CheckIcon, DiscordIcon, HeadsetIcon } from "@/components/icons";

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || !email.includes("@")) return;
    setSent(true);
  }

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Support" />

      <div
        className="liquid-glass liquid-glass--signal"
        style={{ width: 56, height: 56, margin: "24px auto 0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--signal)" }}
      >
        <HeadsetIcon width={24} height={24} />
      </div>

      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 26, textAlign: "center", marginTop: 16 }}>Une question ?</h1>
      <p style={{ marginTop: 8, fontSize: 14, color: "var(--fog)", textAlign: "center", lineHeight: 1.6 }}>
        Décris ton problème, on te répond dès que possible. Ou rejoins le Discord pour une réponse plus rapide.
      </p>

      <a
        href="https://discord.gg/"
        target="_blank"
        rel="noreferrer"
        className="liquid-glass liquid-glass--signal"
        style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, fontSize: 14.5, fontWeight: 600, color: "var(--paper)", borderRadius: 14, textDecoration: "none" }}
      >
        <DiscordIcon width={15} height={15} /> Ouvrir le Discord
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
        <span style={{ fontSize: 11.5, color: "var(--fog)" }}>OU</span>
        <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
      </div>

      {sent ? (
        <div className="liquid-glass" style={{ padding: 28, borderRadius: 22, textAlign: "center" }}>
          <div
            className="liquid-glass liquid-glass--signal"
            style={{ width: 48, height: 48, margin: "0 auto", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--signal)" }}
          >
            <CheckIcon width={20} height={20} />
          </div>
          <p style={{ fontWeight: 600, fontSize: 15, marginTop: 16 }}>Message envoyé</p>
          <p style={{ fontSize: 13, color: "var(--fog)", marginTop: 6 }}>On te répond par email très vite.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <GlassField label="TON EMAIL" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ton@email.com" />
          <label style={{ display: "block", marginBottom: 16 }}>
            <span style={{ display: "block", marginBottom: 7, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", color: "var(--fog)" }}>TON MESSAGE</span>
            <textarea
              className="glass-input liquid-glass"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Décris ton problème…"
              rows={4}
              style={{ resize: "none", fontFamily: "inherit" }}
            />
          </label>
          <button
            type="submit"
            className="liquid-glass liquid-glass--signal"
            style={{ width: "100%", padding: 15, fontSize: 14.5, fontWeight: 600, color: "var(--paper)", borderRadius: 14, cursor: "pointer" }}
          >
            Envoyer
          </button>
        </form>
      )}
    </main>
  );
}
