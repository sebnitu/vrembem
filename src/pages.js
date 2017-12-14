import path from 'path'
import colors from 'colors'
import watch from 'node-watch'

import { config, paths } from './config'
import build from './scripts/build'

build()

if (process.argv.includes('--watch')) {
  console.log('Watching...'.yellow);
  watch(
    [paths.pages, paths.src + '/layouts', paths.src + '/partials'],
    { recursive: true }, function(evt, name) {
      console.log('Watch:'.cyan, '"' + path.basename(name) + '"' + ' was ' + evt + 'd')
      build()
    }
  )
}
