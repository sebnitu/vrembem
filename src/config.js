import path from 'path'
import hljs from 'highlight.js'

const config = {
  key: 'demo',
  ext: '.md'
}

const paths = {
  root: path.resolve(__dirname, '../'),
  src:  path.resolve(__dirname, '../', 'src'),
  dest: path.resolve(__dirname, '../', 'demo'),
  pages: path.resolve(__dirname, '../', 'src/pages')
}

const markdown = {
  html: true,
  highlight: function (str, lang) {
    const open = '<pre class="hljs"><code>'
    const close = '</code></pre>'
    if (lang && hljs.getLanguage(lang)) {
      try {
        return open + hljs.highlight(lang, str, true).value + close
      } catch (__) {}
    }
    return open + md.utils.escapeHtml(str) + close
  }
}

export { config, paths, markdown }
