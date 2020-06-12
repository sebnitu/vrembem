---
layout: article
title: "Span"
description: "A multi-purpose component for setting width, max-width and flex basis based on a column set."
category: layout
usage:
  npm: "span"
  scss: "span"
---

## span_auto

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_flatten">
  <div class="grid__item span_auto">
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
  <div class="grid__item span_auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## span_full

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_flatten">
  <div class="grid__item span_full">
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
  <div class="grid__item span_full">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## span_[col]

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_flatten">
  <div class="grid__item span_6">
    <div class="box">...</div>
  </div>
  <div class="grid__item span_6">
    <div class="box">...</div>
  </div>
  <div class="grid__break"></div>
  <div class="grid__item span_6">
    <div class="box">...</div>
  </div>
  <div class="grid__item span_3">
    <div class="box">...</div>
  </div>
  <div class="grid__item span_3">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span_6">...</div>
  <div class="grid__item span_6">...</div>
  <div class="grid__break"></div>
  <div class="grid__item span_6">...</div>
  <div class="grid__item span_3">...</div>
  <div class="grid__item span_3">...</div>
</div>
```
{% include demo_close.html %}

## span_[col]_[breakpoint]

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_flatten">
  <div class="grid__item span_12 span_6_xs span_8_sm span_4_md span_3_lg">
    <div class="box">...</div>
  </div>
  <div class="grid__item span_12 span_6_xs span_4_sm span_4_md span_3_lg">
    <div class="box">...</div>
  </div>
  <div class="grid__item span_12 span_6_xs span_4_sm span_4_md span_3_lg">
    <div class="box">...</div>
  </div>
  <div class="grid__item span_12 span_6_xs span_8_sm span_12_md span_3_lg">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item span_12 span_6_xs span_8_sm span_4_md span_3_lg">...</div>
  <div class="grid__item span_12 span_6_xs span_4_sm span_4_md span_3_lg">...</div>
  <div class="grid__item span_12 span_6_xs span_4_sm span_4_md span_3_lg">...</div>
  <div class="grid__item span_12 span_6_xs span_8_sm span_12_md span_3_lg">...</div>
</div>
```
{% include demo_close.html %}
