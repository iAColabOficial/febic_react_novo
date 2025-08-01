import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ← IMPORTANTE: deve ser '/' para domínio principal
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})