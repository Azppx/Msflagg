# Boutique Premium — Template E-commerce

Template e-commerce générique : design dark premium, catalogue à une offre,
checkout complet (Produit → Informations → Paiement → Confirmation), paiement
PayPal (Sandbox et Production), et déploiement Vercel.

Le produit de démonstration est **Premium Membership — 2 mois — 10 €**, un
produit fictif. Toutes les données produit sont centralisées dans
`lib/config.ts` : adapte-les au produit que tu es autorisé à vendre.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Routes API Next.js pour PayPal (création + capture de commande côté serveur)
- Déploiement Vercel

## Sécurité du prix

Le prix n'est **jamais** lu depuis une valeur envoyée par le navigateur.
`app/api/paypal/create-order/route.ts` appelle `lib/pricing.ts`, qui relit le
prix depuis `lib/config.ts` côté serveur, à partir du seul identifiant produit
(`productSlug`). Même si quelqu'un modifie le prix affiché dans le navigateur,
le montant facturé reste celui défini côté serveur.

## Configuration

1. Copie `.env.example` vers `.env.local`.
2. Renseigne tes identifiants PayPal (voir plus bas).
3. Renseigne ton URL d'invitation Discord.
4. Modifie `lib/config.ts` pour ton produit réel (nom, durée, prix, avis).

## Lancer en local

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000

## Adapter à ton produit

Tout se passe dans `lib/config.ts` :

```ts
export const product = {
  slug: "premium-membership",
  name: "Ton produit",
  duration: "2 mois",
  priceTotal: 10.0,
  ...
};
```

Le `slug` doit correspondre à la valeur vérifiée dans `lib/pricing.ts`.

## Stockage des commandes

Le fichier `lib/orders.ts` utilise un stockage en mémoire pour que le projet
fonctionne immédiatement, sans base de données à configurer. **En production,
remplace cette implémentation par une vraie base de données** (Postgres,
Supabase, SQLite…) — l'interface (`createOrder`, `getOrder`, `updateOrder`)
reste identique.

---

## Déploiement — étape par étape

### 1. Créer le repository GitHub

1. Va sur [github.com/new](https://github.com/new)
2. Donne un nom au repository (ex. `boutique-premium`)
3. Laisse-le vide (sans README, sans .gitignore) si tu importes ce projet existant

### 2. Mettre le projet sur GitHub

```bash
cd boutique-premium
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/boutique-premium.git
git push -u origin main
```

### 3. Importer le projet dans Vercel

1. Va sur [vercel.com/new](https://vercel.com/new)
2. Connecte ton compte GitHub
3. Sélectionne le repository `boutique-premium`
4. Vercel détecte automatiquement Next.js — laisse les réglages par défaut

### 4. Ajouter les variables d'environnement

Dans Vercel : **Project Settings → Environment Variables**, ajoute :

| Variable | Valeur |
|---|---|
| `PAYPAL_CLIENT_ID` | ton client ID PayPal |
| `PAYPAL_CLIENT_SECRET` | ton secret PayPal |
| `PAYPAL_ENV` | `sandbox` puis `production` plus tard |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | même valeur que `PAYPAL_CLIENT_ID` |
| `NEXT_PUBLIC_DISCORD_INVITE_URL` | ton invitation Discord |

### 5. Configurer PayPal Sandbox

1. Va sur [developer.paypal.com](https://developer.paypal.com)
2. **Apps & Credentials → Sandbox**
3. Crée une app, récupère le **Client ID** et le **Secret**
4. Utilise ces valeurs en `PAYPAL_ENV=sandbox`
5. Crée un compte acheteur de test dans **Sandbox → Accounts** pour tester un paiement

### 6. Tester une commande

1. Redéploie après avoir ajouté les variables d'environnement
2. Ouvre le site déployé, va sur la page produit
3. Suis le parcours Produit → Informations → Paiement
4. Paie avec le compte acheteur Sandbox
5. Vérifie que la page de confirmation affiche bien "PAIEMENT CONFIRMÉ ✓"
   et que le paiement apparaît dans le tableau de bord Sandbox PayPal

### 7. Passer en production

1. Dans PayPal Developer, bascule sur **Live** pour récupérer un Client ID et
   Secret de production
2. Remplace les variables d'environnement dans Vercel par ces valeurs
3. Change `PAYPAL_ENV=production`
4. Redéploie
