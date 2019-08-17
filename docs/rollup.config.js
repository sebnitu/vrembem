import babel from "rollup-plugin-babel"
import minify from "rollup-plugin-babel-minify"
import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve"
import pkg from "./package.json"

let name = pkg.name
  .replace("@", "")
  .replace("/all", "")
  .replace("/", ".")

let babelConfig = "../.babelrc"

export default [{
  input: pkg.module,
  output: [{
    file: pkg.browser,
    format: "iife",
    name: name
  }, {
    file: pkg.main,
    format: "cjs",
    name: name
  }],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      configFile: babelConfig
    })
  ]
}, {
  input: pkg.module,
  output: {
    file: pkg.browser.replace(".js", ".min.js"),
    format: "iife",
    name: name
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      configFile: babelConfig
    }),
    minify()
  ]
}]
