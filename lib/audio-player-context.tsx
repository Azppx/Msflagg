"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
};

type AudioPlayerContextValue = {
  currentTrackId: string | null;
  isPlaying: boolean;
  toggleTrack: (track: Track) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue>({
  currentTrackId: null,
  isPlaying: false,
  toggleTrack: () => {},
});

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Un seul élément <audio> réutilisé pour toutes les pistes.
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, []);

  const toggleTrack = useCallback(
    (track: Track) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (currentTrackId === track.id) {
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

      // Nouvelle piste : on coupe l'ancienne et on lance la nouvelle.
      audio.pause();
      audio.src = track.src;
      audio.currentTime = 0;
      audio.play().catch(() => {});
      setCurrentTrackId(track.id);
      setIsPlaying(true);
    },
    [currentTrackId, isPlaying]
  );

  return (
    <AudioPlayerContext.Provider value={{ currentTrackId, isPlaying, toggleTrack }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}
