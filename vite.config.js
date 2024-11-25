import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https:false,
    proxy: {
      // Proxy API requests to the PHP server
      '/api': {
        target: 'http://localhost:8000', // URL of your PHP server
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api/, '')
          console.log(newPath)
          return newPath;
        }
      }
    }
  }
})