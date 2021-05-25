---
layout: article
title: Input
description: "A component for displaying form input elements."
package: "@vrembem/input"
category: simple
usage:
  npm: true
  scss: true
---

## input

The most basic implementation of the input component consists of the `input` class applied to an `<input>` element.

{% include demo_open.html %}
<div class="level">
  <span>
    <input class="input" type="text">
  </span>
  <span>
    <button class="button">Button</button>
  </span>
</div>
{% include demo_switch.html %}
```html
<input class="input" type="text">
```
{% include demo_close.html %}

### disabled

Adding the boolean `disabled` attribute to the input will provide visual indication that the input is not available for use.

{% include demo_open.html %}
<div class="gap-y">
  <input class="input" type="text" disabled>
</div>
{% include demo_switch.html %}
```html
<input class="input" type="text" disabled>
```
{% include demo_close.html %}

### readonly

Adding the boolean `readonly` attribute to the input will provide visual indication that the user should not be able to edit the value of the input.

{% include demo_open.html %}
<div class="gap-y">
  <input class="input" type="text" value="email@example.com" readonly>
</div>
{% include demo_switch.html %}
```html
<input class="input" type="text" value="..." readonly>
```
{% include demo_close.html %}

## input_auto

Sets the width of an input to `auto` instead of the base component width of `100%`.

{% include demo_open.html %}
<input class="input input_auto" type="text">
{% include demo_switch.html %}
```html
<input class="input input_auto" type="text">
```
{% include demo_close.html %}

## input_size_[value]

Adjust the size of an input by increasing or decreasing its padding and font-size. By default, the input scale will provide an input height of 30px (small `input_size_sm`), 40px (default) and 50px (large `input_size_lg`).

{% include demo_open.html class_parent="gap-y" %}
<input class="input input_size_sm" type="text">
<input class="input input_size_lg" type="text">
{% include demo_switch.html %}
```html
<input class="input input_size_sm" type="text">
<input class="input input_size_lg" type="text">
```
{% include demo_close.html %}

### Available Variations

- `button_size_sm`
- `button_size_lg`

## input_state_[value]

Adds styles for changing the look and feel of an input to better reflect the urgency or status.

{% include demo_open.html class_parent="gap-y" %}
<input class="input input_state_info" type="text">
<input class="input input_state_success" type="text">
<input class="input input_state_caution" type="text">
<input class="input input_state_danger" type="text">
{% include demo_switch.html %}
```html
<input class="input input_state_info" type="text">
<input class="input input_state_success" type="text">
<input class="input input_state_caution" type="text">
<input class="input input_state_danger" type="text">
```
{% include demo_close.html %}

### Available Variations

- `input_state_info`
- `input_state_success`
- `input_state_caution`
- `input_state_danger`

## input_type_[value]

Adds unique styles for various form input types. These form controls share styles with the basic form input such as [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) and [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) HTML elements.

{% include demo_open.html %}
<select class="input input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
{% include demo_switch.html %}
```html
<select class="input input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
```
{% include demo_close.html %}

{% include demo_open.html class_parent="gap-y" %}
<textarea class="input input_type_textarea" rows="3"></textarea>
{% include demo_switch.html %}
```html
<textarea class="input input_type_textarea" rows="3"></textarea>
```
{% include demo_close.html %}

### Available Variations

- `input_type_select`
- `input_type_textarea`

## Sass Variables

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
    </tbody>
  </table>
</div>
