import styled from 'styled-components'

export const Navbar = styled.div`
  padding: 1em 1.5em;
  background: white;
  border-bottom: 1px solid rgba(0,0,0, 0.1);
`

export const NavbarContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 75rem;
  margin: 0 auto;
`

export const NavbarItem = styled.div`
  + * {
    margin-left: 1em;
  }
`

export const NavbarLogo = styled.div`
  font-size: 1.5em;
  color: #303030;
  border: none;
`
