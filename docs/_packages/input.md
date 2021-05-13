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
<div class="gap-y">
  <input type="text" class="input" />
  <input type="text" class="input" placeholder="Placeholder example" />
  <input type="text" class="input" value="Value example" />
</div>
{% include demo_switch.html %}
```html
<input type="text" class="input" />
<input type="text" class="input" placeholder="Placeholder example" />
<input type="text" class="input" value="Value example" />
```
{% include demo_close.html %}

### disabled

Adding the boolean `disabled` attribute to the input will provide visual indication that the input is not available for use.

{% include demo_open.html %}
<div class="gap-y">
  <input type="text" class="input" disabled />
  <input type="text" class="input" placeholder="Placeholder example" disabled />
  <input type="text" class="input" value="Value example" disabled />
</div>
{% include demo_switch.html %}
```html
<input type="text" class="input" disabled />
<input type="text" class="input" placeholder="Placeholder example" disabled />
<input type="text" class="input" value="Value example" disabled />
```
{% include demo_close.html %}

### readonly

Adding the boolean `readonly` attribute to the input will provide visual indication that the user should not be able to edit the value of the input.

{% include demo_open.html %}
<div class="gap-y">
  <input type="text" class="input" readonly />
  <input type="text" class="input" placeholder="Placeholder example" readonly />
  <input type="text" class="input" value="Value example" readonly />
</div>
{% include demo_switch.html %}
```html
<input type="text" class="input" readonly />
<input type="text" class="input" placeholder="Placeholder example" readonly />
<input type="text" class="input" value="Value example" readonly />
```
{% include demo_close.html %}

## input_auto

{% include demo_open.html %}
<input type="text" class="input input_auto" />
{% include demo_switch.html %}
```html
<input type="text" class="input input_auto" />
```
{% include demo_close.html %}

## input_size_[value]

{% include demo_open.html class_parent="gap-y" %}
<input class="input input_size_sm" placeholder="Default input..." type="text" />
<input class="input" placeholder="Default input..." type="text" />
<input class="input input_size_lg" placeholder="Default input..." type="text" />
<select class="input input_type_select input_size_sm">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<select class="input input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<select class="input input_type_select input_size_lg">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
{% include demo_switch.html %}
```html
<input class="input input_size_sm" placeholder="Default input..." type="text" />
<input class="input input_size_lg" placeholder="Default input..." type="text" />
<select class="input input_type_select input_size_sm">...</select>
<select class="input input_type_select input_size_lg">...</select>
```
{% include demo_close.html %}

## input_state_[value]

{% include demo_open.html class_parent="gap-y" %}
<input class="input input_state_info" type="text" />
<select class="input input_state_info input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_info input_type_textarea" rows="3"></textarea>
{% include demo_switch.html %}
```html
<input class="input input_state_info" type="text" />
<select class="input input_state_info input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_info input_type_textarea" rows="3"></textarea>
```
{% include demo_close.html %}

{% include demo_open.html class_parent="gap-y" %}
<input class="input input_state_success" type="text" />
<select class="input input_state_success input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_success input_type_textarea" rows="3"></textarea>
{% include demo_switch.html %}
```html
<input class="input input_state_success" type="text" />
<select class="input input_state_success input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_success input_type_textarea" rows="3"></textarea>
```
{% include demo_close.html %}

{% include demo_open.html class_parent="gap-y" %}
<input class="input input_state_caution" type="text" />
<select class="input input_state_caution input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_caution input_type_textarea" rows="3"></textarea>
{% include demo_switch.html %}
```html
<input class="input input_state_caution" type="text" />
<select class="input input_state_caution input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_caution input_type_textarea" rows="3"></textarea>
```
{% include demo_close.html %}

{% include demo_open.html class_parent="gap-y" %}
<input class="input input_state_danger" type="text" />
<select class="input input_state_danger input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_danger input_type_textarea" rows="3"></textarea>
{% include demo_switch.html %}
```html
<input class="input input_state_danger" type="text" />
<select class="input input_state_danger input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_danger input_type_textarea" rows="3"></textarea>
```
{% include demo_close.html %}

## input_type_[value]

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
<textarea class="input input_type_textarea" rows="2"></textarea>
<textarea class="input input_type_textarea" rows="1"></textarea>
{% include demo_switch.html %}
```html
<textarea class="input input_type_textarea" rows="3"></textarea>
<textarea class="input input_type_textarea" rows="2"></textarea>
<textarea class="input input_type_textarea" rows="1"></textarea>
```
{% include demo_close.html %}

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
