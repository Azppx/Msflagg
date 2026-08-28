"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { InstallAppButton } from "@/components/InstallAppButton";
import { KyzenLogo } from "@/components/KyzenLogo";
import { useTranslation } from "@/lib/i18n/locale-context";

export function SideMenu({ onClose }: { onClose: () => void }) {
  const { account, logout } = useAuth();
  const t = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="flex h-full w-[85%] max-w-sm flex-col overflow-y-auto border-l border-panelBorder bg-midnight/98 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <KyzenLogo />
          <button onClick={onClose} aria-label={t("nav.close")} className="text-white/50 hover:text-white">
            ✕
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {account ? (
            <>
              <MenuItem href="/compte" icon="👤" title={t("nav.profile")} subtitle={t("nav.profile_subtitle")} onClick={onClose} />
              <MenuItem
                href="/compte/commandes"
                icon="🛒"
                title={t("nav.orders")}
                subtitle={t("nav.orders_subtitle")}
                onClick={onClose}
              />
            </>
          ) : (
            <>
              <MenuItem
                href="/compte/connexion"
                icon="👤"
                title={t("nav.login")}
                subtitle={t("nav.login_subtitle")}
                onClick={onClose}
              />
              <MenuItem
                href="/compte/inscription"
                icon="✨"
                title={t("nav.signup")}
                subtitle={t("nav.signup_subtitle")}
                onClick={onClose}
              />
            </>
          )}

          <MenuItem href="/support" icon="❓" title={t("nav.help")} subtitle={t("nav.help_subtitle")} onClick={onClose} />
          <MenuItem
            href="/premium"
            icon="⚡"
            title={t("nav.services")}
            subtitle={t("nav.services_subtitle")}
            onClick={onClose}
          />
          <MenuItem href="/avis" icon="⭐" title={t("nav.reviews")} subtitle={t("nav.reviews_subtitle")} onClick={onClose} />
          <MenuItem href="/musique" icon="🎵" title={t("nav.music")} subtitle={t("nav.music_subtitle")} onClick={onClose} />
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
            {t("nav.logout")}
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
