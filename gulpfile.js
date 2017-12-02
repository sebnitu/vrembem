// Gulp Packages
// yarn add node-sass node-sass-magic-importer
// yarn add --dev del gulp gulp-rename gulp-sass gulp-sass-lint gulp-sourcemaps gulp-postcss autoprefixer

'use strict'

const fs = require('fs')
const path = require('path')
const del = require('del')
const gulp = require('gulp')
const rename = require('gulp-rename')

const sass = require('gulp-sass')
const sassLint = require('gulp-sass-lint')
const sourcemaps = require('gulp-sourcemaps')
const magicImporter = require('node-sass-magic-importer')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

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
 * Styles
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

gulp.task('scss:dev', function() {

  const src = [
    paths.src + '**/*.scss',
    '!' + paths.src + 'vrem-core.scss'
  ]
  const dest = paths.dest

  const scss = gulp.src(src)
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

  return scss
})

gulp.task('scss:min', function() {

  const src = [
    paths.src + '**/*.scss',
    '!' + paths.src + 'vrem-core.scss'
  ]
  const dest = paths.dest

  const scss = gulp.src(src)
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

  return scss
})

/**
 * Build Task
 */

gulp.task('scss', ['scss:dev', 'scss:min'])
gulp.task('build', ['scss'])

/**
 * Watch Task
 */

gulp.task('watch', function() {
  gulp.watch(paths.src + '**/*', ['scss'])
})

/**
 * Default Task
 */
gulp.task('default', ['build', 'watch'])
