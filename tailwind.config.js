/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",       // Include root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS files in src folder
  ],
  theme: {
    extend: {

      colors: {
        'customblue': '#0099FF',
        'customgreen': '#CCFF00',
        'greensmall': '#F4FFC9',
      },
      maxWidth: {
        'screen-90': '80%', // Add a custom max-width of 90% of the screen
        'screen-60': '60%', // Add a custom max-width of 90% of the screen
      },
      fontFamily: {
        sans: ['Sofia Pro', 'sans-serif'], // Add Sofia Pro font family
      },
    },
  },
  plugins: [],
};
