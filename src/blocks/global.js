import { injectGlobal } from 'styled-components'

injectGlobal`

  html {
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5em;
    color: #303030;
    -webkit-font-smoothing: subpixel-antialiased;
  }

`;
