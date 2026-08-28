"use client";

import { PageHeader } from "@/components/PageHeader";
import { TrackCover } from "@/components/TrackCover";
import type { Track } from "@/lib/audio-player-context";
import { useTranslation } from "@/lib/i18n/locale-context";

const TRACKS: Track[] = [
  {
    id: "billie-jean",
    title: "Billie Jean",
    artist: "Michael Jackson",
    src: "/music/billie-jean.mp3",
    cover: "/music/michael-jackson-cover.jpg",
  },
  {
    id: "the-girl-is-mine",
    title: "The Girl Is Mine",
    artist: "Michael Jackson & Paul McCartney",
    src: "/music/the-girl-is-mine.mp3",
    cover: "/music/michael-jackson-cover.jpg",
  },
  {
    id: "cambrure",
    title: "Cambrure",
    artist: "—",
    src: "/music/cambrure.mp3",
    cover: "/music/cambrure-cover.jpg",
  },
];

export default function MusiquePage() {
  const t = useTranslation();

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={t("music.eyebrow")} title={t("music.title")} backHref="/" />

      <div className="px-5">
        <p className="text-sm text-white/50">{t("music.subtitle")}</p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {TRACKS.map((track) => (
            <TrackCover key={track.id} track={track} />
          ))}
        </div>
      </div>
    </main>
  );
}
