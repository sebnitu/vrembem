import path from 'path'
import { config, paths } from '../config'

const menuName = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

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
    menu.push({
      name: menuName(pageBase),
      href: path.join(pagePath, pageBase + '.html')
    })
  }

  return menuSort(menu, 'name')
}

export { menu, menuName, menuSort }
