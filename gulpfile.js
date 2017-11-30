// Base Packages
var
  fs = require('fs'),
  path = require('path'),
  gulp = require('gulp'),
  del = require('del'),
  rename = require('gulp-rename'),
  merge = require('merge-stream'),
  Q = require('q')
;

// CSS Processing Packages
var
  sass = require('gulp-sass'),
  magicImporter = require('node-sass-magic-importer'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  scsslint = require('gulp-scss-lint')
;

// JS Processing Packages
var
  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  uglify = require('gulp-uglify')
;

// SVG Processing Packages
var
  feather = require('feather-icons'),
  svgSymbols = require('gulp-svg-symbols')
;

// Paths Variable
var paths = {
  src: 'src/',
  dest: 'dist/',
  icons: 'node_modules/feather-icons/dist/icons/',
  includePaths: [
    'src/',
    'src/core/',
    'src/global/',
    'src/tags/',
    'src/blocks/'
  ]
};

/**
 * Clean Task
 */
gulp.task('clean', function() {
  return del([
    paths.dest + '**/*'
  ]);
});

/**
 * SCSS Lint
 */
gulp.task('lint', function() {
  return gulp.src(paths.src + '**/*.scss')
    .pipe(scsslint({ 'config': 'scsslint.yml' }));
});

/**
 * CSS Task
 */
gulp.task('build', function() {

  var src = paths.src + '**/*.scss';
  var dest = paths.dest;

  var css = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
        precision: 3,
        includePaths: paths.includePaths,
        importer: magicImporter()
      })
      .on('error', sass.logError)
    )
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions', '> 2%']
      })
    ]))
    .pipe(sourcemaps.write('./_maps'))
    .pipe(gulp.dest(dest));

  var cssmin = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
        precision: 3,
        includePaths: paths.includePaths,
        importer: magicImporter()
      })
      .on('error', sass.logError)
    )
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions', '> 2%']
      })
    ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./_maps'))
    .pipe(gulp.dest(dest));

  return merge(css, cssmin);
});

/**
 * Clean Buttons Task
 */
gulp.task('clean:blocks', function() {
  return del([
    paths.dest + 'blocks/*',
  ]);
});

/**
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch(paths.src + '**/*', ['build']);
});

/**
 * Default
 */
gulp.task('default', ['build']);
