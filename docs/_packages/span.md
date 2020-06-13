---
layout: article
title: "Span"
description: "A multi-purpose component for setting width, max-width and flex basis based on a column set."
package: "@vrembem/span"
category: layout
usage:
  npm: true
  scss: true
---

## span-auto

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_flatten">
  <div class="grid__item span-auto">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span-auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## span-full

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_flatten">
  <div class="grid__item span-full">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span-full">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## span-[col]

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_flatten">
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__break"></div>
  <div class="grid__item span-6">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-3">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-3">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span-6">...</div>
  <div class="grid__item span-6">...</div>
  <div class="grid__break"></div>
  <div class="grid__item span-6">...</div>
  <div class="grid__item span-3">...</div>
  <div class="grid__item span-3">...</div>
</div>
```
{% include demo_close.html %}

## span-[col]-[breakpoint]

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_flatten">
  <div class="grid__item span-12 span-6-xs span-8-sm span-4-md span-3-lg">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">
    <div class="box">...</div>
  </div>
  <div class="grid__item span-12 span-6-xs span-8-sm span-12-md span-3-lg">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span-12 span-6-xs span-8-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-4-sm span-4-md span-3-lg">...</div>
  <div class="grid__item span-12 span-6-xs span-8-sm span-12-md span-3-lg">...</div>
</div>
```
{% include demo_close.html %}
