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
                // === QUANTUM MIDNIGHT THEME ===
                // Deep, mysterious backgrounds with neon accents

                // Primary Palette
                charcoal: {
                    50: '#F5F5F6',
                    100: '#E6E6E8',
                    200: '#CFCFD3',
                    300: '#ADADB5',
                    400: '#83838F',
                    500: '#686874',
                    600: '#565661',
                    700: '#48484F',
                    800: '#3E3E44',
                    900: '#1A1A1D', // Deep Charcoal - main background
                    950: '#0C0C0E', // Midnight Black - darkest shade
                },

                cyan: {
                    50: '#ECFEFF',
                    100: '#CFFAFE',
                    200: '#A5F3FC',
                    300: '#67E8F9',
                    400: '#22D3EE',
                    500: '#00FFFF', // Neon Cyan - primary accent
                    600: '#00D4D4',
                    700: '#00A3A3',
                    800: '#007A7A',
                    900: '#005252',
                    950: '#002929',
                },

                orange: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#FF6B35', // Radiant Orange - secondary accent
                    600: '#EA580C',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12',
                    950: '#431407',
                },

                // Semantic Colors
                terminal: {
                    bg: '#0C0C0E',      // charcoal-950
                    panel: '#1A1A1D',   // charcoal-900
                    border: '#3E3E44',  // charcoal-800
                    text: '#E6E6E8',    // charcoal-100
                    muted: '#83838F',   // charcoal-400
                },

                accent: {
                    primary: '#00FFFF',   // Neon Cyan
                    secondary: '#FF6B35', // Radiant Orange
                    success: '#10B981',
                    warning: '#F59E0B',
                    error: '#EF4444',
                },
            },

            fontFamily: {
                sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'Menlo', 'monospace'],
            },

            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'quantum-glow': 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%)',
                'terminal-scanline': 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03) 0px, transparent 1px, transparent 2px, rgba(0, 255, 255, 0.03) 3px)',
            },

            boxShadow: {
                'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.2)',
                'neon-orange': '0 0 20px rgba(255, 107, 53, 0.5), 0 0 40px rgba(255, 107, 53, 0.2)',
                'terminal': '0 8px 32px rgba(0, 0, 0, 0.4)',
            },

            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'scan': 'scan 8s linear infinite',
                'flicker': 'flicker 0.15s infinite',
            },

            keyframes: {
                glow: {
                    '0%': {
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                    },
                    '100%': {
                        boxShadow: '0 0 40px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)',
                    },
                },
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
                flicker: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.95' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
