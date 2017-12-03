const webpack = require('webpack')
const path = require('path')
const paths = require('./paths.config')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    app: [
      path.join(paths.src, 'entry.js')
    ]
  },
  output: {
    filename: 'bundle.js',
    path: paths.docs
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[ext]'
            }
          },
          'image-webpack-loader',
        ]
      }
    ]
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin()
  ]
}

module.exports = config;
