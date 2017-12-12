import fs from 'fs'
import path from 'path'
import feather from 'feather-icons'

import { config, paths } from '../src/config'

const tmp = path.join(__dirname, '../tmp')

if (!fs.existsSync(tmp)) {
  fs.mkdirSync(tmp)
}

for (var key in feather.icons) {
  if (feather.icons.hasOwnProperty(key)) {
    const svg = feather.icons[key].toSvg({
      class: 'icon'
    });
    fs.writeFileSync(tmp + '/' + key + '.svg', svg)
  }
}
