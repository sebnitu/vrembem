import path from 'path'
import shell from 'shelljs'
import colors from 'colors'
import copyFeatherIcons from './scripts/copy-feather-icons.js'

const tmp = path.join(__dirname, '../tmp')

copyFeatherIcons(tmp, function() {
  shell.exec('svg-symbols tmp > src/assets/svg-symbols.svg', function() {
    console.log('Created'.green + ' src/assets/svg-symbols.svg')
    shell.exec('rimraf tmp', function() {
      console.log('Removed'.yellow + ' tmp has been removed')
    })
  })
})
