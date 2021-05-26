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

For switch with labels, just wrap the switch component along with label text using the `<label>` element.

```html
<label>
  <span class="switch">
    ...
  </span>
  Switch with a label
</label>
```

## Customization

### Sass Variables

| Variable                      | Default                            | Description                                                                   |
| ----------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                             | String to prefix blocks with.                                                 |
| `$prefix-element`             | `"__"`                             | String to prefix elements with.                                               |
| `$prefix-modifier`            | `"_"`                              | String to prefix modifiers with.                                              |
| `$prefix-modifier-value`      | `"_"`                              | String to prefix modifier values with.                                        |
| `$color`                      | `core.$primary`                    | Sets the base color theme for the switch component.                           |
| `$size`                       | `core.$form-control-size`          | Sets the width and height of the `switch__background` element.                |
| `$transition-duration`        | `core.$transition-duration`        | Sets the transition-duration property for the `switch__thumb` element.        |
| `$transition-timing-function` | `core.$transition-timing-function` | Sets the transition-timing-function property for the `switch__thumb` element. |
| `$background`                 | `transparent`                      | Sets the background-color property for the `switch__background` element.      |
| `$background-hover`           | `rgba(core.$black, 0.03)`          | Sets the background-color property on `:hover` state.                         |
| `$background-focus`           | `rgba(core.$black, 0.03)`          | Sets the background-color property on `:focus` state.                         |
| `$background-active`          | `rgba(core.$black, 0.06)`          | Sets the background-color property on `:active` state.                        |
| `$background-checked`         | `null`                             | Sets the background-color property on `:checked` state.                       |
| `$background-border-radius`   | `core.$border-radius-circle`       | Sets the border-radius property for the `switch__background` element.         |
| `$track-size`                 | `20px`                             | Sets the width and height of the `switch__track` element.                     |
| `$track-background`           | `core.$gray-200`                   | Sets the background-color property for the `switch__track` element.           |
| `$track-background-hover`     | `null`                             | Sets the background-color property on `:hover` state.                         |
| `$track-background-focus`     | `null`                             | Sets the background-color property on `:focus` state.                         |
| `$track-background-active`    | `null`                             | Sets the background-color property on `:active` state.                        |
| `$track-background-checked`   | `core.$primary-lighter`            | Sets the background-color property on `:checked` state.                       |
| `$track-border-color`         | `core.$gray-400`                   | Sets the border-color property for the `switch__track` element.               |
| `$track-border-color-hover`   | `null`                             | Sets the border-color property on `:hover` state.                             |
| `$track-border-color-focus`   | `null`                             | Sets the border-color property on `:focus` state.                             |
| `$track-border-color-active`  | `null`                             | Sets the border-color property on `:active` state.                            |
| `$track-border-color-checked` | `$color`                           | Sets the border-color property on `:checked` state.                           |
| `$track-border-width`         | `2px`                              | Sets the border-width property for the `switch__track` element.               |
| `$track-border-radius`        | `core.$border-radius-circle`       | Sets the border-radius property for the `switch__track` element.              |
| `$thumb-size`                 | `16px`                             | Sets the width and height of the `switch__thumb` element.                     |
| `$thumb-background`           | `core.$white`                      | Sets the background-color property for the `switch__thumb` element.           |
| `$thumb-background-hover`     | `null`                             | Sets the background-color property on `:hover` state.                         |
| `$thumb-background-focus`     | `null`                             | Sets the background-color property on `:focus` state.                         |
| `$thumb-background-active`    | `null`                             | Sets the background-color property on `:active` state.                        |
| `$thumb-background-checked`   | `null`                             | Sets the background-color property on `:checked` state.                       |
| `$thumb-box-shadow`           | `0 0 0 2px core.$gray-400`         | Sets the box-shadow property for the `switch__thumb` element.                 |
| `$thumb-box-shadow-hover`     | `0 0 0 2px $color`                 | Sets the box-shadow property on `:hover` state.                               |
| `$thumb-box-shadow-focus`     | `0 0 0 2px $color`                 | Sets the box-shadow property on `:focus` state.                               |
| `$thumb-box-shadow-active`    | `0 0 0 2px $color`                 | Sets the box-shadow property on `:active` state.                              |
| `$thumb-box-shadow-checked`   | `0 0 0 2px $color`                 | Sets the box-shadow property on `:checked` state.                             |
