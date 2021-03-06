# Icon-action

A component for displaying simple action buttons using icons.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Ficon-action.svg)](https://www.npmjs.com/package/%40vrembem%2Ficon-action)

[Documentation](https://vrembem.com/packages/icon-action)

## Installation

```sh
npm install @vrembem/icon-action
```

### Styles

```scss
@use "@vrembem/icon-action";
```

### Markup

The icon-action component consists of two parts, the `icon-action` and it's child `icon` component. Because icon-actions only contain an icon as its content, it's important to add an `aria-label` attribute with a label of what the action does for accessibility.

```html
<button class="icon-action" aria-label="Close button">
  <svg role="img" class="icon">
    <!-- SVG markup or link ID goes here... -->
  </svg>
</button>
```

## Modifiers

### `icon-action_invert`

A boolean icon-action modifier that allows icon-actions and their modifiers to provide an inversed version of themselves. Since not all icon-action styles require an inversed variant, this is typically used for when the background context of a button matters. Can be combined with [`icon-action_subtle`](#icon-action_subtle) boolean modifier.

```html
<button class="icon-action icon-action_invert" aria-label="...">
  ...
</button>
```

#### Available Combinations

- `icon-action icon-action_invert`
- `icon-action icon-action_invert icon-action_subtle`

### `icon-action_state_[value]`

Adds styles for changing the look and feel of an icon-action to better reflect the urgency or status of the action.

```html
<button class="icon-action icon-action_state_info" aria-label="...">
  ...
</button>
```

#### Available Variations

- `icon-action_state_info`
- `icon-action_state_success`
- `icon-action_state_caution`
- `icon-action_state_danger`

### `icon-action_subtle`

A boolean icon-action modifier that allows icon-actions and their modifiers to provide a more subtle version of themselves. Can be combined with [`icon-action_invert`](#icon-action_invert) boolean modifier.

```html
<button class="icon-action icon-action_subtle" aria-label="...">
  ...
</button>
```

### Available Combinations

- `icon-action icon-action_subtle`
- `icon-action icon-action_subtle icon-action_invert`

## Customization

### Sass Variables

| Variable                        | Default                                      | Description                                                   |
| ------------------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| `$prefix-block`                 | `null`                                       | String to prefix blocks with.                                 |
| `$prefix-element`               | `"__"`                                       | String to prefix elements with.                               |
| `$prefix-modifier`              | `"_"`                                        | String to prefix modifiers with.                              |
| `$prefix-modifier-value`        | `"_"`                                        | String to prefix modifier values with.                        |
| `$size`                         | `(core.$font-size * core.$line-height)`      | Sets the width and height properties.                         |
| `$border-radius`                | `core.$border-radius-circle` &rarr; `9999px` | Sets the border-radius property.                              |
| `$background`                   | `rgba(core.$black, 0.3)`                     | Sets the background property.                                 |
| `$background-hover`             | `rgba(core.$black, 0.4)`                     | Sets the background property on `:hover` state.               |
| `$background-focus`             | `rgba(core.$black, 0.4)`                     | Sets the background property on `:focus` state.               |
| `$background-active`            | `rgba(core.$black, 0.5)`                     | Sets the background property on `:active` state.              |
| `$outline-focus-visible`        | `rgba(core.$black, 0.4) solid 2px`           | Sets the outline property on `:focus-visible` state.          |
| `$outline-focus-visible-offset` | `2px`                                        | Sets the outline-offset property on `:focus-visible` state.   |
| `$icon-stroke-width`            | `2.5px`                                      | Sets the stroke-width property on the child `icon` component. |
| `$icon-font-size`               | `core.$font-size-sm`                         | Sets the font-size property on the child `icon` component.    |
