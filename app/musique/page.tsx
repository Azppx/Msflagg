import { PageNav } from "@/components/PageNav";
import { MusicIcon } from "@/components/icons";
import { TRACKS } from "@/lib/audio-player-context";

export default function MusicPage() {
  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 460, margin: "0 auto", padding: "20px 20px 100px" }}>
      <PageNav title="Musique" />

      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", marginTop: 24 }}>
        Ambiance
      </h1>
      <p style={{ marginTop: 8, fontSize: 14, color: "var(--fog)" }}>
        Touche une piste pour lancer ou couper le son.
      </p>

      {TRACKS.length === 0 ? (
        <div className="liquid-glass" style={{ marginTop: 24, padding: 32, borderRadius: 22, textAlign: "center" }}>
          <div
            className="liquid-glass"
            style={{ width: 56, height: 56, margin: "0 auto", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--signal)" }}
          >
            <MusicIcon width={24} height={24} />
          </div>
          <p style={{ marginTop: 16, fontSize: 14, color: "var(--fog)" }}>
            Aucune piste disponible pour le moment.
          </p>
        </div>
      ) : (
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* Les pistes seraient listées ici via TrackTile, une fois une
              playlist réelle branchée (voir lib/audio-player-context.tsx) */}
        </div>
      )}
    </main>
  );
}
