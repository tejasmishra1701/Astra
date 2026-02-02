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
        // === YELLOW NETWORK x ENS THEME ===
        // Deep black background with Yellow gold and ENS blue accents

        // Primary Palette
        charcoal: {
          50: "#F5F5F6",
          100: "#E6E6E8",
          200: "#CFCFD3",
          300: "#ADADB5",
          400: "#83838F",
          500: "#686874",
          600: "#565661",
          700: "#48484F",
          800: "#3E3E44",
          900: "#1A1A1D",
          950: "#0C0C0E",
        },

        // Yellow Network - Primary accent (gold/yellow)
        yellow: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24", // Yellow Network primary
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451A03",
        },

        // ENS - Secondary accent (blue gradient)
        ens: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#5298FF", // ENS Blue primary
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },

        // Semantic Colors
        terminal: {
          bg: "#0A0A0B", // Deeper black
          panel: "#141416", // Slightly lighter panel
          elevated: "#1C1C1F", // Cards and modals
          border: "#2A2A2E", // Subtle borders
          text: "#F4F4F5", // Bright text
          muted: "#71717A", // Muted text
        },

        accent: {
          primary: "#FBBF24", // Yellow Network Gold
          secondary: "#5298FF", // ENS Blue
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: [
          "var(--font-geist-mono)",
          "JetBrains Mono",
          "Menlo",
          "monospace",
        ],
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "yellow-ens-gradient":
          "linear-gradient(135deg, #FBBF24 0%, #5298FF 100%)",
        "yellow-glow":
          "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15) 0%, transparent 70%)",
        "ens-glow":
          "radial-gradient(ellipse at center, rgba(82, 152, 255, 0.15) 0%, transparent 70%)",
        "terminal-scanline":
          "repeating-linear-gradient(0deg, rgba(251, 191, 36, 0.02) 0px, transparent 1px, transparent 2px, rgba(251, 191, 36, 0.02) 3px)",
      },

      boxShadow: {
        "neon-yellow":
          "0 0 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)",
        "neon-ens":
          "0 0 20px rgba(82, 152, 255, 0.4), 0 0 40px rgba(82, 152, 255, 0.2)",
        "neon-cyan":
          "0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.2)", // Legacy
        "neon-orange":
          "0 0 20px rgba(255, 107, 53, 0.5), 0 0 40px rgba(255, 107, 53, 0.2)", // Legacy
        terminal: "0 8px 32px rgba(0, 0, 0, 0.6)",
        "glow-sm": "0 0 10px rgba(251, 191, 36, 0.3)",
        "glow-lg":
          "0 0 60px rgba(251, 191, 36, 0.4), 0 0 100px rgba(82, 152, 255, 0.2)",
      },

      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "glow-yellow": "glow-yellow 2s ease-in-out infinite alternate",
        scan: "scan 8s linear infinite",
        flicker: "flicker 0.15s infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
        press: "press 0.15s ease-out",
        "bounce-sm": "bounce-sm 0.3s ease-out",
      },

      keyframes: {
        glow: {
          "0%": {
            boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
          },
          "100%": {
            boxShadow:
              "0 0 40px rgba(251, 191, 36, 0.6), 0 0 60px rgba(82, 152, 255, 0.3)",
          },
        },
        "glow-yellow": {
          "0%": {
            boxShadow: "0 0 15px rgba(251, 191, 36, 0.2)",
          },
          "100%": {
            boxShadow: "0 0 30px rgba(251, 191, 36, 0.5)",
          },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.95" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        press: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.97)" },
          "100%": { transform: "scale(1)" },
        },
        "bounce-sm": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
