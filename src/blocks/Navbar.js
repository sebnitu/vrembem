import React from 'react'
import classnames from 'classnames'
import Package from './Package'

import { Menu, MenuItem } from './Menu'

const Navbar = (props) => (
  <div className={classnames('navbar', props.className)}>
    <div className="navbar__item">
      <span className="navbar__title">{Package.title}</span>
      <span className="text_subtle">{Package.version}</span>
    </div>
    <div className="navbar__item">
      <Menu>
        <MenuItem href={Package.repository.url}>GitHub</MenuItem>
      </Menu>
    </div>
  </div>
)

export default Navbar
