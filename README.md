# Boutique Premium — Template E-commerce

Template e-commerce générique : design dark premium, catalogue multi-produits,
checkout complet (Produit → Informations → Paiement → Confirmation), paiement
par **virement Wise avec confirmation manuelle**, espace admin protégé par
mot de passe pour valider les paiements et livrer les commandes, et
déploiement Vercel.

Le produit par défaut est **Basic-Fit Ultimate — 2 mois — 10 €**, un exemple.
Toutes les données produit sont centralisées dans `lib/config.ts` (produit
par défaut) et `lib/catalog.ts` (catalogue `/premium`).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Paiement Wise en virement manuel + confirmation admin (pas d'API de
  paiement automatisée : Wise n'expose pas de bouton de checkout comme
  PayPal/Stripe pour les comptes non-Business avec API approuvée)
- Espace admin (`/admin/commandes`) protégé par mot de passe
- Déploiement Vercel

## Comment fonctionne le paiement Wise

Wise n'a pas d'équivalent du bouton PayPal/Stripe embarquable côté client
sans passer par l'API Wise Business (accès approuvé, OAuth, webhooks — pas
configurable juste avec des variables d'environnement). Le flux ici est donc
un **virement manuel vérifié à la main**, ce qui est la façon réaliste
d'accepter des paiements Wise sur un petit site :

1. Le client arrive sur `/checkout/paiement`. Une commande est créée
   (`status: "CREATED"`) avec le prix recalculé côté serveur.
2. Le client voit tes coordonnées Wise (nom, email et/ou IBAN, éventuellement
   un lien de paiement Wise Business) et la **référence de commande** à
   indiquer dans le virement.
3. Une fois le virement envoyé, il clique sur "J'ai envoyé le paiement" →
   la commande passe en `AWAITING_VERIFICATION`.
4. Toi, tu vas sur `/admin/commandes`, tu vérifies dans ton compte Wise que le
   virement est bien arrivé, puis tu cliques sur "Confirmer paiement reçu" →
   la commande passe en `PAID`.
5. Tu colles le contenu à livrer (identifiants, lien, etc.) → la commande
   passe en `DELIVERED` et le client la voit automatiquement en revenant sur
   sa page de confirmation.

## Sécurité du prix

Le prix n'est **jamais** lu depuis une valeur envoyée par le navigateur.
`app/api/orders/create/route.ts` appelle `lib/pricing.ts`, qui relit le prix
depuis `lib/config.ts` / `lib/catalog.ts` côté serveur, à partir du seul
identifiant produit (`productSlug`). Même si quelqu'un modifie le prix
affiché dans le navigateur, le montant facturé reste celui défini côté
serveur.

## Configuration

1. Copie `.env.example` vers `.env.local`.
2. Renseigne tes coordonnées Wise (voir plus bas).
3. Choisis un `ADMIN_PASSWORD` pour protéger `/admin/commandes`.
4. Renseigne ton URL d'invitation Discord.
5. Modifie `lib/config.ts` / `lib/catalog.ts` pour tes produits réels.

## Lancer en local

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000

## Adapter à ton produit

Produit par défaut dans `lib/config.ts` :

```ts
export const product = {
  slug: "basic-fit",
  name: "Ton produit",
  duration: "2 mois",
  priceTotal: 10.0,
  ...
};
```

Catalogue complet (page `/premium`) dans `lib/catalog.ts` — un tableau
`catalogProducts`, chaque entrée génère automatiquement sa propre page
`/produit/[slug]`.

## Stockage des commandes

Le fichier `lib/orders.ts` utilise un stockage **en mémoire** pour que le
projet fonctionne immédiatement, sans base de données à configurer.

⚠️ **Limite importante sur Vercel** : les fonctions serverless de Vercel ne
garantissent pas qu'une même instance mémoire serve toutes les requêtes. En
usage réel (pas juste une démo), une commande peut ne pas apparaître de façon
fiable dans `/admin/commandes`, ou disparaître après un redéploiement.
**Remplace `lib/orders.ts` par une vraie base de données** (Postgres via
Vercel/Supabase, par exemple) avant de vendre pour de vrai — l'interface
(`createOrder`, `getOrder`, `updateOrder`, `listOrders`) reste identique,
seule l'implémentation change.

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
| `NEXT_PUBLIC_WISE_ACCOUNT_HOLDER` | le nom affiché comme bénéficiaire Wise |
| `NEXT_PUBLIC_WISE_EMAIL` | ton email Wise (optionnel si tu mets un IBAN) |
| `NEXT_PUBLIC_WISE_IBAN` | ton IBAN (optionnel si tu mets un email) |
| `NEXT_PUBLIC_WISE_PAYMENT_LINK` | ton lien de paiement Wise Business (optionnel) |
| `ADMIN_PASSWORD` | le mot de passe pour accéder à `/admin/commandes` |
| `NEXT_PUBLIC_DISCORD_INVITE_URL` | ton invitation Discord |

### 5. Tester une commande

1. Redéploie après avoir ajouté les variables d'environnement
2. Ouvre le site déployé, va sur une page produit, suis le parcours
   Produit → Informations → Paiement
3. Clique "J'ai envoyé le paiement" (pas besoin d'un vrai virement pour tester
   le flux, seule la vérification finale doit correspondre à un vrai virement
   en usage réel)
4. Va sur `tonsite.com/admin/login`, connecte-toi, confirme le paiement puis
   livre la commande
5. Reviens sur le lien de confirmation du client : le contenu livré doit
   apparaître
