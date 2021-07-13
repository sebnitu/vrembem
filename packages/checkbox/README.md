# Checkbox

Checkboxes allow the user to select multiple options from a set.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fcheckbox.svg)](https://www.npmjs.com/package/%40vrembem%2Fcheckbox)

[Documentation](https://vrembem.com/packages/checkbox)

## Installation

```sh
npm install @vrembem/checkbox
```

### Styles

```scss
@use "@vrembem/checkbox";
```

### JavaScript

```js
import Checkbox from '@vrembem/checkbox';
const checkbox = new Checkbox({ autoInit: true });
```

### Markup

Checkboxes are composed using a set of `<span>` elements alongside the native `<input type="checkbox">` element which should be given the `checkbox__native` class and come before the remaining presentational `<span>` elements.

```html
<span class="checkbox">
  <input type="checkbox" class="checkbox__native">
  <span class="checkbox__background">
    <span class="checkbox__box">
      <span class="checkbox__icon"></span>
    </span>
  </span>
</span>
```

> For indeterminate checkboxes, apply the `aria-checked="mixed"` attribute to the `<input type="checkbox">` element and initialize the checkbox component script.

#### checkbox + label

For checkboxes with labels, just wrap the checkbox component along with label text using the `<label>` element.

```html
<label>
  <span class="checkbox">
    ...
  </span>
  Checkbox with a label
</label>
```

## Modifiers

### `checkbox_size_[value]`

Adjust the size of a checkbox by increasing or decreasing its width and height. By default, the checkbox scale will provide a checkbox height of 30px (small `checkbox_size_sm`), 40px (default) and 50px (large `checkbox_size_lg`).

```html
<span class="checkbox checkbox_size_sm">
  ...
</span>

<span class="checkbox checkbox_size_lg">
  ...
</span>
```

#### Available Variations

- `checkbox_size_sm`
- `checkbox_size_lg`

## Customization

### Sass Variables

| Variable                      | Default                                  | Description                                                                                                    |
| ----------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                                   | String to prefix blocks with.                                                                                  |
| `$prefix-element`             | `"__"`                                   | String to prefix elements with.                                                                                |
| `$prefix-modifier`            | `"_"`                                    | String to prefix modifiers with.                                                                               |
| `$prefix-modifier-value`      | `"_"`                                    | String to prefix modifier values with.                                                                         |
| `$color`                      | `core.$primary`                          | Sets the base color theme for the checkbox component.                                                          |
| `$size`                       | `core.$form-control-size`                | Sets the width and height of the `checkbox__background` element.                                               |
| `$border-width`               | `2px`                                    | Sets the border-width property for the `checkbox__box` element.                                                |
| `$transition-duration`        | `core.$transition-duration-short`        | Sets the transition-duration property for the `checkbox__icon` element.                                        |
| `$transition-timing-function` | `core.$transition-timing-function-sharp` | Sets the transition-timing-function property for the `checkbox__icon` element.                                 |
| `$background`                 | `transparent`                            | Sets the background-color property for the `checkbox__background` element.                                     |
| `$background-hover`           | `rgba($color, 0.1)`                      | Sets the background-color property on `:hover` state.                                                          |
| `$background-focus`           | `rgba($color, 0.1)`                      | Sets the background-color property on `:focus` state.                                                          |
| `$background-active`          | `rgba($color, 0.2)`                      | Sets the background-color property on `:active` state.                                                         |
| `$background-checked`         | `null`                                   | Sets the background-color property on `:checked` state.                                                        |
| `$background-border-radius`   | `core.$border-radius-circle`             | Sets the border-radius property for the `checkbox__background` element.                                        |
| `$box-size`                   | `18px`                                   | Sets the width and height of the `checkbox__box` element.                                                      |
| `$box-background`             | `core.$white`                            | Sets the background-color property for the `checkbox__box` element.                                            |
| `$box-background-hover`       | `null`                                   | Sets the background-color property on `:hover` state.                                                          |
| `$box-background-focus`       | `null`                                   | Sets the background-color property on `:focus` state.                                                          |
| `$box-background-active`      | `null`                                   | Sets the background-color property on `:active` state.                                                         |
| `$box-background-checked`     | `$color`                                 | Sets the background-color property on `:checked` state.                                                        |
| `$box-border-color`           | `core.$gray-400`                         | Sets the border-color property for the `checkbox__box` element.                                                |
| `$box-border-color-hover`     | `$color`                                 | Sets the border-color property on `:hover` state.                                                              |
| `$box-border-color-focus`     | `$color`                                 | Sets the border-color property on `:focus` state.                                                              |
| `$box-border-color-active`    | `$color`                                 | Sets the border-color property on `:active` state.                                                             |
| `$box-border-color-checked`   | `$color`                                 | Sets the border-color property on `:checked` state.                                                            |
| `$box-border-radius`          | `core.$border-radius`                    | Sets the border-radius property for the `checkbox__box` element.                                               |
| `$icon-size`                  | `12px`                                   | Sets the width and height property for the `checkbox__icon` svg data:image.                                    |
| `$icon-color`                 | `core.$white`                            | Sets the stroke property for the `checkbox__icon` svg data:image.                                              |
| `$icon-stroke`                | `2.5`                                    | Sets the stroke-width property for the `checkbox__icon` svg data:image.                                        |
| `$size-sm`                    | `core.$form-control-size-sm`             | Sets the width and height of the `checkbox__background` element of the `checkbox_size_sm` modifier.            |
| `$size-sm-border-width`       | `2px`                                    | Sets the border-width property for the `checkbox__box` element of the `checkbox_size_sm` modifier.             |
| `$size-sm-box`                | `14px`                                   | Sets the width and height of the `checkbox__box` element of the `checkbox_size_sm` modifier.                   |
| `$size-sm-icon`               | `10px`                                   | Sets the width and height property for the `checkbox__icon` svg data:image of the `checkbox_size_sm` modifier. |
| `$size-sm-icon-stroke`        | `2.5`                                    | Sets the stroke-width property for the `checkbox__icon` svg data:image of the `checkbox_size_sm` modifier.     |
| `$size-lg`                    | `core.$form-control-size-lg`             | Sets the width and height of the `checkbox__background` element of the `checkbox_size_lg` modifier.            |
| `$size-lg-border-width`       | `2.5px`                                  | Sets the border-width property for the `checkbox__box` element of the `checkbox_size_lg` modifier.             |
| `$size-lg-box`                | `24px`                                   | Sets the width and height of the `checkbox__box` element of the `checkbox_size_lg` modifier.                   |
| `$size-lg-icon`               | `18px`                                   | Sets the width and height property for the `checkbox__icon` svg data:image of the `checkbox_size_lg` modifier. |
| `$size-lg-icon-stroke`        | `2`                                      | Sets the stroke-width property for the `checkbox__icon` svg data:image of the `checkbox_size_lg` modifier.     |

### JavaScript Options

| Key          | Default          | Description                                                        |
| ------------ | ---------------- | ------------------------------------------------------------------ |
| `autoInit`   | `false`          | Automatically initializes the instance.                            |
| `stateAttr`  | `'aria-checked'` | Attribute to check mixed state against.                            |
| `StateValue` | `'mixed'`        | The mixed value to check for. Applied as the value of `stateAttr`. |

## Sass Functions

### `@function icon-check($size, $color, $stroke)`

Outputs data image string for check SVG icon. Used as the value of `url()` in background-image property.

**Returns:** `String` - Data image string

**Arguments**

| Variable  | Type                 | Description                            |
| --------- | -------------------- | -------------------------------------- |
| `$size`   | `number (with unit)` | Value for width and height attributes. |
| `$color`  | `color`              | Value for stroke attribute.            |
| `$stroke` | `number (unitless)`  | Value for stroke-width attribute.      |

**Example**

```scss
.icon-check {
  background-image: url(icon-check(18px, #fff, 2));
}

// CSS Output
.icon-check {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" stroke="%23FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9.5,3 4.5,8.5 2,6"></polyline></svg>');
}
```

### `@function icon-minus($size, $color, $stroke)`

Outputs data image string for minus SVG icon. Used as the value of `url()` in background-image property.

**Returns:** `String` - Data image string

**Arguments**

| Variable  | Type                 | Description                            |
| --------- | -------------------- | -------------------------------------- |
| `$size`   | `number (with unit)` | Value for width and height attributes. |
| `$color`  | `color`              | Value for stroke attribute.            |
| `$stroke` | `number (unitless)`  | Value for stroke-width attribute.      |

**Example**

```scss
.icon-minus {
  background-image: url(icon-minus(18px, #fff, 2));
}

// CSS Output
.icon-minus {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" stroke="%23FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="6" x2="10" y2="6" /></svg>');
}
```

## API

### `checkbox.init(options)`

Initializes the checkbox instance. During initialization, the following processes are run:

- Sets checkboxes to the `indeterminate` state that match the provided attribute and values.
- Attaches the click event listener that handles switching off the indeterminate state.

**Parameters**

- `options [Object] (optional)` An options object for passing your custom settings.

```js
const checkbox = new Checkbox();
checkbox.init();
```

### `checkbox.destroy()`

Destroys and cleans up the checkbox instantiation. For the checkbox component, this just involves removing the `click` event listener.

```js
const checkbox = new Checkbox();
checkbox.init();
// ...
checkbox.destroy();
```

### `checkbox.setAriaState(el, value)`

Sets the aria attribute value for mixed checkboxes.

**Parameters**

- `el` The element or elements whose aria state should be set.
- `value` `(Default: settings.stateValue)` The value that should be set to the aria attribute.

> Example removes presentational `<span>` elements for brevity but should be included in your implementation.

```html
<!-- Initial HTML -->
<input type="checkbox" class="checkbox__native">
<input type="checkbox" class="checkbox__native">
<input type="checkbox" class="checkbox__native">
```

```js
const els = document.querySelectorAll('.checkbox__native');
checkbox.setAriaState(els);
```

```html
<!-- Result -->
<input type="checkbox" class="checkbox__native" aria-checked="mixed">
<input type="checkbox" class="checkbox__native" aria-checked="mixed">
<input type="checkbox" class="checkbox__native" aria-checked="mixed">
```

### `checkbox.removeAriaState(el)`

Removes the aria attribute value for mixed checkboxes.

**Parameters**

- `el` The element or elements whose aria state should be removed.

> Example removes presentational `<span>` elements for brevity but should be included in your implementation.

```html
<!-- Initial HTML -->
<input type="checkbox" class="checkbox__native" aria-checked="mixed">
<input type="checkbox" class="checkbox__native" aria-checked="mixed">
<input type="checkbox" class="checkbox__native" aria-checked="mixed">
```

```js
const els = document.querySelectorAll('.checkbox__native');
checkbox.removeAriaState(els);
```

```html
<!-- Result -->
<input type="checkbox" class="checkbox__native">
<input type="checkbox" class="checkbox__native">
<input type="checkbox" class="checkbox__native">
```

### `checkbox.setIndeterminate(el)`

Sets the indeterminate state of a checkbox based on whether or not the `aria-checkbox` attribute is set to `"mixed"` if using the default settings.

**Parameters**

- `el` The element or elements whose indeterminate state should be set.

```js
const els = document.querySelectorAll('.checkbox__native');
checkbox.setIndeterminate(els);
```

> To learn more about the indeterminate state, [click here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate). It's important to note that this state is set using the HTMLInputElement object's indeterminate property via JavaScript (it cannot be set using an HTML attribute).
