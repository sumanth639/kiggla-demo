/* eslint-disable no-unused-vars */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),

    ViteImageOptimizer({
      includePublic: true,
      logStats: true,
      svg: {
        multipass: true,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    cssMinify: 'terser',
    reportCompressedSize: true,
  },
});
