import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    host: true, // Tüm ağlarda erişilebilir olmasını sağlar
    open: true, // Tarayıcıda otomatik olarak açar
    strictPort: false,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    cors: {
      origin: '*',
    },
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'telegram-tap-to-earn.loca.lt'
    ]
  },
  build: {
    outDir: 'dist',
    minify: 'terser', // Daha iyi sıkıştırma için terser
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Vendor kütüphanelerini ayrı bir chunk'a çıkar
        },
      },
    },
  },
  // Localtunnel için gerekli
  optimizeDeps: {
    exclude: [],
  },
})
