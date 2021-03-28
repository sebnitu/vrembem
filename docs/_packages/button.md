---
layout: article
title: Button
description: "Buttons are a simple component that allow users to take actions."
package: "@vrembem/button"
category: simple
usage:
  npm: true
  scss: true
---

## button

The most basic imlementation of the button component consists of the `button` class that can be applied to `<button>`, `<input type="button">` or `<a role="button">` elements. [Remember to add `role="button"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) to any none semantic buttons as needed.

{% include demo_open.html %}
<div class="level">
  <button class="button">Button</button>
  <input class="button" type="button" value="Button">
  <a class="button" role="button">Button</a>
</div>
{% include demo_switch.html %}
```html
<button class="button">Button</button>
<input class="button" type="button" value="Button">
<a class="button" role="button">Button</a>
```
{% include demo_close.html %}

When disabled using the `disabled` attribute, a button will inherit styles to visually appear noninteractive.

{% include demo_open.html %}
<div class="level">
  <button class="button" disabled>Button</button>
  <input class="button" type="button" value="Button" disabled>
  <a class="button" role="button" disabled>Button</a>
</div>
{% include demo_switch.html %}
```html
<button class="button" disabled>Button</button>
<input class="button" type="button" value="Button" disabled>
<a class="button" role="button" disabled>Button</a>
```
{% include demo_close.html %}

Elements within a button are centered vertically and spaced accordingly using the value set in `$inner-spacing` (defaults to `0.5em`). When elements are added inside a button, the button's text should also be wrapped in a `<span>` so that it can be spaced properly.

{% include demo_open.html %}
<div class="level">
  <button class="button button_color_primary">
    {% include icon.html icon="anchor" %}
    <span>Button</span>
    <span class="arrow"></span>
  </button>
  <button class="button button_color_primary">
    <span>Button</span>
    {% include icon.html icon="anchor" %}
    <span class="arrow"></span>
  </button>
  <button class="button button_color_primary">
    {% include icon.html icon="anchor" %}
    <span class="arrow"></span>
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="button">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
  <span>Button</span>
  <span class="arrow"></span>
</button>
```
{% include demo_close.html %}

## button_icon

{% include demo_open.html %}
<div class="level">
  <button class="button button_size_sm button_icon">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_sm button_icon">
    <span class="arrow"></span>
  </button>
  <button class="button button_size_sm button_icon button_color_primary">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_sm button_icon button_color_primary">
    <span class="arrow"></span>
  </button>
  <button class="button button_icon">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_icon">
    <span class="arrow"></span>
  </button>
  <button class="button button_icon button_color_primary">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_icon button_color_primary">
    <span class="arrow"></span>
  </button>
  <button class="button button_size_lg button_icon">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_lg button_icon">
    <span class="arrow"></span>
  </button>
  <button class="button button_size_lg button_icon button_color_primary">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_lg button_icon button_color_primary">
    <span class="arrow"></span>
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_icon">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
</button>
```
{% include demo_close.html %}

## button_size_[key]

{% include demo_open.html %}
<div class="level">
  <button class="button button_size_sm button_color_primary">
    <span>Button</span>
  </button>
  <button class="button button_color_primary">
    <span>Button</span>
  </button>
  <button class="button button_size_lg button_color_primary">
    <span>Button</span>
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_size_sm">...</button>
<button class="button">...</button>
<button class="button button_size_lg">...</button>
```
{% include demo_close.html %}

## button_block

{% include demo_open.html class_parent="gap-y" %}
<div>
  <button class="button button_block button_color_primary">Button</button>
</div>
<div>
  <button class="button button_block button_color_secondary">Button</button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_block">...</button>
```
{% include demo_close.html %}

## button_block_[key]

{% include demo_open.html class_parent="gap-y" %}
<div>
  <button class="button button_block_xs button_color_secondary">Block XS</button>
</div>
<div>
  <button class="button button_block_sm button_color_secondary">Block SM</button>
</div>
<div>
  <button class="button button_block_md button_color_secondary">Block MD</button>
</div>
<div>
  <button class="button button_block_lg button_color_secondary">Block LG</button>
</div>
<div>
  <button class="button button_block_xl button_color_secondary">Block XL</button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_block_xs">...</button>
<button class="button button_block_sm">...</button>
<button class="button button_block_md">...</button>
<button class="button button_block_lg">...</button>
<button class="button button_block_xl">...</button>
```
{% include demo_close.html %}

## button_color_[key]

{% include demo_open.html class_grid="grid_stack" class_parent="gap-y" %}
<div class="padding background_white radius">
  <div class="level">
    <button class="button">Default</button>
    <button class="button button_color_subtle">Color Subtle</button>
    <button class="button button_color_primary">Color Primary</button>
    <button class="button button_color_secondary">Color Secondary</button>
  </div>
</div>
<div class="padding background-night radius">
  <div class="level">
    <button class="button button_invert">Default Invert</button>
    <button class="button button_invert button_color_subtle">Color Subtle Invert</button>
    <button class="button button_color_primary">Color Primary</button>
    <button class="button button_color_secondary">Color Secondary</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<!-- Colors -->
<button class="button">Default</button>
<button class="button button_color_subtle">Color Subtle</button>
<button class="button button_color_primary">Color Primary</button>
<button class="button button_color_secondary">Color Secondary</button>

<!-- Invert -->
<button class="button button_invert">Default Invert</button>
<button class="button button_invert button_color_subtle">Color Subtle Invert</button>
<button class="button button_color_primary">Color Primary</button>
<button class="button button_color_secondary">Color Secondary</button>
```
{% include demo_close.html %}

## button_outline_[key]

{% include demo_open.html class_grid="grid_stack" class_parent="gap-y" %}
<div class="padding background_white radius">
  <div class="level">
    <button class="button button_outline">Default Outline</button>
    <button class="button button_outline_primary">Outline Primary</button>
    <button class="button button_outline_secondary">Outline Secondary</button>
  </div>
</div>
<div class="padding background-night radius">
  <div class="level">
    <button class="button button_invert button_outline">Default Outline Invert</button>
    <button class="button button_invert button_outline_primary">Outline Primary</button>
    <button class="button button_invert button_outline_secondary">Outline Secondary Invert</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<!-- Colors -->
<button class="button button_outline">Default Outline</button>
<button class="button button_outline_primary">Outline Primary</button>
<button class="button button_outline_secondary">Outline Secondary</button>

<!-- Invert -->
<button class="button button_invert button_outline">Default Outline Invert</button>
<button class="button button_invert button_outline_primary">Outline Primary</button>
<button class="button button_invert button_outline_secondary">Outline Secondary Invert</button>
```
{% include demo_close.html %}

## button is-loading

{% include demo_open.html class_grid="grid_stack" %}
<div class="padding background_white radius">
  <div class="level">
    <button class="is-loading button">Button</button>
    <button class="is-loading button button_color_subtle">Button</button>
    <button class="is-loading button button_color_primary">Button</button>
    <button class="is-loading button button_color_secondary">Button</button>
    <button class="is-loading button button_outline">Button</button>
    <button class="is-loading button button_outline_primary">Button</button>
    <button class="is-loading button button_outline_secondary">Button</button>
  </div>
</div>
<div class="padding background-night radius">
  <div class="level">
    <button class="is-loading button button_invert">Button</button>
    <button class="is-loading button button_invert button_color_subtle">Button</button>
    <button class="is-loading button button_color_primary">Button</button>
    <button class="is-loading button button_color_secondary">Button</button>
    <button class="is-loading button button_invert button_outline">Button</button>
    <button class="is-loading button button_invert button_outline_primary">Button</button>
    <button class="is-loading button button_invert button_outline_secondary">Button</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<a href="#" class="button is-loading">Button</a>
<button class="button is-loading">Button</button>
```
{% include demo_close.html %}
