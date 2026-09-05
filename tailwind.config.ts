import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---------- Palette neumorphism ----------
        // "midnight"/"panel" gardent leur nom (utilisés dans tout le code)
        // mais pointent maintenant vers la matière claire du thème neumorphism
        // plutôt que le fond sombre d'origine.
        midnight: "#e9e6f2", // fond de base, toute la matière du site
        panel: "#e9e6f2", // panneaux/cards : même matière que le fond (neumorphism)
        panelBorder: "rgba(43,39,64,0.08)",
        ink: {
          DEFAULT: "#2b2740",
          soft: "rgba(43,39,64,0.6)",
          faint: "rgba(43,39,64,0.4)",
        },
        neuShadow: {
          dark: "rgba(163,155,194,0.55)",
          light: "rgba(255,255,255,0.9)",
        },
        electric: {
          DEFAULT: "#8B35FF",
          soft: "#6D28D9",
        },
        accent: {
          DEFAULT: "#A64CFF",
          soft: "#7C3AED",
        },
        danger: "#E11D48",
        violet: {
          DEFAULT: "#8B5CF6",
          soft: "#6D28D9",
        },
        gold: {
          DEFAULT: "#9C45FF",
          soft: "#7C3AED",
        },
        teal: {
          DEFAULT: "#7C3AED",
          soft: "#5B21B6",
        },
        indigo: {
          DEFAULT: "#6D28D9",
          soft: "#4C1D95",
        },
        green: {
          DEFAULT: "#8B35FF",
          soft: "#6D28D9",
        },
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      fontFamily: {
        display: ["var(--font-archivo-black)", "Arial Black", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
