import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { TopBar } from "@/components/TopBar";
import { LightSweep } from "@/components/LightSweep";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KYZEN — Un accès. Tous tes comptes.",
  description:
    "Spotify, Netflix, ChatGPT, Discord Nitro et bien plus — livrés en quelques minutes après paiement, sans engagement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${GeistSans.variable}`}>
      <body>
        <LightSweep />
        <CartProvider>
          <TopBar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
