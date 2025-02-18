import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      
    },
  },
  plugins: [react()],
  //server : {host : true}
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure .jsx files are resolved correctly
  },
});
