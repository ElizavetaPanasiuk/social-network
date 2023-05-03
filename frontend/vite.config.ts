import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './scr/components'),
      '@hooks': path.resolve(__dirname, './scr/hooks'),
      '@lib': path.resolve(__dirname, './scr/lib'),
      '@locales': path.resolve(__dirname, './scr/locales'),
      '@modules': path.resolve(__dirname, './scr/modules'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@ui-kit': path.resolve(__dirname, './scr/ui-kit'),
    },
  },
  plugins: [react()],
});
