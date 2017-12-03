// Webpack Packages
// yarn add --dev webpack webpack-dev-server
// yarn add --dev babel-core babel-loader babel-cli babel-preset-env
// yarn add --dev style-loader css-loader sass-loader
// yarn add --dev image-webpack-loader
// yarn add --dev raw-loader file-loader url-loader
// yarn add --dev extract-text-webpack-plugin clean-webpack-plugin purifycss-webpack purify-css

const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const glob = require('glob') // Req for PurifyCSSPlugin

const MagicImporter = require('node-sass-magic-importer')

const UglifyPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanPlugin = require('clean-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')

// Custon webpack plugin import
// const SampleWebpackPlugin = require('./build/plugins/SampleWebpackPlugin')

// Set our environment variable
const isProd = process.env.NODE_ENV === 'production'
const dest = path.resolve(__dirname, 'docs')

// Webpack config
// Contains: entry, output, module, plugins
// Variables: [name][ext][hash][chunkhash]
const config = {
  entry: {
    app: [
      './src/entry.js',
      './src/vrem-globals.scss',
      './src/app.scss'
    ]
  },
  output: {
    filename: '[name].js',
    path: dest
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {}, // Compress GIF images
              mozjpeg: {}, // Compress JPEG images
              optipng: {}, // Compress PNG images
              svgo: {}, // Compress SVG images
              pngquant: {}, // Compress PNG images
              webp: {} // Compress JPG & PNG images into WEBP
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    contentBase: './',
    inline: true
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new CleanPlugin(dest),
    new PurifyCSSPlugin({
      minimize: isProd,
      paths: glob.sync(path.join(__dirname, '*.html')),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProd
    })

    // Custom webpack plugin
    // ,
    // new SampleWebpackPlugin()

    // Custom webpack function
    // ,
    // function() {
    //   this.plugin('done', stats => {
    //     fs.writeFileSync(
    //       path.join(dest, 'manifest.json'),
    //       JSON.stringify(stats.toJson().assetsByChunkName)
    //     )
    //   })
    // }
  ]
}

if (isProd) {
  config.plugins.push(
    new UglifyPlugin()
  )
}

module.exports = config
