const webpack = require('webpack')
const path = require('path')
const paths = require('./paths.config')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    docs: [
      path.join(paths.src, 'entry.js')
    ]
  },
  output: {
    filename: 'bundle.js',
    path: paths.docs
  },
  resolve: {
    alias: {
      vrembem: paths.src
    }
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
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader'
          }
        ]
      },
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
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: 'Vrembem Style Guide',
      hash: true,
      filename: 'index.html',
      template: path.join(paths.src, 'templates/index.tpl'),
    })
  ]
}

module.exports = config;
