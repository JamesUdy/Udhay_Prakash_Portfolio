import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.pdf'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js + React Three Fiber + Drei — only used in Hero canvas
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three')
          ) {
            return 'vendor-three';
          }
          // tsParticles — used in Hero, Contact, Resume
          if (
            id.includes('node_modules/@tsparticles') ||
            id.includes('node_modules/tsparticles')
          ) {
            return 'vendor-particles';
          }
          // Framer Motion — used everywhere, keep in its own chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          // React + React-DOM + React Router — the core, always loaded
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/react-router/')
          ) {
            return 'vendor-react';
          }
        },
      },
    },
  },
})
