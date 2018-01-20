import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import colors from 'colors'
import ejs from 'ejs'
import markdownIt from 'markdown-it'
import { minify } from 'html-minifier'
import titleCase from './title-case.js'

import { config, paths, markdown } from '../config'

export default function(file, data) {

  const pageName = file.replace(paths.pages, config.key).replace(config.ext, '')
  const pageBase = path.basename(pageName)
  const pagePath = path.dirname(pageName).replace(pageBase, '')
  const pageLayout = pagePath.replace(config.key + '/', '')
  let template

  if (fs.existsSync(path.join(paths.src, 'layouts/' + pageLayout + '.ejs'))) {
    template = fs.readFileSync(path.join(paths.src, 'layouts/' + pageLayout + '.ejs'), 'utf8')
  } else {
    template = fs.readFileSync(path.join(paths.src, 'layouts/blocks.ejs'), 'utf8')
  }

  const content = new markdownIt(markdown).render(data)
  const dirDepth = pagePath.split('/').filter(function(entry) {
    return entry.trim() != ''
  })

  const html = ejs.render(template, {
    baseurl: '../'.repeat(dirDepth.length - 1),
    svgSymbols: fs.readFileSync(path.join(paths.src, 'assets/img/svg-symbols.svg')),
    title: titleCase(pageBase),
    type: titleCase(pageLayout),
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
      console.info('Success:'.green, titleCase(pageBase) + ' page has been created!')
    }
  )
}
