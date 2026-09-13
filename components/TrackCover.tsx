"use client";

import Image from "next/image";
import { useAudioPlayer, type Track } from "@/lib/audio-player-context";

export function TrackCover({ track }: { track: Track }) {
  const { currentTrack, isPlaying, toggleTrack } = useAudioPlayer();
  const active = currentTrack?.id === track.id && isPlaying;

  return (
    <button
      onClick={() => toggleTrack(track)}
      className="group relative block w-full overflow-hidden rounded-2xl border border-panelBorder bg-white/5 transition-transform active:scale-[0.98]"
      aria-label={active ? `Mettre en pause ${track.title}` : `Lancer ${track.title}`}
    >
      <div className="relative aspect-square w-full">
        <Image
          src={track.cover}
          alt={`${track.title} — ${track.artist}`}
          fill
          className="object-cover"
          sizes="(max-width: 480px) 100vw, 400px"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-2xl text-midnight shadow-lg">
            {active ? "❚❚" : "▶"}
          </span>
        </div>
        {active && (
          <div className="absolute bottom-2 right-2 flex items-end gap-[3px]">
            <span className="kyzen-eq-bar" />
            <span className="kyzen-eq-bar" style={{ animationDelay: "0.15s" }} />
            <span className="kyzen-eq-bar" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
      </div>
      <div className="p-3 text-left">
        <p className="truncate text-sm font-semibold text-white">{track.title}</p>
        <p className="truncate text-xs text-white/50">{track.artist}</p>
      </div>
    </button>
  );
}
