import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

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
    <html lang="fr" className={`${inter.variable} ${archivoBlack.variable}`}>
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
