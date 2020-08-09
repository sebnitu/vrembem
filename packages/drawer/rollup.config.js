import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const entry = './index.js';
const name = 'vrembem.drawer';
const babelConfig = {
  babelHelpers: 'runtime',
  rootMode: 'upward'
};

export default [{
  input: entry,
  output: [{
    file: './dist/scripts.cjs.js',
    format: 'cjs',
    exports: 'default'
  }, {
    file: './dist/scripts.js',
    format: 'iife',
    name: name,
    extend: true
  }],
  plugins: [
    resolve(),
    commonjs(),
    babel(babelConfig)
  ]
}, {
  input: entry,
  output: {
    file: './dist/scripts.min.js',
    format: 'iife',
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
