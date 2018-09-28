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
    src: 'src/scss/app.scss',
    dest: 'dist/css/',
    output: 'styles.css',
    search: [
      'src/scss/',
      '../src/scss/',
      '../node_modules/'
    ]
  },
  js: {
    src: 'src/js/app.js',
    dest: 'dist/js/',
    output: 'scripts.js',
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
  feather: {
    src: '../node_modules/feather-icons/dist/icons/',
    dest: '_includes/icon/'
  },
  symbols: {
    src: '_includes/icon/**/*.svg',
    dest: '_includes/svg/',
    output: 'symbols.svg'
  }
}

/**
 * CSS
 */

gulp.task('css:dev', () => {
  const src = paths.scss.src
  const dest = paths.scss.dest
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
  const src = paths.scss.src
  const dest = paths.scss.dest
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
  const src = paths.js.src
  const dest = paths.js.dest
  const b = browserify({
    entries: src,
    paths: paths.js.search,
    debug: true
  }).transform(babel, {
    global: true
  })
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
  const src = paths.js.src
  const dest = paths.js.dest
  const b = browserify({
    entries: src,
    paths: paths.js.search,
    debug: true
  }).transform(babel, {
    global: true
  })
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

gulp.task('js:vendor', () => {
  const src = paths.js.vendors
  const dest = paths.js.dest
  return gulp.src(src)
    .pipe(gulp.dest(dest))
})

gulp.task('js', ['js:dev', 'js:prod', 'js:vendor'])

/**
 * Images, Icons and Symbols
 */

gulp.task('img', () => {
  const src = [paths.img.src]
  const dest = paths.img.dest
  return gulp.src(src)
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(dest))
})

gulp.task('svg', () => {
  const src = [paths.svg.src]
  const dest = paths.svg.dest
  return gulp.src(src)
  .pipe(imagemin([
    imagemin.svgo({
      plugins: [
        { removeViewBox: false }
      ]
    })
    ]))
  .pipe(gulp.dest(dest))
})

gulp.task('icons:feather', () => {

  // Set paths
  const src = paths.feather.src
  const dest = paths.feather.dest

  // Setup our promise and set item processed to 0
  var deferred = Q.defer()
  var itemsProcessed = 0

  // Get our icons array
  var icons = fs.readdirSync(src)

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

gulp.task('icons:symbols', () => {
  const src = paths.symbols.src
  const dest = paths.symbols.dest
  return gulp.src( src )
    .pipe(svgSymbols({
      id: 'icon-%f',
      svgAttrs: {
        class: 'svg-symbols'
      },
      templates: ['default-svg']
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest( dest ))
})

gulp.task('icons', ['icons:feather', 'icons:symbols'])

/**
 * Clean
 */

gulp.task('clean:css', () => {
  return del(paths.scss.dest)
})

gulp.task('clean:js', () => {
  return del(paths.js.dest)
})

gulp.task('clean:img', () => {
  return del(paths.img.dest)
})

gulp.task('clean:svg', () => {
  return del(paths.svg.dest)
})

gulp.task('clean:icons', () => {
  return del(paths.feather.dest)
})

gulp.task('clean', () => {
  return del([
    paths.dest,
    paths.svg.dest,
    paths.feather.dest
  ])
})

/**
 * Build Everything
 */

gulp.task('all', ['css', 'js', 'img', 'icons'])

/**
 * Watch
 */

gulp.task('watch', () => {

  gulp.watch([
    paths.src + 'scss/**/*',
    '../' + paths.src + 'scss/**/*'
  ], ['css'])

  gulp.watch([
    paths.src + 'js/**/*',
    '../' + paths.src + 'js/**/*'
  ], ['js:dev', 'js:prod'])

})
