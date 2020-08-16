---
layout: article
title: Checkbox
description: "Checkboxes allow the user to select multiple options from a set."
package: "@vrembem/checkbox"
category: simple
usage:
  npm: true
  scss: true
  js: true
---

## checkbox

Checkboxes are composed using a set of `<span>` elements alongside the native `<input type="cehckbox">` element which should be given the `checkbox__native` class and come before the remaining presentational `<span>` elements.

{% include demo_open.html %}
  {% include checkbox.html checked="" %}
  {% include checkbox.html indeterminate="true" %}
  {% include checkbox.html %}
{% include demo_switch.html %}
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
{% include demo_close.html %}

<div class="notice notice_type_info type"  markdown="1">
For indeterminate checkboxes, apply the `aria-checked="mixed"` attribute to the `<input type="checkbox">` element and initialize the checkbox component script.
</div>

```js
import Checkbox from "@vrembem/checkbox";
const checkbox = new Checkbox({ autoInit: true });
```

## checkbox + label

For checkboxes with lables, just wrap the checkbox component along with label text using the `<label>` element.

{% include demo_open.html %}
<p>
  <label>
    {% include checkbox.html checked="" %}
    Checkbox with a label
  </label>
</p>
<p>
  <label>
    {% include checkbox.html indeterminate="true" %}
    Checkbox with a label
  </label>
</p>
<p>
  <label>
    {% include checkbox.html %}
    Checkbox with a label
  </label>
</p>
{% include demo_switch.html %}
```html
<label>
  <span class="checkbox">
    <input type="checkbox" class="checkbox__native">
    <span class="checkbox__background">
      <span class="checkbox__box">
        <span class="checkbox__icon"></span>
      </span>
    </span>
  </span>
  Checkbox with a label
</label>
```
{% include demo_close.html %}

## Sass variables

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <!-- Prefixes -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-block</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifier values with.</td>
      </tr>

      <!-- General styles -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$primary</code></td>
        <td data-mobile-label="Desc">Sets the base color theme for the checkbox component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2.5em</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">checkbox__background</code> element.</td>
      </tr>

      <tr>
        <td data-mobile-label="Var"><code class="code">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$transition-duration-short</code></td>
        <td data-mobile-label="Desc">Sets the transition-duration property for the <code class="code">checkbox__icon</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$transition-timing-function-sharp</code></td>
        <td data-mobile-label="Desc">Sets the transition-timing-function property for the <code class="code">checkbox__icon</code> element.</td>
      </tr>

      <!-- checkbox__background -->
      <tr>
        <td data-mobile-label="Var"><code class="code">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">transparent</code></td>
        <td data-mobile-label="Desc">Sets the background-color property for the <code class="code">checkbox__background</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.03)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.03)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.06)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$background-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:checked</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$background-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-radius-circle</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property for the <code class="code">checkbox__background</code> element.</td>
      </tr>

      <!-- checkbox__box -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">18px</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">checkbox__box</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property for the <code class="code">checkbox__box</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-background-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">$color</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:checked</code> state.</td>
      </tr>

      <tr>
        <td data-mobile-label="Var"><code class="code">$box-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$gray-400</code></td>
        <td data-mobile-label="Desc">Sets the border-color property for the <code class="code">checkbox__box</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">$color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-border-color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">$color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-border-color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">$color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-border-color-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">$color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:checked</code> state.</td>
      </tr>

      <tr>
        <td data-mobile-label="Var"><code class="code">$box-border-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">2px</code></td>
        <td data-mobile-label="Desc">Sets the border-width property on the <code class="code">checkbox__box</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$box-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property on the <code class="code">checkbox__box</code> element.</td>
      </tr>

      <!-- checkbox__icon -->
      <tr>
        <td data-mobile-label="Var"><code class="code">$icon-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">12px</code></td>
        <td data-mobile-label="Desc">Sets the width and height property on the <code class="code">checkbox__icon</code> svg data:image.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$icon-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the stroke property on the <code class="code">checkbox__icon</code> svg data:image.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$icon-stroke</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">2.5</code></td>
        <td data-mobile-label="Desc">Sets the stroke-width property on the <code class="code">checkbox__icon</code> svg data:image.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$icon-checked</code></td>
        <td data-mobile-label="Default"><a class="link" href="#icon-checked"><code class="code color-secondary">'data:image/svg...'</code> Ref &darr;</a></td>
        <td data-mobile-label="Desc">The data:image/svg string used as the background-image property for the <code class="code">checkbox__icon</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$icon-indeterminate</code></td>
        <td data-mobile-label="Default"><a class="link" href="#icon-indeterminate"><code class="code color-secondary">'data:image/svg...'</code> Ref &darr;</a></td>
        <td data-mobile-label="Desc">The data:image/svg string used as the background-image property for the <code class="code">checkbox__icon</code> element in it's indeterminate state.</td>
      </tr>

    </tbody>
  </table>
</div>

### `$icon-checked`

```scss
$icon-checked: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="#{$icon-size}" height="#{$icon-size}" fill="none" stroke="#{core.encodecolor($icon-color)}" stroke-width="#{$icon-stroke}" stroke-linecap="round" stroke-linejoin="round"><polyline points="9.5,3 4.5,8.5 2,6"></polyline></svg>' !default;
```

### `$icon-indeterminate`

```scss
$icon-indeterminate: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="#{$icon-size}" height="#{$icon-size}" fill="none" stroke="#{core.encodecolor($icon-color)}" stroke-width="#{$icon-stroke}" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="6" x2="10" y2="6" /></svg>' !default;
```

## JavaScript Options

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr class="border_top_0">
        <th>Key</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">autoInit</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">false</code></td>
        <td data-mobile-label="Desc">Automatically instantiates the instance.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">stateAttr</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'aria-checked'</code></td>
        <td data-mobile-label="Desc">Attribute to check mixed state against.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">stateValue</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'mixed'</code></td>
        <td data-mobile-label="Desc">The mixed value to check for. Applied as the value of <code class="code">stateAttr</code>.</td>
      </tr>
    </tbody>
  </table>
</div>

## API

### `checkbox.init(options)`

Initializes the checkbox instance. During initialization, the following processes are run:

- Sets checkboxes to the `indeterminate` state that match the provided attribute and values.
- Attaches the click event listener that handles switching off the indeterminate state.

**Parameters**

- `options [Object] (optional)` An options object for passing yout custom settings.

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

- `el` The element or elements whos aria state should be set.
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

- `el` The element or elements whos aria state should be removed.

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

- `el` The element or elements whos indeterminate state should be set.

```js
const els = document.querySelectorAll('.checkbox__native');
checkbox.setIndeterminate(els);
```

> To learn more about the indeterminate state, [click here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate). It's important to note that this state is set using the HTMLInputElement object's indeterminate property via JavaScript (it cannot be set using an HTML attribute).
