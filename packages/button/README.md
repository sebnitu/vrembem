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

Buttons can also have a loading state by adding the `is-loading` state class. This is useful when a button has an action that has a delayed response in order to give users a visual indicator that their action is being processed.

```html
<button class="button is-loading">Button</button>
<a class="button is-loading" role="button">Button</a>
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

### `button_color_[key]`

Adds styles for changing the look and feel of a button. These are usually done with different background and text colors.

```html
<button class="button button_color_subtle">Button</button>
<button class="button button_color_primary">Button</button>
<button class="button button_color_secondary">Button</button>
```

#### Available Variations

- `button_color_subtle`
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

A supplemental button modifier that allows [`button_color_[key]`](#button_color_key) or [`button_outline_[key]`](#button_outline_key) modified buttons to provide an inversed version of itself. Since not all button styles require an inversed variant, this is typically used for when the background context of a button matters.

```html
<button class="button button_invert">Button</button>
<button class="button button_invert button_color_subtle">Button</button>
```

#### Available Combinations

- `button button_invert`
- `button button_invert button_color_subtle`
- `button button_invert button_outline`
- `button button_invert button_outline_primary`
- `button button_invert button_outline_secondary`

### `button_outline_[key]`

Outline styles usually have a more subtle appearance compared to [`button_color_[key]`](#button_color_key) variants. They use a border to outline the button and have a transparent background color. Consider using [`button_invert`](#button_invert) when the contrast of a button needs to be inverted.

```html
<button class="button button_outline_primary">Button</button>
```

#### Available Variations

- `button_outline`
- `button_outline_primary`
- `button_outline_secondary`

### `button_size_[key]`

Adjust the size of a button by inceasing or decreasing its padding and font-size. By default, the button scale will provide a button height of 30px (`button_size_sm`), 40px (default) and 50px (`button_size_lg`).

```html
<button class="button button_size_sm">Button</button>
<button class="button button_size_lg">Button</button>
```

#### Available Variations

- `button_size_sm`
- `button_size_lg`

## Customization

### Sass Variables

| Variable                      | Default                                        | Description                                                                                                                          |
| ----------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `$prefix-block`               | `null`                                         | String to prefix blocks with.                                                                                                        |
| `$prefix-element`             | `"__"`                                         | String to prefix element with.                                                                                                       |
| `$prefix-modifier`            | `"_"`                                          | String to prefix modifier with.                                                                                                      |
| `$prefix-modifier-value`      | `"_"`                                          | String to prefix modifier values with.                                                                                               |
| `$breakpoints`                | [`core.$breakpoints` Ref &darr;](#breakpoints) | The breakpoints map the `button_block_[key]` modifier uses to build its styles.                                                      |
| `$min-size`                   | `2.5rem`                                       | Sets the minimum size of a button using the min-height and min-width properties.                                                     |
| `$padding`                    | `core.$padding` &rarr; `0.5em 1em`             | Sets the padding property.                                                                                                           |
| `$gap`                        | `0.5em`                                        | The default horizontal gap spacing for elements inside the button component.                                                         |
| `$border`                     | `none`                                         | Sets the border property.                                                                                                            |
| `$border-color-hover`         | `null`                                         | Sets the border-color property on `:hover` state.                                                                                    |
| `$border-color-focus`         | `null`                                         | Sets the border-color property on `:focus` state.                                                                                    |
| `$border-color-active`        | `null`                                         | Sets the border-color property on `:active` state.                                                                                   |
| `$border-radius`              | `core.$border-radius` &rarr; `4px`             | Sets the border-radius property.                                                                                                     |
| `$background`                 | `rgba(core.$black, 0.06)`                      | Sets the background property.                                                                                                        |
| `$background-hover`           | `rgba(core.$black, 0.09)`                      | Sets the background-color property on `:hover` state.                                                                                |
| `$background-focus`           | `rgba(core.$black, 0.12)`                      | Sets the background-color property on `:focus` state.                                                                                |
| `$background-active`          | `rgba(core.$black, 0.15)`                      | Sets the background-color property on `:active` state.                                                                               |
| `$box-shadow`                 | `null`                                         | Sets the box-shadow property.                                                                                                        |
| `$box-shadow-hover`           | `null`                                         | Sets the box-shadow property on `:hover` state.                                                                                      |
| `$box-shadow-focus`           | `null`                                         | Sets the box-shadow property on `:focus` state.                                                                                      |
| `$box-shadow-active`          | `null`                                         | Sets the box-shadow property on `:active` state.                                                                                     |
| `$color`                      | `core.$color` &rarr; `#212121`                 | Sets the color property.                                                                                                             |
| `$color-hover`                | `null`                                         | Sets the color property on `:hover` state.                                                                                           |
| `$color-focus`                | `null`                                         | Sets the color property on `:focus` state.                                                                                           |
| `$color-active`               | `null`                                         | Sets the color property on `:active` state.                                                                                          |
| `$font-size`                  | `1em`                                          | Sets the font-size property.                                                                                                         |
| `$font-weight`                | `inherit`                                      | Sets the font-weight property.                                                                                                       |
| `$letter-spacing`             | `null`                                         | Sets the letter-spacing property.                                                                                                    |
| `$line-height`                | `core.$line-height` &rarr; `1.5`               | Sets the line-height property.                                                                                                       |
| `$text-transform`             | `null`                                         | Sets the text-transformation property.                                                                                               |
| `$outline-focus`              | `none`                                         | Sets the outline property on `:focus` state.                                                                                         |
| `$outline-focus-offset`       | `null`                                         | Sets the outline-offset property on `:focus` state.                                                                                  |
| `$disabled-opacity`           | `0.5`                                          | Sets the opacity property when disabled attribute is applied.                                                                        |
| `$loading-size`               | `1em`                                          | Sets the size of the loading spinner.                                                                                                |
| `$loading-animation-duration` | `0.6s`                                         | Sets the animation-duration property of the loading spinner.                                                                         |
| `$loading-border-color`       | `$color`                                       | Sets the border-color property of the loading spinner.                                                                               |
| `$loading-border`             | `2px solid`                                    | Sets the border property of the loading spinner.                                                                                     |
| `$loading-border-tpl`         | `1 1 0 0`                                      | The template for where to apply the border-color property. Takes boolean `1` and `0` values for top, right, bottom and left borders. |
| `$size-sm-min-size`           | `1.875rem`                                     | Sets the minimum size of the `button_size_sm` modifier using the min-height and min-width properties.                                |
| `$size-sm-padding`            | `core.$padding-sm` &rarr; `0.25rem 0.5rem`     | Sets the padding property of the `button_size_sm` modifier.                                                                          |
| `$size-sm-font-size`          | `core.$font-size-sm` &rarr; `0.875em`          | Sets the font-size property of the `button_size_sm` modifier.                                                                        |
| `$size-sm-line-height`        | `core.$line-height-sm` &rarr; `1.375`          | Sets the line-height property of the `button_size_sm` modifier.                                                                      |
| `$size-lg-min-size`           | `3.125rem`                                     | Sets the minimum size of the `button_size_lg` modifier using the min-height and min-width properties.                                |
| `$size-lg-padding`            | `core.$padding-lg` &rarr; `0.648rem 1.5rem`    | Sets the padding property of the `button_size_lg` modifier.                                                                          |
| `$size-lg-font-size`          | `core.$font-size-lg` &rarr; `1.125em`          | Sets the font-size property of the `button_size_lg` modifier.                                                                        |
| `$size-lg-line-height`        | `core.$line-height-lg` &rarr; `1.625`          | Sets the line-height property of the `button_size_lg` modifier.                                                                      |
| `$outline-border-width`       | `1px`                                          | Sets the border-width property of the [`button_outline_[key]`](#button_outline_key) modifiers.                                       |

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
