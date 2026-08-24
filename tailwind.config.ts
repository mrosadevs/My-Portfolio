import type { Config } from "tailwindcss";

/** Lets `text-accent-primary/40` resolve against a CSS-variable palette. */
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: withAlpha("--bg-primary"),
          secondary: withAlpha("--bg-secondary"),
          elevated: withAlpha("--bg-elevated"),
          card: "var(--surface)",
        },
        accent: {
          primary: withAlpha("--accent-primary"),
          secondary: withAlpha("--accent-secondary"),
          tertiary: withAlpha("--accent-tertiary"),
        },
        text: {
          primary: withAlpha("--text-primary"),
          secondary: withAlpha("--text-secondary"),
          muted: withAlpha("--text-muted"),
        },
      },
      borderColor: {
        hairline: "var(--hairline)",
        "hairline-strong": "var(--hairline-strong)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "typing-cursor": "typing-cursor 1s step-end infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "var(--glow-soft)" },
          "100%": { boxShadow: "var(--glow-strong)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "slide-up": {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "typing-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgb(var(--accent-primary) / 0.3)" },
          "50%": { borderColor: "rgb(var(--accent-secondary) / 0.3)" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
};

export default config;
