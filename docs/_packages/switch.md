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

## switch + label

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
      <!-- switch__background -->
      <!-- switch__track -->
      <!-- switch__thumb -->
    </tbody>
  </table>
</div>
