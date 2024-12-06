import { defineConfig } from 'vite';
import { resolve } from 'node:path';
const config = defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      imput: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'src/pages/product/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
      },
    },
  },
});

export default config;
