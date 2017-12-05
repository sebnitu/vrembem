const webpack = require('webpack')
const path = require('path')
const paths = require('./paths.config')
// const glob = require('glob') // Req for PurifyCSSPlugin

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const MagicImporter = require('node-sass-magic-importer')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
// const PurifyCSSPlugin = require('purifycss-webpack')

const config = {
  devtool: 'source-map', // https://webpack.js.org/configuration/devtool/
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [paths.scss],
                importer: MagicImporter()
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new UglifyPlugin({
      sourceMap: true
    }),
    new CleanPlugin([paths.docs], {root: paths.root}),
    new CompressionPlugin({
      test: /\.(js|css|html)/,
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),
    // new PurifyCSSPlugin({
    //   minimize: true,
    //   paths: glob.sync(path.join(__dirname, '*.html')),
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}

module.exports = config;
