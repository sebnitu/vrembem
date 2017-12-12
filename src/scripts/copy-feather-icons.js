import fs from 'fs'
import path from 'path'
import colors from 'colors'
import feather from 'feather-icons'

import { config, paths } from '../config'

export default function(loc, callback) {

  if (!fs.existsSync(loc)) {
    fs.mkdirSync(loc)
  }

  for (var key in feather.icons) {
    if (feather.icons.hasOwnProperty(key)) {
      const svg = feather.icons[key].toSvg({
        class: 'icon'
      });
      fs.writeFileSync(loc + '/' + key + '.svg', svg)
      console.log('Copied: '.dim + key + '.svg');
    }
  }

  console.log('Success'.cyan + ' feather-icons finished copying to ' + path.basename(loc));

  callback()
}
