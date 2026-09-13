"use client";

import { useEffect, useState } from "react";
import type { Ticket } from "@/lib/tickets";

export function AdminTicketList({ initialTickets }: { initialTickets: Ticket[] }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [text, setText] = useState("");

  async function refresh() {
    const res = await fetch("/api/admin/support");
    const data = await res.json();
    if (res.ok) setTickets(data.tickets);
  }

  async function reply(id: string) {
    if (!text.trim()) return;
    const res = await fetch(`/api/admin/support/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (res.ok) {
      setSelected(data.ticket);
      setText("");
      refresh();
    }
  }

  async function close(id: string) {
    const res = await fetch(`/api/admin/support/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "close" }),
    });
    const data = await res.json();
    if (res.ok) {
      setSelected(data.ticket);
      refresh();
    }
  }

  useEffect(() => {
    if (!selected) return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/admin/support`);
      const data = await res.json();
      if (res.ok) {
        setTickets(data.tickets);
        const updated = data.tickets.find((t: Ticket) => t.id === selected.id);
        if (updated) setSelected(updated);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [selected?.id]);

  if (selected) {
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="mb-4 text-sm text-white/50 hover:text-white"
        >
          ← Retour à la liste
        </button>
        <div className="glass-panel rounded-xl2 border border-panelBorder p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs text-white/40">{selected.id}</p>
              <p className="font-semibold">
                {selected.customerName} · {selected.customerEmail}
              </p>
            </div>
            {selected.status === "OPEN" ? (
              <button
                onClick={() => close(selected.id)}
                className="rounded-full border border-panelBorder px-3 py-1 text-xs text-white/50 hover:text-white"
              >
                Clôturer
              </button>
            ) : (
              <span className="text-xs text-white/30">Clôturé</span>
            )}
          </div>

          <div className="mt-4 max-h-96 space-y-2 overflow-y-auto">
            {selected.messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${
                  m.from === "admin"
                    ? "ml-auto bg-accent text-black"
                    : "border border-panelBorder bg-white/5"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {selected.status === "OPEN" && (
            <div className="mt-4 flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Répondre…"
                className="flex-1 rounded-xl border border-panelBorder bg-white/5 px-4 py-3 text-sm outline-none"
              />
              <button
                onClick={() => reply(selected.id)}
                className="rounded-xl bg-accent px-4 py-3 text-sm font-bold text-black"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tickets.length === 0 && <p className="text-sm text-white/40">Aucun ticket.</p>}
      {tickets.map((t) => (
        <button
          key={t.id}
          onClick={() => setSelected(t)}
          className="glass-panel block w-full rounded-xl2 border border-panelBorder p-4 text-left transition-colors hover:bg-white/5"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold">{t.customerName}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                t.status === "OPEN" ? "bg-accent/20 text-accent-soft" : "bg-white/10 text-white/40"
              }`}
            >
              {t.status === "OPEN" ? "OUVERT" : "CLÔTURÉ"}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-white/50">
            {t.messages[t.messages.length - 1]?.text}
          </p>
        </button>
      ))}
    </div>
  );
}
