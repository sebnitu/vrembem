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
<input class="input" type="text">
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
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifier values with.</td>
      </tr>
      <!-- General -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size</code></td>
        <td data-mobile-label="Desc">Sets the height property on <code class="code">input</code> and min-height property of the <code class="code">input_type_textarea</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">calc(0.5em - 1px)</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-property</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">box-shadow, outline, outline-offset</code></td>
        <td data-mobile-label="Desc">Sets the transition-property property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$transition-duration-short</code></td>
        <td data-mobile-label="Desc">Sets the transition-duration property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$transition-timing-function</code></td>
        <td data-mobile-label="Desc">Sets the transition-timing-function property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-placeholder</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$color-subtle</code></td>
        <td data-mobile-label="Desc">Sets the color property for the placeholder pseudo-element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size</code></td>
        <td data-mobile-label="Desc">Sets the font-size property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$line-height</code></td>
        <td data-mobile-label="Desc">Sets the line-height property.</td>
      </tr>
      <!-- border -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1px solid core.$border-color-dark</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-color-darker</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$primary</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <!-- background -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <!-- box-shadow -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">0 0 0 0 rgba(core.$primary, 0), inset 0 0.1rem 0.2rem rgba(core.$black, 0.1)</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">0 0 0 0.2rem rgba(core.$primary, 0.5), inset 0 0 0 rgba(core.$black, 0)</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property on <code class="code">:focus</code> state.</td>
      </tr>
      <!-- color -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$color</code></td>
        <td data-mobile-label="Desc">Sets the color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:focus</code> state.</td>
      </tr>
      <!-- outline -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">none</code></td>
        <td data-mobile-label="Desc">Sets the outline property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline property on <code class="code">:focus</code> state.</td>
      </tr>
      <!-- outline-offset -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-offset</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-offset-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-offset-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property on <code class="code">:focus</code> state.</td>
      </tr>
      <!-- [disabled] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$disabled-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$shade</code></td>
        <td data-mobile-label="Desc">Sets the background-color property of the <code class="code">disabled</code> state.</td>
      </tr>
      <!-- [readonly] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$readonly-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$shade</code></td>
        <td data-mobile-label="Desc">Sets the background-color property of the <code class="code">readonly</code> state.</td>
      </tr>
      <!-- input_size_sm -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the height property on <code class="code">input</code> and min-height property of the <code class="code">input_type_textarea</code> and <code class="code">input_size_sm</code> modifier combination.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">calc(0.25rem - 1px) 0.5rem</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the <code class="code">input_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the <code class="code">input_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$line-height-sm</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the <code class="code">input_size_sm</code> modifier.</td>
      </tr>
      <!-- input_size_lg -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the height property on <code class="code">input</code> and min-height property of the <code class="code">input_type_textarea</code> and <code class="code">input_size_lg</code> modifier combination.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">calc(0.648rem - 1px)</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the <code class="code">input_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the <code class="code">input_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$line-height-lg</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the <code class="code">input_size_lg</code> modifier.</td>
      </tr>
      <!-- input_type_[value] -->
      <tr>
        <td data-mobile-label="Var"><code class="code">$type-select-icon-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$color</code></td>
        <td data-mobile-label="Desc">Sets the fill property for the svg data:image of the <code class="code">input_type_select</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$type-select-icon</code></td>
        <td data-mobile-label="Default"><a class="link" href="#type-select-icon"><code class="code color-secondary">'data:image/svg...'</code> Ref &darr;</a></td>
        <td data-mobile-label="Desc">The data:image/svg string used as the background-image property of the <code class="code">input_type_select</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$type-textarea-min-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">100%</code></td>
        <td data-mobile-label="Desc">Sets the min-width property of the <code class="code">input_type_textarea</code> modifier.</td>
      </tr>
    </tbody>
  </table>
</div>

### `$type-select-icon`

```scss
$type-select-icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" fill="#{core.encodecolor($type-select-icon-color)}"><polyline points="0 8 3.5 12 7 8"></polyline><polyline points="0 4 3.5 0 7 4"></polyline></svg>' !default;
```
