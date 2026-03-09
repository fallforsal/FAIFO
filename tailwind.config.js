/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        faifo: {
          dark: '#121212',
          stone: '#1c1917',
          terracotta: '#9a3412',
          'terracotta-light': '#c2410c',
          beige: '#d6d3d1',
          'beige-muted': '#a8a29e',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        handwriting: ['var(--font-caveat)', 'Segoe Script', 'cursive'],
      },
      transitionTimingFunction: {
        pottery: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'soundwave-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-terracotta': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(154, 52, 18, 0.15)' },
          '50%': { boxShadow: '0 0 50px rgba(154, 52, 18, 0.35)' },
        },
      },
      animation: {
        'soundwave-ring': 'soundwave-ring 3s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'float-gentle': 'float-gentle 5s ease-in-out infinite',
        'glow-terracotta': 'glow-terracotta 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
