# Input

A component for displaying form input elements.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Finput.svg)](https://www.npmjs.com/package/%40vrembem%2Finput)

[Documentation](https://vrembem.com/packages/input)

## Installation

```sh
npm install @vrembem/input
```

### Styles

```scss
@use "@vrembem/input";
```

### Markup

The most basic implementation of the input component consists of the `input` class applied to an `<input>` element.

```html
<input class="input" type="text">
```

#### `disabled`

Adding the boolean `disabled` attribute to the input will provide visual indication that the input is not available for use.

```html
<input class="input" type="text" disabled>
```

#### `readonly`

Adding the boolean `readonly` attribute to the input will provide visual indication that the user should not be able to edit the value of the input.

```html
<input class="input" type="text" readonly>
```

## Modifiers

### `input_auto`

Sets the width of an input to `auto` instead of the base component width of `100%`.

```html
<input class="input input_auto" type="text">
```

### `input_size_[value]`

Adjust the size of an input by increasing or decreasing its padding and font-size. By default, the input scale will provide an input height of 30px (small `input_size_sm`), 40px (default) and 50px (large `input_size_lg`).

```html
<input class="input input_size_sm" type="text">
<input class="input input_size_lg" type="text">
```

#### Available Variations

- `input_size_sm`
- `input_size_lg`

### `input_state_[value]`

Adds styles for changing the look and feel of an input to better reflect the urgency or status.

```html
<input class="input input_state_danger" type="text">
```

### Available Variations

- `input_state_info`
- `input_state_success`
- `input_state_caution`
- `input_state_danger`

### `input_type_[value]`

Adds unique styles for various form input types. These form controls share styles with the basic form input such as [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) and [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) HTML elements.

```html
<select class="input input_type_select" name="">
  <option value="">Select one</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>

<textarea class="input input_type_textarea" rows="3"></textarea>
```

### Available Variations

- `input_type_select`
- `input_type_textarea`

## Customization

### Sass Variables

| Variable                      | Default                                               | Description                                                                                                                        |
| ----------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                                                | String to prefix blocks with.                                                                                                      |
| `$prefix-element`             | `"__"`                                                | String to prefix elements with.                                                                                                    |
| `$prefix-modifier`            | `"_"`                                                 | String to prefix modifiers with.                                                                                                   |
| `$prefix-modifier-value`      | `"_"`                                                 | String to prefix modifier values with.                                                                                             |
| `$size`                       | `core.$form-control-size`                             | Sets the height property on `input` and min-height property of the `input_type_textarea` modifier.                                 |
| `$padding`                    | `calc(0.5em - 1px)`                                   | Sets the padding property.                                                                                                         |
| `$transition-property`        | `box-shadow, outline, outline-offset`                 | Sets the transition-property property.                                                                                             |
| `$transition-duration`        | `core.$transition-duration-short`                     | Sets the transition-duration property.                                                                                             |
| `$transition-timing-function` | `core.$transition-timing-function`                    | Sets the transition-timing-function property.                                                                                      |
| `$border-radius`              | `core.$border-radius`                                 | Sets the border-radius property.                                                                                                   |
| `$color-placeholder`          | `core.$color-subtle`                                  | Sets the color property for the placeholder pseudo-element.                                                                        |
| `$font-size`                  | `core.$font-size`                                     | Sets the font-size property.                                                                                                       |
| `$line-height`                | `core.$line-height`                                   | Sets the line-height property.                                                                                                     |
| `$border`                     | `1px solid core.$border-color-dark`                   | Sets the border property.                                                                                                          |
| `$border-color-hover`         | `core.$border-color-darker`                           | Sets the border-color property on `:hover` state.                                                                                  |
| `$border-color-focus`         | `--vb-primary`                                        | Sets the border-color property on `:focus` state.                                                                                  |
| `$background`                 | `white`                                               | Sets the background property.                                                                                                      |
| `$background-hover`           | `null`                                                | Sets the background-color property on `:hover` state.                                                                              |
| `$background-focus`           | `null`                                                | Sets the background-color property on `:focus` state.                                                                              |
| `$box-shadow`                 | `inset 0 1px 3px rgba(black, 0.1)`                    | Sets the box-shadow property.                                                                                                      |
| `$box-shadow-hover`           | `null`                                                | Sets the box-shadow property on `:hover` state.                                                                                    |
| `$box-shadow-focus`           | `none`                                                | Sets the box-shadow property on `:focus` state.                                                                                    |
| `$color`                      | `core.$color`                                         | Sets the color property.                                                                                                           |
| `$color-hover`                | `null`                                                | Sets the color property on `:hover` state.                                                                                         |
| `$color-focus`                | `null`                                                | Sets the color property on `:focus` state.                                                                                         |
| `$outline`                    | `none`                                                | Sets the outline property.                                                                                                         |
| `$outline-hover`              | `null`                                                | Sets the outline property on `:hover` state.                                                                                       |
| `$outline-focus`              | `null`                                                | Sets the outline property on `:focus` state.                                                                                       |
| `$outline-offset`             | `null`                                                | Sets the outline-offset property.                                                                                                  |
| `$outline-offset-hover`       | `null`                                                | Sets the outline-offset property on `:hover` state.                                                                                |
| `$outline-offset-focus`       | `null`                                                | Sets the outline-offset property on `:focus` state.                                                                                |
| `$disabled-background`        | `core.$shade`                                         | Sets the background-color property of the `disabled` state.                                                                        |
| `$readonly-background`        | `core.$shade`                                         | Sets the background-color property of the `readonly` state.                                                                        |
| `$size-sm`                    | `core.$form-control-size-sm`                          | Sets the height property on `input` and min-height property of the `input_type_textarea` and `input_size_sm` modifier combination. |
| `$size-sm-padding`            | `calc(0.25rem - 1px) 0.5rem`                          | Sets the padding property of the `input_size_sm` modifier.                                                                         |
| `$size-sm-font-size`          | `core.$font-size-sm`                                  | Sets the font-size property of the `input_size_sm` modifier.                                                                       |
| `$size-sm-line-height`        | `core.$line-height-sm`                                | Sets the line-height property of the `input_size_sm` modifier.                                                                     |
| `$size-lg`                    | `core.$form-control-size-lg`                          | Sets the height property on `input` and min-height property of the `input_type_textarea` and `input_size_lg` modifier combination. |
| `$size-lg-padding`            | `calc(0.648rem - 1px)`                                | Sets the padding property of the `input_size_lg` modifier.                                                                         |
| `$size-lg-font-size`          | `core.$font-size-lg`                                  | Sets the font-size property of the `input_size_lg` modifier.                                                                       |
| `$size-lg-line-height`        | `core.$line-height-lg`                                | Sets the line-height property of the `input_size_lg` modifier.                                                                     |
| `$type-select-icon-color`     | `core.$color`                                         | Sets the fill property for the svg data:image of the `input_type_select` modifier.                                                 |
| `$type-select-icon`           | [`'data:image/svg...'` Ref &darr;](#type-select-icon) | The data:image/svg string used as the background-image property of the `input_type_select` modifier.                               |
| `$type-textarea-min-width`    | `100%`                                                | Sets the min-width property of the `input_type_textarea` modifier.                                                                 |

#### `$type-select-icon`

```scss
$type-select-icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" fill="#{core.encodecolor($type-select-icon-color)}"><polyline points="0 8 3.5 12 7 8"></polyline><polyline points="0 4 3.5 0 7 4"></polyline></svg>' !default;
```
