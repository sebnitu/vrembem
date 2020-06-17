import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const name = 'vrembem';

export default [{
  input: pkg.module,
  output: [{
    file: pkg.browser,
    format: 'iife',
    name: name,
    extend: true
  }, {
    file: pkg.main,
    format: 'cjs',
    name: name
  }],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      rootMode: 'upward'
    })
  ]
}, {
  input: pkg.module,
  output: {
    file: pkg.browser.replace('.js', '.min.js'),
    format: 'iife',
    name: name,
    extend: true
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      rootMode: 'upward'
    }),
    terser()
  ]
}];
