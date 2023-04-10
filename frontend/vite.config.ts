import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './scr/components'),
      '@pages': path.resolve(__dirname, './scr/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@ui-kit': path.resolve(__dirname, './scr/ui-kit'),
    },
  },
  plugins: [react()],
});
