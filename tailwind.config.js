/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}', // Assicurati che questo includa il percorso giusto ai tuoi file
    './screens/**/*.{js,jsx,ts,tsx}', // Includi il percorso delle tue schermate
    './components/**/*.{js,jsx,ts,tsx}' // Includi il percorso dei componenti
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};