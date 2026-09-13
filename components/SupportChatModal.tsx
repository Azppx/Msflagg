"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getStoredTicketId, setStoredTicketId, clearStoredTicketId } from "@/lib/ticket-tracking";
import type { Ticket } from "@/lib/tickets";
import { useTranslation } from "@/lib/i18n/locale-context";

export function SupportChatModal({ onClose }: { onClose: () => void }) {
  const { account } = useAuth();
  const t = useTranslation();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = getStoredTicketId();
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/support/tickets/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setTicket(d.ticket))
      .catch(() => clearStoredTicketId())
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!ticket || ticket.status === "CLOSED") return;
    const interval = setInterval(() => {
      fetch(`/api/support/tickets/${ticket.id}`)
        .then((r) => r.json())
        .then((d) => d.ticket && setTicket(d.ticket));
    }, 8000);
    return () => clearInterval(interval);
  }, [ticket?.id, ticket?.status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [ticket?.messages.length]);

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!text.trim()) return;
    if (!account && (!firstName.trim() || !lastName.trim() || !email.includes("@") || !dob)) {
      setError(t("support.fill_all_fields"));
      return;
    }
    const name = account ? account.name : `${firstName.trim()} ${lastName.trim()}`;
    const res = await fetch("/api/support/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: "Demande de support", message: text, name, email, dob }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || t("support.generic_error"));
      return;
    }
    setStoredTicketId(data.ticket.id);
    setTicket(data.ticket);
    setText("");
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!ticket || !text.trim()) return;
    const res = await fetch(`/api/support/tickets/${ticket.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (res.ok) {
      setTicket(data.ticket);
      setText("");
    }
  }

  function handleNewTicket() {
    clearStoredTicketId();
    setTicket(null);
    setText("");
    setError("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="glass-panel flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl border border-panelBorder sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-panelBorder p-4">
          <h3 className="font-display text-lg">{t("support.modal_title")}</h3>
          <button onClick={onClose} aria-label={t("nav.close")} className="text-white/50 hover:text-white">
            ✕
          </button>
        </div>

        {loading && <p className="p-4 text-sm text-white/40">{t("support.loading")}</p>}

        {!loading && !ticket && (
          <form onSubmit={handleStart} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            <p className="text-sm text-white/60">{t("support.describe_issue")}</p>
            {!account && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t("support.first_name_placeholder")}
                    className="rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm outline-none focus:border-electric"
                  />
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t("support.last_name_placeholder")}
                    className="rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm outline-none focus:border-electric"
                  />
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("support.email_placeholder")}
                  className="rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm outline-none focus:border-electric"
                />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder={t("support.dob_placeholder")}
                  className="rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm text-white/70 outline-none focus:border-electric [color-scheme:dark]"
                />
              </>
            )}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("support.message_placeholder")}
              rows={4}
              className="rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm outline-none focus:border-electric"
            />
            {error && <p className="text-sm text-danger">{error}</p>}
            <button
              type="submit"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-black"
            >
              {t("support.send")}
            </button>
          </form>
        )}

        {ticket && (
          <>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              <p className="text-center text-xs text-white/30">{t("support.ticket_label")} {ticket.id}</p>
              {ticket.messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[80%] rounded-xl2 px-4 py-2.5 text-sm ${
                    m.from === "customer"
                      ? "ml-auto bg-accent text-black"
                      : "border border-panelBorder bg-white/5 text-white/90"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {ticket.status === "CLOSED" && (
                <p className="text-center text-xs text-white/30">{t("support.ticket_closed")}</p>
              )}
            </div>

            {ticket.status === "OPEN" && (
              <form onSubmit={handleReply} className="flex gap-2 border-t border-panelBorder p-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t("support.reply_placeholder")}
                  className="flex-1 rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm outline-none focus:border-electric"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-4 py-3 text-sm font-bold text-black"
                >
                  →
                </button>
              </form>
            )}

            {ticket.status === "CLOSED" && (
              <div className="border-t border-panelBorder p-3">
                <button
                  onClick={handleNewTicket}
                  className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-bold text-black"
                >
                  {t("support.new_ticket")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
