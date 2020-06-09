# Vrembem

A complete collection of all Vrembem components into a single comprehensive library for convenience.

[![npm version](https://img.shields.io/npm/v/vrembem.svg)](https://www.npmjs.com/package/vrembem)

[Documentation](https://vrembem.com/packages/vrembem)

## Installation

```
npm install vrembem
```

### Styles

To include all Vrembem components into your styles, just import the vrembem package in your Sass manifest file.

```scss
@use "vrembem";
```

All component variables, functions and mixins are forwarded under their respective namespace and can be customized:

```scss
@use "vrembem" with (
  $button-padding: 1rem 2rem
);
```

Customize core variables which all components inherit from. The example below will prefix all components with a prefix:

```scss
@use "@vrembem/core" with (
  $prefix-block: "vb-"
);
@use "vrembem";
```

### JavaScript

Import and initialize the components you'll need:

```js
// Import all under the vb namespace
import * as vb from "vrembem";
const drawer = new vb.Drawer({ autoInit: true });

// Or import individual components
import { Drawer } from "vrembem";
const drawer = new Drawer({ autoInit: true });
```

> Note that `utility` component does not need to be initialized since it's just a set of helpful utility functions.

### Markup

Include the component's markup into your project. Use the [online documentation](https://vrembem.com) for more information, customization options, code examples and available modifiers.

```html
<div class="drawer__wrapper">
  <aside data-drawer="[unique-id]" class="drawer">
    <div class="drawer__item">
      <button data-drawer-close>...</button>
    </div>
  </aside>
  <div class="drawer__main">
    <button data-drawer-toggle="[unique-id]">...</button>
  </div>
</div>
```
