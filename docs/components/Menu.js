import React from 'react';

import { Menu, MenuItem, MenuSep, MenuLink  } from 'vrembem'

export default class Contact extends React.Component {
  render() {
    return (
      <Menu>
        <MenuItem>
          <MenuLink>Home</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink>About</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink>Blog</MenuLink>
        </MenuItem>
        <MenuSep />
        <MenuItem>
          <MenuLink>GitHub</MenuLink>
        </MenuItem>
      </Menu>
    );
  }
}
