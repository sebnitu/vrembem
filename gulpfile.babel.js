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

/**
 * Paths
 */

const paths = {
  src: 'src/',
  dest: 'dist/',
  scss: {
    entry: 'vrembem.scss',
    output: 'styles.css',
    search: [
      'src/scss/',
      'node_modules/'
    ]
  },
  js: {
    entry: 'app.js',
    output: 'scripts.js',
    search: [
      'src/js/',
      'node_modules/'
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
 * Clean
 */

gulp.task('clean:css', () => {
  return del(paths.dest + 'css')
})

gulp.task('clean:js', () => {
  return del(paths.dest + 'js')
})

gulp.task('clean', () => {
  return del(paths.dest)
})

/**
 * Bulk
 */

gulp.task('all', ['css', 'js'])

/**
 * Watch
 */

gulp.task('watch', () => {
  gulp.watch(paths.src + 'scss/**/*', ['css'])
  gulp.watch(paths.src + 'js/**/*', ['js'])
})

/**
 * Default
 * Builds everything and then initiates the watch task
 */

gulp.task('default', ['all', 'watch'])
