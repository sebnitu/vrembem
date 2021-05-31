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

The menu component is composed of at minimum three parts: `menu`, `menu__item` and `menu__action`. The menu and menu items should be a `<ul>` and list items `<li>` respectively while the menu action can be either an `<a>` or `<button>` element. Also available is the optional `menu__sep` element to create separators in between menu items.

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

Use the `menu__text` element to wrap text inside the `menu__action` element. Additional elements inside the menu action receive appropriate spacing.

```html
<button class="menu__action">
  <span>...</span>
  <span class="menu__text">...</span>
  <span>...</span>
</button>
```

For links that only contain an icon, you can use the `menu__action_icon` element modifier to create a square link similar to the `button_icon` modifier.

```html
<button class="menu__action menu__action_icon">
  ...
</button>
```

#### is-active

Adding the `is-active` class will provide visual indication that the action is currently in an active state.

```html
<button class="menu__action is-active" disabled>
  ...
</button>
```

#### is-disabled

Adding the boolean `disabled` attribute or `is-disabled` class will provide visual indication that the user should not be able to interact with the action.

```html
<button class="menu__action is-disabled" disabled>
  ...
</button>
```

## Modifiers

### menu_inline_[key]

Used to apply horizontal menu styles. This is typically used for short menus or toolbars where vertical space can be saved.

```html
<ul class="menu menu_inline">...</ul>
```

To set a menu to inline **above** a specific breakpoint, use the inline breakpoint modifier: `menu_inline_[key]`

```html
<ul class="menu menu_inline_lg">...</ul>
```

#### Available Variations

- `menu_inline_xl`
- `menu_inline_lg`
- `menu_inline_md`
- `menu_inline_sm`
- `menu_inline_xs`

### menu_full_[key]

Used to span a horizontal menu to fill the full width of its container. This modifier is meant to be paired with the `menu_inline` modifier as the default styles of a vertical menu already fill the full width of their container.

```html
<ul class="menu menu_inline menu_full">...</ul>
```

To set a menu to full **below** a specific breakpoint, use the full breakpoint modifier: `menu_full_[key]`

```html
<ul class="menu menu_inline menu_full_lg">...</ul>
```

#### Available Variations

- `menu_full_xl`
- `menu_full_lg`
- `menu_full_md`
- `menu_full_sm`
- `menu_full_xs`

### menu_invert

A modifier that provides an inversed menu style for better contrast on a dark background.

```html
<ul class="menu menu_invert">
  ...
</ul>
```

### menu_size_[value]

Adjust the size of a menu by increasing or decreasing its padding and font-size. By default, the menu scale will provide an action height of 30px (small `menu_size_sm`), 40px (default) and 50px (large `menu_size_lg`).

```html
<ul class="menu menu_size_sm">
  ...
</ul>

<ul class="menu menu_size_lg">
  ...
</ul>
```

#### Available Variations

- `menu_size_sm`
- `menu_size_lg`

## Customization

### Sass Variables

| Variable                      | Default                                        | Description                                                                                             |
| ----------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                                         | String to prefix blocks with.                                                                           |
| `$prefix-element`             | `"__"`                                         | String to prefix elements with.                                                                         |
| `$prefix-modifier`            | `"_"`                                          | String to prefix modifiers with.                                                                        |
| `$prefix-modifier-value`      | `"_"`                                          | String to prefix modifier values with.                                                                  |
| `$breakpoints`                | [`core.$breakpoints` Ref &darr;](#breakpoints) | The breakpoints map the `menu_inline_[key]` and `menu_full_[key]` modifiers uses to build their styles. |
| `$size`                       | `core.$form-control-size`                      | ...                                                                                                     |
| `$gap`                        | `1px`                                          | ...                                                                                                     |
| `$padding`                    | `core.$padding`                                | ...                                                                                                     |
| `$inner-gap`                  | `1em`                                          | ...                                                                                                     |
| `$font-size`                  | `1em`                                          | ...                                                                                                     |
| `$line-height`                | `1.5`                                          | ...                                                                                                     |
| `$border-radius`              | `core.$border-radius`                          | ...                                                                                                     |
| `$background`                 | `none`                                         | ...                                                                                                     |
| `$background-hover`           | `rgba(core.$black, 0.06)`                      | ...                                                                                                     |
| `$background-focus`           | `rgba(core.$black, 0.09)`                      | ...                                                                                                     |
| `$background-active`          | `rgba(core.$black, 0.12)`                      | ...                                                                                                     |
| `$color`                      | `core.$color`                                  | ...                                                                                                     |
| `$color-hover`                | `null`                                         | ...                                                                                                     |
| `$color-focus`                | `null`                                         | ...                                                                                                     |
| `$color-active`               | `null`                                         | ...                                                                                                     |
| `$sep-size`                   | `1px`                                          | ...                                                                                                     |
| `$sep-gap`                    | `0.5em`                                        | ...                                                                                                     |
| `$sep-background`             | `core.$border-color`                           | ...                                                                                                     |
| `$outline-focus`              | `none`                                         | ...                                                                                                     |
| `$outline-focus-offset`       | `null`                                         | ...                                                                                                     |
| `$active-background`          | `none`                                         | ...                                                                                                     |
| `$active-color`               | `core.$primary`                                | ...                                                                                                     |
| `$disabled-background`        | `none`                                         | ...                                                                                                     |
| `$disabled-color`             | `core.$color-subtle`                           | ...                                                                                                     |
| `$invert-background`          | `null`                                         | ...                                                                                                     |
| `$invert-background-hover`    | `rgba(core.$white, 0.06)`                      | ...                                                                                                     |
| `$invert-background-focus`    | `rgba(core.$white, 0.09)`                      | ...                                                                                                     |
| `$invert-background-active`   | `rgba(core.$white, 0.12)`                      | ...                                                                                                     |
| `$invert-color`               | `core.$white`                                  | ...                                                                                                     |
| `$invert-color-hover`         | `null`                                         | ...                                                                                                     |
| `$invert-color-focus`         | `null`                                         | ...                                                                                                     |
| `$invert-color-active`        | `null`                                         | ...                                                                                                     |
| `$invert-sep-background`      | `core.$border-color-invert`                    | ...                                                                                                     |
| `$invert-active-background`   | `none`                                         | ...                                                                                                     |
| `$invert-active-color`        | `core.$primary`                                | ...                                                                                                     |
| `$invert-disabled-background` | `none`                                         | ...                                                                                                     |
| `$invert-disabled-color`      | `rgba(core.$white, 0.5)`                       | ...                                                                                                     |
| `$size-sm`                    | `core.$form-control-size-sm`                   | ...                                                                                                     |
| `$size-sm-padding`            | `core.$padding-sm`                             | ...                                                                                                     |
| `$size-sm-font-size`          | `core.$font-size-sm`                           | ...                                                                                                     |
| `$size-sm-line-height`        | `core.$line-height-sm`                         | ...                                                                                                     |
| `$size-lg`                    | `core.$form-control-size-lg`                   | ...                                                                                                     |
| `$size-lg-padding`            | `core.$padding-lg`                             | ...                                                                                                     |
| `$size-lg-font-size`          | `core.$font-size-lg`                           | ...                                                                                                     |
| `$size-lg-line-height`        | `core.$line-height-lg`                         | ...                                                                                                     |

### $breakpoints

The breakpoints map the `menu_inline_[key]` and `menu_full_[key]` modifiers uses to build their styles.

```scss
// Inherited from: core.$breakpoints
$breakpoints: (
  "xs": 480px,
  "sm": 620px,
  "md": 760px,
  "lg": 990px,
  "xl": 1380px
) !default;
```
