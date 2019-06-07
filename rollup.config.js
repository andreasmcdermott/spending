import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import postcssImport from 'postcss-import';
import tailwind from 'tailwindcss';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'cjs',
    file: 'static/bundle.js',
  },
  external: [
    'electron',
    'child_process',
    'fs',
    'stream',
    'readline',
    'path',
    'url',
    'module',
    'os',
  ],
  plugins: [
    svelte({
      dev: !production,
      emitCss: true,
    }),
    resolve(),
    commonjs(),
    json(),
    postcss({
      plugins: [postcssImport, tailwind()],
      extract: true,
    }),
    !production && livereload('static'),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
