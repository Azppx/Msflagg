import Link from "next/link";

export function QulseLogo() {
  return (
    <Link href="/" aria-label="Qulse — accueil" className="flex items-center gap-2">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="8" fill="url(#qulse-logo-gradient)" />
        <path
          d="M15 7.5c-4.14 0-7.5 3.36-7.5 7.5 0 4.14 3.36 7.5 7.5 7.5 1.36 0 2.63-.36 3.73-1L20.5 23l1.06-1.06-1.87-1.87A7.47 7.47 0 0 0 22.5 15c0-4.14-3.36-7.5-7.5-7.5Zm0 2c3.04 0 5.5 2.46 5.5 5.5S18.04 20.5 15 20.5 9.5 18.04 9.5 15 11.96 9.5 15 9.5Z"
          fill="white"
        />
        <defs>
          <linearGradient id="qulse-logo-gradient" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0A0E1A" />
            <stop offset="1" stopColor="#3B63EB" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-lg tracking-tight">Qulse</span>
    </Link>
  );
}
