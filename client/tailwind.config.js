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

        'slide-in-bounce': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '60%': {
            transform: 'translateX(20px)',
            opacity: '0.5',
          },
          '80%': {
            transform: 'translateX(-90px)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        }
      },
      animation:{
        'pop1': 'pop1 0.5s cubic-bezier(0.47, 2.02, 0.31, -0.36)',
        'pop2': 'pop2 0.5s cubic-bezier(0.47, 2.02, 0.31, -0.36)',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'zoom-out': 'zoom-out 0.3s ease-out',
        'slide-in-bounce': 'slide-in-bounce 1s ease-in-out',
      }
    },
  },
  plugins: [],
  darkMode: "class",
}

