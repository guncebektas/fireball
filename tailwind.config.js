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
      colors: {
        primary: {
          '50': '#ffb3b5',
          '100': '#ffb385',
          '200': '#ff8083',
          '300': '#ff4d51',
          '400': '#ff1a1f',
          '500': '#fb0010',
          '600': '#cb0010',
          '700': '#b3000e',
          '800': '#80000a',
          '900': '#4d0006',
          '950': '#0d0001',
        }
      },
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
