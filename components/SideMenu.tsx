"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { InstallAppButton } from "@/components/InstallAppButton";
import { QulseLogo } from "@/components/QulseLogo";

export function SideMenu({ onClose }: { onClose: () => void }) {
  const { account, logout } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="flex h-full w-[85%] max-w-sm flex-col overflow-y-auto border-l border-panelBorder bg-midnight/98 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <QulseLogo />
          <button onClick={onClose} aria-label="Fermer" className="text-white/50 hover:text-white">
            ✕
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {account ? (
            <>
              <MenuItem href="/compte" icon="👤" title="Profil" subtitle="Mon compte Qulse" onClick={onClose} />
              <MenuItem
                href="/compte/commandes"
                icon="🛒"
                title="Commandes"
                subtitle="Mes commandes en cours"
                onClick={onClose}
              />
            </>
          ) : (
            <>
              <MenuItem
                href="/compte/connexion"
                icon="👤"
                title="Se connecter"
                subtitle="Accède à ton compte"
                onClick={onClose}
              />
              <MenuItem
                href="/compte/inscription"
                icon="✨"
                title="S'inscrire"
                subtitle="Crée ton compte Qulse"
                onClick={onClose}
              />
            </>
          )}

          <MenuItem href="/support" icon="❓" title="Aide" subtitle="Support & SAV" onClick={onClose} />
          <MenuItem
            href="/premium"
            icon="⚡"
            title="Services Qulse"
            subtitle="Vos services en temps réel"
            onClick={onClose}
          />
          <MenuItem href="/avis" icon="⭐" title="Avis Clients" subtitle="Retours de la communauté" onClick={onClose} />
        </div>

        <div className="mt-6">
          <InstallAppButton className="flex w-full items-center gap-3 rounded-2xl border border-panelBorder bg-white/5 p-4 text-left transition-colors hover:bg-white/10" />
        </div>

        {account && (
          <button
            onClick={async () => {
              await logout();
              onClose();
            }}
            className="mt-8 text-sm font-semibold text-white/40 hover:text-white/70"
          >
            Se déconnecter
          </button>
        )}
      </div>
    </div>
  );
}

function MenuItem({
  href,
  icon,
  title,
  subtitle,
  onClick,
}: {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-2xl border border-panelBorder bg-white/5 p-4 transition-colors hover:bg-white/10"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg">
        {icon}
      </span>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-white/40">{subtitle}</p>
      </div>
      <span className="text-white/20">→</span>
    </Link>
  );
}
