import path from 'node:path';
import terser from '@rollup/plugin-terser';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import Inspect from 'vite-plugin-inspect';
import svgr from 'vite-plugin-svgr';
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
