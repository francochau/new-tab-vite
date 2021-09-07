import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  manifest: true,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    reactRefresh(),
    copy({
      targets: [{ src: './src/manifest.json', dest: 'dist' }],
      hook: 'writeBundle',
    }),
    copy({
      targets: [{ src: './icons', dest: 'dist' }],
      hook: 'writeBundle',
    }),
  ],
});
