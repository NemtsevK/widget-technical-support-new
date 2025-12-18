import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],

  build: {
    outDir: 'build',
    emptyOutDir: true, // Очищаем папку перед сборкой
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'App',
      fileName: format => 'app.js',
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        globals: {},
        format: 'umd',
        exports: 'default',
        name: 'App',
        assetFileNames: assetInfo => {
          if (assetInfo.name.endsWith('.css')) {
            return 'style.css';
          }
          return assetInfo.name;
        },
      },
    },
    minify: false,
  },

  css: {
    preprocessorOptions: {
      scss: {},
    },
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
});
