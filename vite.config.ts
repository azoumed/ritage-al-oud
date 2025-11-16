import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative paths for deployment to a subfolder on GitHub Pages
  base: './',
  define: {
    // Vite does not expose process.env by default. This makes
    // process.env.API_KEY available in your client-side code,
    // which is needed by the Gemini SDK.
    'process.env.API_KEY': `"${process.env.API_KEY}"`
  }
})
