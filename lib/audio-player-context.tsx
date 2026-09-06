"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import tracksData from "@/data/tracks.json";

export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
};

/**
 * Playlist centralisée ici (plutôt que dans la page /musique) pour que la
 * bulle flottante globale puisse afficher/piloter n'importe quelle piste
 * depuis n'importe quelle page du site.
 *
 * Les pistes elles-mêmes (mp3 + covers) ne sont PAS stockées dans ce repo :
 * elles sont hébergées sur Supabase Storage (bucket public "music") pour
 * éviter de dépasser la limite de taille de fichier de GitHub (100 Mo) avec
 * un dossier public/music/ trop volumineux.
 *
 * data/tracks.json est généré automatiquement par
 * scripts/upload-music-to-supabase.js, qui upload chaque fichier et note
 * son URL publique Supabase ici. Pour ajouter/renouveler des morceaux :
 *   1. Dépose les mp3/covers dans public/music/ (temporairement, en local)
 *   2. npm run upload-music
 *   3. Le script régénère data/tracks.json avec les nouvelles URLs
 *   4. Supprime public/music/ avant de committer (voir instruction affichée
 *      par le script à la fin)
 */
export const TRACKS: Track[] = tracksData as Track[];

type AudioPlayerContextValue = {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number; // 0 à 1
  toggleTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (v: number) => void;
  closePlayer: () => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue>({
  currentTrack: null,
  isPlaying: false,
  volume: 1,
  progress: 0,
  toggleTrack: () => {},
  play: () => {},
  pause: () => {},
  next: () => {},
  previous: () => {},
  setVolume: () => {},
  closePlayer: () => {},
});

/**
 * Met à jour les métadonnées affichées par le système (écran verrouillé,
 * Control Center iOS, notification Android) via la Media Session API.
 * Sans ça, iOS/Android n'affichent aucune info "en cours de lecture".
 */
function updateMediaSessionMetadata(track: Track | null) {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;

  if (!track) {
    navigator.mediaSession.metadata = null;
    return;
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: track.artist,
    album: "KYZEN",
    artwork: [
      { src: track.cover, sizes: "96x96", type: "image/jpeg" },
      { src: track.cover, sizes: "128x128", type: "image/jpeg" },
      { src: track.cover, sizes: "192x192", type: "image/jpeg" },
      { src: track.cover, sizes: "256x256", type: "image/jpeg" },
      { src: track.cover, sizes: "384x384", type: "image/jpeg" },
      { src: track.cover, sizes: "512x512", type: "image/jpeg" },
    ],
  });
}

function updateMediaSessionPlaybackState(isPlaying: boolean) {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
  navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
}

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Un seul élément <audio> réutilisé pour toutes les pistes.
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const onEnded = () => {
      // À la fin d'une piste, enchaîne automatiquement sur la suivante.
      setCurrentTrack((prevTrack) => {
        if (!prevTrack) return prevTrack;
        const idx = TRACKS.findIndex((tr) => tr.id === prevTrack.id);
        const nextTrack = TRACKS[(idx + 1) % TRACKS.length];
        audio.src = nextTrack.src;
        audio.currentTime = 0;
        audio.play().catch(() => {});
        setIsPlaying(true);
        updateMediaSessionMetadata(nextTrack);
        updateMediaSessionPlaybackState(true);
        return nextTrack;
      });
    };
    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onPlay = () => updateMediaSessionPlaybackState(true);
    const onPause = () => updateMediaSessionPlaybackState(false);

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Branche les contrôles système (écran verrouillé, Control Center,
    // écouteurs Bluetooth) sur nos propres actions.
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => {
        audio.play().catch(() => {});
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        audio.pause();
        setIsPlaying(false);
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        setCurrentTrack((prevTrack) => {
          const idx = prevTrack ? TRACKS.findIndex((tr) => tr.id === prevTrack.id) : 0;
          const prevIdx = (idx - 1 + TRACKS.length) % TRACKS.length;
          const prevTrackObj = TRACKS[prevIdx];
          audio.pause();
          audio.src = prevTrackObj.src;
          audio.currentTime = 0;
          audio.play().catch(() => {});
          setIsPlaying(true);
          updateMediaSessionMetadata(prevTrackObj);
          updateMediaSessionPlaybackState(true);
          return prevTrackObj;
        });
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        setCurrentTrack((prevTrack) => {
          const idx = prevTrack ? TRACKS.findIndex((tr) => tr.id === prevTrack.id) : -1;
          const nextTrack = TRACKS[(idx + 1) % TRACKS.length];
          audio.pause();
          audio.src = nextTrack.src;
          audio.currentTime = 0;
          audio.play().catch(() => {});
          setIsPlaying(true);
          updateMediaSessionMetadata(nextTrack);
          updateMediaSessionPlaybackState(true);
          return nextTrack;
        });
      });
    }

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, []);

  const playTrack = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = track.src;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
    updateMediaSessionMetadata(track);
    updateMediaSessionPlaybackState(true);
  }, []);

  const toggleTrack = useCallback(
    (track: Track) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (currentTrack?.id === track.id) {
        // Même piste : bascule lecture / pause.
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
          updateMediaSessionPlaybackState(false);
        } else {
          audio.play().catch(() => {});
          setIsPlaying(true);
          updateMediaSessionPlaybackState(true);
        }
        return;
      }

      playTrack(track);
    },
    [currentTrack, isPlaying, playTrack]
  );

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {});
    setIsPlaying(true);
    updateMediaSessionPlaybackState(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    updateMediaSessionPlaybackState(false);
  }, []);

  const next = useCallback(() => {
    setCurrentTrack((prevTrack) => {
      const idx = prevTrack ? TRACKS.findIndex((tr) => tr.id === prevTrack.id) : -1;
      const nextTrack = TRACKS[(idx + 1) % TRACKS.length];
      playTrack(nextTrack);
      return nextTrack;
    });
  }, [playTrack]);

  const previous = useCallback(() => {
    setCurrentTrack((prevTrack) => {
      const idx = prevTrack ? TRACKS.findIndex((tr) => tr.id === prevTrack.id) : 0;
      const prevIdx = (idx - 1 + TRACKS.length) % TRACKS.length;
      const prevTrackObj = TRACKS[prevIdx];
      playTrack(prevTrackObj);
      return prevTrackObj;
    });
  }, [playTrack]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    if (audioRef.current) audioRef.current.volume = clamped;
    setVolumeState(clamped);
  }, []);

  const closePlayer = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setCurrentTrack(null);
    setProgress(0);
    updateMediaSessionMetadata(null);
    updateMediaSessionPlaybackState(false);
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        toggleTrack,
        play,
        pause,
        next,
        previous,
        setVolume,
        closePlayer,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}
