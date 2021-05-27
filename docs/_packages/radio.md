---
layout: article
title: Radio
description: "Radios allow the user to select a single option from a set."
package: "@vrembem/radio"
category: simple
usage:
  npm: true
  scss: true
---

## radio

Radio buttons are composed using a set of `<span>` elements alongside the native `<input type="radio">` element which should be given the `radio__native` class and come before the remaining presentational `<span>` elements.

{% include demo_open.html %}
  {% include radio.html name="radio-1" checked="" %}
  {% include radio.html name="radio-1" %}
{% include demo_switch.html %}
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
{% include demo_close.html %}

### radio + label

For radio buttons with labels, just wrap the radio component along with label text using the `<label>` element.

{% include demo_open.html %}
<p>
  <label>
    {% include radio.html name="radio-2" checked="" %}
    Radio with a label
  </label>
</p>
<p>
  <label>
    {% include radio.html name="radio-2" %}
    Radio with a label
  </label>
</p>
{% include demo_switch.html %}
```html
<label>
  <span class="radio">
    <input type="radio" class="radio__native" name="...">
    <span class="radio__background">
      <span class="radio__circle">
        <span class="radio__dot"></span>
      </span>
    </span>
  </span>
  Radio with a label
</label>
```
{% include demo_close.html %}

## radio_size_[value]

Adjust the size of a radio by increasing or decreasing its width and height. By default, the radio scale will provide a radio height of 30px (small `radio_size_sm`), 40px (default) and 50px (large `radio_size_lg`).

{% include demo_open.html class_parent="gap-y" %}
<div>
  {% include radio.html name="radio-3" class="radio_size_sm" checked="" %}
  {% include radio.html name="radio-3" class="radio_size_sm" indeterminate="true" %}
  {% include radio.html name="radio-3" class="radio_size_sm" %}
</div>
<div>
  {% include radio.html name="radio-4" class="radio_size_lg" checked="" %}
  {% include radio.html name="radio-4" class="radio_size_lg" indeterminate="true" %}
  {% include radio.html name="radio-4" class="radio_size_lg" %}
</div>
{% include demo_switch.html %}
```html
<span class="radio radio_size_sm">
  ...
</span>

<span class="radio radio_size_lg">
  ...
</span>
```
{% include demo_close.html %}

### Available Variations

- `radio_size_sm`
- `radio_size_lg`

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
      <!-- General -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$primary</code></td>
        <td data-mobile-label="Desc">Sets the base color theme for the radio component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$form-control-size</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">radio__background</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2px</code></td>
        <td data-mobile-label="Desc">Sets the background-color property for the <code class="code">radio__circle</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-duration-short</code></td>
        <td data-mobile-label="Desc">Sets the transition-duration property for the <code class="code">radio__dot</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-timing-function-sharp</code></td>
        <td data-mobile-label="Desc">Sets the transition-timing-function property for the <code class="code">radio__dot</code> element.</td>
      </tr>
      <!-- radio__background -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba(core.$black, 0.03)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba(core.$black, 0.03)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba(core.$black, 0.06)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:checked</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius-circle</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property for the <code class="code">radio__background</code> element.</td>
      </tr>
      <!-- radio__circle -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">20px</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">radio__circle</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property for the <code class="code">radio__circle</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-background-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:checked</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$gray-400</code></td>
        <td data-mobile-label="Desc">Sets the background-color property for the <code class="code">radio__circle</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-border-color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-border-color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-border-color-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:checked</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$circle-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property for the <code class="code">radio__circle</code> element.</td>
      </tr>
      <!-- radio__dot -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$dot-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">8px</code></td>
        <td data-mobile-label="Desc">Sets the width and height property for the <code class="code">radio__dot</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$dot-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background-color property for the <code class="code">radio__dot</code> element.</td>
      </tr>
    </tbody>
  </table>
</div>
