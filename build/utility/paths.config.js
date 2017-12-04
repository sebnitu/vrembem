const path = require('path')

const back = '../../'

const paths = {
  src: path.resolve(__dirname, back, 'src'),
  dist: path.resolve(__dirname, back, 'dist'),
  scss: path.resolve(__dirname, back, 'src/scss'),
  docs: path.resolve(__dirname, back, 'docs'),
  root: path.resolve(__dirname, back)
}

module.exports = paths
