import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
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
      rootMode: 'upward',
      runtimeHelpers: true
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
      rootMode: 'upward',
      runtimeHelpers: true
    }),
    minify()
  ]
}];
