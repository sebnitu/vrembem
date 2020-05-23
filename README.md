<h1 align="center">
  Vrembem
</h1>

<p align="center">
  A CSS component library based on the BEM methodology.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vrembem">
    <img src="https://img.shields.io/npm/v/vrembem.svg" alt="npm version">
  </a>
  <a href="https://david-dm.org/sebnitu/vrembem?type=dev">
    <img src="https://img.shields.io/david/dev/sebnitu/vrembem.svg" alt="devDependency Status">
  </a>
</p>

## About

Vrembem is a front-end CSS component library written with the goal of making available common web interface patterns. This allows developers and designers to implement robust components into their web projects while keeping them flexible and customizable through the use of the BEM methodology.

## Usage

To use a Vrembem component, you'll first need to install it as a dependency. For this example, we'll be using the menu component:

```shell
npm install @vrembem/menu
```

Next, you'll just need to include the component in your build's Sass manifest file:

```scss
@import "@vrembem/menu";
```

*Vrembem is currently in the process of being converted to [Sass' new module system](https://sass-lang.com/blog/the-module-system-is-launched) where you'll be able to include components using the `@use` and `@forward` features.*

This will include all styles and variables related to the respective component you're installing to use. Make sure to include variable overrides before the import or with the `with` keyword if you're [Sass' module system](https://sass-lang.com/blog/the-module-system-is-launched).

Lastly, you can just include the component's markup into your project. Use the [online docs](https://vrembem.sebnitu.com) if you need examples of markup and available modifiers for each component.

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

Some packages also have included JavaScript components.

It's also possible to include all Vrembem components using the single all-in-one package `vrembem`:

```shell
npm install vrembem
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

*To include all packages in a single dependency, use the [`vrembem`](./packages/vrembem#readme) package directly.*

## Copyright and License

Vrembem and Vrembem documentation copyright (c) 2020 Sebastian Nitu. Vrembem is released under the [MIT license](https://github.com/sebnitu/vrembem/blob/master/LICENSE) and Vrembem documentation is released under [Creative Commons](https://github.com/sebnitu/vrembem/blob/master/docs/LICENSE).
