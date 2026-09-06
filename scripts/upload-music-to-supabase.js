#!/usr/bin/env node
/**
 * Upload tous les fichiers de public/music/ vers un bucket Supabase Storage
 * public, puis génère data/tracks.json avec les URLs publiques résultantes.
 *
 * Usage :
 *   1. npm install @supabase/supabase-js --save-dev
 *   2. Crée un fichier .env.local à la racine du projet avec :
 *        SUPABASE_URL=https://xxxxx.supabase.co
 *        SUPABASE_ANON_KEY=eyJ...
 *      (valeurs récupérées dans Project Settings > API sur supabase.com)
 *   3. node scripts/upload-music-to-supabase.js
 *
 * Le script est idempotent : le relancer avec de nouveaux fichiers dans
 * public/music/ les ajoute sans dupliquer ceux déjà envoyés (upsert).
 */

const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const BUCKET = "music";
const MUSIC_DIR = path.join(__dirname, "..", "public", "music");
const OUTPUT_JSON = path.join(__dirname, "..", "data", "tracks.json");

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "❌ SUPABASE_URL et SUPABASE_ANON_KEY doivent être définis dans .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function titleize(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function guessContentType(filename) {
  if (filename.endsWith(".mp3")) return "audio/mpeg";
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
  if (filename.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

async function uploadFile(filename) {
  const filePath = path.join(MUSIC_DIR, filename);
  const buffer = fs.readFileSync(filePath);

  const { error } = await supabase.storage.from(BUCKET).upload(filename, buffer, {
    contentType: guessContentType(filename),
    upsert: true, // écrase si déjà présent, permet de relancer le script sans erreur
  });

  if (error) {
    console.error(`❌ Échec upload ${filename} :`, error.message);
    return null;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

async function main() {
  const files = fs.readdirSync(MUSIC_DIR);
  const mp3s = files.filter((f) => f.endsWith(".mp3"));

  console.log(`⏳ ${mp3s.length} pistes à traiter...`);

  const tracks = [];

  for (const mp3 of mp3s) {
    const slug = mp3.replace(/\.mp3$/, "");
    const directCover = `${slug}-cover.jpg`;
    const coverFile = files.includes(directCover)
      ? directCover
      : slug === "billie-jean" || slug === "the-girl-is-mine"
      ? "michael-jackson-cover.jpg"
      : null;

    process.stdout.write(`  → ${mp3} ... `);
    const audioUrl = await uploadFile(mp3);
    if (!audioUrl) continue;

    let coverUrl = null;
    if (coverFile) {
      coverUrl = await uploadFile(coverFile);
    }

    console.log("ok");

    tracks.push({
      id: slug,
      title: titleize(slug),
      artist:
        slug === "billie-jean" || slug === "the-girl-is-mine"
          ? "Michael Jackson"
          : "—",
      src: audioUrl,
      cover: coverUrl || "",
    });
  }

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(tracks, null, 2));

  console.log(`\n✅ ${tracks.length} pistes uploadées.`);
  console.log(`✅ Catalogue généré : ${path.relative(process.cwd(), OUTPUT_JSON)}`);
  console.log(
    `\nTu peux maintenant supprimer public/music/ du projet (les fichiers vivent sur Supabase) :`
  );
  console.log(`  rm -rf public/music`);
}

main().catch((err) => {
  console.error("❌ Erreur inattendue :", err);
  process.exit(1);
});
