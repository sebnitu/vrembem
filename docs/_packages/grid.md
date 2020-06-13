---
layout: article
title: "Grid"
description: "A flexbox based grid system component."
package: "@vrembem/grid"
category: layout
usage:
  npm: true
  scss: true
---

## grid

The most basic imlementation of the grid component consists of two elements.

* `grid`
* `grid__item`

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

### grid__clear

The clear element allows you to start a new row at any point in a column set.

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

## grid_auto

Gives grid items a basis of auto so their content dictates their width.

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

Set an individual grid item to auto using `grid__item_auto` element modifier.

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

Adds a breakpoint for when grid items should be stacked vertically. Also available is the `grid_break` modifier which stacks grid items under all conditions.

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

The fill modifier stretches grid item's contents to fill the height of it's container.

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

Set an individual grid item to fill using the `grid__item_fill` element modifier.

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

## grid_gap_[key]

Modifiers that adjust the gutters between content tracks.

```html
<div class="grid grid_gap_none">...</div>
<div class="grid grid_gap_xs">...</div>
<div class="grid grid_gap_sm">...</div>
<div class="grid grid_gap_md">...</div>
<div class="grid grid_gap_lg">...</div>
<div class="grid grid_gap_xl">...</div>
```

The key options and values are set using the `$gap-scale` map:

```scss
$gap-scale: (
  "xs": 0.5rem,
  "sm": 1rem,
  "md": 2rem,
  "lg": 3rem,
  "xl": 4rem,
) !default;
```

## flex

The flex utility is a great way to adjust individual flex properties on components that use flex layout. These are some available flex property based utilities:

* `flex-align-[key]`
* `flex-justify-[key]`
* `flex-grow-[key]`
* `flex-shrink-[key]`
* `flex-basis-[key]`
* `flex-wrap`
* `flex-nowrap`
* `flex-items-[key]`

### flex-align-[value]

Adjust the `align-items` property of grid columns using the `flex-align-[value]` utility. Avaliable values are:

* `flex-align-start`
* `flex-align-center`
* `flex-align-end`
* `flex-align-stretch`
* `flex-align-baseline`

{% include demo_open.html %}
<div class="grid flex-align-start">
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
<div class="grid flex-align-start">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid flex-align-center">
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
<div class="grid flex-align-center">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid flex-align-end">
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
<div class="grid flex-align-end">
  <div class="grid__item" style="height: 100px;">...</div>
  <div class="grid__item">...</div>
</div>
```
{% include demo_close.html %}

### flex-justify-[value]

Change the `justify-content` property of grid columns using the `flex-justify-[value]` utility. Best used along with the `grid_auto` modifier. Avaliable values are:

* `flex-justify-start`
* `flex-justify-center`
* `flex-justify-end`
* `flex-justify-between`
* `flex-justify-around`
* `flex-justify-evenly`

{% include demo_open.html %}
<div class="grid grid_auto flex-justify-start">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-justify-start">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto flex-justify-center">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-justify-center">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto flex-justify-end">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-justify-end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="grid grid_auto flex-justify-between">
  <div class="grid__item">
    <div class="box">...</div>
  </div>
  <div class="grid__item">
    <div class="box">...</div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="grid flex-justify-between">...</div>
```
{% include demo_close.html %}

## span

Set the width, max-width and flex based on a column set using the `span` utility. There are a number of options available:

* `span-auto`
* `span-full`
* `span-[col]`
* `span-[col]-[breakpoint]`

### span-auto

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

### span-full

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

### span-[col]

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

### span-[col]-[breakpoint]

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
