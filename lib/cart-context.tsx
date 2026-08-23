"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  slug: string;
  name: string;
  unitPrice: number;
  currency: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalCount: 0,
  totalPrice: 0,
  hydrated: false,
});
const STORAGE_KEY = "kyzen_cart";

/**
 * Fusionne les entrées en double (même slug) et nettoie les données
 * corrompues. Appliqué au chargement ET à chaque mutation, pour que le
 * panier se répare tout seul si un vieux state buggé traînait en
 * localStorage (c'est ce qui causait un total qui ne correspondait plus
 * aux articles affichés).
 */
function normalizeItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const bySlug = new Map<string, CartItem>();
  for (const entry of raw) {
    if (
      !entry ||
      typeof entry.slug !== "string" ||
      typeof entry.name !== "string" ||
      !Number.isFinite(entry.unitPrice) ||
      !Number.isFinite(entry.quantity)
    ) {
      continue;
    }
    const quantity = Math.max(0, Math.min(50, Math.floor(entry.quantity)));
    if (quantity <= 0) continue;
    const existing = bySlug.get(entry.slug);
    if (existing) {
      existing.quantity = Math.min(50, existing.quantity + quantity);
    } else {
      bySlug.set(entry.slug, {
        slug: entry.slug,
        name: entry.name,
        unitPrice: entry.unitPrice,
        currency: entry.currency || "EUR",
        quantity,
      });
    }
  }
  return Array.from(bySlug.values());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Charge le panier depuis localStorage au premier rendu côté client.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(normalizeItems(JSON.parse(raw)));
    } catch {
      // localStorage indisponible ou corrompu : on repart d'un panier vide.
    }
    setHydrated(true);
  }, []);

  // Sauvegarde à chaque changement (une fois l'hydratation initiale faite,
  // pour ne pas écraser un panier existant avec un tableau vide).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // quota dépassé ou navigation privée : tant pis, le panier reste en mémoire.
    }
  }, [items, hydrated]);

  function addItem(item: Omit<CartItem, "quantity">, quantity: number) {
    const safeQty = Math.max(1, Math.min(50, Math.floor(quantity) || 1));
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug
            ? { ...i, quantity: Math.min(50, i.quantity + safeQty) }
            : i
        );
      }
      return normalizeItems([...prev, { ...item, quantity: safeQty }]);
    });
  }

  function updateQuantity(slug: string, quantity: number) {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.slug !== slug);
      const safeQty = Math.min(50, Math.floor(quantity));
      return prev.map((i) => (i.slug === slug ? { ...i, quantity: safeQty } : i));
    });
  }

  function removeItem(slug: string) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }

  function clearCart() {
    setItems([]);
  }

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalCount,
      totalPrice,
      hydrated,
    }),
    // items est suffisant comme dépendance, les fonctions ferment sur setItems (stable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
