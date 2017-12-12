import fs from 'fs'
import path from 'path'
import ejs from 'ejs'

import { config, paths } from '../config'
import { menu } from './get-menu.js'

export default function(pages) {

  const template = fs.readFileSync(path.join(paths.src, 'layouts/index.ejs'), 'utf8')

  const html = ejs.render(template, {
    baseurl: '',
    svgSymbols: fs.readFileSync(path.join(paths.src, 'assets/svg-symbols.svg')),
    menu: menu(pages)
  }, {
    root: __dirname
  })

  if (!fs.existsSync(config.key)) {
    fs.mkdirSync(config.key)
  }

  fs.writeFile(config.key + '/index.html', html, (err) => {
      if (err) throw err
      console.info('Success:'.green, 'Index page has been created!')
    }
  )

}
