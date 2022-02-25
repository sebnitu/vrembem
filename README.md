# Vrembem

A component library based on the BEM methodology.

[![NPM Version](https://img.shields.io/npm/v/vrembem.svg)](https://www.npmjs.com/package/vrembem)
[![Build Status](https://github.com/sebnitu/vrembem/actions/workflows/build.yml/badge.svg)](https://github.com/sebnitu/vrembem/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/sebnitu/vrembem/badge.svg?branch=main)](https://coveralls.io/github/sebnitu/vrembem?branch=main)

## About

Vrembem is a front-end component library written to make available common web interface patterns. This allows developers and designers to implement robust components into their web projects while keeping them flexible and customizable through the use of the [BEM methodology](https://en.bem.info/methodology/) and [Sass CSS extension language](https://sass-lang.com/).

This Vrembem repository is managed as a monorepo that contains all available components. Include all components using the convenient all-in-one [vrembem](./packages/vrembem#readme) package.

## Quick Links

- [Documentation](https://vrembem.com)
- [Components](./packages/)
- [Changelog](./CHANGELOG.md)

## Getting Started

### Using CDN

If you'd like to use Vrembem for prototyping or just want to take it for a test drive, you can leverage the [unpkg](https://unpkg.com/) CDN version of a component or the entire Vrembem library.

```html
<!-- Include Vrembem styles -->
<link rel="stylesheet" href="https://unpkg.com/vrembem/dist/styles.css">

<!-- Render a component -->
<button class="link" data-modal-open="modal-id">Open modal</button>
<div data-modal="modal-id" class="modal modal_size_sm" tabindex="-1">
  <div class="modal__dialog padding background-white radius spacing">
    <div class="flex flex-justify-between">
      <p>Hello, world!</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>

<!-- Include Vrembem JavaScript -->
<script src="https://unpkg.com/vrembem"></script>

<!-- Instantiate the component rendered in the document -->
<script>
  const modal = new vrembem.Modal();
  modal.init();
</script>
```

Also see [`example.html`](./example.html) for a more comprehensive working demo of using Vrembem via CDN.

#### CDN References

Vrembem packages all bundles in two areas, `dist` contains all compressed production ready bundles and `dev` contains uncompressed versions (all using the same file names). Components that ship with JavaScript include 4 bundles:

| Type       | Extension    | Description                                                                                                                                                                                                                     |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __UMD__    | `.umd.js`    | Universal Module Definition bundles that can be used directly in the browser via a `<script>` tag. This is the default file from `pkg.unpkg` pointing to `scripts.umd.js`.                                                      |
| __ESM__    | `.esm.js`    | ES Module bundles that are intended for use with modern bundlers like [Webpack 2](https://webpack.js.org/) or [Rollup](http://rollupjs.org/guide/en/). This is the default file from `pkg.module` pointing to `scripts.esm.js`. |
| __CJS__    | `.js`        | CommonJS bundles that are intended for older bundlers like [Browserify](http://browserify.org/) or [Webpack 1](https://webpack.github.io/). This is the default file from `pkg.main` pointing to `scripts.js`.                  |
| __Modern__ | `.modern.js` | Modern bundles specially designed to work in all modern browsers. Specifically compiles down to browsers that support `<script type="module">` which are smaller and faster to execute than the `esm` bundle.                   |

#### CDN Link Format

```html
# Styles
Uncompressed: https://unpkg.com/[COMPONENT]/dev/styles.css
Compressed:   https://unpkg.com/[COMPONENT]/dist/styles.css

# Scripts
Uncompressed: https://unpkg.com/[COMPONENT]/dev/scripts.umd.js
Compressed:   https://unpkg.com/[COMPONENT]/dist/scripts.umd.js
```

For example, if you wanted to include the styles and scripts for the `@vrembem/drawer` component, you could use the following link and script tags:

```html
<!-- Component specific styles (expanded or compressed) -->
<link rel="stylesheet" href="https://unpkg.com/@vrembem/drawer/dev/styles.css">
<link rel="stylesheet" href="https://unpkg.com/@vrembem/drawer/dist/styles.css">

<!-- Component specific scripts -->
<script src="https://unpkg.com/@vrembem/drawer/dev/scripts.umd.js"></script>
<script src="https://unpkg.com/@vrembem/drawer/dist/scripts.umd.js"></script>

<!-- A modern bundle specially designed to work in all modern browsers with UMD fallback -->
<script type="module" src="https://unpkg.com/@vrembem/drawer/dist/scripts.modern.js"></script>
<script nomodule src="https://unpkg.com/@vrembem/drawer/dist/scripts.umd.js"></script>
```

### Using NPM

To use a Vrembem component, you'll first need to install it as a dependency. For this example we'll be using the modal component:

```sh
npm install @vrembem/modal
```

#### CSS

Include the component in your build's Sass manifest file:

```scss
@use "@vrembem/modal";
```

Vrembem uses [Sass' module system](https://sass-lang.com/blog/the-module-system-is-launched), pass in custom variables using the [`with` keyword](https://sass-lang.com/documentation/at-rules/use#configuration).

```scss
@use "@vrembem/modal" with (
  $background: #fff,
  $background-alpha: 0.9
);
```

#### JavaScript

Some packages also have included modules for their functionality. You can include these in your JavaScript files by importing, instantiate and initialize:

```js
// Import your component
import Modal from "@vrembem/modal";

// Instantiate and initialize
const modal = new Modal();
modal.init();
```

Alternatively, you can use the `autoInit` option to auto initialize and optionally omit saving the instance to a variable if the returned API won't be needed later.

```js
new Modal({ autoInit: true });
```

#### HTML

Include the component's markup into your project. Use the [online docs](https://vrembem.com) for information and code examples such as markup and available modifiers for each component.

```html
<button data-modal-open="[unique-id]">Modal</button>
<div data-modal="[unique-id]" class="modal">
  <div data-modal-dialog class="modal__dialog">
    <button data-modal-close>Close</button>
    ...
  </div>
</div>
```

#### All-in-one

It's also possible to include all Vrembem components using the single all-in-one `vrembem` package:

```sh
npm install vrembem
```

Via your project's Sass manifest file:

```scss
@use "vrembem";
```

Override default variables using Sass' module system and the `with` keyword. Variables are prefixed by their component name. You can also customize core variables which all components inherit from using the `$core-` prefix.

```scss
@use "vrembem" with (
  $core-prefix-block: "vb-",
  $modal-background: #fff,
  $modal-background-alpha: 0.9
);
```

Via your project's JavaScript manifest file:

```js
// Import all under the vb namespace
import * as vb from "vrembem";
const drawer = new vb.Drawer({ autoInit: true });

// Or import individual components
import { Drawer } from "vrembem";
const drawer = new Drawer({ autoInit: true });
```

> Note that `core` helpers do not need to be initialized since they're just a set of helpful utility functions.

## Copyright and License

Vrembem and Vrembem documentation copyright (c) 2022 Sebastian Nitu. Vrembem is released under the [MIT license](https://github.com/sebnitu/vrembem/blob/main/LICENSE) and Vrembem documentation is released under [Creative Commons](https://github.com/sebnitu/vrembem/blob/main/docs/LICENSE).
