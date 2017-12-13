import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import colors from 'colors'
import ejs from 'ejs'
import markdownIt from 'markdown-it'
import { minify } from 'html-minifier'

import { config, paths, markdown } from '../config'

export default function(file, data) {

  const pageName = file.replace(paths.pages, config.key).replace(config.ext, '')
  const pageBase = path.basename(pageName)
  const pagePath = path.dirname(pageName).replace(pageBase, '')

  const template = fs.readFileSync(path.join(paths.src, 'layouts/page.ejs'), 'utf8')
  const content = new markdownIt(markdown).render(data)
  const dirDepth = pagePath.split('/').filter(function(entry) {
    return entry.trim() != '';
  });
  const html = ejs.render(template, {
    baseurl: '../'.repeat(dirDepth.length - 1),
    svgSymbols: fs.readFileSync(path.join(paths.src, 'assets/svg-symbols.svg')),
    title: pageBase.charAt(0).toUpperCase() + pageBase.slice(1),
    content: content
  }, {
    root: paths.src
  })
  const miniHtml = minify(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true
  })

  // Create our directories
  shell.mkdir('-p', pagePath)

  // Write the file
  fs.writeFile( path.join(pagePath, pageBase + '.html'), miniHtml, (err) => {
      if (err) throw err
      console.info('Success:'.green, 'Page has been created!')
    }
  )
}
