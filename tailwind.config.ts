import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#050914",
        panel: "#0b1120",
        panelBorder: "rgba(255,255,255,0.06)",
        electric: {
          DEFAULT: "#2E6EFF",
          soft: "#5B8CFF",
        },
        accent: {
          DEFAULT: "#FF8A00",
          soft: "#FFB454",
        },
        danger: "#FF3B3B",
        violet: {
          DEFAULT: "#8B5CF6",
          soft: "#B79CFF",
        },
        gold: {
          DEFAULT: "#F5C518",
          soft: "#FFDD66",
        },
        teal: {
          DEFAULT: "#2DD4BF",
          soft: "#7EEDE1",
        },
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      fontFamily: {
        display: ["'Archivo Black'", "Arial Black", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
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
