import styled from 'styled-components'

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: 1em;
  list-style: none;
`

export const MenuItem = styled.li`
  margin: 0;

  + * {
    margin-left: 0.5em;
  }
`

export const MenuSep = styled.li`
  align-self: stretch;
  margin: 0 1em;
  border-right: 1px solid rgba(0,0,0, 0.1);
`

export const MenuLink = styled.a`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  padding: 0.375em 0.75em;
  color: #303030;
  white-space: nowrap;
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 3px;

  &:hover,
  &:focus {
    outline: none;
    color: #303030;
    background: rgba(0,0,0, 0.05);
    border-color: transparent;
  }
`