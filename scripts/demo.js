import path from 'path'
import paths from './paths.config'
import colors from 'colors'
import watch from 'node-watch'
import build from './demo-build'

build()

if (process.argv.includes('--watch')) {
  console.log('Watching...'.yellow);
  watch([paths.src, paths.scripts + '/layouts'], { recursive: true }, function(evt, name) {
    console.log('Watch:'.cyan, '"' + path.basename(name) + '"' + ' was ' + evt + 'd')
    build()
  })
}
