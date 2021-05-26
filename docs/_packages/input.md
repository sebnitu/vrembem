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
        <td data-mobile-label="Var"><code class="code text-nowrap">$height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">2.5rem</code></td>
        <td data-mobile-label="Desc">Sets the height property on <code class="code">input</code> and min-height property of the <code class="code">input_type_textarea</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">list.nth(core.$padding, 1)</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">box-shadow core.$transition-duration-short core.$transition-timing-function</code></td>
        <td data-mobile-label="Desc">Sets the transition property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-width</code></td>
        <td data-mobile-label="Desc">Sets the border-width property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-style</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-style</code></td>
        <td data-mobile-label="Desc">Sets the border-style property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color-dark</code></td>
        <td data-mobile-label="Desc">Sets the border-color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color-darker</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$primary</code></td>
        <td data-mobile-label="Desc">Sets the border-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-values</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0 0 0 0</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow offset-x, offset-y, blur-radius and spread-radius values.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$black</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow color value.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-alpha</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0</code></td>
        <td data-mobile-label="Desc">Sets the alpha channel of the box-shadow color.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-hover-values</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0 0 0 0</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow offset-x, offset-y, blur-radius and spread-radius values on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-hover-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$black</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow color value on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-hover-alpha</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0</code></td>
        <td data-mobile-label="Desc">Sets the alpha channel of the box-shadow color on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-focus-values</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0 0 0 3px</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow offset-x, offset-y, blur-radius and spread-radius values on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-focus-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$primary</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow color value on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow-focus-alpha</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.4</code></td>
        <td data-mobile-label="Desc">Sets the alpha channel of the box-shadow color on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$inset-box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0 1px 3px rgba(core.$black, 0.1)</code></td>
        <td data-mobile-label="Desc">Sets the inset box-shadow value.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$inset-box-shadow-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0 1px 3px rgba(core.$black, 0.1)</code></td>
        <td data-mobile-label="Desc">Sets the inset box-shadow value on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$inset-box-shadow-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the inset box-shadow value on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color</code></td>
        <td data-mobile-label="Desc">Sets the color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-placeholder</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color-subtle</code></td>
        <td data-mobile-label="Desc">Sets the color property for the placeholder pseudo-element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-size</code></td>
        <td data-mobile-label="Desc">Sets the font-size property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height</code></td>
        <td data-mobile-label="Desc">Sets the line-height property.</td>
      </tr>
      <!-- [disabled] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$disabled-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$shade</code></td>
        <td data-mobile-label="Desc">Sets the background-color property of the <code class="code">disabled</code> state.</td>
      </tr>
      <!-- [readonly] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$readonly-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$shade</code></td>
        <td data-mobile-label="Desc">Sets the background-color property of the <code class="code">readonly</code> state.</td>
      </tr>
      <!-- input_size_[value] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1.875rem</code></td>
        <td data-mobile-label="Desc">Sets the height property on <code class="code">input</code> and min-height property of the <code class="code">input_type_textarea</code> and <code class="code">input_size_sm</code> modifier combination.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">list.nth(core.$padding-sm, 1)</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the `input_size_sm` modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the `input_size_sm` modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height-sm</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the `input_size_sm` modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">3.125rem</code></td>
        <td data-mobile-label="Desc">Sets the height property on <code class="code">input</code> and min-height property of the <code class="code">input_type_textarea</code> and <code class="code">input_size_lg</code> modifier combination.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">list.nth(core.$padding-lg, 1)</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the `input_size_lg` modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the `input_size_lg` modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height-lg</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the `input_size_lg` modifier.</td>
      </tr>
      <!-- input_state_[value] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$state-enable-background-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">false</code></td>
        <td data-mobile-label="Desc">Whether or not to display state specific background-colors on inputs.</td>
      </tr>
      <!-- input_type_[value] -->
      <tr>
        <td data-mobile-label="Var"><code class="code">$type-select-icon-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color</code></td>
        <td data-mobile-label="Desc">Sets the fill property for the svg data:image of the <code class="code">input_type_select</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$type-select-icon</code></td>
        <td data-mobile-label="Default"><a class="link" href="#type-select-icon"><code class="code color-secondary">'data:image/svg...'</code> Ref &darr;</a></td>
        <td data-mobile-label="Desc">The data:image/svg string used as the background-image property of the <code class="code">input_type_select</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code">$type-textarea-min-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">100%</code></td>
        <td data-mobile-label="Desc">Sets the min-width property of the <code class="code">input_type_textarea</code> modifier.</td>
      </tr>
    </tbody>
  </table>
</div>

### `$type-select-icon`

```scss
$type-select-icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" fill="#{core.encodecolor($type-select-icon-color)}"><polyline points="0 8 3.5 12 7 8"></polyline><polyline points="0 4 3.5 0 7 4"></polyline></svg>' !default;
```
