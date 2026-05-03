import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FFFBF1", deep: "#FBF3DF" },
        ink: { DEFAULT: "#221C12", soft: "#5C5040" },
        teal: { 50: "#EAF6F3", 100: "#CFEAE3", 300: "#9CD8CC", 500: "#5DBAA8", 700: "#2E8475" },
        peach: { 100: "#FFE5D2", 300: "#FFCAB1", 500: "#F8A684" },
        sun: { 100: "#FFF1C4", 300: "#FBE08E", 500: "#F4C95D" },
        rose: { 100: "#FBE0E0", 300: "#F4B6B6", 500: "#E68F8F" },
        cherry: { DEFAULT: "#E26B5C", deep: "#B14637" },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(34,28,18,0.08)",
        glow: "0 20px 60px -20px rgba(93,186,168,0.45)",
        ring: "0 0 0 1px rgba(34,28,18,0.06), 0 12px 40px -12px rgba(34,28,18,0.18)",
      },
      borderRadius: { xl2: "1.4rem", blob: "62% 38% 55% 45% / 50% 60% 40% 50%" },
      backgroundImage: {
        "gradient-sun": "linear-gradient(135deg, #FFF1C4 0%, #FFCAB1 50%, #F4B6B6 100%)",
        "gradient-river": "linear-gradient(180deg, #EAF6F3 0%, #FFFBF1 100%)",
        noise:
          "radial-gradient(circle at 1px 1px, rgba(34,28,18,0.04) 1px, transparent 0)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 14s ease-in-out infinite",
        breathe: "breathe 5s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        wave: "wave 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(3deg)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(-12px) translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
