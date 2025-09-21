import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';
// import virtual from 'vite-plugin-virtual';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    checker({
      biome: {
        command: 'check',
      },
      typescript: true,
    }),
    viteCompression(),
    terser(),
    Inspect(),
    visualizer(),
    // virtual(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
