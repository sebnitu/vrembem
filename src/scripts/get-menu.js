import path from 'path'
import { config, paths } from '../config'
import titleCase from './title-case.js'

const menuSort = function(menu, key) {
  return menu.sort(function(a, b) {
    const nameA = a[key].toUpperCase();
    const nameB = b[key].toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
}

const menu = function(pages) {
  const menu = []
  for (var i = 0; i < pages.length; i++) {
    const pageName = pages[i].file.replace(paths.pages, '').replace(config.ext, '')
    const pageBase = path.basename(pageName)
    const pagePath = path.dirname(pageName).replace(pageBase, '')
    const pageType = pagePath.replace('/', '')
    menu.push({
      name: titleCase(pageBase),
      href: path.join(pagePath, pageBase + '.html'),
      type: pageType,
    })
  }

  return menuSort(menu, 'name')
}

export { menu, menuSort }
