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

For checkboxes with labels, just wrap the checkbox component along with label text using the `<label>` element.

```html
<label>
  <span class="checkbox">
    ...
  </span>
  Checkbox with a label
</label>
```

## Customization

### Sass Variables

| Variable                      | Default                                                 | Description                                                                                                                   |
| ----------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                                                  | String to prefix blocks with.                                                                                                 |
| `$prefix-element`             | `"__"`                                                  | String to prefix element with.                                                                                                |
| `$prefix-modifier`            | `"_"`                                                   | String to prefix modifier with.                                                                                               |
| `$prefix-modifier-value`      | `"_"`                                                   | String to prefix modifier values with.                                                                                        |
| `$color`                      | `core.$primary`                                         | Sets the base color theme for the checkbox component.                                                                         |
| `$size`                       | `2.5em`                                                 | Sets the width and height of the `checkbox__background` element.                                                              |
| `$transition-duration`        | `core.$transition-duration-short`                       | Sets the transition-duration property for the `checkbox__icon` element.                                                       |
| `$transition-timing-function` | `core.$transition-timing-function-sharp`                | Sets the transition-timing-function property for the `checkbox__icon` element.                                                |
| `$background`                 | `transparent`                                           | Sets the background-color property for the `checkbox__background` element.                                                    |
| `$background-hover`           | `rgba(core.$black, 0.03)`                               | Sets the background-color property on `:hover` state.                                                                         |
| `$background-focus`           | `rgba(core.$black, 0.03)`                               | Sets the background-color property on `:focus` state.                                                                         |
| `$background-active`          | `rgba(core.$black, 0.06)`                               | Sets the background-color property on `:active` state.                                                                        |
| `$background-checked`         | `null`                                                  | Sets the background-color property on `:checked` state.                                                                       |
| `$background-border-radius`   | `core.$border-radius-circle`                            | Sets the border-radius property for the `checkbox__background` element.                                                       |
| `$box-size`                   | `18px`                                                  | Sets the width and height of the `checkbox__box` element.                                                                     |
| `$box-background`             | `null`                                                  | Sets the background-color property for the `checkbox__box` element.                                                           |
| `$box-background-hover`       | `null`                                                  | Sets the background-color property on `:hover` state.                                                                         |
| `$box-background-focus`       | `null`                                                  | Sets the background-color property on `:focus` state.                                                                         |
| `$box-background-active`      | `null`                                                  | Sets the background-color property on `:active` state.                                                                        |
| `$box-background-checked`     | `$color`                                                | Sets the background-color property on `:checked` state.                                                                       |
| `$box-border-color`           | `core.$gray-400`                                        | Sets the border-color property for the `checkbox__box` element.                                                               |
| `$box-border-color-hover`     | `$color`                                                | Sets the border-color property on `:hover` state.                                                                             |
| `$box-border-color-focus`     | `$color`                                                | Sets the border-color property on `:focus` state.                                                                             |
| `$box-border-color-active`    | `$color`                                                | Sets the border-color property on `:active` state.                                                                            |
| `$box-border-color-checked`   | `$color`                                                | Sets the border-color property on `:checked` state.                                                                           |
| `$box-border-width`           | `2px`                                                   | Sets the border-width property on the `checkbox__box` element.                                                                |
| `$box-border-radius`          | `core.$border-radius`                                   | Sets the border-radius property on the `checkbox__box` element.                                                               |
| `$icon-size`                  | `12px`                                                  | Sets the width and height property on the `checkbox__icon` svg data:image.                                                    |
| `$icon-color`                 | `core.$white`                                           | Sets the stroke property on the `checkbox__icon` svg data:image.                                                              |
| `$icon-stroke`                | `2.5`                                                   | Sets the stroke-width property on the `checkbox__icon` svg data:image.                                                        |
| `$icon-checked`               | [`'data:image/svg...'` Ref &darr;](#icon-checked)       | The data:image/svg string used as the background-image property for the `checkbox__icon` element.                             |
| `$icon-indeterminate`         | [`'data:image/svg...'` Ref &darr;](#icon-indeterminate) | The data:image/svg string used as the background-image property for the `checkbox__icon` element in it's indeterminate state. |

#### `$icon-checked`

```scss
$icon-checked: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="#{$icon-size}" height="#{$icon-size}" fill="none" stroke="#{core.encodecolor($icon-color)}" stroke-width="#{$icon-stroke}" stroke-linecap="round" stroke-linejoin="round"><polyline points="9.5,3 4.5,8.5 2,6"></polyline></svg>' !default;
```

#### `$icon-indeterminate`

```scss
$icon-indeterminate: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="#{$icon-size}" height="#{$icon-size}" fill="none" stroke="#{core.encodecolor($icon-color)}" stroke-width="#{$icon-stroke}" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="6" x2="10" y2="6" /></svg>' !default;
```

### JavaScript Options

| Key          | Default          | Description                                                        |
| ------------ | ---------------- | ------------------------------------------------------------------ |
| `autoInit`   | `false`          | Automatically initializes the instance.                            |
| `stateAttr`  | `'aria-checked'` | Attribute to check mixed state against.                            |
| `StateValue` | `'mixed'`        | The mixed value to check for. Applied as the value of `stateAttr`. |

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
