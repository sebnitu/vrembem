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

#### Get the entire libraries styles and scripts

- `https://unpkg.com/vrembem@latest/dist/styles.min.css`
- `https://unpkg.com/vrembem@latest/dist/scripts.min.js`

#### Get a specific component's styles and scripts

- `https://unpkg.com/@vrembem/<COMPONENT>@latest/dist/styles.min.css` - Single component styles
- `https://unpkg.com/@vrembem/<COMPONENT>@latest/dist/scripts.min.js` - Single component scripts

#### Example

```html
<!-- Include Vrembem styles -->
<link rel="stylesheet" href="https://unpkg.com/vrembem@latest/dist/styles.min.css">

<!-- Render a component -->
<button class="link" data-modal-open="modal-default">Open modal</button>
<div data-modal="modal-default" class="modal modal_size_sm" tabindex="-1">
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

To use a Vrembem component, you'll first need to install it as a dependency. For this example we'll be using the `@vrembem/menu` component:

```
npm install @vrembem/menu
```

#### CSS

Include the component in your build's Sass manifest file:

```scss
@use "@vrembem/menu";
```

Vrembem uses [Sass' module system](https://sass-lang.com/blog/the-module-system-is-launched), pass in custom variables using the [`with` keyword](https://sass-lang.com/documentation/at-rules/use#configuration).

```scss
@use "@vrembem/menu" with (
  $background: #efefef,
  $background-hover: #e0e0e0
);
```

#### HTML

Include the component's markup into your project. Use the [online docs](https://vrembem.com) for information and code examples such as markup and available modifiers for each component.

```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="#">
      Create
    </a>
    <a class="menu__link" href="#">
      Update
    </a>
    <a class="menu__link" href="#">
      Delete
    </a>
  </li>
</ul>
```

#### JavaScript

Some packages also have included JavaScript components, such as the `@vrembem/checkbox` package. You can include these in your JavaScript files by importing, creating an instance and initialize:

```js
// Import your component
import { Checkbox } from "@vrembem/checkbox"

// Create an instance
const checkbox = new Checkbox()

// Initialize
checkbox.init()
```

Alternatively, you can use the `autoInit` option to auto initialize and optionally omit saving the instance to a variable if it won't be used later.

```js
new Checkbox({ autoInit: true })
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
