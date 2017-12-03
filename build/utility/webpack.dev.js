const webpack = require('webpack')
const paths = require('./paths.config')

const MagicImporter = require('node-sass-magic-importer')
const CleanPlugin = require('clean-webpack-plugin')

const config = {
  devtool: 'eval-source-map', // https://webpack.js.org/configuration/devtool/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              importer: MagicImporter()
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanPlugin([paths.docs], {root: paths.root})
  ]
}

module.exports = config;
