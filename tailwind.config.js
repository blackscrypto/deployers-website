/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deployers-blue': {
          DEFAULT: '#7F9CF5',
          light: '#9EB3FF',
          dark: '#6B7FE8',
          glow: 'rgba(127, 156, 245, 0.5)',
        },
        'midnight': {
          DEFAULT: '#050810',
          dark: '#030508',
          darker: '#010203',
          lighter: '#0a0f1a',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 25s ease-in-out infinite',
        'grid-flow': 'grid-flow 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
        'grid-flow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'midnight-gradient': `
          radial-gradient(ellipse 80% 60% at 15% 10%, rgba(59, 130, 246, 0.08), transparent 50%),
          radial-gradient(ellipse 70% 50% at 85% 90%, rgba(99, 102, 241, 0.06), transparent 50%),
          linear-gradient(180deg, #030712 0%, #020408 50%, #000000 100%)
        `,
      },
    },
  },
  plugins: [],
}
