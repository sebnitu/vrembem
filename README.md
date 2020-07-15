# Vrembem

A CSS component library based on the BEM methodology.

[![npm version](https://img.shields.io/npm/v/vrembem.svg)](https://www.npmjs.com/package/vrembem)
[![Build Status](https://travis-ci.org/sebnitu/vrembem.svg?branch=master)](https://travis-ci.org/sebnitu/vrembem)
[![Coverage Status](https://coveralls.io/repos/github/sebnitu/vrembem/badge.svg?branch=master)](https://coveralls.io/github/sebnitu/vrembem?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/sebnitu/vrembem.svg)](https://david-dm.org/sebnitu/vrembem?type=dev)

## About

Vrembem is a front-end CSS component library written with the goal of making available common web interface patterns. This allows developers and designers to implement robust components into their web projects while keeping them flexible and customizable through the use of the [BEM methodology](https://en.bem.info/methodology/) and [Sass CSS extension language](https://sass-lang.com/).

This Vrembem repository is managed as a monorepo that contains all available components. Include all components using the convenient all-in-one [vrembem](./packages/vrembem#readme) package.

## Quick Links

- [Documentation](https://vrembem.com)
- [Components](./packages/)
- [Changelog](./CHANGELOG.md)

## Getting Started

### Using CDN

If you'd like to use Vrembem for prototyping or just want to take it for a test drive, you can leverage the [unpkg](https://unpkg.com/) CDN version of a component or the entire Vrembem library.

#### Entire library

- `https://unpkg.com/vrembem@latest/dist/styles.min.css`
- `https://unpkg.com/vrembem@latest/dist/scripts.min.js`

#### Specific component

- `https://unpkg.com/@vrembem/<COMPONENT>@latest/dist/styles.min.css`
- `https://unpkg.com/@vrembem/<COMPONENT>@latest/dist/scripts.min.js`

*Replace `<COMPONENT>` with the desired component.*

#### Example

Here's an example of using CDN to render a modal component with some added utility classes for basic styles.

```html
<!-- Include Vrembem styles -->
<link rel="stylesheet" href="https://unpkg.com/vrembem@latest/dist/styles.min.css">

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
<script src="https://unpkg.com/vrembem@latest/dist/scripts.min.js"></script>

<!-- Instantiate the component rendered in the document -->
<script>
  const modal = new vrembem.Modal();
  modal.init();
</script>
```

### Using NPM

To use a Vrembem component, you'll first need to install it as a dependency. For this example we'll be using the modal component:

```
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

#### HTML

Include the component's markup into your project. Use the [online docs](https://vrembem.com) for information and code examples such as markup and available modifiers for each component.

```html
<button data-modal-open="[unique-id]">Modal</button>
<div class="modal" data-modal="[unique-id]">
  <div class="modal__dialog">
    <button data-modal-close>Close</button>
    ...
  </div>
</div>
```

#### JavaScript

Some packages also have included scripts for their functionality. You can include these in your JavaScript files by importing, instantiate and initialize:

```js
// Import your component
import { Modal } from "@vrembem/modal"

// Instantiate and initialize
const modal = new Modal()
modal.init()
```

Alternatively, you can use the `autoInit` option to auto initialize and optionally omit saving the instance to a variable if it won't be used later.

```js
new Modal({ autoInit: true })
```

#### All-in-one

It's also possible to include all Vrembem components using the single all-in-one `vrembem` package:

```
npm install vrembem
```

Via your project's Sass manifest file:

```scss
@use "vrembem";
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

## Copyright and License

Vrembem and Vrembem documentation copyright (c) 2020 Sebastian Nitu. Vrembem is released under the [MIT license](https://github.com/sebnitu/vrembem/blob/master/LICENSE) and Vrembem documentation is released under [Creative Commons](https://github.com/sebnitu/vrembem/blob/master/docs/LICENSE).
