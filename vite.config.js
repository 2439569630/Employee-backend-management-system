import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@axios': fileURLToPath(new URL('src/axios', import.meta.url)),
      '@router': fileURLToPath(new URL('src/router', import.meta.url))
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: true
  },
  optimizeDeps: {
    include: ['axios-cookiejar-support']
  },
  
})
