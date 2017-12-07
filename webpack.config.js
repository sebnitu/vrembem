// Webpack Packages
// Sorted by: webpack, babel, styles, files, markup, plugins
// yarn add --dev webpack webpack-dev-server webpack-merge
// yarn add --dev babel-core babel-loader babel-cli babel-preset-env
// yarn add --dev style-loader css-loader sass-loader
// yarn add --dev raw-loader file-loader url-loader image-webpack-loader
// yarn add --dev html-loader markdown-loader ejs-loader
// yarn add --dev extract-text-webpack-plugin clean-webpack-plugin html-webpack-plugin compression-webpack-plugin purifycss-webpack purify-css

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const fs = require('fs')
const path = require('path')

// Utility configs
const paths = require('./build/utility/paths.config')
const wpCommon = require('./build/utility/webpack.common')

// Addons function for sandboxing
const addons = (addonsArg) => {
  let addons = []
    .concat.apply([], [addonsArg]) // Normalize array of addons (flatten)
    .filter(Boolean)               // If addons is undefined, filter it out

  return addons.map((addonName) => require(`./build/addons/webpack.${addonName}.js`))
}

// Webpack config export function
module.exports = (env) => {
  // env passed via npm scripts
  // --env.env=dev || --env.env=prod
  console.log(env)

  // Get the environment config
  const envConfig = require(`./build/utility/webpack.${env.env}.js`)
  // Merge with common and the addon configs
  // Addons are passed via npm scripts
  // --env.addon=addonName
  const mergedConfig = webpackMerge(wpCommon, envConfig, ...addons(env.addons))

  // Show and return the merged config
  // console.log(mergedConfig)
  return mergedConfig
}
