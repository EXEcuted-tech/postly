/** @type {import('tailwindcss').Config} */

const colors = require ('./src/common/colors.ts');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: colors.primary,
        secondary: colors.secondary
      }
    },
  },
  plugins: [],
}

