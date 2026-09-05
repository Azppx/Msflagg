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
        className="flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-midnight p-6 shadow-[-10px_0_30px_rgba(163,155,194,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <KyzenLogo />
          <button
            onClick={onClose}
            aria-label={t("nav.close")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-midnight text-ink-soft shadow-[3px_3px_8px_rgba(163,155,194,0.5),-3px_-3px_8px_rgba(255,255,255,0.85)] hover:text-ink"
          >
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
          <InstallAppButton className="flex w-full items-center gap-3 rounded-2xl bg-midnight p-4 text-left shadow-[5px_5px_12px_rgba(163,155,194,0.5),-5px_-5px_12px_rgba(255,255,255,0.85)] transition-shadow hover:shadow-[6px_6px_14px_rgba(163,155,194,0.55),-6px_-6px_14px_rgba(255,255,255,0.9)]" />
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
      className="flex items-center gap-3 rounded-2xl bg-midnight p-4 shadow-[5px_5px_12px_rgba(163,155,194,0.5),-5px_-5px_12px_rgba(255,255,255,0.85)] transition-shadow hover:shadow-[6px_6px_14px_rgba(163,155,194,0.55),-6px_-6px_14px_rgba(255,255,255,0.9)] active:shadow-[inset_4px_4px_10px_rgba(163,155,194,0.5),inset_-4px_-4px_10px_rgba(255,255,255,0.85)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-midnight text-lg shadow-[inset_3px_3px_7px_rgba(163,155,194,0.5),inset_-3px_-3px_7px_rgba(255,255,255,0.85)]">
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
