import React from 'react'

import Navbar from './Navbar'
import Aside from './Aside'
import Content from './Content'

const Layout = () => (
  <div className="page">
    <Navbar className="page__header" />
    <div className="page__main">
      <Aside className="page__aside" />
      <Content className="page__content" />
    </div>
  </div>
)

export default Layout