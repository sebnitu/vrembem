import React from 'react'
import classnames from 'classnames'

import { Menu, MenuItem, MenuSep } from './Menu'

const Aside = (props) => (
  <aside className={classnames(props.className)}>
    <Menu className="menu_stack" data={pages} />
  </aside>
)

const pages = [
  {
    id: 1,
    title: 'Blocks',
    href: '#'
  },
  {
    id: 2,
    title: 'Core',
    href: '#'
  },
  {
    id: 3,
    title: 'Globals',
    href: '#'
  },
  {
    id: 4,
    title: 'Tags',
    href: '#'
  },
  {
    id: 5,
    title: 'Imports',
    href: '#'
  }
]

export default Aside