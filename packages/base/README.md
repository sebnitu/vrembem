# Base

Includes useful default styles and base components for common HTML elements.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fbase.svg)](https://www.npmjs.com/package/%40vrembem%2Fbase)

[Documentation](https://vrembem.com/packages/base)

## Installation

```
npm install @vrembem/base
```

### Styles

```scss
@use "@vrembem/base";
```

### Markup

Once loaded, the base component provides default styles for HTML elements and a number of output modules as well as helpful variables and mixins for customizing the output or how/where these styles are applied.

```html
<!-- Using base element modules -->
<h1 class="h1">...</h1>
<p>...</p>
<ul class="list">
  <li>...</li>
</ul>

<!-- Using base type module -->
<div class="type">
  <h1>...</h1>
  <p>...</p>
  <ul>
    <li>...</li>
  </ul>
</div>
```
