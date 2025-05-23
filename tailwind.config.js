const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./client/ui/**/*.{js,jsx,ts,tsx}",
    "./client/*.html",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: colors.red,
      gray: colors.gray,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    extend: {
      colors: {
        primary: {
          '50': '#ffbfbf',
          '100': '#ffb3b5',
          '200': '#ff8083',
          '300': '#ff4d51',
          '400': '#ff1a1f',
          '500': '#fb0010',
          '600': '#cb0010',
          '700': '#b3000e',
          '800': '#80000a',
          '900': '#4d0006',
          '950': '#0d0001',
        },
        secondary: {
          '50': '#edebe4',
          '100': '#fbe4c7',
          '200': '#BFAE90',
          '300': '#e6c99d',
          '400': '#f3be7f',
          '500': '#efab5b',
          '600': '#eb9937',
          '700': '#b3742a',
          '800': '#8a5a21',
          '900': '#614018',
          '950': '#3a270f',
        },
        gray: {
          '50': '#f5f5f5',
          '100': '#e5e5e5',
          '200': '#cccccc',
          '300': '#b3b3b3',
          '400': '#999999',
          '500': '#808080',
          '600': '#666666',
          '700': '#4d4d4d',
          '800': '#222222',
          '900': '#0D0D0D',
          '950': '#050505',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
