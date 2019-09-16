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
    <div class="swatch background_primary_light"></div>
    <div class="swatch background_primary"></div>
    <div class="swatch background_primary_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_secondary_light"></div>
    <div class="swatch background_secondary"></div>
    <div class="swatch background_secondary_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_accent_light"></div>
    <div class="swatch background_accent"></div>
    <div class="swatch background_accent_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_shade_light"></div>
    <div class="swatch background_shade"></div>
    <div class="swatch background_shade_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_night_light"></div>
    <div class="swatch background_night"></div>
    <div class="swatch background_night_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_info_light"></div>
    <div class="swatch background_info"></div>
    <div class="swatch background_info_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_success_light"></div>
    <div class="swatch background_success"></div>
    <div class="swatch background_success_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_caution_light"></div>
    <div class="swatch background_caution"></div>
    <div class="swatch background_caution_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_danger_light"></div>
    <div class="swatch background_danger"></div>
    <div class="swatch background_danger_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_error_light"></div>
    <div class="swatch background_error"></div>
    <div class="swatch background_error_dark"></div>
  </div>
  <div class="swatch-group">
    <div class="swatch background_black"></div>
    <div class="swatch border_top border_right border_bottom background_white"></div>
    <div class="swatch border_top border_right border_bottom background_transparent"></div>
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
  <div class="swatch background_shade_light border"></div>
  <div class="swatch background_shade_light border_top"></div>
  <div class="swatch background_shade_light border_right"></div>
  <div class="swatch background_shade_light border_bottom"></div>
  <div class="swatch background_shade_light border_left"></div>
</div>
{% include demo_switch.html class_gridItem="" %}
```html
<div class="border"></div>
<div class="border_top"></div>
<div class="border_right"></div>
<div class="border_bottom"></div>
<div class="border_left"></div>
```
{% include demo_close.html %}

{% include flag.html heading="radius" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="swatch-group">
  <div class="swatch background_secondary radius"></div>
  <div class="swatch background_secondary radius_square"></div>
  <div class="swatch background_secondary radius_circle"></div>
</div>
{% include demo_switch.html class_gridItem="" %}
```html
<div class="radius"></div>
<div class="radius_square"></div>
<div class="radius_circle"></div>
```
{% include demo_close.html %}

{% include flag.html heading="elevate" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="padding_lg background_shade_light">
  <div class="swatch-group">
    <div class="swatch background_white elevate"></div>
    <div class="swatch background_white elevate_flat"></div>
    <div class="swatch background_white elevate_1dp"></div>
    <div class="swatch background_white elevate_4dp"></div>
    <div class="swatch background_white elevate_8dp"></div>
    <div class="swatch background_white elevate_16dp"></div>
    <div class="swatch background_white elevate_24dp"></div>
  </div>
</div>
{% include demo_switch.html class_gridItem="" %}
```html
...
```
{% include demo_close.html %}

{% include flag.html heading="color" %}

{% include demo_open.html class_grid="grid_break" class_parent="spacing" %}
<div class="padding background_white">
  <div class="swatch-group">
    <span class="color">Color</span>
    <span class="color_subtle">Color subtle</span>
    <span class="color_primary_light">Color primary</span>
    <span class="color_primary">Color primary</span>
    <span class="color_primary_dark">Color primary</span>
    <span class="color_secondary_light">Color secondary</span>
    <span class="color_secondary">Color secondary</span>
    <span class="color_secondary_dark">Color secondary</span>
    <span class="color_accent_light">Color accent</span>
    <span class="color_accent">Color accent</span>
    <span class="color_accent_dark">Color accent</span>
    <span class="color_shade_light">Color shade</span>
    <span class="color_shade">Color shade</span>
    <span class="color_shade_dark">Color shade</span>
    <span class="color_night_light">Color night</span>
    <span class="color_night">Color night</span>
    <span class="color_night_dark">Color night</span>
    <span class="color_info_light">Color info</span>
    <span class="color_info">Color info</span>
    <span class="color_info_dark">Color info</span>
    <span class="color_success_light">Color success</span>
    <span class="color_success">Color success</span>
    <span class="color_success_dark">Color success</span>
    <span class="color_caution_light">Color caution</span>
    <span class="color_caution">Color caution</span>
    <span class="color_caution_dark">Color caution</span>
    <span class="color_danger_light">Color danger</span>
    <span class="color_danger">Color danger</span>
    <span class="color_danger_dark">Color danger</span>
    <span class="color_error_light">Color error</span>
    <span class="color_error">Color error</span>
    <span class="color_error_dark">Color error</span>
    <span class="color_black">Color black</span>
    <span class="color_white">Color white</span>
    <span class="color_transparent">Color transparent</span>
  </div>
</div>
<div class="padding radius background_night">
  <div class="swatch-group">
    <span class="color_invert">Color invert</span>
    <span class="color_invert_subtle">Color invert subtle</span>
    <span class="color_primary_light">Color primary</span>
    <span class="color_primary">Color primary</span>
    <span class="color_primary_dark">Color primary</span>
    <span class="color_secondary_light">Color secondary</span>
    <span class="color_secondary">Color secondary</span>
    <span class="color_secondary_dark">Color secondary</span>
    <span class="color_accent_light">Color accent</span>
    <span class="color_accent">Color accent</span>
    <span class="color_accent_dark">Color accent</span>
    <span class="color_shade_light">Color shade</span>
    <span class="color_shade">Color shade</span>
    <span class="color_shade_dark">Color shade</span>
    <span class="color_night_light">Color night</span>
    <span class="color_night">Color night</span>
    <span class="color_night_dark">Color night</span>
    <span class="color_info_light">Color info</span>
    <span class="color_info">Color info</span>
    <span class="color_info_dark">Color info</span>
    <span class="color_success_light">Color success</span>
    <span class="color_success">Color success</span>
    <span class="color_success_dark">Color success</span>
    <span class="color_caution_light">Color caution</span>
    <span class="color_caution">Color caution</span>
    <span class="color_caution_dark">Color caution</span>
    <span class="color_danger_light">Color danger</span>
    <span class="color_danger">Color danger</span>
    <span class="color_danger_dark">Color danger</span>
    <span class="color_error_light">Color error</span>
    <span class="color_error">Color error</span>
    <span class="color_error_dark">Color error</span>
    <span class="color_black">Color black</span>
    <span class="color_white">Color white</span>
    <span class="color_transparent">Color transparent</span>
  </div>
</div>
{% include demo_switch.html class_gridItem="" %}
```html
...
```
{% include demo_close.html %}
