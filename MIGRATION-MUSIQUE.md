# Migration de la musique vers Supabase Storage

Le dossier `public/music/` a été retiré du projet : il pesait 230 Mo, ce qui
dépassait la limite de 100 Mo par fichier de GitHub (le zip du projet
faisait plus de 240 Mo). Les fichiers audio et covers vivent maintenant sur
Supabase Storage, un stockage cloud gratuit, et le site les charge par URL
plutôt que de les embarquer dans le dépôt.

## Ce que tu as reçu

- `KYZEN.zip` — le projet Next.js complet, sans `public/music/`, prêt à être
  poussé sur GitHub sans erreur de taille.
- `kyzen-music-files.zip` — les 62 morceaux + leurs pochettes, à uploader
  une fois vers Supabase.

## Étapes à suivre

### 1. Créer le compte et le bucket Supabase (si pas déjà fait)

1. Va sur [supabase.com](https://supabase.com) → "Start your project" →
   inscris-toi (gratuit, sans carte bancaire).
2. "New project" : choisis un nom (ex: `kyzen-media`), un mot de passe de
   base de données (garde-le de côté), une région proche de toi.
3. Dans le menu de gauche : **Storage** → **New bucket** → nomme-le `music`
   → **coche "Public bucket"** (sinon les fichiers ne seront pas
   accessibles depuis le site).
4. **Project Settings** (icône engrenage) → **API** → copie le
   **Project URL** et la clé **anon public** (pas la `service_role`).

### 2. Préparer le projet

```bash
# Dans le dossier du projet KYZEN
cp .env.local.example .env.local
```

Remplis `.env.local` avec les deux valeurs récupérées à l'étape précédente :

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

Décompresse `kyzen-music-files.zip` et place son contenu (le dossier
`music/`) dans `public/music/` du projet, de façon à avoir :

```
public/music/billie-jean.mp3
public/music/billie-jean-cover.jpg
public/music/...
```

### 3. Lancer l'upload

```bash
npm install
npm run upload-music
```

Le script (`scripts/upload-music-to-supabase.js`) envoie chaque fichier
vers ton bucket Supabase, puis régénère automatiquement
`data/tracks.json` avec les bonnes URLs publiques. Ça prend quelques
minutes pour 62 fichiers selon ta connexion.

### 4. Nettoyer avant de committer

Une fois l'upload terminé et confirmé (le script affiche
`✅ 62 pistes uploadées`), supprime le dossier temporaire :

```bash
rm -rf public/music
```

Tu peux maintenant committer et pousser sur GitHub sans erreur de taille —
`data/tracks.json` contient les URLs Supabase, plus aucun gros fichier
binaire dans le dépôt.

## Ajouter de nouveaux morceaux plus tard

Répète les étapes 2 (dépose les nouveaux fichiers dans `public/music/`) à 4
(nettoie après upload). Le script est idempotent : relancer
`npm run upload-music` avec des fichiers déjà uploadés les écrase
proprement (pas de doublon), et les nouveaux s'ajoutent à la suite.

## Limites du plan gratuit Supabase à connaître

- **1 Go de stockage fichiers** inclus — les 230 Mo actuels laissent de la
  marge pour grandir.
- **Les projets gratuits se mettent en pause après 7 jours sans requête.**
  Comme le site interroge Supabase à chaque lecture de musique, ce n'est
  pas un problème tant que le site reçoit du trafic régulièrement. En cas
  de pause, il suffit de se reconnecter au dashboard Supabase pour
  réactiver le projet.
- Contrairement à Vercel Hobby, les conditions Supabase Free n'excluent pas
  explicitement l'usage commercial — mais vérifie toujours les conditions
  actuelles sur supabase.com/pricing avant de t'y fier pour un usage
  business à long terme.
