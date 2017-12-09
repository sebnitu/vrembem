import path from 'path'

const config = {
  key: 'demo',
  ext: '.demo.md'
}

const paths = {
  root: path.resolve(__dirname, '../'),
  src:  path.resolve(__dirname, '../', 'src'),
  dist: path.resolve(__dirname, '../', 'demo'),
  pages: path.resolve(__dirname, '../', 'scss')
}

export { config, paths }
