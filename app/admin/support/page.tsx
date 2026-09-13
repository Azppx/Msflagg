import { listTickets } from "@/lib/tickets";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { AdminTicketList } from "@/components/admin/AdminTicketList";

export const dynamic = "force-dynamic";

export default async function AdminSupportPage() {
  const tickets = await listTickets();

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-electric-soft">ADMIN</p>
          <h1 className="font-display text-3xl">Support</h1>
          <p className="mt-1 text-sm text-white/50">{tickets.length} ticket(s)</p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-6">
        <AdminTicketList initialTickets={tickets} />
      </div>
    </main>
  );
}
