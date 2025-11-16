/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['"Cormorant Garamond"', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-gold': '#D4AF37',
        'brand-dark': '#1a1a1a',
        'brand-light': '#f5f5f5',
        'brand-gray': '#333333',
      }
    },
  },
  plugins: [],
}
