import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'local/build',
    emptyOutDir: true,
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
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
