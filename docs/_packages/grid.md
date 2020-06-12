---
layout: article
title: "Grid"
description: "A flexbox based grid system component."
category: layout
usage:
  npm: "grid"
  scss: "grid"
---

## grid + grid__item

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

## grid__clear

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

## flex_justify_[value]

<div class="type" markdown="1">
Change the `justify-content` property of grid columns using the `flex_justify_[value]` utility. Best used along with the `grid_auto` modifier. Avaliable values are:

* `flex_justify_start`
* `flex_justify_center`
* `flex_justify_end`
* `flex_justify_between`
* `flex_justify_around`
* `flex_justify_evenly`
</div>

{% include demo_open.html %}
<div class="grid grid_auto flex_justify_start">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex_justify_start">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto flex_justify_center">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex_justify_center">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto flex_justify_end">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex_justify_end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto flex_justify_between">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex_justify_between">...</div>
```
{% include demo_close.html %}

## flex_align_[value]

<div class="type" markdown="1">
Adjust the `align-items` property of grid columns using the `flex_align_[value]` utility. Avaliable values are:

* `flex_align_start`
* `flex_align_center`
* `flex_align_end`
* `flex_align_stretch`
* `flex_align_baseline`
</div>

{% include demo_open.html %}
<div class="grid flex_align_start">
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
<div class="grid flex_align_start">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid flex_align_center">
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
<div class="grid flex_align_center">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid flex_align_end">
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
<div class="grid flex_align_end">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## grid_auto

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

<div class="type" markdown="1">
Set an individual grid item to auto using `grid__item_auto` element modifier.
</div>

{% include demo_open.html %}
<div class="grid">
  <div class="grid__item grid__item_auto">
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
  <div class="grid__item grid__item_auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## grid_break_[breakpoint]

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

## grid_fill

<div class="type" markdown="1">
The fill modifier stretches grid item's contents to fill the height of it's container.
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="grid grid_fill">
  <div class="grid__item" style="height: 200px;">
    <div class="box">...</div>
  </div>
  <div class="grid__item spacing">
    <div class="box">
      ...
    </div>
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
<div class="grid grid_fill">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

<div class="type" markdown="1">
Set an individual grid item to fill using the `grid__item_fill` element modifier.
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
  <div class="grid__item">...</div>
  <div class="grid__item grid__item_fill">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

## grid_gap_[type]

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
