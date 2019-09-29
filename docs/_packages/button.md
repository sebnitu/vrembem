---
layout: article
title: Button
description: "Buttons are a simple component that allow users to take actions."
category: simple
usage:
  npm: "@vrembem/button"
  scss: "vrembem/button/index"
---

{% include flag.html heading="button" %}

{% include demo_open.html %}
<div class="level">
  <a href="#" class="button">Button</a>
  <button class="button">Button</button>
</div>
{% include demo_switch.html %}
```html
<a href="#" class="button">Button</a>
<button class="button">Button</button>
```
{% include demo_close.html %}

{% include flag.html heading="button disabled" %}

{% include demo_open.html %}
<div class="level">
  <a href="#" class="button" disabled>Button</a>
  <button class="button" disabled>Button</button>
</div>
{% include demo_switch.html %}
```html
<a href="#" class="button" disabled>Button</a>
<button class="button" disabled>Button</button>
```
{% include demo_close.html %}

{% include flag.html heading="button > [elements]" %}

<div class="type" markdown="1">
Elements inside the button component receive appropriate spacing using the `> * + *` selector rule.
</div>

{% include demo_open.html %}
<div class="level">
  <button class="button button_color_primary">
    {% include icon.html icon="anchor" %}
    <span class="button__item">Button</span>
    <span class="arrow"></span>
  </button>
  <button class="button button_color_primary">
    <span class="button__item">Button</span>
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
  <span class="button__item">Button</span>
  <span class="arrow"></span>
</button>
```
{% include demo_close.html %}

{% include flag.html heading="button_icon" %}

{% include demo_open.html %}
<div class="level">
  <button class="button button_size_sm button_icon">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_sm button_icon button_color_primary">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_icon">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_icon button_color_primary">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_lg button_icon">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="button button_size_lg button_icon button_color_primary">
    {% include icon.html icon="anchor" %}
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

{% include flag.html heading="button_size_[key]" %}

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

{% include flag.html heading="button_block" %}

{% include demo_open.html class_parent="spacing" %}
<div class="demo__group">
  <button class="button button_block button_color_primary">Button</button>
</div>
<div class="demo__group">
  <button class="button button_block button_color_secondary">Button</button>
</div>
{% include demo_switch.html %}
```html
<button class="button button_block">...</button>
```
{% include demo_close.html %}

{% include flag.html heading="button_block_[key]" %}

{% include demo_open.html class_parent="spacing" %}
<div class="demo__group">
  <button class="button button_block_xs button_color_secondary">Block XS</button>
</div>
<div class="demo__group">
  <button class="button button_block_sm button_color_secondary">Block SM</button>
</div>
<div class="demo__group">
  <button class="button button_block_md button_color_secondary">Block MD</button>
</div>
<div class="demo__group">
  <button class="button button_block_lg button_color_secondary">Block LG</button>
</div>
<div class="demo__group">
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

{% include flag.html heading="button_color_[key]" %}

{% include demo_open.html class_grid="grid_break" class_parent="spacing" %}
<div class="demo__group p_sm">
  <div class="level">
    <button class="button">Default</button>
    <button class="button button_color_subtle">Color Subtle</button>
    <button class="button button_color_primary">Color Primary</button>
    <button class="button button_color_secondary">Color Secondary</button>
  </div>
</div>
<div class="demo__group invert">
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

{% include flag.html heading="button_outline_[key]" %}

{% include demo_open.html class_grid="grid_break" class_parent="spacing" %}
<div class="background_white padding_md radius">
  <div class="level">
    <button class="button button_outline">Default Outline</button>
    <button class="button button_outline_primary">Outline Primary</button>
    <button class="button button_outline_secondary">Outline Secondary</button>
  </div>
</div>
<div class="background_night padding_md radius">
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

{% include flag.html heading="button is-loading" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="background_white padding_md radius">
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
<div class="background_night padding_md radius">
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
