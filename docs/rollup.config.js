import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const entry = './src/js/app.js';
const babelConfig = {
  babelHelpers: 'runtime',
  rootMode: 'upward'
};

export default [{
  input: entry,
  output: {
    file: './dist/scripts.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(babelConfig)
  ]
}, {
  input: entry,
  output: {
    file: './dist/scripts.min.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(babelConfig),
    terser()
  ]
}];
