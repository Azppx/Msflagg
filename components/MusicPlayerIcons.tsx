export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5.14v13.72c0 .93 1.02 1.5 1.82 1.02l10.9-6.86a1.2 1.2 0 0 0 0-2.04L9.82 4.12C9.02 3.64 8 4.21 8 5.14z" />
    </svg>
  );
}

export function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="4.5" width="4.2" height="15" rx="1.4" />
      <rect x="13.8" y="4.5" width="4.2" height="15" rx="1.4" />
    </svg>
  );
}

export function PreviousIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="4.5" y="5" width="2.3" height="14" rx="1" />
      <path d="M19.3 5.9v12.2c0 .95-1.04 1.53-1.85 1.03L7.7 12.98a1.2 1.2 0 0 1 0-2.04l9.75-6.07c.81-.5 1.85.08 1.85 1.03z" />
    </svg>
  );
}

export function NextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="17.2" y="5" width="2.3" height="14" rx="1" />
      <path d="M4.7 5.9v12.2c0 .95 1.04 1.53 1.85 1.03l9.75-6.15a1.2 1.2 0 0 0 0-2.04L6.55 4.87c-.81-.5-1.85.08-1.85 1.03z" />
    </svg>
  );
}

export function VolumeLowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 9.5v5h3.2L11.5 18V6L7.2 9.5H4z" strokeLinejoin="round" strokeLinecap="round" fill="currentColor" stroke="none" />
      <path d="M14.5 9.2a3.2 3.2 0 0 1 0 5.6" strokeLinecap="round" />
    </svg>
  );
}

export function VolumeHighIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 9.5v5h3.2L11.5 18V6L7.2 9.5H4z" strokeLinejoin="round" strokeLinecap="round" fill="currentColor" stroke="none" />
      <path d="M14.5 8.3a4.6 4.6 0 0 1 0 7.4" strokeLinecap="round" />
      <path d="M17 6.2a8 8 0 0 1 0 11.6" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
