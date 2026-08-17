"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl border border-panelBorder bg-white/5 px-4 py-2 text-xs font-semibold text-white/60 hover:bg-white/10"
    >
      Déconnexion
    </button>
  );
}
