"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type Track = { id: string; title: string; artist: string; src: string };

// Playlist de démonstration : dans une vraie mise en prod, ces URLs
// pointeraient vers un stockage externe (ex: Supabase Storage) plutôt que
// des fichiers embarqués dans le dépôt Git, pour éviter les limites de
// taille de fichier de GitHub.
export const TRACKS: Track[] = [];

type AudioPlayerContextValue = {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  toggleTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue>({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  toggleTrack: () => {},
  play: () => {},
  pause: () => {},
  next: () => {},
  previous: () => {},
});

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;
    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => {
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
  }, []);

  const toggleTrack = useCallback(
    (track: Track) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (currentTrack?.id === track.id) {
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
    if (!TRACKS.length) return;
    const idx = currentTrack ? TRACKS.findIndex((t) => t.id === currentTrack.id) : -1;
    playTrack(TRACKS[(idx + 1) % TRACKS.length]);
  }, [currentTrack, playTrack]);
  const previous = useCallback(() => {
    if (!TRACKS.length) return;
    const idx = currentTrack ? TRACKS.findIndex((t) => t.id === currentTrack.id) : 0;
    playTrack(TRACKS[(idx - 1 + TRACKS.length) % TRACKS.length]);
  }, [currentTrack, playTrack]);

  return (
    <AudioPlayerContext.Provider value={{ currentTrack, isPlaying, progress, toggleTrack, play, pause, next, previous }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}
