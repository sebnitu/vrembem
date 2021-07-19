# Button

Buttons are a simple component that allow users to take actions.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fbutton.svg)](https://www.npmjs.com/package/%40vrembem%2Fbutton)

[Documentation](https://vrembem.com/packages/button)

## Installation

```sh
npm install @vrembem/button
```

### Styles

```scss
@use "@vrembem/button";
```

### Markup

The most basic implementation of the button component consists of the `button` class that can be applied to `<button>`, `<a role="button">` or `<input>` elements with a type attribute of "button", "submit" or "reset". [Remember to add `role="button"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) to any none semantic buttons as needed.

```html
<button class="button">Button</button>
<a class="button" role="button">Anchor</a>
<input class="button" type="button" value="Input">
<input class="button" type="submit" value="Submit">
<input class="button" type="reset" value="Reset">
```

Elements within a button are centered vertically and spaced accordingly using the value set in `$gap` (defaults to `0.5em`). When elements are added inside a button, the button's text should also be wrapped in a `<span>` so that it can be spaced properly.

```html
<button class="button">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
  <span>Button</span>
  <span class="arrow"></span>
</button>
```

#### Disabled

When disabled using the `disabled` attribute, a button will inherit styles to visually appear noninteractive.

```html
<button class="button" disabled>Button</button>
```

#### Loading

Buttons can also have a loading state by adding the `is-loading` state class. This is useful when a button has an action that has a delayed response in order to give users a visual indicator that their action is being processed.

```html
<button class="button is-loading" disabled>Button</button>
```

> Warning: the `is-loading` state class will not work on `<input type="button">` buttons since it uses the `::after` pseudo-element to display the loading spinner.

## Modifiers

### `button_block_[key]`

Gives a button "block" styles so that it spans the full width of its container. Values and class keys are generated using the [`$breakpoints`](#breakpoints) map. Omitting the key value from the modifier (e.g. `button_block`) will apply block styles under all conditions.

```html
<button class="button button_block_sm">Button</button>
```

#### Available Variations

- `button_block`
- `button_block_xs`
- `button_block_sm`
- `button_block_md`
- `button_block_lg`
- `button_block_xl`

### `button_color_[value]`

Adds styles for changing the look and feel of a button. These are usually done with different background and text colors.

```html
<button class="button button_color_primary">Button</button>
<button class="button button_color_secondary">Button</button>
```

#### Available Variations

- `button_color_primary`
- `button_color_secondary`

### `button_icon`

Adds styles that make icon-only buttons more balanced and will appear square if the icon used also has equal width and height.

```html
<button class="button button_icon">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
</button>
```

### `button_invert`

A boolean button modifier that allows buttons and their modifiers to provide an inversed version of themselves. Since not all button styles require an inversed variant, this is typically used for when the background context of a button matters. Can be combined with [`button_subtle`](#button_subtle) boolean modifier.

```html
<button class="button button_invert">Button</button>
<button class="button button_invert button_subtle">Button</button>
```

#### Available Combinations

- `button button_invert`
- `button button_invert button_subtle`

### `button_size_[value]`

Adjust the size of a button by increasing or decreasing its padding and font-size. By default, the button scale will provide a button height of 30px (small `button_size_sm`), 40px (default) and 50px (large `button_size_lg`).

```html
<button class="button button_size_sm">Button</button>
<button class="button button_size_lg">Button</button>
```

#### Available Variations

- `button_size_sm`
- `button_size_lg`

## button_state_[value]

Adds styles for changing the look and feel of a button to better reflect the urgency or status.

```html
<button class="button button_state_info">Button</button>
<button class="button button_state_success">Button</button>
<button class="button button_state_caution">Button</button>
<button class="button button_state_danger">Button</button>
```

### Available Variations

- `button_state_info`
- `button_state_success`
- `button_state_caution`
- `button_state_danger`

## button_subtle

A boolean button modifier that allows buttons and their modifiers to provide a more subtle version of themselves. Can be combined with [`button_invert`](#button_invert) boolean modifier.

```html
<button class="button button_subtle">Default Subtle</button>
<button class="button button_subtle button_invert">Subtle Invert</button>
```

### Available Combinations

- `button button_subtle`
- `button button_subtle button_invert`

## Customization

### Sass Variables

| Variable                      | Default                                        | Description                                                                                                                                       |
| ----------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                                         | String to prefix blocks with.                                                                                                                     |
| `$prefix-element`             | `"__"`                                         | String to prefix elements with.                                                                                                                   |
| `$prefix-modifier`            | `"_"`                                          | String to prefix modifiers with.                                                                                                                  |
| `$prefix-modifier-value`      | `"_"`                                          | String to prefix modifier values with.                                                                                                            |
| `$breakpoints`                | [`core.$breakpoints` Ref &darr;](#breakpoints) | The breakpoints map the `button_block_[key]` modifier uses to build its styles.                                                                   |
| `$size`                       | `core.$form-control-size`                      | Sets the minimum size of a button using the min-height and min-width properties.                                                                  |
| `$padding`                    | `calc(0.5em - 1px) 1em`                        | Sets the padding property.                                                                                                                        |
| `$gap`                        | `0.5rem`                                       | The default horizontal gap spacing for elements inside the button component.                                                                      |
| `$transition-property`        | `box-shadow, outline, outline-offset`          | Sets the transition-property property.                                                                                                            |
| `$transition-duration`        | `core.$transition-duration-short`              | Sets the transition-duration property.                                                                                                            |
| `$transition-timing-function` | `core.$transition-timing-function`             | Sets the transition-timing-function property.                                                                                                     |
| `$border-radius`              | `core.$border-radius` &rarr; `4px`             | Sets the border-radius property.                                                                                                                  |
| `$font-size`                  | `1em`                                          | Sets the font-size property.                                                                                                                      |
| `$font-weight`                | `inherit`                                      | Sets the font-weight property.                                                                                                                    |
| `$line-height`                | `core.$line-height` &rarr; `1.5`               | Sets the line-height property.                                                                                                                    |
| `$border`                     | `1px solid core.$border-color-dark`            | Sets the border property.                                                                                                                         |
| `$border-color-hover`         | `core.$border-color-darker`                    | Sets the border-color property on `:hover` state.                                                                                                 |
| `$border-color-focus`         | `core.$border-color-darker`                    | Sets the border-color property on `:focus` state.                                                                                                 |
| `$border-color-active`        | `null`                                         | Sets the border-color property on `:active` state.                                                                                                |
| `$background`                 | `transparent`                                  | Sets the background property.                                                                                                                     |
| `$background-hover`           | `transparent`                                  | Sets the background-color property on `:hover` state.                                                                                             |
| `$background-focus`           | `transparent`                                  | Sets the background-color property on `:focus` state.                                                                                             |
| `$background-active`          | `rgba(core.$black, 0.05)`                      | Sets the background-color property on `:active` state.                                                                                            |
| `$box-shadow`                 | `0 0 0 0 rgba(core.$black, 0)`                 | Sets the box-shadow property.                                                                                                                     |
| `$box-shadow-hover`           | `null`                                         | Sets the box-shadow property on `:hover` state.                                                                                                   |
| `$box-shadow-focus`           | `0 0 0 0.2rem rgba(core.$black, 0.15)`         | Sets the box-shadow property on `:focus` state.                                                                                                   |
| `$box-shadow-active`          | `null`                                         | Sets the box-shadow property on `:active` state.                                                                                                  |
| `$color`                      | `core.$color` &rarr; `#212121`                 | Sets the color property.                                                                                                                          |
| `$color-hover`                | `null`                                         | Sets the color property on `:hover` state.                                                                                                        |
| `$color-focus`                | `null`                                         | Sets the color property on `:focus` state.                                                                                                        |
| `$color-active`               | `null`                                         | Sets the color property on `:active` state.                                                                                                       |
| `$outline`                    | `none`                                         | Sets the outline property.                                                                                                                        |
| `$outline-hover`              | `null`                                         | Sets the outline property on `:hover` state.                                                                                                      |
| `$outline-focus`              | `null`                                         | Sets the outline property on `:focus` state.                                                                                                      |
| `$outline-active`             | `null`                                         | Sets the outline property on `:active` state.                                                                                                     |
| `$outline-offset`             | `null`                                         | Sets the outline-offset property.                                                                                                                 |
| `$outline-offset-hover`       | `null`                                         | Sets the outline-offset property on `:hover` state.                                                                                               |
| `$outline-offset-focus`       | `null`                                         | Sets the outline-offset property on `:focus` state.                                                                                               |
| `$outline-offset-active`      | `null`                                         | Sets the outline-offset property on `:active` state.                                                                                              |
| `$disabled-opacity`           | `0.6`                                          | Sets the opacity property when disabled attribute is applied.                                                                                     |
| `$loading-size`               | `1em`                                          | Sets the size of the loading spinner.                                                                                                             |
| `$loading-animation-duration` | `0.6s`                                         | Sets the animation-duration property of the loading spinner.                                                                                      |
| `$loading-border-color`       | `$color`                                       | Sets the border-color property of the loading spinner.                                                                                            |
| `$loading-border`             | `2px solid`                                    | Sets the border property of the loading spinner.                                                                                                  |
| `$loading-border-tpl`         | `1 1 0 0`                                      | The template for where to apply the border-color property. Takes boolean `1` and `0` values for top, right, bottom and left borders respectively. |
| `$icon-padding`               | `calc(0.5em - 1px)`                            | Sets the padding property of the `button_icon` modifier.                                                                                          |
| `$icon-padding-sm`            | `calc(0.25rem - 1px)`                          | Sets the padding property of the `button_icon_sm` with `button_size_sm` modifiers.                                                                |
| `$icon-padding-lg`            | `calc(0.648rem - 1px)`                         | Sets the padding property of the `button_icon_lg` with `button_size_lg` modifiers.                                                                |
| `$size-sm`                    | `core.$form-control-size-sm` &rarr; `1.875rem` | Sets the minimum size of the `button_size_sm` modifier using the min-height and min-width properties.                                             |
| `$size-sm-padding`            | `calc(0.25rem - 1px) 0.5rem`                   | Sets the padding property of the `button_size_sm` modifier.                                                                                       |
| `$size-sm-font-size`          | `core.$font-size-sm` &rarr; `0.875em`          | Sets the font-size property of the `button_size_sm` modifier.                                                                                     |
| `$size-sm-line-height`        | `core.$line-height-sm` &rarr; `1.375`          | Sets the line-height property of the `button_size_sm` modifier.                                                                                   |
| `$size-lg`                    | `core.$form-control-size-lg` &rarr; `3.125rem` | Sets the minimum size of the `button_size_lg` modifier using the min-height and min-width properties.                                             |
| `$size-lg-padding`            | `calc(0.648rem - 1px) 1.5rem`                  | Sets the padding property of the `button_size_lg` modifier.                                                                                       |
| `$size-lg-font-size`          | `core.$font-size-lg` &rarr; `1.125em`          | Sets the font-size property of the `button_size_lg` modifier.                                                                                     |
| `$size-lg-line-height`        | `core.$line-height-lg` &rarr; `1.625`          | Sets the line-height property of the `button_size_lg` modifier.                                                                                   |

#### `$breakpoints`

The breakpoints map the `button_block_[key]` modifier uses to build its styles.

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
