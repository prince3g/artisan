// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this matches your Vercel deployment path
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
  server: {
    historyApiFallback: true, // Ensures fallback during local development
  },
});

