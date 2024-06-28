import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/streettadka/us-central1/ssrapp/', // Update this to match your Firebase Function path
  build: {
    outDir: 'dist/client',
    rollupOptions: {
      input: 'src/entry-server.tsx' // Ensure this points to your entry file
    }
  },
  ssr: {
    noExternal: ['react', 'react-dom'] // Adjust based on your setup
  }
})
