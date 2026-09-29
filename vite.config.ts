import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose to all local and network interfaces
    strictPort: false, // Automatically fallback to any available port if one is occupied
    cors: true, // Enable CORS across all origins and ports
    allowedHosts: true, // Accept requests from any hostname, IP, and port
  },
  preview: {
    host: '0.0.0.0',
    strictPort: false,
    cors: true,
    allowedHosts: true,
  },
})

