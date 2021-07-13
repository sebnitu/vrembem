# Radio

Radios allow the user to select a single option from a set.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fradio.svg)](https://www.npmjs.com/package/%40vrembem%2Fradio)

[Documentation](https://vrembem.com/packages/radio)

## Installation

```sh
npm install @vrembem/radio
```

### Styles

```scss
@use "@vrembem/radio";
```

### Markup

Radio buttons are composed using a set of `<span>` elements alongside the native `<input type="radio">` element which should be given the `radio__native` class and come before the remaining presentational `<span>` elements.

```html
<span class="radio">
  <input type="radio" class="radio__native" name="...">
  <span class="radio__background">
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
  </span>
</span>
```

#### radio + label

For radio buttons with labels, just wrap the radio component along with label text using the `<label>` element.

```html
<label>
  <span class="radio">
    ...
  </span>
  Radio with a label
</label>
```

## Modifiers

### `radio_size_[value]`

Adjust the size of a radio by increasing or decreasing its width and height. By default, the radio scale will provide a radio height of 30px (small `radio_size_sm`), 40px (default) and 50px (large `radio_size_lg`).

```html
<span class="radio radio_size_sm">
  ...
</span>

<span class="radio radio_size_lg">
  ...
</span>
```

#### Available Variations

- `radio_size_sm`
- `radio_size_lg`

## Customization

### Sass Variables

| Variable                       | Default                            | Description                                                                                      |
| ------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `$prefix-block`                | `null`                             | String to prefix blocks with.                                                                    |
| `$prefix-element`              | `"__"`                             | String to prefix elements with.                                                                  |
| `$prefix-modifier`             | `"_"`                              | String to prefix modifiers with.                                                                 |
| `$prefix-modifier-value`       | `"_"`                              | String to prefix modifier values with.                                                           |
| `$color`                       | `core.$primary`                    | Sets the base color theme for the radio component.                                               |
| `$size`                        | `core.$form-control-size`          | Sets the width and height of the `radio__background` element.                                    |
| `$border-width`                | `2px`                              | Sets the border-width property for the `radio__circle` element.                                  |
| `$transition-duration`         | `core.$transition-duration-short`  | Sets the transition-duration property for the `radio__dot` element.                              |
| `$transition-timing-function`  | `core.$transition-timing-function` | Sets the transition-timing-function property for the `radio__dot` element.                       |
| `$background`                  | `transparent`                      | Sets the background-color property for the `radio__background` element.                          |
| `$background-hover`            | `rgba($color, 0.1)`                | Sets the background-color property on `:hover` state.                                            |
| `$background-focus`            | `rgba($color, 0.1)`                | Sets the background-color property on `:focus` state.                                            |
| `$background-active`           | `rgba($color, 0.2)`                | Sets the background-color property on `:active` state.                                           |
| `$background-checked`          | `null`                             | Sets the background-color property on `:checked` state.                                          |
| `$background-border-radius`    | `core.$border-radius-circle`       | Sets the border-radius property for the `radio__background` element.                             |
| `$circle-size`                 | `20px`                             | Sets the width and height of the `radio__circle` element.                                        |
| `$circle-background`           | `core.$white`                      | Sets the background-color property for the `radio__circle` element.                              |
| `$circle-background-hover`     | `null`                             | Sets the background-color property on `:hover` state.                                            |
| `$circle-background-focus`     | `null`                             | Sets the background-color property on `:focus` state.                                            |
| `$circle-background-active`    | `null`                             | Sets the background-color property on `:active` state.                                           |
| `$circle-background-checked`   | `$color`                           | Sets the background-color property on `:checked` state.                                          |
| `$circle-border-color`         | `core.$gray-400`                   | Sets the border-color property for the `radio__circle` element.                                  |
| `$circle-border-color-hover`   | `$color`                           | Sets the border-color property on `:hover` state.                                                |
| `$circle-border-color-focus`   | `$color`                           | Sets the border-color property on `:focus` state.                                                |
| `$circle-border-color-active`  | `$color`                           | Sets the border-color property on `:active` state.                                               |
| `$circle-border-color-checked` | `$color`                           | Sets the border-color property on `:checked` state.                                              |
| `$circle-border-radius`        | `core.$border-radius`              | Sets the border-radius property for the `radio__circle` element.                                 |
| `$dot-size`                    | `8px`                              | Sets the width and height property for the `radio__dot` element.                                 |
| `$dot-color`                   | `core.$white`                      | Sets the background-color property for the `radio__dot` element.                                 |
| `$size-sm`                     | `core.$form-control-size-sm`       | Sets the width and height of the `radio__background` element of the `radio_size_sm` modifier.    |
| `$size-sm-border-width`        | `2px`                              | Sets the border-width property for the `radio__circle` element of the `radio_size_sm` modifier.  |
| `$size-sm-circle`              | `16px`                             | Sets the width and height of the `radio__circle` element of the `radio_size_sm` modifier.        |
| `$size-sm-dot`                 | `6px`                              | Sets the width and height property for the `radio__dot` element of the `radio_size_sm` modifier. |
| `$size-lg`                     | `core.$form-control-size-lg`       | Sets the width and height of the `radio__background` element of the `radio_size_lg` modifier.    |
| `$size-lg-border-width`        | `2.5px`                            | Sets the border-width property for the `radio__circle` element of the `radio_size_lg` modifier.  |
| `$size-lg-circle`              | `26px`                             | Sets the width and height of the `radio__circle` element of the `radio_size_lg` modifier.        |
| `$size-lg-dot`                 | `10px`                             | Sets the width and height property for the `radio__dot` element of the `radio_size_lg` modifier. |
