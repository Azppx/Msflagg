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
        <div className="pointer-events-none fixed inset-0 bg-glow-radial" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
