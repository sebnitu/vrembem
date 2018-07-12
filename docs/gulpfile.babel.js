/**
 * Gulpfile with Babel
 * ---
 * This is where you define all your project tasks. These can be written in ES6+
 * and it will be read and run using babel. Make sure to have a `.babelrc` with
 * whatever presets and settings you need.
 */

'use strict'

/**
 * Packages
 */

// Global
import gulp from 'gulp'
import gutil from 'gulp-util'
import fs from 'fs'
import path from 'path'
import del from 'del'
import Q from 'q'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import log from 'gulplog'

// CSS
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

// JS
import browserify from 'browserify'
import babel from 'babelify'
import uglify from 'gulp-uglify'

// Img
import imagemin from 'gulp-imagemin'
import svgSymbols from 'gulp-svg-symbols'

// Icons
import feather from 'feather-icons'

/**
 * Paths
 */

const paths = {
  src: 'src/',
  dest: 'dist/',
  scss: {
    entry: 'app.scss',
    output: 'styles.css',
    search: [
      '../src/scss/',
      '../node_modules/'
    ]
  },
  js: {
    entry: 'app.js',
    output: 'scripts.js',
    search: [
      '../src/js/',
      '../node_modules/'
    ]
  }
}

/**
 * CSS
 */

gulp.task('css:dev', () => {
  const src = paths.src + 'scss/' + paths.scss.entry
  const dest = paths.dest + 'css/'
  const css = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: paths.scss.search
    })
    .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions', '> 2%'] })
    ]))
    .pipe(rename(paths.scss.output))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))

  return css
})

gulp.task('css:prod', () => {
  const src = paths.src + 'scss/' + paths.scss.entry
  const dest = paths.dest + 'css/'
  const css = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: paths.scss.search
    })
    .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions', '> 2%'] })
    ]))
    .pipe(rename(paths.scss.output.replace(/(\.[\w\d_-]+)$/i, '.min$1')))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))

  return css
})

gulp.task('css', ['css:dev', 'css:prod'])

/**
 * JS
 */

gulp.task('js:dev', () => {
  const src = paths.src + 'js/' + paths.js.entry
  const dest = paths.dest + 'js/'
  const b = browserify({
    entries: src,
    paths: paths.js.search,
    debug: true
  }).transform(babel)
  const js = b.bundle()
    .pipe(source(src))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .on('error', log.error)
    .pipe(rename(paths.js.output))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))

  return js
})

gulp.task('js:prod', () => {
  const src = paths.src + 'js/' + paths.js.entry
  const dest = paths.dest + 'js/'
  const b = browserify({
    entries: src,
    paths: paths.js.search,
    debug: true
  }).transform(babel)
  const js = b.bundle()
    .pipe(source(src))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', log.error)
    .pipe(rename(paths.js.output.replace(/(\.[\w\d_-]+)$/i, '.min$1')))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))

  return js
})

gulp.task('js', ['js:dev', 'js:prod'])

/**
 * Img
 */

gulp.task('img', () => {
  const src = paths.src + 'img/**/*'
  const dest = paths.dest + 'img/'
  return gulp.src(src)
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(dest))
})

/**
 * Icons
 */

gulp.task('icons', () => {

  // Set paths
  const src = '../node_modules/feather-icons/dist/icons/*.svg'
  const dest = paths.dest + 'icons/'

  // Setup our promise and set item processed to 0
  var deferred = Q.defer()
  var itemsProcessed = 0

  // Get our icons array
  var icons = fs.readdirSync('../node_modules/feather-icons/dist/icons/')

  // Create the direcotry if it doesn't exist
  if (!fs.existsSync(dest)){
    fs.mkdirSync(dest)
  }

  // Loop through our icons
  icons.forEach(icon => {
    icon = path.basename(icon, '.svg')
    var svg = feather.icons[icon].toSvg({
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

/**
 * Symbols
 */

gulp.task('symbols', () => {
  const src = paths.dest + 'icons/*.svg'
  const dest = '_includes/'
  return gulp.src( src )
    .pipe(svgSymbols({
      id: '%f',
      svgAttrs: {
        class: 'svg-symbols'
      },
      templates: ['default-svg']
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest( dest ))
})

/**
 * Clean
 */

gulp.task('clean:css', () => {
  return del(paths.dest + 'css')
})

gulp.task('clean:js', () => {
  return del(paths.dest + 'js')
})

gulp.task('clean:img', () => {
  return del(paths.dest + 'img')
})

gulp.task('clean:icons', () => {
  return del(paths.dest + 'icons')
})

gulp.task('clean:svg', () => {
  return del(paths.dest + 'svg')
})

gulp.task('clean', () => {
  return del(paths.dest)
})

/**
 * Bulk
 */

gulp.task('all', ['css', 'js', 'img'])

/**
 * Watch
 */

gulp.task('watch', () => {
  gulp.watch([paths.src + 'scss/**/*', '../' + paths.src + 'scss/**/*'], ['css'])
  gulp.watch(paths.src + 'js/**/*', ['js'])
})

/**
 * Default
 * Builds everything and then initiates the watch task
 */

gulp.task('default', ['all', 'watch'])
