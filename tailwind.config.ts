import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0F1521",
        card: "#161E2E",
        cardHi: "#1D2740",
        gold: "#E8A33D",
        goldBright: "#F4BB5E",
        teal: "#3FA796",
        cream: "#EDEAE0",
        muted: "#7C879C",
      },
      fontFamily: {
        display: ["Lalezar", "sans-serif"],
        body: ["Vazirmatn", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
