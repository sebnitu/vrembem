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

| Variable                         | Default                                                                       | Description                                                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`                  | `null`                                                                        | String to prefix blocks with.                                                                                                      |
| `$prefix-element`                | `"__"`                                                                        | String to prefix elements with.                                                                                                    |
| `$prefix-modifier`               | `"_"`                                                                         | String to prefix modifiers with.                                                                                                   |
| `$prefix-modifier-value`         | `"_"`                                                                         | String to prefix modifier values with.                                                                                             |
| `$size`                          | `core.$form-control-size`                                                     | Sets the height property on `input` and min-height property of the `input_type_textarea` modifier.                                 |
| `$padding`                       | `list.nth(core.$padding, 1)`                                                  | Sets the padding property.                                                                                                         |
| `$transition`                    | `box-shadow core.$transition-duration-short core.$transition-timing-function` | Sets the transition property.                                                                                                      |
| `$border-width`                  | `core.$border-width`                                                          | Sets the border-width property.                                                                                                    |
| `$border-style`                  | `core.$border-style`                                                          | Sets the border-style property.                                                                                                    |
| `$border-color`                  | `core.$border-color-dark`                                                     | Sets the border-color property.                                                                                                    |
| `$border-color-hover`            | `core.$border-color-darker`                                                   | Sets the border-color property on `:hover` state.                                                                                  |
| `$border-color-focus`            | `core.$primary`                                                               | Sets the border-color property on `:focus` state.                                                                                  |
| `$border-radius`                 | `core.$border-radius`                                                         | Sets the border-radius property.                                                                                                   |
| `$background`                    | `core.$white`                                                                 | Sets the background property.                                                                                                      |
| `$background-hover`              | `core.$white`                                                                 | Sets the background-color property on `:hover` state.                                                                              |
| `$background-focus`              | `core.$white`                                                                 | Sets the background-color property on `:focus` state.                                                                              |
| `$box-shadow-values`             | `0 0 0 0`                                                                     | Sets the box-shadow offset-x, offset-y, blur-radius and spread-radius values.                                                      |
| `$box-shadow-color`              | `core.$black`                                                                 | Sets the box-shadow color value.                                                                                                   |
| `$box-shadow-alpha`              | `0`                                                                           | Sets the alpha channel of the box-shadow color.                                                                                    |
| `$box-shadow-hover-values`       | `0 0 0 0`                                                                     | Sets the box-shadow offset-x, offset-y, blur-radius and spread-radius values on `:hover` state.                                    |
| `$box-shadow-hover-color`        | `core.$black`                                                                 | Sets the box-shadow color value on `:hover` state.                                                                                 |
| `$box-shadow-hover-alpha`        | `0`                                                                           | Sets the alpha channel of the box-shadow color on `:hover` state.                                                                  |
| `$box-shadow-focus-values`       | `0 0 0 3px`                                                                   | Sets the box-shadow offset-x, offset-y, blur-radius and spread-radius values on `:focus` state.                                    |
| `$box-shadow-focus-color`        | `core.$primary`                                                               | Sets the box-shadow color value on `:focus` state.                                                                                 |
| `$box-shadow-focus-alpha`        | `0.4`                                                                         | Sets the alpha channel of the box-shadow color on `:focus` state.                                                                  |
| `$inset-box-shadow`              | `0 1px 3px rgba(core.$black, 0.1)`                                            | Sets the inset box-shadow value.                                                                                                   |
| `$inset-box-shadow-hover`        | `0 1px 3px rgba(core.$black, 0.1)`                                            | Sets the inset box-shadow value on `:hover` state.                                                                                 |
| `$inset-box-shadow-focus`        | `null`                                                                        | Sets the inset box-shadow value on `:focus` state.                                                                                 |
| `$color`                         | `core.$color`                                                                 | Sets the color property.                                                                                                           |
| `$color-placeholder`             | `core.$color-subtle`                                                          | Sets the color property for the placeholder pseudo-element.                                                                        |
| `$font-size`                     | `core.$font-size`                                                             | Sets the font-size property.                                                                                                       |
| `$line-height`                   | `core.$line-height`                                                           | Sets the line-height property.                                                                                                     |
| `$disabled-background`           | `core.$shade`                                                                 | Sets the background-color property of the `disabled` state.                                                                        |
| `$readonly-background`           | `core.$shade`                                                                 | Sets the background-color property of the `readonly` state.                                                                        |
| `$size-sm`                       | `core.$form-control-size-sm`                                                  | Sets the height property on `input` and min-height property of the `input_type_textarea` and `input_size_sm` modifier combination. |
| `$size-sm-padding`               | `list.nth(core.$padding-sm, 1)`                                               | Sets the padding property of the `input_size_sm` modifier.                                                                         |
| `$size-sm-font-size`             | `core.$font-size-sm`                                                          | Sets the font-size property of the `input_size_sm` modifier.                                                                       |
| `$size-sm-line-height`           | `core.$line-height-sm`                                                        | Sets the line-height property of the `input_size_sm` modifier.                                                                     |
| `$size-lg`                       | `core.$form-control-size-lg`                                                  | Sets the height property on `input` and min-height property of the `input_type_textarea` and `input_size_lg` modifier combination. |
| `$size-lg-padding`               | `list.nth(core.$padding-lg, 1)`                                               | Sets the padding property of the `input_size_lg` modifier.                                                                         |
| `$size-lg-font-size`             | `core.$font-size-lg`                                                          | Sets the font-size property of the `input_size_lg` modifier.                                                                       |
| `$size-lg-line-height`           | `core.$line-height-lg`                                                        | Sets the line-height property of the `input_size_lg` modifier.                                                                     |
| `$state-enable-background-color` | `false`                                                                       | Whether or not to display state specific background-colors on inputs.                                                              |
| `$type-select-icon-color`        | `core.$color`                                                                 | Sets the fill property for the svg data:image of the `input_type_select` modifier.                                                 |
| `$type-select-icon`              | [`'data:image/svg...'` Ref &darr;](#type-select-icon)                         | The data:image/svg string used as the background-image property of the `input_type_select` modifier.                               |
| `$type-textarea-min-width`       | `100%`                                                                        | Sets the min-width property of the `input_type_textarea` modifier.                                                                 |

#### `$type-select-icon`

```scss
$type-select-icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" fill="#{core.encodecolor($type-select-icon-color)}"><polyline points="0 8 3.5 12 7 8"></polyline><polyline points="0 4 3.5 0 7 4"></polyline></svg>' !default;
```

## Sass Mixins

### `@mixin box-shadow($state, $color)`

Output an inputs box-shadow property provided a state and optional color parameter.

**Arguments**

| Variable             | Type     | Description                                                                                        |
| -------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `$state ("default")` | `string` | The state that should be output. Can either be `"hover"`, `"focus"` or omitted for default output. |
| `$color (null)`      | `color`  | The base color to use in the box-shadow property value.                                            |

**Example**

```scss
.input_custom:focus {
  @include box-shadow("focus", #800080);
}

// CSS Output
.input_custom:focus {
  box-shadow: 0 0 0 3px rgba(128, 0, 128, 0.4);
}
```
