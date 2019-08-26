---
layout: article
title: "Grid"
description: "A flexbox based grid system component."
category: layout
# usage:
  # npm: "@vrembem/grid"
  # scss: "vrembem/grid/all"
---

{% include flag.html heading="grid + grid__item" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="grid">
  <div class="grid__item">
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
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="grid__item_fill" %}

<div class="type" markdown="1">
The fill modifier stretches a grid item's contents to fill it's container.
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="grid">
  <div class="grid__item">
    <div class="box" style="height: 200px;">...</div>
  </div>
  <div class="grid__item grid__item_fill">
    <div class="box">
      ...
    </div>
  </div>
  <div class="grid__item">
    <div class="box">
      ...
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid">
  <div class="grid__item" style="height: 200px;">...</div>
  <div class="grid__item grid__item_fill">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="grid__clear" %}

<div class="type" markdown="1">
The clear element allows you to start a new row at any point in a column set.
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="grid">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__clear"></div>
  <div class="grid__item">
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
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__clear"></div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="grid_auto" %}

<div class="type" markdown="1">
Gives grid items a basis of auto so their content dictates their width.
</div>

{% include demo_open.html %}
<div class="grid grid_auto">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
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
<div class="grid grid_auto">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="grid_hori_[value]" %}

<div class="type" markdown="1">
Adjust the vertical orientation of grid columns. Best used along with the `grid_auto` modifier. Avaliable values are:

* `grid_hori_start`
* `grid_hori_center`
* `grid_hori_end`
* `grid_hori_between`
</div>

{% include demo_open.html %}
<div class="grid grid_auto grid_hori_start">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_hori_start">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto grid_hori_center">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_hori_center">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto grid_hori_end">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_hori_end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto grid_hori_between">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_hori_between">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="grid_vert_[value]" %}

<div class="type" markdown="1">
Adjust the vertical orientation of grid columns. Avaliable values are:

* `grid_vert_start`
* `grid_vert_center`
* `grid_vert_end`
</div>

{% include demo_open.html %}
<div class="grid grid_vert_start">
  <div class="grid__item">
    <div class="box" style="height: 100px;">...</div>
  </div>
  <div class="grid__item">
    <div class="box">
      ...
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_vert_start">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_vert_center">
  <div class="grid__item">
    <div class="box" style="height: 100px;">...</div>
  </div>
  <div class="grid__item">
    <div class="box">
      ...
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_vert_center">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_vert_end">
  <div class="grid__item">
    <div class="box" style="height: 100px;">...</div>
  </div>
  <div class="grid__item">
    <div class="box">
      ...
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_vert_end">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="grid_break_[breakpoint]" %}

<div class="type" markdown="1">
Adds a breakpoint for when grid items should be stacked vertically. Also available is the `grid_break` modifier which stacks grid items under all conditions.
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_break_xs">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_break_sm">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_break_md">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_break_lg">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_break_xl">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_break">...</div>
<div class="grid grid_break_xs">...</div>
<div class="grid grid_break_sm">...</div>
<div class="grid grid_break_md">...</div>
<div class="grid grid_break_lg">...</div>
<div class="grid grid_break_xl">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="grid_gap_[type]" %}

<div class="type" markdown="1">
Modifiers that adjust the gutters between content tracks.
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_gap_none">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__clear"></div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_gap_none">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_gap_none">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_gap_xs">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__clear"></div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_gap_xs">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_gap_xs">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_gap_sm">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__clear"></div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_gap_sm">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_gap_sm">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_gap_md">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__clear"></div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_gap_md">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_gap_md">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_gap_lg">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__clear"></div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_gap_lg">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_gap_lg">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_gap_xl">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__clear"></div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>

<div class="grid grid_gap_xl">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid grid_gap_xl">...</div>
```
{% include demo_close.html %}
