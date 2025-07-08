import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allow external devices (mobile) to connect
    port: 5173,
    proxy: {
      '/control': 'http://localhost:5000', // Redirect /control to backend
    },
  },
})
