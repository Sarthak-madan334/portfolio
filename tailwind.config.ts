import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101010",
        panel: "#f5f5f7",
        line: "#d9d9de",
        acid: "#2563eb",
        cyan: "#00a4ef",
        muted: "#6e6e73",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, rgba(255,255,255,.11) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(30, 64, 175, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
