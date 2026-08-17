import Link from "next/link";

type Tone = "electric" | "violet" | "gold" | "teal" | "danger" | "accent" | "green";

type CatalogItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  ctaLabel: string;
  tone: Tone;
  icon: React.ReactNode;
};

const toneClasses: Record<
  Tone,
  { glow: string; iconBox: string; category: string; cta: string; pill: string; dot: string }
> = {
  electric: {
    glow: "shadow-[0_0_60px_-25px_rgba(46,110,255,0.5)]",
    iconBox: "border-electric/40 text-electric-soft",
    category: "text-electric-soft",
    cta: "text-electric-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-electric",
  },
  violet: {
    glow: "shadow-[0_0_60px_-25px_rgba(139,92,246,0.5)]",
    iconBox: "border-violet/40 text-violet-soft",
    category: "text-violet-soft",
    cta: "text-violet-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-violet",
  },
  gold: {
    glow: "shadow-[0_0_60px_-25px_rgba(245,197,24,0.45)]",
    iconBox: "border-gold/40 text-gold-soft",
    category: "text-gold-soft",
    cta: "text-gold-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-gold",
  },
  teal: {
    glow: "shadow-[0_0_60px_-25px_rgba(45,212,191,0.5)]",
    iconBox: "border-teal/40 text-teal-soft",
    category: "text-teal-soft",
    cta: "text-teal-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-teal",
  },
  danger: {
    glow: "shadow-[0_0_60px_-25px_rgba(255,59,59,0.45)]",
    iconBox: "border-danger/40 text-danger",
    category: "text-danger",
    cta: "text-danger",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-danger",
  },
  accent: {
    glow: "shadow-[0_0_60px_-25px_rgba(255,138,0,0.5)]",
    iconBox: "border-accent/40 text-accent-soft",
    category: "text-accent-soft",
    cta: "text-accent-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-accent",
  },
  green: {
    glow: "shadow-[0_0_60px_-25px_rgba(34,197,94,0.5)]",
    iconBox: "border-green/40 text-green-soft",
    category: "text-green-soft",
    cta: "text-green-soft",
    pill: "border-panelBorder bg-white/5 text-white/80",
    dot: "bg-green",
  },
};

const catalog: CatalogItem[] = [
  {
    id: "deezer",
    name: "Deezer",
    category: "PREMIUM À VIE",
    price: "15 €",
    description: "Compte Deezer Premium à vie, musique HiFi sans pub.",
    ctaLabel: "Explorer",
    tone: "violet",
    icon: <HeartIcon />,
  },
  {
    id: "spotify",
    name: "Spotify",
    category: "PREMIUM 1 AN",
    price: "25 €",
    description: "Compte Spotify Premium pendant 12 mois, sans pub, qualité max.",
    ctaLabel: "Explorer",
    tone: "green",
    icon: <SpotifyIcon />,
  },
  {
    id: "basic-fit",
    name: "Basic-Fit",
    category: "ULTIMATE · 2, 6 OU 12 MOIS",
    price: "à partir de 20 €",
    description: "Abonnement Basic-Fit Ultimate, accès à tous les clubs en Europe.",
    ctaLabel: "Explorer",
    tone: "accent",
    icon: <DumbbellIcon />,
  },
  {
    id: "iptv",
    name: "IPTV",
    category: "SERVEUR 4K · 1 AN",
    price: "à partir de 45 €",
    description: "Serveur IPTV ultra rapide en 4K, milliers de chaînes et VOD.",
    ctaLabel: "Explorer",
    tone: "electric",
    icon: <TvIcon />,
  },
  {
    id: "netflix",
    name: "Netflix",
    category: "PREMIUM 4K · 1 AN",
    price: "15 €",
    description: "Compte Netflix Premium en qualité 4K Ultra HD.",
    ctaLabel: "Explorer",
    tone: "danger",
    icon: <NetflixIcon />,
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    category: "MÉGA FAN 1 AN",
    price: "20 €",
    description: "Abonnement Méga Fan 12 mois, accès complet au catalogue anime.",
    ctaLabel: "Explorer",
    tone: "accent",
    icon: <MoonIcon />,
  },
  {
    id: "canva",
    name: "Canva",
    category: "PRO · 1 AN",
    price: "10 €",
    description: "Canva Pro pendant 1 an, tous les templates et outils premium.",
    ctaLabel: "Explorer",
    tone: "teal",
    icon: <CanvaIcon />,
  },
  {
    id: "adobe",
    name: "Adobe",
    category: "CREATIVE CLOUD · 1 AN",
    price: "20 €",
    description: "Toute la suite Creative Cloud pendant 12 mois, avec tous les logiciels.",
    ctaLabel: "Commander",
    tone: "danger",
    icon: <AdobeIcon />,
  },
  {
    id: "capcut",
    name: "CapCut",
    category: "PRO · 1 AN",
    price: "15 €",
    description: "CapCut Pro pendant 12 mois, montage vidéo sans limites.",
    ctaLabel: "Explorer",
    tone: "electric",
    icon: <CapCutIcon />,
  },
  {
    id: "office365",
    name: "Office 365",
    category: "1 AN",
    price: "15 €",
    description: "Pack Office 365 complet pendant 12 mois, tous les outils Microsoft.",
    ctaLabel: "Explorer",
    tone: "accent",
    icon: <OfficeIcon />,
  },
  {
    id: "prime-video",
    name: "Prime Video",
    category: "1 AN",
    price: "30 €",
    description: "Amazon Prime Video pendant 12 mois, films et séries en streaming.",
    ctaLabel: "Explorer",
    tone: "electric",
    icon: <PlayIcon />,
  },
  {
    id: "nordvpn",
    name: "NordVPN",
    category: "1 AN",
    price: "15 €",
    description: "Abonnement NordVPN 12 mois, navigation sécurisée et anonyme.",
    ctaLabel: "Explorer",
    tone: "electric",
    icon: <ShieldIcon />,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "PLUS · 1 MOIS",
    price: "10 €",
    description: "ChatGPT Plus pendant 1 mois, GPT-5 et fonctionnalités avancées.",
    ctaLabel: "Explorer",
    tone: "green",
    icon: <SparkIcon />,
  },
  {
    id: "paramount",
    name: "Paramount+",
    category: "1 AN",
    price: "10 €",
    description: "Paramount+ 12 mois, films, séries et exclus Paramount.",
    ctaLabel: "Explorer",
    tone: "electric",
    icon: <MountainIcon />,
  },
  {
    id: "disney",
    name: "Disney+",
    category: "1 AN",
    price: "15 €",
    description: "Disney+ pendant 12 mois, Marvel, Star Wars, Pixar et plus.",
    ctaLabel: "Explorer",
    tone: "electric",
    icon: <StarIcon />,
  },
  {
    id: "hbomax",
    name: "HBO Max",
    category: "1 AN",
    price: "à partir de 20 €",
    description: "HBO Max 12 mois, séries premium et exclus Warner.",
    ctaLabel: "Explorer",
    tone: "violet",
    icon: <ClapperIcon />,
  },
  {
    id: "discord",
    name: "Discord",
    category: "MEMBRES, BOOST, NITRO",
    price: "à partir de 4 €",
    description: "Membres online/offline, boost serveur niveaux 1/2/3, liens Nitro 1 ou 3 mois.",
    ctaLabel: "Explorer",
    tone: "violet",
    icon: <DiscordIcon />,
  },
  {
    id: "duolingo",
    name: "Duolingo",
    category: "SUPER · 1 AN",
    price: "15 €",
    description: "Abonnement Duolingo Super pendant 1 an, apprenez des langues sans limites.",
    ctaLabel: "Explorer",
    tone: "green",
    icon: <OwlIcon />,
  },
];

export default function PremiumCatalogPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-16 pt-12">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="Retour"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-panelBorder bg-panel/60 text-white/70"
        >
          ←
        </Link>
        <div>
          <p className="text-xs font-semibold tracking-widest text-electric-soft">
            PULSE · PREMIUM
          </p>
          <h1 className="font-display text-2xl">Service Premium</h1>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {catalog.map((item) => {
          const t = toneClasses[item.tone];
          return (
            <div
              key={item.id}
              className={`card-glow relative rounded-xl2 border border-panelBorder bg-panel/70 p-6 ${t.glow}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`icon-halo flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/5 ${t.iconBox}`}
                >
                  {item.icon}
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide ${t.pill}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                  {item.price}
                </span>
              </div>

              <p className={`mt-5 text-xs font-semibold tracking-widest ${t.category}`}>
                {item.category}
              </p>
              <h2 className="font-display mt-1 text-2xl">{item.name}</h2>
              <p className="mt-2 text-sm text-white/50">{item.description}</p>

              <Link
                href="/produit"
                className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${t.cta}`}
              >
                {item.ctaLabel} <span aria-hidden>↗</span>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function HeartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7.5-4.7-10-9.3C.4 8.4 2 5 5.4 5c2 0 3.4 1.1 4.1 2.3.7-1.2 2.1-2.3 4.1-2.3 3.4 0 5 3.4 3.4 6.7C19.5 16.3 12 21 12 21z" />
    </svg>
  );
}
function SpotifyIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fillOpacity="0" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7 9.5c3-1 7-.6 9.3.9M7.3 12.7c2.5-.8 5.7-.5 7.9.8M7.6 15.6c2-.6 4.6-.4 6.3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
function DumbbellIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 9v6M2 10v4M20 9v6M22 10v4M7 8.5v7M17 8.5v7M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TvIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M8 21h8M9 3l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function NetflixIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 2h4l6 14V2h4v20h-4L9 8v14H5z" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
    </svg>
  );
}
function CanvaIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 13a4 4 0 0 0 6 2.3" strokeLinecap="round" />
    </svg>
  );
}
function AdobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 4h5l7 16h-4L9 6 5 20H2z" strokeLinejoin="round" />
    </svg>
  );
}
function CapCutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
    </svg>
  );
}
function OfficeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4l12-1v18l-12-1z" strokeLinejoin="round" />
      <path d="M16 5.5h4v13h-4" strokeLinejoin="round" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4l14 8-14 8z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" strokeLinejoin="round" />
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
    </svg>
  );
}
function MountainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 19l6-10 4 6 2-3 6 7z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M12 3l2.6 5.6 6.2.6-4.6 4.2 1.3 6.1L12 16.9 6.5 19.5l1.3-6.1L3.2 9.2l6.2-.6z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ClapperIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10l16-3 1 4-16 3z" strokeLinejoin="round" />
      <rect x="3" y="11" width="18" height="9" rx="1" />
    </svg>
  );
}
function DiscordIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M6 8c3-2 9-2 12 0l1 8c-2 1.5-4 2-4 2l-.7-1.3c-1.5.5-4.6.5-6.1 0L7.5 18s-2-.5-4-2z"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function OwlIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
      <circle cx="9" cy="11" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11" r="1.4" fill="currentColor" stroke="none" />
      <path d="M10.5 15a2.5 2 0 0 0 3 0" strokeLinecap="round" />
    </svg>
  );
}
