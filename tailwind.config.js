const colors = require('tailwindcss/colors')

// Function to get brand colors dynamically
function getBrandColors() {
  try {
    // Get brand from environment variable (set during build process)
    const brand = process.env.BRAND || 'ritapos';
    console.info(`Brand: ${brand} colors will be loaded`);

    // Load colors based on brand
    switch (brand) {
      case 'gua':
        return require('./client/assets/gua/colors.js');
      case 'pablo':
        return require('./client/assets/pablo/colors.js');
      case 'ritapos':
        return require('./client/assets/ritapos/colors.js');
      default:
        console.warn(`Unknown brand: ${brand}, falling back to ritapos colors`);
        return require('./client/assets/ritapos/colors.js');
    }
  } catch (error) {
    console.warn('Could not load brand colors, falling back to default:', error.message);
    return require('./client/assets/ritapos/colors.js');
  }
}

// Get the brand colors
const brandColors = getBrandColors();

module.exports = {
  content: [
    "./client/ui/**/*.{js,jsx,ts,tsx}",
    "./client/*.html",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: brandColors.primary,
      secondary: brandColors.secondary,
      gray: brandColors.gray,
      blue: brandColors.blue,
      red: brandColors.red,
      pink: brandColors.pink,
    },
    extend: {
      colors: {
        primary: brandColors.primary,
        secondary: brandColors.secondary,
        gray: brandColors.gray,
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
