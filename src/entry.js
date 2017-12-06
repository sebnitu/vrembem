import React from 'react'
import ReactDOM from 'react-dom'

import './scss/vrembem.scss'
import './styles.scss'

import Layout from './blocks/Layout'

const App = () => (
  <Layout />
)

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
