import fs from 'fs'
import path from 'path'
import glob from 'glob'

import { config, paths } from './config'
import createIndex from './create-index'
import createPage from './create-page'

export default function() {

  // Get all our pages
  const files = glob.sync(path.join(paths.pages, '**/*' + config.ext))

  // Initiate our components array and process counter
  const pages = []
  var itemsProcessed = 0

  // Loop through our files
  files.forEach(function(file) {
    // Read the file
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err

      // Build our file
      createPage(file, data)

      // Push this files data into pages
      pages.push({
        file: file,
        data: data
      })

      // Increment our process counter
      itemsProcessed++
      // Check if we're on the last item
      if(itemsProcessed === files.length) {
        // Build our index file
        createIndex(pages)
      }

    })
  })

}
