# Vrembem

A complete collection of all Vrembem components into a single comprehensive package for convenience.

[Documentation](https://vrembem.com/packages/vrembem)

## Installation

Via CDN

```html
<!-- Include styles -->
<link rel="stylesheet" href="https://unpkg.com/vrembem/dist/index.css">

<!-- Include scripts -->
<script src="https://unpkg.com/vrembem"></script>

<script>
  // All Vrembem JS modules are loaded into the vrembem namespace
  console.log(vrembem);
</script>
```

Via NPM

```sh
npm install vrembem
```

## Styles

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

Customize core variables which all components inherit from. The example below will prefix all components with `vb-` to help namespace styles:

```scss
@use "vrembem" with (
  $core-prefix-block: "vb-"
);
```

## JavaScript

Import and mount the components you'll need:

```js
// Import all under the vb namespace
import * as vb from 'vrembem';
const drawer = new vb.Drawer();
await drawer.mount();

// Or import individual components
import { Drawer } from 'vrembem';
const drawer = new Drawer();
await drawer.mount();
```

## Markup

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
