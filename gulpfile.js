// Install Scripts
// Sorted by: core, core gulp, styles, graphics
// yarn add --dev del q
// yarn add --dev gulp gulp-util gulp-rename gulp-newer gulp-sourcemaps gulp-livereload
// yarn add --dev gulp-sass gulp-sass-lint gulp-postcss autoprefixer node-sass-magic-importer
// yarn add --dev gulp-imagemin gulp-svg-symbols feather-icons

'use strict'

// Core
const fs = require('fs')
const path = require('path')
const del = require('del')
const Q = require('q')

// Core Gulp
const gulp = require('gulp')
const gutil = require('gulp-util')
const rename = require('gulp-rename')
const newer = require('gulp-newer')
const sourcemaps = require('gulp-sourcemaps')
const livereload = require('gulp-livereload')

// Styles
const sass = require('gulp-sass')
const sassLint = require('gulp-sass-lint')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const magicImporter = require('node-sass-magic-importer')

// Graphics
const imagemin = require('gulp-imagemin')
const svgSymbols = require('gulp-svg-symbols')
const feather = require('feather-icons')

// Paths
const paths = {
  src: 'src/',
  dest: 'dist/',
  icons: 'node_modules/feather-icons/dist/icons/'
}

/**
 * Clean
 */

gulp.task('clean', function () {
  return del([paths.dest + '**/*'])
})

gulp.task('clean:css', function () {
  return del([
    paths.dest + '**/*.css',
    paths.dest + '**/*.css.map'
  ])
})

gulp.task('clean:js', function () {
  return del([
    paths.dest + '**/*.js',
    paths.dest + '**/*.js.map'
  ])
})

gulp.task('clean:img', function () {
  return del([paths.dest + 'img/**/*'])
})

gulp.task('clean:icons', function () {
  return del([paths.src + 'icons/**/*'])
})

/**
 * Linting
 */

gulp.task('scss:lint', function() {

  const src = paths.src + '**/*.scss'
  const dest = paths.dest

  const scss = gulp.src(src)
    .pipe(sassLint({
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())

  return scss
})

/**
 * Styles
 */

gulp.task('css:dev', function() {

  const src = paths.src + '**/*.scss'
  const dest = paths.dest

  const css = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: [ paths.src ],
      importer: magicImporter()
    })
    .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions', '> 2%'] })
    ]))
    .pipe(sourcemaps.write('./_maps'))
    .pipe(gulp.dest(dest))

  return css
})

gulp.task('css:prod', function() {

  const src = paths.src + '**/*.scss'
  const dest = paths.dest

  const css = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [ paths.src ],
      importer: magicImporter()
    })
    .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions', '> 2%'] })
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./_maps'))
    .pipe(gulp.dest(dest))
    .pipe(livereload())

  return css
})

/**
 * JavaScript
 */

gulp.task('js:dev', function() {

  const src = paths.src + '**/*.js'
  const dest = paths.dest

  const js = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(deporder())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write('./_maps'))
    .pipe(gulp.dest(dest))

  return js
})

gulp.task('js:prod', function() {

  const src = paths.src + '**/*.js'
  const dest = paths.dest

  const js = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(deporder())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./_maps'))
    .pipe(gulp.dest(dest))
    .pipe(livereload())

  return js
})

/**
 * HTML
 */

gulp.task('html', function () {

  const src  = paths.src + '*.html'
  const dest = paths.dest + '/'

  const html = gulp.src(src)
    // Do stuff...
    .pipe(gulp.dest(dest))
    .pipe(livereload())

  return html
})

/**
 * Images
 */

gulp.task('img', function() {

  const src = paths.src + 'img/**/*'
  const dest = paths.dest + 'img/'

  const img = gulp.src(src)
    .pipe(newer(dest))
    .pipe(imagemin())
    .pipe(gulp.dest(dest))
    .pipe(livereload())

  return img
})

/**
 * SVG
 */

gulp.task('svg:icons', function() {

  const src  = paths.icons + '*.svg'
  const dest = paths.src + 'icons/'

  // Setup our promise and set item processed to 0
  const deferred = Q.defer()
  const itemsProcessed = 0

  // Get our icons array
  const icons = fs.readdirSync(paths.icons)

  // Create the direcotry if it doesn't exist
  if (!fs.existsSync(dest)){
    fs.mkdirSync(dest)
  }

  // Loop through our icons
  icons.forEach(icon => {
    icon = path.basename(icon, '.svg')
    const svg = feather.icons[icon].toSvg({
      class: 'icon icon-' + icon
    })

    // Write our icons to file
    fs.writeFile(dest + icon + '.svg', svg, function (err) {
      if (err) { console.error(err) }
    })

    // Add count to processed items
    itemsProcessed++

    // If we're done, set deferred promise to resolved
    if(itemsProcessed === icons.length) {
      deferred.resolve()
    }
  })

  // Return our promise
  return deferred.promise
})

gulp.task('svg:symbols', function() {

  const src  = paths.src + 'icons/*.svg'
  const dest = paths.dest + 'img/icons/'

  const symbols = gulp.src( src )
    .pipe(svgSymbols({
      id: 'icon-%f',
      svgClassname: 'svg-symbols',
      templates: ['default-svg']
    }))
    .pipe(gulp.dest( dest ))
    .pipe(livereload())

  return symbols
})

/**
 * Bulk Tasks
 */

gulp.task('css', ['css:dev', 'css:prod'])
gulp.task('js', ['js:dev', 'js:prod'])
gulp.task('build', ['html', 'img'])
gulp.task('svg', ['svg:icons', 'svg:symbols'])

/**
 * Watch Task
 */
gulp.task('watch', function() {
  livereload.listen()
  gulp.watch(paths.src + '**/*.scss', ['css'])
  gulp.watch(paths.src + '**/*.js', ['js'])
  gulp.watch(paths.src + 'img/**/*', ['img'])
  gulp.watch(paths.src + '**/*.html', ['html'])
})

/**
 * Default task
 * Builds everything and then initiate the watch task
 */
gulp.task('default', ['css', 'js', 'build', 'watch'])
