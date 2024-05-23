/** @type {import('tailwindcss').Config} */

const colors = require ('./src/common/colors.ts');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins','sans-serif'],
      },
      colors:{
        primary: colors.primary,
        secondary: colors.secondary
      },
      keyframes:{
        'zoom-out': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(0.8)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },

        'pop1':{
          '0%': {
            transform: 'scale(0.8)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(1)',
          }
        },

        'pop2':{
          '0%': {
            transform: 'scale(0.8)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(1)',
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
      },
      animation:{
        'pop1': 'pop1 0.5s cubic-bezier(0.47, 2.02, 0.31, -0.36)',
        'pop2': 'pop2 0.5s cubic-bezier(0.47, 2.02, 0.31, -0.36)',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'zoom-out': 'zoom-out 0.3s ease-out',
      }
    },
  },
  plugins: [],
  darkMode: "class",
}

