const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./client/ui/**/*.{js,jsx,ts,tsx}",
    "./client/*.html",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      gray: colors.gray,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')({
      datatables: true,
    }),
  ],
};
