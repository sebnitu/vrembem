# Menu

Menus represent groups of links, actions or tools that a user can interact with.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fmenu.svg)](https://www.npmjs.com/package/%40vrembem%2Fmenu)

[Documentation](https://vrembem.com/packages/menu)

## Installation

```sh
npm install @vrembem/menu
```

### Styles

```scss
@use "@vrembem/menu";
```

### Markup

The primary elements when composing the `menu` component are `menu__item`'s containing `menu__action`'s. Use the optional `menu__sep` in between `menu__item`'s to create separators.

```html
<ul class="menu">
  <li class="menu__item">
    <button class="menu__action">
      ...
    </button>
  </li>
  <li class="menu__sep"></li>
</ul>
```

For links that only contain an icon, you can use the `menu__action_icon` modifier to create a square link similar to the `button_icon` modifier.

```html
<button class="menu__action menu__action_icon">
  ...
</button>
```

Elements inside the `menu__action` and `menu__text` elements receive appropriate children spacing as long as text nodes are wrapped with `span` elements.

```html
<button class="menu__action">
  <svg class="icon" role="img">
    <!-- Icon markup... -->
  </svg>
  <span>Text node...</span>
</button>
```

#### `is-active`

```html
<button class="menu__action is-active">
  ...
</button>
```

#### `is-disabled`

```html
<button class="menu__action is-disabled">
  ...
</button>
```

## Customization

### Sass Variables

| Variable                 | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| `$prefix-block`          | `null`  | String to prefix blocks with.          |
| `$prefix-element`        | `"__"`  | String to prefix elements with.        |
| `$prefix-modifier`       | `"_"`   | String to prefix modifiers with.       |
| `$prefix-modifier-value` | `"_"`   | String to prefix modifier values with. |
