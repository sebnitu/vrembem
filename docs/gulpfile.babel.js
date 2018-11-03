import gulp from 'gulp'

import styles, { styles_watch, styles_clean } from './tasks/styles'
import scripts, { scripts_watch, scripts_clean } from './tasks/scripts'
import { img, img_clean } from './tasks/img'
import { svg, svg_clean } from './tasks/svg'
import { symbols, symbols_clean } from './tasks/symbols'
import feather, { feather_copy, feather_clean } from './tasks/feather'

const clean = gulp.parallel(
  styles_clean,
  scripts_clean,
  img_clean,
  svg_clean,
  symbols_clean,
  feather_clean
)

const watch = gulp.parallel(
  styles_watch,
  scripts_watch
)

const build = gulp.parallel(
  styles,
  scripts,
  img,
  svg,
  gulp.series (
    feather,
    symbols
  )
)

export {
  styles,
  styles_clean,
  scripts,
  scripts_clean,
  img,
  img_clean,
  svg,
  svg_clean,
  symbols,
  symbols_clean,
  feather,
  feather_clean,
  feather_copy,
  clean,
  watch
}

export default build
