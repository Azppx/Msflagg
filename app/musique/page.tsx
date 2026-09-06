"use client";

import { PageHeader } from "@/components/PageHeader";
import { TrackCover } from "@/components/TrackCover";
import { TRACKS } from "@/lib/audio-player-context";
import { useTranslation } from "@/lib/i18n/locale-context";

export default function MusiquePage() {
  const t = useTranslation();

  return (
    <main className="mx-auto min-h-screen max-w-md pb-16">
      <PageHeader eyebrow={t("music.eyebrow")} title={t("music.title")} backHref="/" />

      <div className="px-5">
        <p className="text-sm text-white/50">{t("music.subtitle")}</p>

        {TRACKS.length === 0 ? (
          <p className="mt-8 text-sm text-white/30">
            Aucune piste disponible pour le moment.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {TRACKS.map((track) => (
              <TrackCover key={track.id} track={track} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
