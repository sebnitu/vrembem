import fs from 'fs'
import path from 'path'
import paths from './paths.config'

import matter from 'gray-matter'
import ejs from 'ejs'

// Default function export
export default function(pages) {

  // Initiate our menu array and process counter
  const menu = []
  var itemsProcessed = 0

  pages.forEach(function(page) {

    // Process our menu items here and push them into the menu array
    const pageData = matter(page.data)
    const pageName = page.file.replace(paths.src, '').replace('.demo.md', '')
    const pageBase = path.basename(pageName)
    const pagePath = path.dirname(pageName).replace(pageBase, '')

    // Push page values in our menu
    menu.push({
      text: (pageData.data.title ? pageData.data.title : pageBase),
      desc: (pageData.data.desc ? pageData.data.desc : null),
      icon: (pageData.data.icon ? pageData.data.icon : null),
      href: pagePath + pageBase + '.html'
    })

    // Increment our process counter
    itemsProcessed++
    // Check if we're on the last item
    if(itemsProcessed === pages.length) {

      // Get our layout template
      const template = fs.readFileSync(path.join(__dirname, 'layouts/index.ejs'), 'utf8')

      const html = ejs.render(template, {
        site: {
          menu: menu,
          baseurl: ''
        }
      })

      // Create demo dir if it doesn't exist
      if (!fs.existsSync('demo')) {
        fs.mkdirSync('demo')
      }

      // Write the file
      fs.writeFile('demo/index.html', html, (err) => {
          if (err) throw err
          console.info('Success:'.green, 'Demo index has been built!')
        }
      )
    }
  })
}
