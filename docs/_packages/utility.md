---
layout: article
title: Utility
description: "Utility components do one thing, but do them very well. These are great for prototyping or applying one-off properties to existing components."
category: simple
usage:
  npm: "@vrembem/utility"
  scss: "@vrembem/utility/index"
---

{% include flag.html heading="background" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch-group">
    <div class="swatch bg_primary_light"></div>
    <div class="swatch bg_primary"></div>
    <div class="swatch bg_primary_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_secondary_light"></div>
    <div class="swatch bg_secondary"></div>
    <div class="swatch bg_secondary_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_accent_light"></div>
    <div class="swatch bg_accent"></div>
    <div class="swatch bg_accent_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_shade_light"></div>
    <div class="swatch bg_shade"></div>
    <div class="swatch bg_shade_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_night_light"></div>
    <div class="swatch bg_night"></div>
    <div class="swatch bg_night_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_info_light"></div>
    <div class="swatch bg_info"></div>
    <div class="swatch bg_info_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_success_light"></div>
    <div class="swatch bg_success"></div>
    <div class="swatch bg_success_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_caution_light"></div>
    <div class="swatch bg_caution"></div>
    <div class="swatch bg_caution_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_danger_light"></div>
    <div class="swatch bg_danger"></div>
    <div class="swatch bg_danger_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_error_light"></div>
    <div class="swatch bg_error"></div>
    <div class="swatch bg_error_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch bg_black"></div>
    <div class="swatch bg_white"></div>
  </div>
</div>
{% include demo_switch.html class_gridItem="" %}
```html
...
```
{% include demo_close.html %}

{% include flag.html heading="border" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch b"></div>
  <div class="swatch b_top"></div>
  <div class="swatch b_right"></div>
  <div class="swatch b_bottom"></div>
  <div class="swatch b_left"></div>
</div>
{% include demo_switch.html class_gridItem="" %}
```html
<div class="b"></div>
<div class="b_top"></div>
<div class="b_right"></div>
<div class="b_bottom"></div>
<div class="b_left"></div>
```
{% include demo_close.html %}

{% include flag.html heading="border-radius" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch bg_secondary br"></div>
  <div class="swatch bg_secondary br_square"></div>
  <div class="swatch bg_secondary br_circle"></div>
</div>
{% include demo_switch.html class_gridItem="" %}
```html
<div class="br"></div>
<div class="br_square"></div>
<div class="br_circle"></div>
```
{% include demo_close.html %}

{% include flag.html heading="box-shadow" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch bg_white bs"></div>
  <div class="swatch bg_white bs_flat"></div>
  <div class="swatch bg_white bs_1dp"></div>
  <div class="swatch bg_white bs_4dp"></div>
  <div class="swatch bg_white bs_8dp"></div>
  <div class="swatch bg_white bs_16dp"></div>
  <div class="swatch bg_white bs_24dp"></div>
</div>
{% include demo_switch.html class_gridItem="" %}
```html
...
```
{% include demo_close.html %}
