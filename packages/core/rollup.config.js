import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const entry = './index.js';
const name = 'vrembem.core';
const babelConfig = {
  babelHelpers: 'runtime',
  rootMode: 'upward'
};

export default [{
  input: entry,
  output: {
    file: './dist/scripts.esm.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(babelConfig)
  ]
}, {
  input: entry,
  output: {
    file: './dist/scripts.js',
    format: 'umd',
    name: name,
    extend: true
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
    format: 'umd',
    name: name,
    extend: true
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(babelConfig),
    terser()
  ]
}];
