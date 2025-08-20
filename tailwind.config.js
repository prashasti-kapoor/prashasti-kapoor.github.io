/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
        '-10': '-10',
        '-20': '-20',
      },
      scale: {
        300: '3',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'distort': 'distort 10s ease-in-out infinite',
        'glow-pulse': 'glowPulse 1.2s ease-in-out infinite',
        'arrow-morph-glow': 'arrowMorph 4s ease-in-out infinite, arrowBounceY 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        distort: {
          '0%, 100%': { transform: 'skew(0deg, 0deg)' },
          '50%': { transform: 'skew(-2deg, 2deg)' },
        },
        glowPulse: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 4px #ff00cc)',
          },
          '50%': {
            filter: 'drop-shadow(0 0 10px #ff00cc)',
          },
        },
        arrowMorph: {
          '0%': {
            clipPath: 'polygon(50% 0%, 60% 40%, 100% 40%, 70% 100%, 30% 100%, 0% 40%, 40% 40%)',
            transform: 'scale(1) translateY(0)',
          },
          '25%': {
            clipPath: 'polygon(50% 5%, 70% 30%, 95% 35%, 80% 90%, 20% 90%, 5% 35%, 30% 30%)',
            transform: 'scale(1.05) translateY(6px)',
          },
          '50%': {
            clipPath: 'polygon(50% 0%, 80% 20%, 100% 60%, 50% 100%, 0% 60%, 20% 20%)',
            transform: 'scale(1.1) translateY(12px)',
          },
          '75%': {
            clipPath: 'polygon(50% 5%, 70% 30%, 95% 35%, 80% 90%, 20% 90%, 5% 35%, 30% 30%)',
            transform: 'scale(1.05) translateY(6px)',
          },
          '100%': {
            clipPath: 'polygon(50% 0%, 60% 40%, 100% 40%, 70% 100%, 30% 100%, 0% 40%, 40% 40%)',
            transform: 'scale(1) translateY(0)',
          },
        },
        arrowBounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
}
