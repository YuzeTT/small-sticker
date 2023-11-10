import Pages from 'vite-plugin-pages'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Pages(),
    react(),
    UnoCSS(),
  ],
  resolve:{
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
