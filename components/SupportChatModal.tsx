"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getStoredTicketId, setStoredTicketId, clearStoredTicketId } from "@/lib/ticket-tracking";
import type { Ticket } from "@/lib/tickets";

export function SupportChatModal({ onClose }: { onClose: () => void }) {
  const { account } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
    if (!ticket) return;
    const interval = setInterval(() => {
      fetch(`/api/support/tickets/${ticket.id}`)
        .then((r) => r.json())
        .then((d) => d.ticket && setTicket(d.ticket));
    }, 8000);
    return () => clearInterval(interval);
  }, [ticket?.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [ticket?.messages.length]);

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!text.trim()) return;
    if (!account && (!name.trim() || !email.includes("@"))) {
      setError("Merci de renseigner ton nom et ton email.");
      return;
    }
    const res = await fetch("/api/support/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: "Demande de support", message: text, name, email }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Erreur");
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
          <h3 className="font-display text-lg">SUPPORT</h3>
          <button onClick={onClose} aria-label="Fermer" className="text-white/50 hover:text-white">
            ✕
          </button>
        </div>

        {loading && <p className="p-4 text-sm text-white/40">Chargement…</p>}

        {!loading && !ticket && (
          <form onSubmit={handleStart} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            <p className="text-sm text-white/60">
              Décris ton problème, on te répond dès que possible.
            </p>
            {!account && (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ton nom"
                  className="rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm outline-none focus:border-electric"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  className="rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm outline-none focus:border-electric"
                />
              </>
            )}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ton message…"
              rows={4}
              className="rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm outline-none focus:border-electric"
            />
            {error && <p className="text-sm text-danger">{error}</p>}
            <button
              type="submit"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-black"
            >
              ENVOYER
            </button>
          </form>
        )}

        {ticket && (
          <>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              <p className="text-center text-xs text-white/30">Ticket {ticket.id}</p>
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
                <p className="text-center text-xs text-white/30">Ticket clôturé</p>
              )}
            </div>

            {ticket.status === "OPEN" && (
              <form onSubmit={handleReply} className="flex gap-2 border-t border-panelBorder p-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Écris un message…"
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
          </>
        )}
      </div>
    </div>
  );
}
