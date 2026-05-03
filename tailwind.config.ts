import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs:  "375px",
      sm:  "640px",
      md:  "768px",
      lg:  "1024px",
      xl:  "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        cream: { DEFAULT: "#FFFBF1", deep: "#FBF3DF" },
        ink:   { DEFAULT: "#221C12", soft: "#5C5040" },
        teal:  { 50: "#EAF6F3", 100: "#CFEAE3", 300: "#9CD8CC", 500: "#5DBAA8", 700: "#2E8475" },
        peach: { 100: "#FFE5D2", 300: "#FFCAB1", 500: "#F8A684" },
        sun:   { 100: "#FFF1C4", 300: "#FBE08E", 500: "#F4C95D" },
        rose:  { 100: "#FBE0E0", 300: "#F4B6B6", 500: "#E68F8F" },
        cherry: { DEFAULT: "#E26B5C", deep: "#B14637" },
        stripe: { DEFAULT: "rgba(244,220,130,0.20)" },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        script:  ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        soft:         "0 8px 30px rgba(34,28,18,0.08)",
        glow:         "0 20px 60px -20px rgba(93,186,168,0.45)",
        "glow-cherry":"0 0 40px -8px rgba(226,107,92,0.55)",
        "glow-sun":   "0 0 50px -10px rgba(244,201,93,0.60)",
        ring:         "0 0 0 1px rgba(34,28,18,0.06), 0 12px 40px -12px rgba(34,28,18,0.18)",
        schedule:     "0 0 0 1px rgba(255,255,255,0.65), 0 20px 60px -10px rgba(93,186,168,0.22), 0 4px 20px rgba(34,28,18,0.08)",
      },
      borderRadius: {
        xl2:  "1.4rem",
        blob: "62% 38% 55% 45% / 50% 60% 40% 50%",
      },
      backgroundImage: {
        "gradient-sun":    "linear-gradient(135deg,#FFF1C4 0%,#FFCAB1 50%,#F4B6B6 100%)",
        "gradient-river":  "linear-gradient(180deg,#EAF6F3 0%,#FFFBF1 100%)",
        "gradient-stripe": "repeating-linear-gradient(90deg,transparent 0px,transparent 90px,rgba(244,220,130,0.18) 90px,rgba(244,220,130,0.18) 160px)",
        noise: "radial-gradient(circle at 1px 1px,rgba(34,28,18,0.04) 1px,transparent 0)",
      },
      animation: {
        float:       "float 9s ease-in-out infinite",
        "float-slow":"float 16s ease-in-out infinite",
        breathe:     "breathe 5s ease-in-out infinite",
        marquee:     "marquee 30s linear infinite",
        wave:        "wave 8s ease-in-out infinite",
        shimmer:     "shimmer 2.4s linear infinite",
        "ping-slow": "ping 2.4s cubic-bezier(0,0,0.2,1) infinite",
        orbit:       "orbit 12s linear infinite",
        "slide-up":  "slideUp 0.7s cubic-bezier(0.2,0.8,0.2,1) both",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%":     { transform: "translateY(-20px) rotate(2deg)" },
        },
        breathe: {
          "0%,100%": { transform: "scale(1)" },
          "50%":     { transform: "scale(1.045)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wave: {
          "0%,100%": { transform: "translateX(0) translateY(0)" },
          "50%":     { transform: "translateX(-12px) translateY(-6px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        orbit: {
          "0%":   { transform: "rotate(0deg) translateX(60px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(60px) rotate(-360deg)" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
