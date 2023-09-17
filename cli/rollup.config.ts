import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import path from 'node:path';
import { fileURLToPath } from 'url';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

function resolve(filePath: string) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, filePath);
}

const esmConfig = defineConfig({
  input: resolve('./bin/cli.ts'),
  output: {
    file: resolve('./dist/index.js'),
    format: 'esm',
  },
  plugins: [
    typescript({
      tsconfig: resolve('../tsconfig.json'),
    }),
    terser(),
  ],
});

const dtsConfig = defineConfig({
  input: resolve('./lib/index.ts'),
  output: {
    file: resolve('./dist/index.d.ts'),
    format: 'esm',
  },
  plugins: [
    typescript({
      tsconfig: resolve('../tsconfig.json'),
    }),
    dts(),
  ],
});

export default [esmConfig, dtsConfig];
