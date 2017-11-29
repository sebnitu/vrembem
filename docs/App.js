import React from 'react'

import Menu from './components/Menu';
import Logo from './components/Logo';

import { Navbar, NavbarContainer, NavbarItem  } from 'vrembem'

const App = () => (
  <Navbar>
    <NavbarContainer>
      <NavbarItem>
        <Logo />
      </NavbarItem>

      <NavbarItem>
        <Menu />
      </NavbarItem>
    </NavbarContainer>
  </Navbar>
)

export default App
