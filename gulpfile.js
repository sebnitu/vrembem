// Gulp Packages (separated by: core, scss, postcss)
// yarn add node-sass node-sass-magic-importer
// yarn add --dev del gulp gulp-rename gulp-sass gulp-sass-lint gulp-sourcemaps
// yarn add --dev gulp-postcss autoprefixer

'use strict'

// Core
const fs = require('fs')
const path = require('path')
const del = require('del')
const gulp = require('gulp')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')

// Styles
const sass = require('gulp-sass')
const sassLint = require('gulp-sass-lint')
const magicImporter = require('node-sass-magic-importer')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

// Paths
const  paths = {
  src: 'src/',
  dest: 'dist/'
}

/**
 * Clean
 */

gulp.task('clean', function () {
  return del(['dist/**/*'])
})

/**
 * SCSS Linting
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
 * Build SCSS => CSS
 */

gulp.task('css:dev', function() {

  const src = [
    paths.src + '**/*.scss',
    '!' + paths.src + 'vrem-core.scss'
  ]
  const dest = paths.dest

  const css = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: paths.src,
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

/**
 * Build SCSS => CSS.min
 */

gulp.task('css:prod', function() {

  const src = [
    paths.src + '**/*.scss',
    '!' + paths.src + 'vrem-core.scss'
  ]
  const dest = paths.dest

  const css = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: paths.src,
      importer: magicImporter()
    })
    .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions', '> 2%'] })
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./_maps'))
    .pipe(gulp.dest(dest))

  return css
})

/**
 * Build Task Shorthands
 */

gulp.task('css', ['css:dev', 'css:prod'])
gulp.task('build', ['clean', 'css'])

/**
 * Watch Task
 */

gulp.task('watch', function() {
  gulp.watch(paths.src + '**/*', ['css'])
})

/**
 * Default Task
 */
gulp.task('default', ['build', 'watch'])
