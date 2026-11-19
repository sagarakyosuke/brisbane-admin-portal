import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
      }
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src')
    }
  },
  server: { port: 3000, open: true },
  build: { outDir: 'build', sourcemap: true }
});
