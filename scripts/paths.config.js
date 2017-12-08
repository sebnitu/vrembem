import path from 'path'

const back = '../'
const paths = {
  src: path.resolve(__dirname, back, 'src'),
  dist: path.resolve(__dirname, back, 'dist'),
  demo: path.resolve(__dirname, back, 'demo'),
  scripts: path.resolve(__dirname, back, 'scripts'),
  root: path.resolve(__dirname, back)
}

export default paths
