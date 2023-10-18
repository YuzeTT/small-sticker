import Pages from 'vite-plugin-pages'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Pages(),
    react(),
    UnoCSS(),
  ],
})
