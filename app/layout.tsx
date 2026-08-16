import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — ${siteConfig.brandTagline}`,
  description: "Boutique premium — offres et services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-midnight text-white antialiased">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-70" />
          <div className="absolute inset-0 bg-glow-radial" />
          <div className="bg-ambient-blob bg-ambient-blob--accent -top-24 left-1/2 h-72 w-72 -translate-x-1/2" />
          <div className="bg-ambient-blob bg-ambient-blob--electric -bottom-32 -right-16 h-80 w-80" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
