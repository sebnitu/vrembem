import React from 'react'
import classnames from 'classnames'

const Menu = (props) => (
  <ul className={classnames('menu', props.className)}>
    {props.data ? (
      props.data.map((item) =>
        <MenuItem key={item.id} className={'id-' + item.id} href={item.href}>
          {item.title}
        </MenuItem>
      )
    ) : (
      props.children
    )}
  </ul>
)

const MenuItem = (props) => (
  <li className={classnames('menu__item', props.className)}>
    <a className={classnames('menu__link', props.classLinkName)} href={props.href}>
      {props.children}
    </a>
  </li>
)

const MenuSep = (props) => (
  <li className={classnames('menu__sep', props.className)}></li>
)

export { Menu, MenuItem, MenuSep }
