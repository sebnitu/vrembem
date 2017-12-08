import fs from 'fs'
import path from 'path'
import paths from './paths.config'
import glob from 'glob'

// Import our build file module
import createPage from './_createPage'
import createIndex from './_createIndex'

// Initiate our export function
export default function() {

  // Get all our demo files
  const filesGlob = path.join(paths.src, '**/*.demo.md')
  const files = glob.sync(filesGlob)

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
