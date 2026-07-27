import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2018',

    // Minify with esbuild (default, very fast)
    minify: 'esbuild',
    cssMinify: true,

    // Warn if a single chunk exceeds 600 kB
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split heavy libraries into separate cached chunks.
        // Visitors who return only re-download what actually changed.
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons':  ['lucide-react'],
        },
      },
    },
  },
})
