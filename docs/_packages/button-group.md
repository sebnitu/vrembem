---
layout: article
title: Button-group
description: "A component for displaying groups of buttons."
category: compound
usage:
  npm: "button-group"
  scss: "button-group"
---

{% include flag.html heading="button-group" %}

{% include demo_open.html class_parent="spacing" %}
<div>
  <div class="button-group">
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
  </div>
</div>
<div>
  <div class="button-group">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group">
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="button-group_full" %}

{% include demo_open.html class_parent="spacing" %}
<div>
  <div class="button-group button-group_full">
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_full">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_full">
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="button-group_stack" %}

{% include demo_open.html %}
<div class="grid grid_auto">
  <div class="grid__item">
    <div class="button-group button-group_stack">
      <button class="button button_color_primary">Button</button>
      <button class="button button_color_primary">Button</button>
      <button class="button button_color_primary">Button</button>
    </div>
  </div>
  <div class="grid__item">
    <div class="button-group button-group_stack">
      <button class="button button_outline">Button</button>
      <button class="button button_outline">Button</button>
      <button class="button button_outline">Button</button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_stack">
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="button-group_stack + button-group_full" %}

{% include demo_open.html class_parent="spacing" %}
<div>
  <div class="button-group button-group_stack button-group_full">
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_stack button-group_full">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_stack button-group_full">
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="button-group_wrap" %}

{% include demo_open.html class_parent="spacing" %}
<div>
  <div class="button-group button-group_wrap">
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_wrap">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_wrap">
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="button-group_wrap + button-group_full" %}

{% include demo_open.html class_parent="spacing" %}
<div>
  <div class="button-group button-group_wrap button-group_full">
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_wrap button-group_full">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_wrap button-group_full">
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="button-group_join" %}

{% include demo_open.html class_parent="spacing" %}
<div>
  <div class="button-group button-group_join">
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_join">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_join">
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="button-group_join + button-group_stack" %}

{% include demo_open.html %}
<div class="grid grid_auto">
  <div class="grid__item">
    <div class="button-group button-group_join button-group_stack">
      <button class="button button_color_primary">Button</button>
      <button class="button button_color_primary">Button</button>
      <button class="button button_color_primary">Button</button>
    </div>
  </div>
  <div class="grid__item">
    <div class="button-group button-group_join button-group_stack">
      <button class="button button_outline">Button</button>
      <button class="button button_outline">Button</button>
      <button class="button button_outline">Button</button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_join button-group_stack">
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
  <button class="button button_color_primary">...</button>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="button-group_gap_[key]" %}

{% include demo_open.html class_parent="spacing" %}
<div>
  <div class="button-group button-group_gap_xs">
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
    <button class="button button_color_primary">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_gap_sm">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_gap_md">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_gap_lg">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
<div>
  <div class="button-group button-group_gap_xl">
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
    <button class="button button_outline">Button</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="button-group button-group_gap_xs">...</div>
<div class="button-group button-group_gap_sm">...</div>
<div class="button-group button-group_gap_md">...</div>
<div class="button-group button-group_gap_lg">...</div>
<div class="button-group button-group_gap_xl">...</div>
```
{% include demo_close.html %}
