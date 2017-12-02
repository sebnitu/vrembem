// Webpack Packages
// yarn add --dev webpack webpack-dev-server
// yarn add --dev babel-core babel-loader babel-cli babel-preset-env
// yarn add --dev style-loader css-loader sass-loader
// yarn add --dev raw-loader file-loader url-loader
// yarn add --dev extract-text-webpack-plugin clean-webpack-plugin purifycss-webpack purify-css

const webpack = require('webpack')
const path = require('path')
const glob = require('glob') // Req for PurifyCSSPlugin

const MagicImporter = require('node-sass-magic-importer')

const UglifyPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanPlugin = require('clean-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')

// Set our environment variable
const isProd = process.env.NODE_ENV === 'production'

// Webpack config
// Contains: entry, output, module, plugins
// Variables: [name][ext][hash]
const config = {
  entry: {
    app: [
      './src/entry.js',
      './src/vrem-globals.scss',
      './src/app.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js'
  },
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
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                importer: MagicImporter()
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new CleanPlugin(path.resolve(__dirname, 'docs')),
    new PurifyCSSPlugin({
      minimize: isProd,
      paths: glob.sync(path.join(__dirname, '*.html')),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProd
    })
  ]
}

if (isProd) {
  config.plugins.push(
    new UglifyPlugin()
  )
}

module.exports = config
