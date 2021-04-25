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

| Variable                 | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| `$prefix-block`          | `null`  | String to prefix blocks with.          |
| `$prefix-element`        | `"__"`  | String to prefix element with.         |
| `$prefix-modifier`       | `"_"`   | String to prefix modifier with.        |
| `$prefix-modifier-value` | `"_"`   | String to prefix modifier values with. |

<!--
$color: core.$primary !default;
$size: 2.5em !default;
$transition-duration: core.$transition-duration !default;
$transition-timing-function: core.$transition-timing-function !default;

$background: transparent !default;
$background-hover: rgba(core.$black, 0.03) !default;
$background-focus: rgba(core.$black, 0.03) !default;
$background-active: rgba(core.$black, 0.06) !default;
$background-checked: null !default;
$background-border-radius: core.$border-radius-circle !default;

$track-size: 20px !default;
$track-background: core.$gray-200 !default;
$track-background-hover: null !default;
$track-background-focus: null !default;
$track-background-active: null !default;
$track-background-checked: core.$primary-lighter !default;
$track-border-color: core.$gray-400 !default;
$track-border-color-hover: null !default;
$track-border-color-focus: null !default;
$track-border-color-active: null !default;
$track-border-color-checked: $color !default;
$track-border-width: 2px !default;
$track-border-radius: core.$border-radius-circle !default;

$thumb-size: 16px !default;
$thumb-background: core.$white !default;
$thumb-background-hover: null !default;
$thumb-background-focus: null !default;
$thumb-background-active: null !default;
$thumb-background-checked: null !default;
$thumb-box-shadow: 0 0 0 2px core.$gray-400 !default;
$thumb-box-shadow-hover: 0 0 0 2px $color !default;
$thumb-box-shadow-focus: 0 0 0 2px $color !default;
$thumb-box-shadow-active: 0 0 0 2px $color !default;
$thumb-box-shadow-checked: 0 0 0 2px $color !default;
-->
