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

#### Disabled

When disabled using the `disabled` attribute, an icon-action will inherit styles to visually appear noninteractive.

```html
<button class="icon-action" disabled>
  <svg role="img" class="icon">
    <!-- SVG markup or link ID goes here... -->
  </svg>
</button>
```

#### Loading

Icon-actions can also have a loading state by adding the `is-loading` state class. This is useful when an icon-action has an action that has a delayed response in order to give users a visual indicator that their action is being processed.

```html
<button class="icon-action is-loading" disabled>
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

| Variable                      | Default                                      | Description                                                                                                                                       |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                                       | String to prefix blocks with.                                                                                                                     |
| `$prefix-element`             | `"__"`                                       | String to prefix elements with.                                                                                                                   |
| `$prefix-modifier`            | `"_"`                                        | String to prefix modifiers with.                                                                                                                  |
| `$prefix-modifier-value`      | `"_"`                                        | String to prefix modifier values with.                                                                                                            |
| `$size`                       | `(core.$font-size * core.$line-height)`      | Sets the width and height properties.                                                                                                             |
| `$transition-property`        | `box-shadow, outline, outline-offset`        | Sets the transition-property property.                                                                                                            |
| `$transition-duration`        | `core.$transition-duration-short`            | Sets the transition-duration property.                                                                                                            |
| `$transition-timing-function` | `core.$transition-timing-function`           | Sets the transition-timing-function property.                                                                                                     |
| `$border-radius`              | `core.$border-radius-circle` &rarr; `9999px` | Sets the border-radius property.                                                                                                                  |
| `$border`                     | null                                         | Sets the border property.                                                                                                                         |
| `$border-color-hover`         | null                                         | Sets the border-color property on `:hover` state.                                                                                                 |
| `$border-color-focus`         | null                                         | Sets the border-color property on `:focus` state.                                                                                                 |
| `$border-color-active`        | null                                         | Sets the border-color property on `:active` state.                                                                                                |
| `$background`                 | `rgba(core.$black, 0.4)`                     | Sets the background property.                                                                                                                     |
| `$background-hover`           | `rgba(core.$black, 0.5)`                     | Sets the background property on `:hover` state.                                                                                                   |
| `$background-focus`           | `rgba(core.$black, 0.5)`                     | Sets the background property on `:focus` state.                                                                                                   |
| `$background-active`          | `rgba(core.$black, 0.6)`                     | Sets the background property on `:active` state.                                                                                                  |
| `$box-shadow`                 | `0 0 0 0 rgba(core.$black, 0)`               | Sets the box-shadow property.                                                                                                                     |
| `$box-shadow-hover`           | `null`                                       | Sets the box-shadow property on `:hover` state.                                                                                                   |
| `$box-shadow-focus`           | `0 0 0 0.2rem rgba(core.$black, 0.2)`        | Sets the box-shadow property on `:focus` state.                                                                                                   |
| `$box-shadow-active`          | `null`                                       | Sets the box-shadow property on `:active` state.                                                                                                  |
| `$color`                      | `core.$color-invert`                         | Sets the color property.                                                                                                                          |
| `$color-hover`                | `null`                                       | Sets the color property on `:hover` state.                                                                                                        |
| `$color-focus`                | `null`                                       | Sets the color property on `:focus` state.                                                                                                        |
| `$color-active`               | `null`                                       | Sets the color property on `:active` state.                                                                                                       |
| `$outline`                    | `none`                                       | Sets the outline property.                                                                                                                        |
| `$outline-hover`              | `null`                                       | Sets the outline property on `:hover` state.                                                                                                      |
| `$outline-focus`              | `null`                                       | Sets the outline property on `:focus` state.                                                                                                      |
| `$outline-active`             | `null`                                       | Sets the outline property on `:active` state.                                                                                                     |
| `$outline-offset`             | `null`                                       | Sets the outline-offset property.                                                                                                                 |
| `$outline-offset-hover`       | `null`                                       | Sets the outline-offset property on `:hover` state.                                                                                               |
| `$outline-offset-focus`       | `null`                                       | Sets the outline-offset property on `:focus` state.                                                                                               |
| `$outline-offset-active`      | `null`                                       | Sets the outline-offset property on `:active` state.                                                                                              |
| `$icon-stroke-width`          | `2.5px`                                      | Sets the stroke-width property on the child `icon` component.                                                                                     |
| `$icon-font-size`             | `core.$font-size-sm`                         | Sets the font-size property on the child `icon` component.                                                                                        |
| `$disabled-opacity`           | `0.6`                                        | Sets the opacity property when disabled attribute is applied.                                                                                     |
| `$loading-size`               | `0.7em`                                      | Sets the size of the loading spinner.                                                                                                             |
| `$loading-animation-duration` | `0.6s`                                       | Sets the animation-duration property of the loading spinner.                                                                                      |
| `$loading-border-color`       | `$color`                                     | Sets the border-color property of the loading spinner.                                                                                            |
| `$loading-border`             | `2px solid`                                  | Sets the border property of the loading spinner.                                                                                                  |
| `$loading-border-tpl`         | `1 1 0 0`                                    | The template for where to apply the border-color property. Takes boolean `1` and `0` values for top, right, bottom and left borders respectively. |
