---
layout: article
title: "Switch"
description: "Switches are a binary form element used to toggle between two options."
package: "@vrembem/switch"
category: simple
usage:
  npm: true
  scss: true
---

## switch

Switch form controls are composed using a set of `<span>` elements alongside the native `<input type="checkbox">` element which should be given the `switch__native` class and come before the remaining presentational `<span>` elements.

{% include demo_open.html %}
  {% include switch.html checked="" %}
  {% include switch.html %}
{% include demo_switch.html %}
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
{% include demo_close.html %}

### switch + label

For switch with labels, just wrap the switch component along with label text using the `<label>` element.

{% include demo_open.html %}
<p>
  <label>
    {% include switch.html checked="" %}
    Switch with a label
  </label>
</p>
<p>
  <label>
    {% include switch.html %}
    Switch with a label
  </label>
</p>
{% include demo_switch.html %}
```html
<label>
  <span class="switch">
    <input type="checkbox" class="switch__native">
    <span class="switch__background">
      <span class="switch__track">
        <span class="switch__thumb"></span>
      </span>
    </span>
  </span>
  Switch with a label
</label>
```
{% include demo_close.html %}

## switch_size_[value]

Adjust the size of a switch by increasing or decreasing its width and height. By default, the switch scale will provide a switch height of 30px (small <code class="code">switch_size_sm</code>), 40px (default) and 50px (large <code class="code">switch_size_lg</code>).

{% include demo_open.html class_parent="gap-y" %}
<div>
  {% include switch.html class="switch_size_sm" checked="" %}
  {% include switch.html class="switch_size_sm" %}
</div>
<div>
  {% include switch.html class="switch_size_lg" checked="" %}
  {% include switch.html class="switch_size_lg" %}
</div>
{% include demo_switch.html %}
```html
<span class="switch switch_size_sm">
  ...
</span>

<span class="switch switch_size_lg">
  ...
</span>
```
{% include demo_close.html %}

### Available Variations

- <code class="code">switch_size_sm</code>
- <code class="code">switch_size_lg</code>

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
        <td data-mobile-label="Desc">Sets the base color theme for the switch component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$form-control-size</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">switch__background</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2px</code></td>
        <td data-mobile-label="Desc">Sets the border-width property for the <code class="code">switch__track</code> element and box-shadow spread for other elements and states.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$transition-duration-short</code></td>
        <td data-mobile-label="Desc">Sets the transition-duration property for the <code class="code">switch__thumb</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$transition-timing-function-sharp</code></td>
        <td data-mobile-label="Desc">Sets the transition-timing-function property for the <code class="code">switch__thumb</code> element.</td>
      </tr>
      <!-- switch__background -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">transparent</code></td>
        <td data-mobile-label="Desc">Sets the background-color property for the <code class="code">switch__background</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba($color, 0.1)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba($color, 0.1)</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">rgba($color, 0.2)</code></td>
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
        <td data-mobile-label="Desc">Sets the border-radius property for the <code class="code">switch__background</code> element.</td>
      </tr>
      <!-- switch__track -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">20px</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">switch__track</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$gray-200</code></td>
        <td data-mobile-label="Desc">Sets the background-color property for the <code class="code">switch__track</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-background-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:checked</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$gray-400</code></td>
        <td data-mobile-label="Desc">Sets the border-color property for the <code class="code">switch__track</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-border-color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-border-color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-border-color-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:checked</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$track-border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius-circle</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property for the <code class="code">switch__track</code> element.</td>
      </tr>
      <!-- switch__thumb -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background-color property for the <code class="code">switch__thumb</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-background-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:checked</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-box-shadow-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$gray-400</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow color property for the <code class="code">switch__thumb</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-box-shadow-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-box-shadow-color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-box-shadow-color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$thumb-box-shadow-color-checked</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$color</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow color property on <code class="code">:checked</code> state.</td>
      </tr>
      <!-- switch_size_[value] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">switch__background</code> element of the <code class="code">switch_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-border-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2px</code></td>
        <td data-mobile-label="Desc">Sets the border-width property for the <code class="code">switch__track</code> element and box-shadow spread for other elements and states of the <code class="code">switch_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-track</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">16px</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">switch__track</code> element of the <code class="code">switch_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">switch__background</code> element of the <code class="code">switch_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-border-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2.5px</code></td>
        <td data-mobile-label="Desc">Sets the border-width property for the <code class="code">switch__track</code> element and box-shadow spread for other elements and states of the <code class="code">switch_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-track</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">26px</code></td>
        <td data-mobile-label="Desc">Sets the width and height of the <code class="code">switch__track</code> element of the <code class="code">switch_size_lg</code> modifier.</td>
      </tr>
    </tbody>
  </table>
</div>
