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

### `menu_inline_[key]`

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

#### `@mixin menu-inline()`

Output the styles for an inline menu.

**Example**

```scss
.menu_custom {
  @include menu-inline();
}

// CSS Output
.menu_custom {
  flex-direction: row;
  align-items: center;
}

.menu_custom .menu__item + .menu__item {
  margin-top: 0;
  margin-left: 1px;
}

.menu_custom .menu__sep {
  width: 1px;
  height: auto;
  margin: 0 0.5em;
}

.menu_custom .menu__sep:first-child {
  margin-left: 0;
}

.menu_custom .menu__sep:last-child {
  margin-right: 0;
}

.menu_custom .menu__action {
  justify-content: center;
  white-space: nowrap;
}
```

### `menu_full_[key]`

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

#### `@mixin menu-full()`

Output the styles for a full width menu (should be applied to menus that are already inline).

**Example**

```scss
.menu_custom {
  @include menu-full();
}

// CSS Output
.menu_custom .menu__item {
  flex: 1 1 auto;
}

.menu_custom .menu__action {
  justify-content: center;
}
```

### `menu_invert`

A modifier that provides an inversed menu style for better contrast on a dark background.

```html
<ul class="menu menu_invert">
  ...
</ul>
```

### `menu_size_[value]`

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
| `$size`                       | `core.$form-control-size`                      | Sets the minimum size of menu actions using the min-height and min-width properties.                    |
| `$padding`                    | `core.$padding`                                | Sets the padding property.                                                                              |
| `$gap`                        | `1px`                                          | Sets the gap spacing between `menu__item` elements.                                                     |
| `$inner-gap`                  | `1em`                                          | The horizontal gap spacing for elements inside the `menu__action` element.                              |
| `$border-radius`              | `core.$border-radius`                          | Sets the border-radius property.                                                                        |
| `$background`                 | `none`                                         | Sets the background property.                                                                           |
| `$background-hover`           | `rgba(core.$black, 0.06)`                      | Sets the background property on `:hover` state.                                                         |
| `$background-focus`           | `rgba(core.$black, 0.06)`                      | Sets the background property on `:focus` state.                                                         |
| `$background-active`          | `rgba(core.$black, 0.09)`                      | Sets the background property on `:active` state.                                                        |
| `$color`                      | `core.$color`                                  | Sets the color property.                                                                                |
| `$color-hover`                | `null`                                         | Sets the color property on `:hover` state.                                                              |
| `$color-focus`                | `null`                                         | Sets the color property on `:focus` state.                                                              |
| `$color-active`               | `null`                                         | Sets the color property on `:active` state.                                                             |
| `$font-size`                  | `1em`                                          | Sets the font-size property.                                                                            |
| `$line-height`                | `1.5`                                          | Sets the line-height property.                                                                          |
| `$outline-focus`              | `none`                                         | Sets the outline property on `:focus` state.                                                            |
| `$outline-focus-offset`       | `null`                                         | Sets the outline-offset property on `:focus` state.                                                     |
| `$sep-size`                   | `1px`                                          | Sets the size on the `menu__sep` element using height and width properties based on orientation.        |
| `$sep-gap`                    | `0.5em`                                        | Sets the spacing gap created around the `menu__sep` element.                                            |
| `$sep-background`             | `core.$border-color`                           | Sets the background property on the `menu__sep` element.                                                |
| `$active-background`          | `none`                                         | Sets the background property on `is-active` state class.                                                |
| `$active-color`               | `core.$primary`                                | Sets the color property on `is-active` state class.                                                     |
| `$disabled-background`        | `none`                                         | Sets the background property on `is-disabled` state class.                                              |
| `$disabled-color`             | `core.$color-subtle`                           | Sets the color property on `is-disabled` state class.                                                   |
| `$invert-background`          | `null`                                         | Sets the background property of the `menu_invert` modifier.                                             |
| `$invert-background-hover`    | `rgba(core.$white, 0.06)`                      | Sets the background property of the `menu_invert` modifier on `:hover` state.                           |
| `$invert-background-focus`    | `rgba(core.$white, 0.06)`                      | Sets the background property of the `menu_invert` modifier on `:focus` state.                           |
| `$invert-background-active`   | `rgba(core.$white, 0.09)`                      | Sets the background property of the `menu_invert` modifier on `:active` state.                          |
| `$invert-color`               | `core.$white`                                  | Sets the color property of the `menu_invert` modifier.                                                  |
| `$invert-color-hover`         | `null`                                         | Sets the color property of the `menu_invert` modifier on `:hover` state.                                |
| `$invert-color-focus`         | `null`                                         | Sets the color property of the `menu_invert` modifier on `:focus` state.                                |
| `$invert-color-active`        | `null`                                         | Sets the color property of the `menu_invert` modifier on `:active` state.                               |
| `$invert-sep-background`      | `core.$border-color-invert`                    | Sets the background property on the `menu__sep` element of the `menu_invert` modifier.                  |
| `$invert-active-background`   | `none`                                         | Sets the background property on `is-active` state class of the `menu_invert` modifier.                  |
| `$invert-active-color`        | `core.$primary`                                | Sets the color property on `is-active` state class of the `menu_invert` modifier.                       |
| `$invert-disabled-background` | `none`                                         | Sets the background property on `is-disabled` state class of the `menu_invert` modifier.                |
| `$invert-disabled-color`      | `rgba(core.$white, 0.5)`                       | Sets the color property on `is-disabled` state class of the `menu_invert` modifier.                     |
| `$size-sm`                    | `core.$form-control-size-sm`                   | Sets the minimum size of menu actions of the `menu_size_sm` modifier.                                   |
| `$size-sm-padding`            | `core.$padding-sm`                             | Sets the padding property of the `menu_size_sm` modifier.                                               |
| `$size-sm-font-size`          | `core.$font-size-sm`                           | Sets the font-size property of the `menu_size_sm` modifier.                                             |
| `$size-sm-line-height`        | `core.$line-height-sm`                         | Sets the line-height property of the `menu_size_sm` modifier.                                           |
| `$size-lg`                    | `core.$form-control-size-lg`                   | Sets the minimum size of menu actions of the `menu_size_lg` modifier.                                   |
| `$size-lg-padding`            | `core.$padding-lg`                             | Sets the padding property of the `menu_size_lg` modifier.                                               |
| `$size-lg-font-size`          | `core.$font-size-lg`                           | Sets the font-size property of the `menu_size_lg` modifier.                                             |
| `$size-lg-line-height`        | `core.$line-height-lg`                         | Sets the line-height property of the `menu_size_lg` modifier.                                           |

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
