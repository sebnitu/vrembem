import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const entry = './src/js/app.js';
const babelConfig = {
  babelHelpers: 'runtime',
  rootMode: 'upward'
};

export default {
  input: entry,
  output: [{
    file: './dist/scripts.js',
    format: 'iife'
  }, {
    file: './dist/scripts.min.js',
    format: 'iife',
    plugins: [terser({
      output: { comments: false }
    })]
  }],
  plugins: [
    resolve(),
    commonjs(),
    babel(babelConfig)
  ]
};
