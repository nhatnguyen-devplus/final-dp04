import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~antd': path.resolve(__dirname, './node_modules/antd'),
      '@app': path.resolve('./src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
})
