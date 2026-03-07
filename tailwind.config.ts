import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ceramic': {
          'light': '#F5F0E6',
          'brown': '#722620',
          'blue': '#2A4B7C',
          'dark': '#1a1a1a',
          'white': '#ffffff',
          'gray': '#e5e5e5',
        },
      },
      fontFamily: {
        'sans': ['var(--font-inter)'],
        'serif': ['var(--font-playfair)'],
      },
      animation: {
        'pulse-ripple': 'pulse-ripple 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'pulse-ripple': {
          '0%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}

export default config
