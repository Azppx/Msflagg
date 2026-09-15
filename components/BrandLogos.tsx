// components/BrandLogos.tsx
// Logos SVG vectoriels des marques — nets à toutes les tailles, aucun fichier externe.

export function BrandLogo({ slug, size = 48 }: { slug: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 48 48" };
  switch (slug) {
    case "snapchat-3-mois":
      return (
        <svg {...common} fill="none">
          <path d="M24 6c-5 0-9 4-9 9v3c-1.5.5-3 1-3 2 0 .8 2 1.5 3 2 .3 1.5-.5 3-2 4 0 0-1 .5-.5 1.5.3.5 1.5 1 3 1 .3 1 1.5 3 3 3 1 0 1.5-.5 2.5-.5s1.5.5 2.5.5c1.5 0 2.7-2 3-3 1.5 0 2.7-.5 3-1 .5-1-.5-1.5-.5-1.5-1.5-1-2.3-2.5-2-4 1-.5 3-1.2 3-2 0-1-1.5-1.5-3-2v-3c0-5-4-9-9-9z" fill="#FFFC00"/>
        </svg>
      );
    case "deezer":
      return (
        <svg {...common} fill="none">
          <rect x="6" y="28" width="10" height="4" rx="1" fill="#A238FF"/>
          <rect x="19" y="28" width="10" height="4" rx="1" fill="#A238FF"/>
          <rect x="32" y="28" width="10" height="4" rx="1" fill="#A238FF"/>
          <rect x="6" y="22" width="10" height="4" rx="1" fill="#A238FF"/>
          <rect x="19" y="22" width="10" height="4" rx="1" fill="#A238FF"/>
          <rect x="32" y="22" width="10" height="4" rx="1" fill="#A238FF"/>
          <rect x="19" y="16" width="10" height="4" rx="1" fill="#A238FF"/>
          <rect x="32" y="16" width="10" height="4" rx="1" fill="#A238FF"/>
          <rect x="32" y="10" width="10" height="4" rx="1" fill="#A238FF"/>
        </svg>
      );
    case "spotify":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#1DB954"/>
          <path d="M14 20c6-2 13-1.5 18 1.5M15 25c5-1.5 10.5-1 14.5 1.5M16 30c4-1 8-.5 11 1" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
    case "basic-fit":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#FF6B00"/>
          <path d="M16 22c3-5 13-5 16 0M16 28c3-3 13-3 16 0" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
    case "pack-basicfit-netflix":
    case "netflix":
      return (
        <svg {...common} fill="none">
          <rect width="48" height="48" rx="8" fill="#000"/>
          <path d="M18 8v32l4-1V14l8 25h4V8h-4v22L22 8z" fill="#E50914"/>
        </svg>
      );
    case "pack-spotify-basicfit-netflix-youtube":
    case "youtube":
      return (
        <svg {...common} fill="none">
          <rect x="4" y="12" width="40" height="24" rx="6" fill="#FF0000"/>
          <path d="M20 18l10 6-10 6z" fill="#fff"/>
        </svg>
      );
    case "crunchyroll":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#F47521"/>
          <path d="M18 24c0-4 3-7 7-7 3 0 5 1.5 6 3.5l-3 1.5c-.5-1-1.5-1.7-3-1.7-2 0-3.5 1.5-3.5 3.7s1.5 3.7 3.5 3.7c1.5 0 2.5-.7 3-1.7l3 1.5c-1 2-3 3.5-6 3.5-4 0-7-3-7-7z" fill="#fff"/>
        </svg>
      );
    case "canva":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#00C4CC"/>
          <circle cx="24" cy="24" r="12" fill="#7D2AE8"/>
          <text x="24" y="29" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Arial">C</text>
        </svg>
      );
    case "adobe":
      return (
        <svg {...common} fill="none">
          <rect width="48" height="48" rx="8" fill="#000"/>
          <path d="M18 12h-6v24h6zM30 12h-6v14l6 10zM30 12h6v24h-6z" fill="#FF0000"/>
        </svg>
      );
    case "capcut":
      return (
        <svg {...common} fill="none">
          <rect width="48" height="48" rx="10" fill="#000"/>
          <circle cx="18" cy="18" r="4" fill="#fff"/>
          <circle cx="18" cy="30" r="4" fill="#fff"/>
          <circle cx="30" cy="18" r="4" fill="#fff"/>
          <circle cx="30" cy="30" r="4" fill="#fff"/>
          <path d="M18 18l12 12M30 18L18 30" stroke="#fff" strokeWidth="1.5"/>
        </svg>
      );
    case "office365":
      return (
        <svg {...common} fill="none">
          <path d="M28 6l12 6v24l-12 6z" fill="#D83B01"/>
          <path d="M28 6L10 12v24l18 6z" fill="#EA3E23"/>
          <path d="M16 18l6 3 6-3v3l-6 3-6-3z" fill="#fff"/>
        </svg>
      );
    case "prime-video":
      return (
        <svg {...common} fill="none">
          <rect width="48" height="48" rx="8" fill="#00A8E1"/>
          <path d="M12 22c6-3 18-3 24 0M12 28c6 3 18 3 24 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <text x="24" y="38" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="Arial">prime</text>
        </svg>
      );
    case "nordvpn":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#4687FF"/>
          <path d="M24 10l-10 5v8c0 6 4 11 10 13 6-2 10-7 10-13v-8z" fill="#fff"/>
          <path d="M20 24l3 3 6-7" stroke="#4687FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      );
    case "chatgpt":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#10A37F"/>
          <path d="M24 12c-3 0-6 2-6 5 0 2 1 3 2 4-2 1-3 3-3 5 0 3 3 6 6 6 2 0 3-1 4-2 1 2 3 3 5 3 3 0 6-3 6-6 0-2-1-3-2-4 2-1 3-3 3-5 0-3-3-6-6-6-2 0-3 1-4 2-1-2-3-3-5-3z" fill="#fff"/>
        </svg>
      );
    case "paramount":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#0064FF"/>
          <path d="M12 30l6-12 6 8 4-6 8 10z" fill="#fff"/>
          <circle cx="30" cy="14" r="2.5" fill="#fff"/>
        </svg>
      );
    case "disney":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#113CCF"/>
          <text x="24" y="29" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial" fontStyle="italic">Disney+</text>
        </svg>
      );
    case "hbomax":
      return (
        <svg {...common} fill="none">
          <rect width="48" height="48" rx="8" fill="#000"/>
          <text x="24" y="24" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="Arial">HBO</text>
          <text x="24" y="36" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="Arial">max</text>
        </svg>
      );
    case "discord":
      return (
        <svg {...common} fill="none">
          <rect width="48" height="48" rx="10" fill="#5865F2"/>
          <path d="M18 16c-3 1-5 3-6 6 0 4 1 7 3 9 1.5 0 2.5-1 2.5-1l1-1c-1-.3-2-.8-3-1.5 2 1 4 1.5 8 1.5s6-.5 8-1.5c-1 .7-2 1.2-3 1.5l1 1s1 1 2.5 1c2-2 3-5 3-9-1-3-3-5-6-6l-1 2c-2-.5-5-.5-7 0z" fill="#fff"/>
          <circle cx="19" cy="24" r="1.5" fill="#5865F2"/>
          <circle cx="29" cy="24" r="1.5" fill="#5865F2"/>
        </svg>
      );
    case "valorant":
      return (
        <svg {...common} fill="none">
          <rect width="48" height="48" rx="6" fill="#FF4655"/>
          <path d="M10 12h6l10 22h-6zM22 12h6l6 14h-6z" fill="#fff"/>
        </svg>
      );
    case "duolingo":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#58CC02"/>
          <circle cx="18" cy="22" r="3" fill="#fff"/>
          <circle cx="30" cy="22" r="3" fill="#fff"/>
          <circle cx="18" cy="22" r="1.5" fill="#000"/>
          <circle cx="30" cy="22" r="1.5" fill="#000"/>
          <path d="M20 30c2 2 6 2 8 0" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      );
    case "claude-unlimited-method":
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#D97757"/>
          <path d="M24 10l3 10 10 4-10 4-3 10-3-10-10-4 10-4z" fill="#fff"/>
        </svg>
      );
    default:
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="20" fill="#333"/>
          <text x="24" y="30" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" fontFamily="Arial">
            {/* fallback : première lettre du slug */}
          </text>
        </svg>
      );
  }
}