"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

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
 */
export const TRACKS: Track[] = [
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
        return nextTrack;
      });
    };
    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
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
        } else {
          audio.play().catch(() => {});
          setIsPlaying(true);
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
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
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
