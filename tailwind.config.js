/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        secondary: '#e6f2ff',
        dark: '#333',
        light: '#f5f5f5',
      },
    },
  },
  plugins: [],
}