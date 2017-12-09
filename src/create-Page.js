import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import colors from 'colors'
import matter from 'gray-matter'
import hljs from 'highlight.js'
import ejs from 'ejs'
import markdownIt from 'markdown-it'
import feather from 'feather-icons'

import { config, paths } from './config'

export default function(file, data) {

  // Import markdown with settings
  const md = new markdownIt({
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="demo__code hljs"><code>' +
                 hljs.highlight(lang, str, true).value +
                 '</code></pre>';
        } catch (__) {}
      }

      return '<pre class="demo__code hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  })

  // Get the frontmatter from file
  const pageData = matter(data)
  // Get the layout template
  const layout = (
    pageData.data.layout ?
      'layouts/' + pageData.data.layout + '.ejs' :
      'layouts/page.ejs'
  )
  const template = fs.readFileSync(path.join(__dirname, layout), 'utf8')
  // Render the markdown content
  const content = md.render(pageData.content)

  // Build our new pageName
  const pageName = file.replace(paths.pages, config.key).replace(config.ext, '')
  const pageBase = path.basename(pageName)
  const pagePath = path.dirname(pageName).replace(pageBase, '')

  // Get our directory depth
  const dirDepth = pagePath.split('/').filter(function(entry) {
    return entry.trim() != '';
  });

  // Set page title if one doesn't exist
  pageData.data.title = (pageData.data.title ? pageData.data.title : pageBase)

  // Add icons
  const icons = {
    arrowLeft: feather.icons['arrow-left'].toSvg({ class: 'icon'}),
    github: feather.icons['github'].toSvg({ class: 'icon',})
  }

  // Render ejs template
  const html = ejs.render(template, {
    page: pageData.data,
    site: {
      baseurl: '../'.repeat(dirDepth.length - 1)
    },
    icons: icons,
    content: content
  })

  // Create our directories
  shell.mkdir('-p', pagePath)

  // Write the file
  fs.writeFile( path.join(pagePath, pageBase + '.html'), html, (err) => {
      if (err) throw err
      console.info('Success:'.green, 'Page has been created!')
    }
  )
}
