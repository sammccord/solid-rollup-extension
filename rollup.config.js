import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { emptyDir } from 'rollup-plugin-empty-dir'
import zip from 'rollup-plugin-zip'

const production = process.env.NODE_ENV === 'production'
const extensions = ['.ts', '.tsx']

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
    chunkFileNames: 'chunks/[name]-[hash].js',
  },
  treeshake: production,
  plugins: [
    chromeExtension(),
    // Adds a Chrome extension reloader during watch mode
    simpleReloader(),
    resolve({ extensions, browser: true }),
    babel({
      extensions,
      babelHelpers: 'bundled',
      presets: ['solid', '@babel/preset-typescript'],
      exclude: /node_modules\//,
    }),
    commonjs({ extensions }),
    replace({
      values: {
        'process.env.PUBLIC_URL': production
          ? '"YOUR_SITE_URL"'
          : '"localhost:3000"',
      },
    }),
    postcss(),
    // Empties the output dir before a new build
    emptyDir(),
    // Outputs a zip file in ./releases
    production &&
      terser({
        toplevel: true,
        compress: true,
        module: true,
        format: {
          comments: false,
          ecma: 2020,
        },
      }),
    production && zip({ dir: 'releases' }),
  ],
}
