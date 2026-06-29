import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
       enabled: true,
      },
      manifest: {
        name: 'CoolAI - Smart AC Assistant',
        short_name: 'CoolAI',
        description: 'Right-size your AC, track bills, and save energy with AI-powered cooling advice.',
        theme_color: '#0F1B2D',
        background_color: '#F7F9FC',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})