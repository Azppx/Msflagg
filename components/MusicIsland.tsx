"use client";

import { useState } from "react";
import Image from "next/image";
import { useAudioPlayer } from "@/lib/audio-player-context";
import { useTranslation } from "@/lib/i18n/locale-context";
import {
  PlayIcon,
  PauseIcon,
  PreviousIcon,
  NextIcon,
  VolumeLowIcon,
  VolumeHighIcon,
  CloseIcon,
} from "@/components/MusicPlayerIcons";

/**
 * Bulle flottante façon "Dynamic Island" : compacte par défaut (pochette +
 * mini barre de progression), s'étend au tap pour révéler les contrôles
 * complets (précédent / lecture-pause / suivant + volume). Ne s'affiche que
 * si une piste a été lancée quelque part sur le site.
 */
export function MusicIsland() {
  const { currentTrack, isPlaying, volume, progress, play, pause, next, previous, setVolume, closePlayer } =
    useAudioPlayer();
  const [expanded, setExpanded] = useState(false);
  const t = useTranslation();

  if (!currentTrack) return null;

  return (
    <div className="fixed inset-x-0 top-[104px] z-20 flex justify-center px-3">
      <div
        className={`kyzen-island ${expanded ? "kyzen-island--expanded" : ""}`}
        onClick={() => !expanded && setExpanded(true)}
      >
        {!expanded && (
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
              <Image src={currentTrack.cover} alt="" fill className="object-cover" sizes="28px" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold leading-tight text-white">
                {currentTrack.title}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                isPlaying ? pause() : play();
              }}
              aria-label={isPlaying ? t("music.pause") : t("music.play")}
              className="kyzen-island-mini-btn ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/90"
            >
              {isPlaying ? <PauseIcon className="h-3 w-3" /> : <PlayIcon className="h-3 w-3" />}
            </button>
            <div className="kyzen-island-progress">
              <div className="kyzen-island-progress-fill" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        )}

        {expanded && (
          <div className="w-[300px] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <Image src={currentTrack.cover} alt="" fill className="object-cover" sizes="56px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{currentTrack.title}</p>
                <p className="truncate text-xs text-white/50">{currentTrack.artist}</p>
              </div>
              <button
                onClick={() => setExpanded(false)}
                aria-label={t("nav.close")}
                className="kyzen-island-icon-btn shrink-0 text-white/40"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="kyzen-island-progress kyzen-island-progress--wide mt-3">
              <div className="kyzen-island-progress-fill" style={{ width: `${progress * 100}%` }} />
            </div>

            <div className="mt-4 flex items-center justify-center gap-6">
              <button
                onClick={previous}
                aria-label={t("music.previous")}
                className="kyzen-island-icon-btn flex h-9 w-9 items-center justify-center text-white/80"
              >
                <PreviousIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => (isPlaying ? pause() : play())}
                aria-label={isPlaying ? t("music.pause") : t("music.play")}
                className="kyzen-island-play flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform active:scale-90"
              >
                {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
              </button>
              <button
                onClick={next}
                aria-label={t("music.next")}
                className="kyzen-island-icon-btn flex h-9 w-9 items-center justify-center text-white/80"
              >
                <NextIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              <VolumeLowIcon className="h-4 w-4 shrink-0 text-white/40" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label={t("music.volume")}
                className="kyzen-island-volume flex-1"
              />
              <VolumeHighIcon className="h-4 w-4 shrink-0 text-white/40" />
            </div>

            <button
              onClick={closePlayer}
              className="mt-4 w-full text-center text-[11px] font-semibold tracking-wide text-white/30 hover:text-white/60"
            >
              {t("music.close_player")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
