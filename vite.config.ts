import Pages from 'vite-plugin-pages'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Pages(),
    react(),
    UnoCSS(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['sticker_logo.svg'],
    //   manifest: {
    //     name: '大贴纸',
    //     short_name: '大贴纸',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable',
    //       },
    //     ],
    //   },
    //   workbox: {
    //     skipWaiting: true,
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
