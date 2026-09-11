"use client";

import { useState } from "react";
import { PauseIcon, PlayIcon, SkipNextIcon, SkipPrevIcon } from "@/components/icons";
import { useAudioPlayer } from "@/lib/audio-player-context";

export function MusicIsland() {
  const { currentTrack, isPlaying, progress, play, pause, next, previous } = useAudioPlayer();
  const [expanded, setExpanded] = useState(false);

  if (!currentTrack) return null;

  return (
    <div style={{ position: "fixed", insetInline: 0, top: 70, zIndex: 45, display: "flex", justifyContent: "center", padding: "0 12px" }}>
      <div
        className="liquid-glass liquid-glass--signal"
        onClick={() => !expanded && setExpanded(true)}
        style={{
          borderRadius: expanded ? 28 : 999,
          cursor: expanded ? "default" : "pointer",
          transition: "border-radius 0.35s cubic-bezier(0.34,1.2,0.4,1)",
          boxShadow: "0 20px 50px -20px rgba(157,92,255,0.55)",
        }}
      >
        {!expanded && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px" }}>
            <p style={{ fontSize: 12.5, fontWeight: 600, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {currentTrack.title}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                isPlaying ? pause() : play();
              }}
              aria-label={isPlaying ? "Pause" : "Lecture"}
              style={{ background: "none", border: "none", color: "var(--paper)", cursor: "pointer", display: "flex" }}
            >
              {isPlaying ? <PauseIcon width={14} height={14} /> : <PlayIcon width={14} height={14} />}
            </button>
            <div style={{ width: 34, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress * 100}%`, background: "var(--signal)" }} />
            </div>
          </div>
        )}

        {expanded && (
          <div style={{ width: 280, padding: 18 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentTrack.title}</p>
                <p style={{ fontSize: 12, color: "var(--fog)", marginTop: 2 }}>{currentTrack.artist}</p>
              </div>
              <button onClick={() => setExpanded(false)} aria-label="Fermer" style={{ background: "none", border: "none", color: "var(--fog)", cursor: "pointer", fontSize: 16 }}>
                ✕
              </button>
            </div>

            <div style={{ marginTop: 14, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress * 100}%`, background: "var(--signal)" }} />
            </div>

            <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
              <button onClick={previous} aria-label="Précédent" style={{ background: "none", border: "none", color: "var(--paper)", cursor: "pointer" }}>
                <SkipPrevIcon width={18} height={18} />
              </button>
              <button
                onClick={() => (isPlaying ? pause() : play())}
                aria-label={isPlaying ? "Pause" : "Lecture"}
                className="liquid-glass liquid-glass--signal"
                style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--paper)", cursor: "pointer" }}
              >
                {isPlaying ? <PauseIcon width={18} height={18} /> : <PlayIcon width={18} height={18} />}
              </button>
              <button onClick={next} aria-label="Suivant" style={{ background: "none", border: "none", color: "var(--paper)", cursor: "pointer" }}>
                <SkipNextIcon width={18} height={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
