import path from 'node:path'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: Number.parseInt(process.env.VITE_PORT, 10) || 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
})
