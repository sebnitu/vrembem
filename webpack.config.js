var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: './docs/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      vrembem: path.resolve(__dirname, 'src/library.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    contentBase: 'docs/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
