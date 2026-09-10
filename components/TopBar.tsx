"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { CartIcon, GlobeIcon, MenuIcon, CloseIcon } from "@/components/icons";

export function TopBar() {
  const { totalCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="liquid-glass liquid-glass--signal"
        style={{
          position: "sticky",
          top: 12,
          zIndex: 40,
          maxWidth: 460,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderRadius: 20,
        }}
      >
        <Link href="/" className="font-display" style={{ fontWeight: 700, fontSize: 21, letterSpacing: "-0.02em", color: "var(--paper)", textDecoration: "none" }}>
          ky<span style={{ color: "var(--signal)" }}>zen</span>
        </Link>
        <div style={{ display: "flex", gap: 8 }}>
          <IconButton ariaLabel="Langue">
            <GlobeIcon width={16} height={16} />
          </IconButton>
          <Link href="/panier" style={{ textDecoration: "none" }}>
            <IconButton ariaLabel="Panier" badge={totalCount > 0 ? totalCount : undefined}>
              <CartIcon width={16} height={16} />
            </IconButton>
          </Link>
          <IconButton ariaLabel="Menu" onClick={() => setMenuOpen(true)}>
            <MenuIcon width={16} height={16} />
          </IconButton>
        </div>
      </nav>

      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}

function IconButton({
  children,
  ariaLabel,
  badge,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className="liquid-glass"
      style={{
        position: "relative",
        width: 38,
        height: 38,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--fog)",
        cursor: "pointer",
      }}
    >
      {children}
      {badge !== undefined && (
        <span
          style={{
            position: "absolute",
            top: -3,
            right: -3,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "var(--ember)",
            color: "var(--void-deep)",
            fontSize: 9.5,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 8px rgba(255,107,74,0.7)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function SideMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "flex-end",
        background: "rgba(6,4,10,0.6)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="liquid-glass liquid-glass--settle"
        style={{
          width: "85%",
          maxWidth: 340,
          height: "100%",
          padding: 24,
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p className="font-display" style={{ fontWeight: 700, fontSize: 20 }}>
            ky<span style={{ color: "var(--signal)" }}>zen</span>
          </p>
          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{ background: "none", border: "none", color: "var(--fog)", cursor: "pointer", padding: 6 }}
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>

        <nav style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8 }}>
          <MenuLink href="/premium" label="Catalogue" onClick={onClose} />
          <MenuLink href="/compte" label="Mon compte" onClick={onClose} />
          <MenuLink href="/compte/commandes" label="Mes commandes" onClick={onClose} />
          <MenuLink href="/support" label="Support" onClick={onClose} />
          <MenuLink href="/avis" label="Avis clients" onClick={onClose} />
          <MenuLink href="/musique" label="Musique" onClick={onClose} />
        </nav>
      </div>
    </div>
  );
}

function MenuLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="liquid-glass"
      style={{
        display: "block",
        padding: "14px 16px",
        borderRadius: 14,
        color: "var(--paper)",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: 14.5,
      }}
    >
      {label}
    </Link>
  );
}
