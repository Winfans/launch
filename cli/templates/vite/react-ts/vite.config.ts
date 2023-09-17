import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import copy from 'rollup-plugin-copy';

const VARIABLE_LESS_PATH = './src/variable.less';

const env = process.env.ENV;
const isProd = env === 'prod';

let apiBaseUrl = 'https://api.example.com';
if (!isProd) {
  apiBaseUrl = 'https://api.qa.example.com';
}

const watch = isProd
  ? null
  : {
      include: ['src/**/*', 'public/**/*', 'index.html'],
    };

const manualChunks = isProd
  ? {
      lodash: ['lodash-es'],
      react: ['react', 'react-dom', 'react-router-dom'],
      antd: ['antd'],
    }
  : null;

const copyPlugin = copy({
  targets: [{ src: path.resolve(__dirname, './src/manifest.json'), dest: 'dist' }],
});
const reactPlugin = react();
const plugins = isProd
  ? [reactPlugin, splitVendorChunkPlugin(), copyPlugin]
  : [reactPlugin, copyPlugin];

export default defineConfig({
  build: {
    watch,
    rollupOptions: {
      input: {
        index: 'index.html',
        background: 'src/background.ts',
        'content-script': 'src/content-script.ts',
        contentScriptStyle: 'src/content-script.less',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[ext]',
        manualChunks: manualChunks,
      },
    },
    outDir: 'dist',
  },
  plugins: plugins,
  define: {
    'import.meta.env.NODE_ENV': JSON.stringify(env),
    API_BASE_URL: JSON.stringify(apiBaseUrl),
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${VARIABLE_LESS_PATH}";`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: '/',
    https: false,
  },
});
