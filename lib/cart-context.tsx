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

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "qulse_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Charge le panier depuis localStorage au premier rendu côté client.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
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
      return [...prev, { ...item, quantity: safeQty }];
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
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>");
  return ctx;
}
