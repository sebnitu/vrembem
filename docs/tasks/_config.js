export default {
  src: 'src/',
  dest: 'dist/',

  styles: {
    src: 'src/scss/app.scss',
    dest: 'dist/css/',
    output: 'styles',
    watch: [
      'src/scss/**/*',
      '../src/scss/**/*'
    ],
    search: [
      'src/scss/',
      '../src/scss/',
      '../node_modules/'
    ],
    vendors: []
  },

  scripts: {
    src: 'src/js/app.js',
    dest: 'dist/js/',
    output: 'scripts',
    watch: [
      'src/js/**/*',
      '../src/js/**/*'
    ],
    search: [
      'src/js/',
      '../src/js/',
      '../node_modules/'
    ],
    vendors: [
      '../node_modules/svgxuse/svgxuse.js',
      '../node_modules/svgxuse/svgxuse.min.js'
    ]
  },

  img: {
    src: 'src/img/**/*',
    dest: 'dist/img/'
  },

  svg: {
    src: 'src/svg/**/*.svg',
    dest: '_includes/svg/'
  },

  symbols: {
    src: '_includes/icon/**/*.svg',
    dest: '_includes/svg/',
    options: {
      id: 'icon-%f',
      svgAttrs: { class: 'svg-symbols' },
      templates: ['default-svg']
    },
    output: 'symbols.svg'
  },

  feather: {
    src: '../node_modules/feather-icons/dist/icons/',
    dest: '_includes/icon/'
  }
}
