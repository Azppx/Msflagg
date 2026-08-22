import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#050507",
        panel: "#0d0a13",
        panelBorder: "rgba(255,255,255,0.09)",
        electric: {
          DEFAULT: "#8B35FF",
          soft: "#B85CFF",
        },
        accent: {
          DEFAULT: "#A64CFF",
          soft: "#C88CFF",
        },
        danger: "#FF3B3B",
        violet: {
          DEFAULT: "#8B5CF6",
          soft: "#B79CFF",
        },
        gold: {
          DEFAULT: "#9C45FF",
          soft: "#D5B1FF",
        },
        teal: {
          DEFAULT: "#7C3AED",
          soft: "#C4A6FF",
        },
        indigo: {
          DEFAULT: "#6D28D9",
          soft: "#A78BFA",
        },
        green: {
          DEFAULT: "#8B35FF",
          soft: "#B85CFF",
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
