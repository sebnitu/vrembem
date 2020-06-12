# Vrembem

A CSS component library based on the BEM methodology.

[![npm version](https://img.shields.io/npm/v/vrembem.svg)](https://www.npmjs.com/package/vrembem)
[![devDependency Status](https://img.shields.io/david/dev/sebnitu/vrembem.svg)](https://david-dm.org/sebnitu/vrembem?type=dev)

## About

Vrembem is a front-end CSS component library written with the goal of making available common web interface patterns. This allows developers and designers to implement robust components into their web projects while keeping them flexible and customizable through the use of the [BEM methodology](https://en.bem.info/methodology/) and [Sass CSS extension language](https://sass-lang.com/).

Vrembem is the passion project of Sebastian Nitu, UI designer and front-end developer. It was created out of the need to reduce repetitive work and allow the focus of unique aspects in a project.

> A full list of available packages can be found either in the [web documentation](https://vrembem.com/) or at the bottom of [this readme](#packages).

## Usage

To use a Vrembem component, you'll first need to install it as a dependency. For this example we'll be using the `@vrembem/menu` component:

```
npm install @vrembem/menu
```

### CSS

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

### HTML

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

### JavaScript

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

### All-in-one

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

## Packages

1. [`arrow`](./packages/arrow#readme)
1. [`base`](./packages/base#readme)
1. [`breadcrumb`](./packages/breadcrumb#readme)
1. [`button`](./packages/button#readme)
1. [`button-group`](./packages/button-group#readme)
1. [`card`](./packages/card#readme)
1. [`checkbox`](./packages/checkbox#readme)
1. [`container`](./packages/container#readme)
1. [`core`](./packages/core#readme)
1. [`dialog`](./packages/dialog#readme)
1. [`dismissible`](./packages/dismissible#readme)
1. [`drawer`](./packages/drawer#readme)
1. [`dropdown`](./packages/dropdown#readme)
1. [`grid`](./packages/grid#readme)
1. [`icon`](./packages/icon#readme)
1. [`icon-action`](./packages/icon-action#readme)
1. [`input`](./packages/input#readme)
1. [`level`](./packages/level#readme)
1. [`media`](./packages/media#readme)
1. [`menu`](./packages/menu#readme)
1. [`modal`](./packages/modal#readme)
1. [`notice`](./packages/notice#readme)
1. [`panel`](./packages/panel#readme)
1. [`radio`](./packages/radio#readme)
1. [`section`](./packages/section#readme)
1. [`span`](./packages/span#readme)
1. [`switch`](./packages/switch#readme)
1. [`table`](./packages/table#readme)
1. [`tooltip`](./packages/tooltip#readme)
1. [`utility`](./packages/utility#readme)
1. [`vrembem`](./packages/vrembem#readme)*

> \* The [`vrembem package`](./packages/vrembem#readme) is a complete collection of all Vrembem components into a single comprehensive package for convenience.

## Copyright and License

Vrembem and Vrembem documentation copyright (c) 2020 Sebastian Nitu. Vrembem is released under the [MIT license](https://github.com/sebnitu/vrembem/blob/master/LICENSE) and Vrembem documentation is released under [Creative Commons](https://github.com/sebnitu/vrembem/blob/master/docs/LICENSE).
