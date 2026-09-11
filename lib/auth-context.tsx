"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Account = { name: string; email: string };

type AuthContextValue = {
  account: Account | null;
  loading: boolean;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  account: null,
  loading: true,
  login: () => {},
  register: () => {},
  logout: () => {},
});

const STORAGE_KEY = "kyzen-account";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAccount(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const persist = useCallback((acc: Account | null) => {
    setAccount(acc);
    if (acc) localStorage.setItem(STORAGE_KEY, JSON.stringify(acc));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    (email: string) => {
      const name = email.split("@")[0];
      persist({ name, email });
    },
    [persist]
  );

  const register = useCallback(
    (name: string, email: string) => {
      persist({ name, email });
    },
    [persist]
  );

  const logout = useCallback(() => persist(null), [persist]);

  return <AuthContext.Provider value={{ account, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
