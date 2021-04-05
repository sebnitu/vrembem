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

The most basic imlementation of the button component consists of the `button` class that can be applied to `<button>`, `<input type="button">` or `<a role="button">` elements. [Remember to add `role="button"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) to any none semantic buttons as needed.

```html
<button class="button">Button</button>
<input class="button" type="button" value="Button">
<a class="button" role="button">Button</a>
```

When disabled using the `disabled` attribute, a button will inherit styles to visually appear noninteractive.

```html
<button class="button" disabled>Button</button>
<input class="button" type="button" value="Button" disabled>
<a class="button" role="button" disabled>Button</a>
```

Elements within a button are centered vertically and spaced accordingly using the value set in `$inner-spacing` (defaults to `0.5em`). When elements are added inside a button, the button's text should also be wrapped in a `<span>` so that it can be spaced properly.

```html
<button class="button">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
  <span>Button</span>
  <span class="arrow"></span>
</button>
```

Buttons can also have a loading state by adding the `is-loading` state class. This is useful when a button has an action that has a delayed response in order to give users a visual indicator that their action is being processed.

```html
<button class="button is-loading">Button</button>
<input class="button is-loading" type="button" value="Button">
<a class="button is-loading" role="button">Button</a>
```

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

### `button_color_[key]`

Adds styles for changing the look and feel of a button. These are usually done with different background and text colors.

```html
<button class="button button_color_primary">Button</button>
```

#### Available Variations

- `button_color_subtle`
- `button_color_primary`
- `button_color_secondary`

### `button_icon`

Adds styles that make icon-only buttons more balanced and are typically squared if the icons used have equal height and widths.

```html
<button class="button button_icon">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
</button>
```

### `button_invert`

A supplemental button modifier that allows [`_color`](#button_color_key) or [`_outline`](#button_outline_key) modified buttons to provide an inversed version of itself. Since not all button styles require an inversed variant, this is typically used for when the background context of a button matters.

```html
<button class="button button_invert">Button</button>
```

#### Available Combinations

- `button button_invert`
- `button button_invert button_color_subtle`
- `button button_invert button_outline`
- `button button_invert button_outline_primary`
- `button button_invert button_outline_secondary`

### `button_outline_[key]`

Outline styles usually have a more subtle appearance compared to [`_color`](#button_color_key) variants. They use a border to outline the button and have a transparent background color. Consider using [`button_invert`](#button_invert) when the contrast of a button needs to be inversed.

```html
<button class="button button_outline_primary">Button</button>
```

#### Available Variations

- `button_outline`
- `button_outline_primary`
- `button_outline_secondary`

### `button_size_[key]`

Adjust the size of a button by inceasing or decreasing its padding and font-size. By default, the button scale should goes a height of 30px (small variant), 40px (default) to 50px (large variant).

```html
<button class="button button_size_sm">Button</button>
```

#### Available Variations

- `button_size_sm`
- `button_size_lg`

## Customization

### Sass Variables

| Variable                      | Default                                        | Description                                                                     |
| ----------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                                         | String to prefix blocks with.                                                   |
| `$prefix-element`             | `"__"`                                         | String to prefix element with.                                                  |
| `$prefix-modifier`            | `"_"`                                          | String to prefix modifier with.                                                 |
| `$prefix-modifier-value`      | `"_"`                                          | String to prefix modifier values with.                                          |
| `$breakpoints`                | [`core.$breakpoints` Ref &darr;](#breakpoints) | The breakpoints map the `button_block_[key]` modifier uses to build its styles. |
| `$min-size`                   | `2.5rem`                                       | ...                                                                             |
| `$padding`                    | `core.$padding` &rarr; `0.5em 1em`             | ...                                                                             |
| `$inner-spacing`              | `0.5em`                                        | ...                                                                             |
| `$font-size`                  | `1em`                                          | ...                                                                             |
| `$line-height`                | `core.$line-height` &rarr; `1.5`               | ...                                                                             |
| `$font-weight`                | `inherit`                                      | ...                                                                             |
| `$text-transform`             | `null`                                         | ...                                                                             |
| `$letter-spacing`             | `null`                                         | ...                                                                             |
| `$border-radius`              | `core.$border-radius` &rarr; `4px`             | ...                                                                             |
| `$outline-focus`              | `none`                                         | ...                                                                             |
| `$outline-focus-offset`       | `null`                                         | ...                                                                             |
| `$background`                 | `rgba(core.$black, 0.06)`                      | ...                                                                             |
| `$background-hover`           | `rgba(core.$black, 0.09)`                      | ...                                                                             |
| `$background-focus`           | `rgba(core.$black, 0.12)`                      | ...                                                                             |
| `$background-active`          | `rgba(core.$black, 0.15)`                      | ...                                                                             |
| `$box-shadow`                 | `null`                                         | ...                                                                             |
| `$box-shadow-hover`           | `null`                                         | ...                                                                             |
| `$box-shadow-focus`           | `null`                                         | ...                                                                             |
| `$box-shadow-active`          | `null`                                         | ...                                                                             |
| `$border`                     | `none`                                         | ...                                                                             |
| `$border-color-hover`         | `null`                                         | ...                                                                             |
| `$border-color-focus`         | `null`                                         | ...                                                                             |
| `$border-color-active`        | `null`                                         | ...                                                                             |
| `$color`                      | `core.$color` &rarr; `#212121`                 | ...                                                                             |
| `$color-hover`                | `null`                                         | ...                                                                             |
| `$color-focus`                | `null`                                         | ...                                                                             |
| `$color-active`               | `null`                                         | ...                                                                             |
| `$disabled-opacity`           | `0.5`                                          | ...                                                                             |
| `$loading-size`               | `1em`                                          | ...                                                                             |
| `$loading-animation-duration` | `0.6s`                                         | ...                                                                             |
| `$loading-border-color`       | `$color`                                       | ...                                                                             |
| `$loading-border`             | `2px solid`                                    | ...                                                                             |
| `$loading-border-tpl`         | `1 1 0 0`                                      | ...                                                                             |
| `$size-sm-min-size`           | `1.875rem`                                     | ...                                                                             |
| `$size-sm-padding`            | `core.$padding-sm` &rarr; `0.25rem 0.5rem`     | ...                                                                             |
| `$size-sm-font-size`          | `core.$font-size-sm` &rarr; `0.875em`          | ...                                                                             |
| `$size-sm-line-height`        | `core.$line-height-sm` &rarr; `1.375`          | ...                                                                             |
| `$size-lg-min-size`           | `3.125rem`                                     | ...                                                                             |
| `$size-lg-padding`            | `core.$padding-lg` &rarr; `0.648rem 1.5rem`    | ...                                                                             |
| `$size-lg-font-size`          | `core.$font-size-lg` &rarr; `1.125em`          | ...                                                                             |
| `$size-lg-line-height`        | `core.$line-height-lg` &rarr; `1.625`          | ...                                                                             |
| `$outline-border-width`       | `1px`                                          | ...                                                                             |

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
