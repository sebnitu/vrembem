# Switch

Switches are a binary form element used to toggle between two options.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fswitch.svg)](https://www.npmjs.com/package/%40vrembem%2Fswitch)

[Documentation](https://vrembem.com/packages/switch)

## Installation

```sh
npm install @vrembem/switch
```

### Styles

```scss
@use "@vrembem/switch";
```

### Markup

Switch form controls are composed using a set of `<span>` elements alongside the native `<input type="checkbox">` element which should be given the `switch__native` class and come before the remaining presentational `<span>` elements.

```html
<span class="switch">
  <input type="checkbox" class="switch__native">
  <span class="switch__background">
    <span class="switch__track">
      <span class="switch__thumb"></span>
    </span>
  </span>
</span>
```

#### switch + label

For switch with labels, just wrap the switch component along with label text using the `<label>` element.

```html
<label>
  <span class="switch">
    ...
  </span>
  Switch with a label
</label>
```

## Modifiers

### `switch_size_[value]`

Adjust the size of a switch by increasing or decreasing its width and height. By default, the switch scale will provide a switch height of 30px (small `switch_size_sm`), 40px (default) and 50px (large `switch_size_lg`).

```html
<span class="switch switch_size_sm">
  ...
</span>

<span class="switch switch_size_lg">
  ...
</span>
```

#### Available Variations

- `switch_size_sm`
- `switch_size_lg`

## Customization

### Sass Variables

| Variable                          | Default                            | Description                                                                                                                                          |
| --------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`                   | `null`                             | String to prefix blocks with.                                                                                                                        |
| `$prefix-element`                 | `"__"`                             | String to prefix elements with.                                                                                                                      |
| `$prefix-modifier`                | `"_"`                              | String to prefix modifiers with.                                                                                                                     |
| `$prefix-modifier-value`          | `"_"`                              | String to prefix modifier values with.                                                                                                               |
| `$color`                          | `core.$primary`                    | Sets the base color theme for the switch component.                                                                                                  |
| `$size`                           | `core.$form-control-size`          | Sets the width and height of the `switch__background` element.                                                                                       |
| `$border-width`                   | `2px`                              | Sets the border-width property for the `switch__track` element and box-shadow spread for other elements and states.                                  |
| `$transition-duration`            | `core.$transition-duration-short`  | Sets the transition-duration property for the `switch__thumb` element.                                                                               |
| `$transition-timing-function`     | `core.$transition-timing-function` | Sets the transition-timing-function property for the `switch__thumb` element.                                                                        |
| `$background`                     | `transparent`                      | Sets the background-color property for the `switch__background` element.                                                                             |
| `$background-hover`               | `rgba($color, 0.1)`                | Sets the background-color property on `:hover` state.                                                                                                |
| `$background-focus`               | `rgba($color, 0.1)`                | Sets the background-color property on `:focus` state.                                                                                                |
| `$background-active`              | `rgba($color, 0.2)`                | Sets the background-color property on `:active` state.                                                                                               |
| `$background-checked`             | `null`                             | Sets the background-color property on `:checked` state.                                                                                              |
| `$background-border-radius`       | `core.$border-radius-circle`       | Sets the border-radius property for the `switch__background` element.                                                                                |
| `$track-size`                     | `20px`                             | Sets the width and height of the `switch__track` element.                                                                                            |
| `$track-background`               | `core.$gray-200`                   | Sets the background-color property for the `switch__track` element.                                                                                  |
| `$track-background-hover`         | `null`                             | Sets the background-color property on `:hover` state.                                                                                                |
| `$track-background-focus`         | `null`                             | Sets the background-color property on `:focus` state.                                                                                                |
| `$track-background-active`        | `null`                             | Sets the background-color property on `:active` state.                                                                                               |
| `$track-background-checked`       | `$color`                           | Sets the background-color property on `:checked` state.                                                                                              |
| `$track-border-color`             | `core.$gray-400`                   | Sets the border-color property for the `switch__track` element.                                                                                      |
| `$track-border-color-hover`       | `null`                             | Sets the border-color property on `:hover` state.                                                                                                    |
| `$track-border-color-focus`       | `null`                             | Sets the border-color property on `:focus` state.                                                                                                    |
| `$track-border-color-active`      | `null`                             | Sets the border-color property on `:active` state.                                                                                                   |
| `$track-border-color-checked`     | `$color`                           | Sets the border-color property on `:checked` state.                                                                                                  |
| `$track-border-radius`            | `core.$border-radius-circle`       | Sets the border-radius property for the `switch__track` element.                                                                                     |
| `$thumb-background`               | `core.$white`                      | Sets the background-color property for the `switch__thumb` element.                                                                                  |
| `$thumb-background-hover`         | `null`                             | Sets the background-color property on `:hover` state.                                                                                                |
| `$thumb-background-focus`         | `null`                             | Sets the background-color property on `:focus` state.                                                                                                |
| `$thumb-background-active`        | `null`                             | Sets the background-color property on `:active` state.                                                                                               |
| `$thumb-background-checked`       | `null`                             | Sets the background-color property on `:checked` state.                                                                                              |
| `$thumb-box-shadow-color`         | `core.$gray-400`                   | Sets the box-shadow color property for the `switch__thumb` element.                                                                                  |
| `$thumb-box-shadow-color-hover`   | `$color`                           | Sets the box-shadow color property on `:hover` state.                                                                                                |
| `$thumb-box-shadow-color-focus`   | `$color`                           | Sets the box-shadow color property on `:focus` state.                                                                                                |
| `$thumb-box-shadow-color-active`  | `$color`                           | Sets the box-shadow color property on `:active` state.                                                                                               |
| `$thumb-box-shadow-color-checked` | `$color`                           | Sets the box-shadow color property on `:checked` state.                                                                                              |
| `$size-sm`                        | `core.$form-control-size-sm`       | Sets the width and height of the `switch__background` element of the `switch_size_sm` modifier.                                                      |
| `$size-sm-border-width`           | `2px`                              | Sets the border-width property for the `switch__track` element and box-shadow spread for other elements and states of the `switch_size_sm` modifier. |
| `$size-sm-track`                  | `16px`                             | Sets the width and height of the `switch__track` element of the `switch_size_sm` modifier.                                                           |
| `$size-lg`                        | `core.$form-control-size-lg`       | Sets the width and height of the `switch__background` element of the `switch_size_lg` modifier.                                                      |
| `$size-lg-border-width`           | `2.5px`                            | Sets the border-width property for the `switch__track` element and box-shadow spread for other elements and states of the `switch_size_lg` modifier. |
| `$size-lg-track`                  | `26px`                             | Sets the width and height of the `switch__track` element of the `switch_size_lg` modifier.                                                           |
