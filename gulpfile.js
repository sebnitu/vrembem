// Base Packages
var
  fs = require('fs'),
  path = require('path'),
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  merge = require('merge-stream')
;

// CSS Processing Packages
var
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano')
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
  icons: 'node_modules/feather-icons/dist/icons/'
};

/**
 * CSS Task
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
      .pipe(uglify())
      .pipe(gulp.dest(dest));

  return merge(js, jsmin);
});

/**
 * Icons Task
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
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch(paths.src + 'scss/**/*', ['css']);
  gulp.watch(paths.src + 'js/**/*', ['js']);
  gulp.watch(paths.src + 'icons/**/*', ['icons']);
});

/**
 * Default
 */
gulp.task('default', ['css', 'js', 'icons', 'watch']);
