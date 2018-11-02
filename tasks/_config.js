export default {
  src: 'src/',
  dest: 'dist/',

  styles: {
    src: 'src/scss/vrembem.scss',
    dest: 'dist/css/',
    output: 'styles',
    watch: ['src/scss/**/*'],
    search: [
      'src/scss/',
      'node_modules/'
    ],
    vendors: []
  },

  scripts: {
    src: 'src/js/app.js',
    dest: 'dist/js/',
    output: 'scripts',
    watch: ['src/js/**/*'],
    search: [
      'src/js/',
      'node_modules/'
    ],
    vendors: []
  }
}
