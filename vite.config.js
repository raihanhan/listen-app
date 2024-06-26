import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
plugins: [
  react(),
  svgr(),
  VitePWA({
  registerType: 'prompt',
  workbox: {
    cleanupOutdatedCaches: false,
    sourcemap: true
  },
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      manifest : false,
      name: 'Listen app',
      short_name: 'ListenApp',
      description: 'Pengalaman menonton konser dari rumah',
      theme_color: '#ffffff',
      icons: [
        {
         src: 'public/favicon/192x192.png',
         sizes: '192x192',
         type: 'image/png'
        },
        {
        src: 'public/favicon/512x512.png',
        sizes: '512x512',
        type: 'image/png'
        },
        {
        src: 'public/favicon/512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
        },
        {
        src: 'public/favicon/logomaskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
        }
      ]
    }
  })
],
})