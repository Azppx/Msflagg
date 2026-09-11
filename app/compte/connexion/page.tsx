"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageNav } from "@/components/PageNav";
import { GlassField } from "@/components/GlassField";
import { ArrowRightIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Merci de renseigner un email et un mot de passe valides.");
      return;
    }
    login(email);
    router.push("/compte");
  }

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Connexion" />

      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", marginTop: 24 }}>
        Content de te revoir
      </h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <GlassField label="EMAIL" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <GlassField label="MOT DE PASSE" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

        {error && <p style={{ fontSize: 13, color: "var(--ember)", marginTop: -4, marginBottom: 12 }}>{error}</p>}

        <button
          type="submit"
          className="liquid-glass liquid-glass--signal"
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 16, fontSize: 15, fontWeight: 600, color: "var(--paper)", borderRadius: 14, cursor: "pointer", marginTop: 8 }}
        >
          Se connecter <ArrowRightIcon width={15} height={15} />
        </button>
      </form>

      <p style={{ marginTop: 24, textAlign: "center", fontSize: 13.5, color: "var(--fog)" }}>
        Pas encore de compte ?{" "}
        <Link href="/compte/inscription" style={{ color: "var(--signal)", fontWeight: 600, textDecoration: "none" }}>
          Inscris-toi
        </Link>
      </p>
    </main>
  );
}
