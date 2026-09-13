import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0a0509",
        panel: "#150a12",
        panelBorder: "rgba(255,45,120,0.14)",
        electric: {
          DEFAULT: "#FF2D78",
          soft: "#FF7CB0",
        },
        accent: {
          DEFAULT: "#EC1663",
          soft: "#FF5C99",
        },
        danger: "#FF3B3B",
        violet: {
          DEFAULT: "#D6336C",
          soft: "#FF8FB8",
        },
        gold: {
          DEFAULT: "#FF4D6D",
          soft: "#FFA3B8",
        },
        teal: {
          DEFAULT: "#C2185B",
          soft: "#F06292",
        },
        indigo: {
          DEFAULT: "#6D28D9",
          soft: "#A78BFA",
        },
        green: {
          DEFAULT: "#FF2D78",
          soft: "#FF7CB0",
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
