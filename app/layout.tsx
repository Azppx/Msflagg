import type { Metadata } from "next";
import { Inter, Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { OrderTrackerWidget } from "@/components/OrderTrackerWidget";
import { TopBar } from "@/components/TopBar";

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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — ${siteConfig.brandTagline}`,
  description: "Boutique premium — offres et services.",
  manifest: "/manifest.json",
  themeColor: "#0a0e1a",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.brandName,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${archivoBlack.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-midnight text-white antialiased">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-70" />
          <div className="absolute inset-0 bg-glow-radial" />
          <div className="bg-ambient-blob bg-ambient-blob--accent -top-24 left-1/2 h-72 w-72 -translate-x-1/2" />
          <div className="bg-ambient-blob bg-ambient-blob--electric -bottom-32 -right-16 h-80 w-80" />
        </div>
        <div className="relative z-10">
          <AuthProvider>
            <CartProvider>
              <TopBar />
              {children}
              <OrderTrackerWidget />
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
