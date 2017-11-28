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
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer')
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
 * Clean Task
 */
gulp.task('clean', function() {
  return del([
    paths.dest + '**/*',
    paths.src + 'icons/**/*'
  ]);
});

/**
 * Clean CSS Task
 */
gulp.task('clean:css', function() {
  return del(paths.dest + 'css/**/*');
});

/**
 * CSS Task
 */
gulp.task('build:css', ['clean:css'], function() {

  var src = paths.src + 'scss/*.scss';
  var dest = paths.dest + 'css/';

  var css = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
        precision: 3
      })
      .on('error', sass.logError)
    )
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions', '> 2%']
      })
    ]))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dest));

  var cssmin = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
        precision: 3
      })
      .on('error', sass.logError)
    )
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions', '> 2%']
      })
    ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dest));

  return merge(css, cssmin);
});

/**
 * Clean JS Task
 */
gulp.task('clean:js', function() {
  return del(paths.dest + 'js/**/*');
});

/**
 * JS Task
 */
gulp.task('build:js', ['clean:js'], function() {

  var src = paths.src + 'js/**/*';
  var dest = paths.dest + 'js/';

  var js = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(deporder())
    .pipe(concat('vrembem.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dest));

  var jsmin = gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(deporder())
    .pipe(concat('vrembem.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dest));

  return merge(js, jsmin);
});

/**
 * Clean Icons Source Task
 */
gulp.task('clean:icons:src', function() {
  return del(paths.src + 'icons/**/*');
});

/**
 * Icons Source Task
 */
gulp.task('build:icons:src', ['clean:icons:src'], function() {

  var deferred = Q.defer();
  var itemsProcessed = 0;

  var src = paths.icons;
  var dest = paths.src + 'icons/';

  // Create the source directory if it doesn't exist
  if (!fs.existsSync(dest)){
    fs.mkdirSync(dest);
  }

  // Get all the icons
  fs.readdir(src, function(err, icons) {
    if (err) { console.error(err); }

    // Loop through our icons
    icons.forEach(icon => {

      // Get the icon name
      icon = path.basename(icon, '.svg');

      // Get the icon object
      var obj = feather.icons[icon];

      // Set our custom classes
      obj.attrs.class = 'icon icon-' + icon;

      // Convert to SVG
      var svg = obj.toSvg();

      // Write new icons
      fs.writeFile(dest + icon + '.svg', svg, function (err) {
        if (err) { console.error(err); }

        itemsProcessed++;
        if(itemsProcessed === icons.length) {
          deferred.resolve();
        }
      });
    });
  });

  return deferred.promise;

});

/**
 * Clean Icons Source Task
 */
gulp.task('clean:icons:dest', function() {
  return del(paths.dest + 'icons/**/*');
});

/**
 * Icons Symbols Task
 */
gulp.task('build:icons:dest', ['clean:icons:dest'], function() {

  var src = paths.src + 'icons/*.svg';
  var dest = paths.dest + 'icons/';

  var symbols = gulp.src(src)
    .pipe(svgSymbols({
      id: 'icon-%f',
      svgClassname: 'svg-symbols',
      templates: ['default-svg']
    }))
    .pipe(gulp.dest(dest));

  return symbols;

});

/**
 * Icons Task
 */
gulp.task('build:icons', ['build:icons:src', 'build:icons:dest']);

/**
 * Build
 */
 gulp.task('build', ['build:css', 'build:js', 'build:icons']);

/**
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch(paths.src + 'scss/**/*', ['build:css']);
  gulp.watch(paths.src + 'js/**/*', ['build:js']);
  gulp.watch(paths.src + 'icons/**/*', ['build:icons:dest']);
});

/**
 * Default
 */
gulp.task('default', ['build']);
