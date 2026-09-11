"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageNav } from "@/components/PageNav";
import { GlassField } from "@/components/GlassField";
import { ArrowRightIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2 || !email.includes("@") || password.length < 8) {
      setError("Vérifie tes informations (mot de passe : 8 caractères minimum).");
      return;
    }
    register(name.trim(), email);
    router.push("/compte");
  }

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Inscription" />

      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", marginTop: 24 }}>
        Crée ton compte
      </h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <GlassField label="NOM" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        <GlassField label="EMAIL" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <GlassField label="MOT DE PASSE" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />

        {error && <p style={{ fontSize: 13, color: "var(--ember)", marginTop: -4, marginBottom: 12 }}>{error}</p>}

        <button
          type="submit"
          className="liquid-glass liquid-glass--signal"
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 16, fontSize: 15, fontWeight: 600, color: "var(--paper)", borderRadius: 14, cursor: "pointer", marginTop: 8 }}
        >
          Créer mon compte <ArrowRightIcon width={15} height={15} />
        </button>
      </form>

      <p style={{ marginTop: 24, textAlign: "center", fontSize: 13.5, color: "var(--fog)" }}>
        Déjà un compte ?{" "}
        <Link href="/compte/connexion" style={{ color: "var(--signal)", fontWeight: 600, textDecoration: "none" }}>
          Connecte-toi
        </Link>
      </p>
    </main>
  );
}
