import fs from 'fs'
import path from 'path'
import glob from 'glob'

import { config, paths } from './config'
import createIndex from './create-index'
import createPage from './create-page'

export default function() {

  const files = glob.sync(path.join(paths.pages, '**/*' + config.ext))
  const array = []

  for (var i = 0; i < files.length; i++) {
    const data = fs.readFileSync(files[i], 'utf8')
    createPage(files[i], data)
    array.push({
      file: files[i],
      data: data
    })
  }

  createIndex(array)
}
