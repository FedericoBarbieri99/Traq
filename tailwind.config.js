/** @type {import('tailwindcss').Config} */
export const content = [
	"./App.{js,jsx,ts,tsx}", // Assicurati che questo includa il percorso giusto ai tuoi file
	"./screens/**/*.{js,jsx,ts,tsx}", // Includi il percorso delle tue schermate
	"./components/**/*.{js,jsx,ts,tsx}", // Includi il percorso dei componenti
];
export const theme = {
	extend: {
		colors: {
			"main": "#0D0D0D", // Dark neon background
			"card": "#1A1A1A", // Slightly lighter for cards or sections
			"text-main": "#FFFFFF", // Bright white text for contrast
			"accent-primary": "#FF007A", // Neon pink for primary accents (buttons, highlights)
			"accent-secondary": "#00FFE0", // Neon cyan for secondary elements
			"accent-tertiary": "#FFD700", // Neon yellow/gold for optional highlights
			"accent-glow": "#FF4D4D", // Red neon glow for effects
		},
	},
};
export const plugins = [];
