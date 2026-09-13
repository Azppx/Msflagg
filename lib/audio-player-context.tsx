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
  {
    id: "allbl4ck",
    title: "ALLBL4CK",
    artist: "UND3XD, FUCKBOYSEX",
    src: "/music/allbl4ck.mp3",
    cover: "/music/allbl4ck-cover.jpg",
  },
  {
    id: "august-10",
    title: "August 10",
    artist: "Julie Doiron",
    src: "/music/august-10.mp3",
    cover: "/music/august-10-cover.jpg",
  },
  {
    id: "bodypartz",
    title: "BodyPartz",
    artist: "Luci4",
    src: "/music/bodypartz.mp3",
    cover: "/music/bodypartz-cover.jpg",
  },
  {
    id: "but-you-failed-them-both",
    title: "But You Failed Them Both",
    artist: "xylen",
    src: "/music/but-you-failed-them-both.mp3",
    cover: "/music/but-you-failed-them-both-cover.jpg",
  },
  {
    id: "dead-n-gone",
    title: "Dead n Gone",
    artist: "Luci4",
    src: "/music/dead-n-gone.mp3",
    cover: "/music/dead-n-gone-cover.jpg",
  },
  {
    id: "for-the-first-time",
    title: "For the First Time",
    artist: "Mac DeMarco",
    src: "/music/for-the-first-time.mp3",
    cover: "/music/for-the-first-time-cover.jpg",
  },
  {
    id: "good-looking",
    title: "Good Looking",
    artist: "Suki Waterhouse",
    src: "/music/good-looking.mp3",
    cover: "/music/good-looking-cover.jpg",
  },
  {
    id: "hex",
    title: "Hex",
    artist: "80purppp",
    src: "/music/hex.mp3",
    cover: "/music/hex-cover.jpg",
  },
  {
    id: "hey",
    title: "Hey",
    artist: "Luci4",
    src: "/music/hey.mp3",
    cover: "/music/hey-cover.jpg",
  },
  {
    id: "i-don-t-need-u",
    title: "I Don't Need U",
    artist: "Dan the Dirt",
    src: "/music/i-don-t-need-u.mp3",
    cover: "/music/i-don-t-need-u-cover.jpg",
  },
  {
    id: "i-dont-wna-cry",
    title: "I Dont Wna Cry",
    artist: "nowayback",
    src: "/music/i-dont-wna-cry.mp3",
    cover: "/music/i-dont-wna-cry-cover.jpg",
  },
  {
    id: "infrunami",
    title: "Infrunami",
    artist: "Steve Lacy",
    src: "/music/infrunami.mp3",
    cover: "/music/infrunami-cover.jpg",
  },
  {
    id: "jealous",
    title: "Jealous",
    artist: "Eyedress",
    src: "/music/jealous.mp3",
    cover: "/music/jealous-cover.jpg",
  },
  {
    id: "kroxxxxroad",
    title: "Kroxxxxroad",
    artist: "Luci4",
    src: "/music/kroxxxxroad.mp3",
    cover: "/music/kroxxxxroad-cover.jpg",
  },
  {
    id: "lie-to-me",
    title: "Lie To Me",
    artist: "LandonBeck",
    src: "/music/lie-to-me.mp3",
    cover: "/music/lie-to-me-cover.jpg",
  },
  {
    id: "looking-out-for-you",
    title: "Looking Out for You",
    artist: "Joy Again",
    src: "/music/looking-out-for-you.mp3",
    cover: "/music/looking-out-for-you-cover.jpg",
  },
  {
    id: "love-me-not",
    title: "Love Me Not",
    artist: "Ravyn Lenae",
    src: "/music/love-me-not.mp3",
    cover: "/music/love-me-not-cover.jpg",
  },
  {
    id: "mask-off",
    title: "MASK OFF!",
    artist: "CAZ!, Cutty Vibez",
    src: "/music/mask-off.mp3",
    cover: "/music/mask-off-cover.jpg",
  },
  {
    id: "mi-casa",
    title: "MI CASA!",
    artist: "CAZ!",
    src: "/music/mi-casa.mp3",
    cover: "/music/mi-casa-cover.jpg",
  },
  {
    id: "my-kind-of-woman",
    title: "My Kind of Woman",
    artist: "Mac DeMarco",
    src: "/music/my-kind-of-woman.mp3",
    cover: "/music/my-kind-of-woman-cover.jpg",
  },
  {
    id: "no-one-noticed-extended-english",
    title: "No One Noticed (Extended English)",
    artist: "The Marías",
    src: "/music/no-one-noticed-extended-english.mp3",
    cover: "/music/no-one-noticed-extended-english-cover.jpg",
  },
  {
    id: "nous-avons-eu-de-belles-annees",
    title: "Nous avons eu de belles années",
    artist: "Fleur de Pays",
    src: "/music/nous-avons-eu-de-belles-annees.mp3",
    cover: "/music/nous-avons-eu-de-belles-annees-cover.jpg",
  },
  {
    id: "okay-lets-see-i-guess-that-im-confused-again",
    title: "Okay, Lets See, I Guess That Im Confused Again",
    artist: "Ione Garett",
    src: "/music/okay-lets-see-i-guess-that-im-confused-again.mp3",
    cover: "/music/okay-lets-see-i-guess-that-im-confused-again-cover.jpg",
  },
  {
    id: "out-the-window",
    title: "Out the Window",
    artist: "K1dallas, LDLOW",
    src: "/music/out-the-window.mp3",
    cover: "/music/out-the-window-cover.jpg",
  },
  {
    id: "pop-rocks",
    title: "POP ROCKS",
    artist: "CAZ!, kea!",
    src: "/music/pop-rocks.mp3",
    cover: "/music/pop-rocks-cover.jpg",
  },
  {
    id: "poison-tree-instrumental",
    title: "Poison Tree - Instrumental",
    artist: "translucent",
    src: "/music/poison-tree-instrumental.mp3",
    cover: "/music/poison-tree-instrumental-cover.jpg",
  },
  {
    id: "rock-out-in-my-jammies",
    title: "ROCK OUT IN MY JAMMIES",
    artist: "DØLØ VØÑ",
    src: "/music/rock-out-in-my-jammies.mp3",
    cover: "/music/rock-out-in-my-jammies-cover.jpg",
  },
  {
    id: "red-light",
    title: "Red Light",
    artist: "QKReign, RJ Pasin",
    src: "/music/red-light.mp3",
    cover: "/music/red-light-cover.jpg",
  },
  {
    id: "rewind",
    title: "Rewind",
    artist: "CAZ!",
    src: "/music/rewind.mp3",
    cover: "/music/rewind-cover.jpg",
  },
  {
    id: "shut-up-my-moms-calling",
    title: "Shut up My Moms Calling",
    artist: "Hotel Ugly",
    src: "/music/shut-up-my-moms-calling.mp3",
    cover: "/music/shut-up-my-moms-calling-cover.jpg",
  },
  {
    id: "sienna",
    title: "Sienna",
    artist: "The Marías",
    src: "/music/sienna.mp3",
    cover: "/music/sienna-cover.jpg",
  },
  {
    id: "stevie-doesn-t-wonder",
    title: "Stevie Doesn't Wonder",
    artist: "Hotel Ugly",
    src: "/music/stevie-doesn-t-wonder.mp3",
    cover: "/music/stevie-doesn-t-wonder-cover.jpg",
  },
  {
    id: "two-step",
    title: "TWO STEP",
    artist: "CAZ!",
    src: "/music/two-step.mp3",
    cover: "/music/two-step-cover.jpg",
  },
  {
    id: "the-loser",
    title: "The Loser",
    artist: "Darrkk, sad tears",
    src: "/music/the-loser.mp3",
    cover: "/music/the-loser-cover.jpg",
  },
  {
    id: "too-much",
    title: "Too Much",
    artist: "Bossa",
    src: "/music/too-much.mp3",
    cover: "/music/too-much-cover.jpg",
  },
  {
    id: "ugly-man-fun-plan",
    title: "Ugly Man Fun Plan",
    artist: "lots of hands",
    src: "/music/ugly-man-fun-plan.mp3",
    cover: "/music/ugly-man-fun-plan-cover.jpg",
  },
  {
    id: "void-in-blue-hoodtrap-flip",
    title: "Void in Blue - hoodtrap flip",
    artist: "Egy",
    src: "/music/void-in-blue-hoodtrap-flip.mp3",
    cover: "/music/void-in-blue-hoodtrap-flip-cover.jpg",
  },
  {
    id: "want-some-more",
    title: "WANT SOME MORE!",
    artist: "Clover!, 5GSWAG",
    src: "/music/want-some-more.mp3",
    cover: "/music/want-some-more-cover.jpg",
  },
  {
    id: "wos",
    title: "WOS",
    artist: "80purppp",
    src: "/music/wos.mp3",
    cover: "/music/wos-cover.jpg",
  },
  {
    id: "ykwim",
    title: "YKWIM?",
    artist: "Yot Club",
    src: "/music/ykwim.mp3",
    cover: "/music/ykwim-cover.jpg",
  },
  {
    id: "young",
    title: "Young",
    artist: "Vacations",
    src: "/music/young.mp3",
    cover: "/music/young-cover.jpg",
  },
  {
    id: "zodiac-killer",
    title: "Zodiac Killer",
    artist: "Khalil?",
    src: "/music/zodiac-killer.mp3",
    cover: "/music/zodiac-killer-cover.jpg",
  },
  {
    id: "alive",
    title: "alive",
    artist: "lots of hands",
    src: "/music/alive.mp3",
    cover: "/music/alive-cover.jpg",
  },
  {
    id: "baby-do-you-wanna-dance-did-it-first-slowed-reverb",
    title: "baby do you wanna dance? (did it first) - Slowed + Reverb",
    artist: "beamglow",
    src: "/music/baby-do-you-wanna-dance-did-it-first-slowed-reverb.mp3",
    cover: "/music/baby-do-you-wanna-dance-did-it-first-slowed-reverb-cover.jpg",
  },
  {
    id: "have-you-been-wondering-if-your-mental-health-is-possibly-getting-worse",
    title: "have you been wondering if your mental health is possibly getting worse",
    artist: "liduwarx, vic, car crashes into tree",
    src: "/music/have-you-been-wondering-if-your-mental-health-is-possibly-getting-worse.mp3",
    cover: "/music/have-you-been-wondering-if-your-mental-health-is-possibly-getting-worse-cover.jpg",
  },
  {
    id: "i-couldn-t-sleep",
    title: "i couldn't sleep",
    artist: "trustme",
    src: "/music/i-couldn-t-sleep.mp3",
    cover: "/music/i-couldn-t-sleep-cover.jpg",
  },
  {
    id: "im-tired",
    title: "im tired",
    artist: "vic, liduwarx, max luv",
    src: "/music/im-tired.mp3",
    cover: "/music/im-tired-cover.jpg",
  },
  {
    id: "internalized",
    title: "internalized",
    artist: "stevie vicious",
    src: "/music/internalized.mp3",
    cover: "/music/internalized-cover.jpg",
  },
  {
    id: "its-okay-love-its-okay",
    title: "its okay love, its okay",
    artist: "vic, hldmyhnd, car crashes into tree, ciaffa",
    src: "/music/its-okay-love-its-okay.mp3",
    cover: "/music/its-okay-love-its-okay-cover.jpg",
  },
  {
    id: "let-s-keep-pretending",
    title: "let's keep pretending",
    artist: "harmxny",
    src: "/music/let-s-keep-pretending.mp3",
    cover: "/music/let-s-keep-pretending-cover.jpg",
  },
  {
    id: "mistake",
    title: "mistake",
    artist: "lots of hands",
    src: "/music/mistake.mp3",
    cover: "/music/mistake-cover.jpg",
  },
  {
    id: "never-see-a-lonely-night-again",
    title: "never see a lonely night again",
    artist: "Sadboienola",
    src: "/music/never-see-a-lonely-night-again.mp3",
    cover: "/music/never-see-a-lonely-night-again-cover.jpg",
  },
  {
    id: "not-again",
    title: "not again..",
    artist: "vic, liduwarx, wish you were here",
    src: "/music/not-again.mp3",
    cover: "/music/not-again-cover.jpg",
  },
  {
    id: "not-allowed-flip",
    title: "not allowed flip",
    artist: "bloomcr4zy",
    src: "/music/not-allowed-flip.mp3",
    cover: "/music/not-allowed-flip-cover.jpg",
  },
  {
    id: "omg",
    title: "omg",
    artist: "Anzyeity",
    src: "/music/omg.mp3",
    cover: "/music/omg-cover.jpg",
  },
  {
    id: "pretty-ho3",
    title: "pretty ho3",
    artist: "ilyTOMMY",
    src: "/music/pretty-ho3.mp3",
    cover: "/music/pretty-ho3-cover.jpg",
  },
  {
    id: "resistance",
    title: "resistance",
    artist: "bloomcr4zy",
    src: "/music/resistance.mp3",
    cover: "/music/resistance-cover.jpg",
  },
  {
    id: "style",
    title: "style",
    artist: "2hollis",
    src: "/music/style.mp3",
    cover: "/music/style-cover.jpg",
  },
  {
    id: "the-day-you-left",
    title: "the day you left",
    artist: "les, forlorn",
    src: "/music/the-day-you-left.mp3",
    cover: "/music/the-day-you-left-cover.jpg",
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
