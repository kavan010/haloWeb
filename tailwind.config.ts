import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        spin_slow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "draw-in": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulse_glow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin_slow 18s linear infinite",
        "draw-in": "draw-in 2.5s ease-in-out forwards",
        "pop-in": "pop-in 0.7s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
        "pulse-glow": "pulse_glow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
