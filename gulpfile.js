// Require Packages
var
  fs = require('fs'),
  path = require('path'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  newer = require('gulp-newer'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  merge = require('merge-stream'),
  minimist = require('minimist'),
  livereload = require('gulp-livereload')
;

// Styles Packages
var
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano')
;

// JavaScript Packages
var
  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify')
;

// Image Packages
var
  imagemin = require('gulp-imagemin'),
  feather = require('feather-icons'),
  svgSymbols = require('gulp-svg-symbols')
;

// HTML Packages
var
  gulpImport = require('gulp-html-import')
;

// Paths
var paths = {
  src: 'src/',
  dest: 'dist/',
  icons: 'node_modules/feather-icons/dist/icons/',
};

/**
 * Search and replace for managing current version and other static data that
 * changes accross multiple files: -s SEARCH -r REPLACE -f FILES
 */

// Search Files
var searchFiles = {
  version: [
    'README.md',
    'package.json',
    'src/scss/core/_colophon.scss'
  ],
  year: [
    'README.md',
    'LICENSE',
    'src/scss/_colophon.scss'
  ],
  exclude: [
    '!./node_modules/**',
    '!./bower_components/**'
  ]
};

// Save passed parameters to use in gulp tasks
var options = minimist(process.argv.slice(2));

// Replace task
gulp.task('replace', function() {

  var src = typeof searchFiles['exclude'] != "undefined" ? searchFiles['exclude'] : [];

  if ((options.s == undefined) || (options.r == undefined) || (options.f == undefined)) {
    console.error('USAGE: gulp replace -s <SEARCH> -r <REPLACE> -f <FILES>');
  } else {
    if (searchFiles[options.f] != undefined) {
      src = searchFiles[options.f].concat(src);
    } else {
      src = String(options.f)
        .replace(/\s+/g, '')
        .split(',')
        .concat(src);
    }

    console.log(
      'Searching for "' + gutil.colors.cyan(String(options.s)) +
      '" to replace with "' + gutil.colors.cyan(String(options.r)) + '"'
    );
    console.log( 'Looking through:', '\n - ' + gutil.colors.yellow(src).replace(/,/g , "\n - ") );

    return gulp.src(src, { base: './' })
      .pipe(replace(String(options.s), String(options.r)))
      .pipe(gulp.dest('./'));
  }

});

/**
 * Output expanded and min CSS files with source maps from `src` into `dist`
 */
gulp.task('css', function() {
  var
    src = paths.src + 'scss/vrembem.scss',
    dest = paths.dest + 'css/',
    sassOpts = {
      outputStyle: 'expanded',
      precision: 3
    },
    postcssOpts = [
      autoprefixer({ browsers: ['last 2 versions', '> 2%'] })
    ],
    css = gulp.src(src)
      .pipe(sourcemaps.init())
      .pipe(sass(sassOpts)
      .on('error', sass.logError))
      .pipe(postcss(postcssOpts))
      .pipe(rename('vrembem.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dest)),
    cssmin = gulp.src(src)
      .pipe(sourcemaps.init())
      .pipe(sass(sassOpts)
      .on('error', sass.logError))
      .pipe(postcss(postcssOpts))
      .pipe(postcss([cssnano]))
      .pipe(rename('vrembem.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dest));

  return merge(css, cssmin);
});

/**
 * Output expanded and minified JS files from `src` into `dist`
 */
gulp.task('js', function() {
  var
    src = paths.src + 'js/**/*',
    dest = paths.dest + 'js/',
    js = gulp.src(src)
      .pipe(deporder())
      .pipe(concat('vrembem.js'))
      .pipe(gulp.dest(dest)),
    jsmin = gulp.src(src)
      .pipe(deporder())
      .pipe(concat('vrembem.min.js'))
      .pipe(stripdebug())
      .pipe(uglify())
      .pipe(gulp.dest(dest));

  return merge(js, jsmin);
});

/**
 * Copies icons from Feather Icons with custom classes and SVG sprite
 */
gulp.task('icons', function() {

  var src  = paths.icons + '*.svg';
  var dest = paths.src + 'icons/';

  fs.readdirSync(paths.icons).forEach(icon => {
    icon = path.basename(icon, '.svg');
    var svg = feather.icons[icon].toSvg({
      class: 'icon icon-' + icon
    });
    fs.writeFile(dest + icon + '.svg', svg, function (err) {
      if (err) { console.error(err); }
    });
  });

  return gulp.src( src )
    .pipe(svgSymbols({
      id: 'icon-%f',
      svgClassname: 'svg-symbols',
      templates: ['default-svg']
    }))
    .pipe(gulp.dest( paths.dest + 'icons/' ));

});

/**
 * Build HTML templates
 */
gulp.task('html', function () {

  var src  = paths.src + '*.html';
  var dest = paths.dest + '/';

  return gulp.src(src)
    .pipe(gulpImport(paths.src))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
});

/**
 * Watch all asset files and runs the appropriate build task based on changes
 */
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.src + 'scss/**/*', ['css']);
  gulp.watch(paths.src + 'js/**/*', ['js']);
  gulp.watch(paths.src + 'icons/**/*', ['icons']);
  gulp.watch([paths.src + '*.html', paths.src + 'includes/**/*'], ['html']);
});

/**
 * Default task
 * Builds everything and then initiates the watch task
 */
gulp.task('default', ['css', 'js', 'icons', 'watch']);
