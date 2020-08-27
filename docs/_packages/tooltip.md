---
layout: article
title: Tooltip
description: "Text labels that appear when a user hovers over, focuses on or touches an element."
package: "@vrembem/tooltip"
category: simple
usage:
  npm: true
  scss: true
---

## [data-tooltip]

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <span class="text-underline-dotted" data-tooltip="Tooltip">Example tooltip</span>
</div>
{% include demo_switch.html %}
```html
<span data-tooltip="...">...</span>
```
{% include demo_close.html %}

## [data-tooltip-pos]

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="up-left">
    Tooltip up left
  </span>
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="up">
    Tooltip up
  </span>
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="up-right">
    Tooltip up right
  </span>
</div>
{% include demo_switch.html %}
```html
<span data-tooltip="..." data-tooltip-pos="up-left">...</span>
<span data-tooltip="..." data-tooltip-pos="up">...</span>
<span data-tooltip="..." data-tooltip-pos="up-right">...</span>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="down-left">
    Tooltip down left
  </span>
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="down">
    Tooltip down
  </span>
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="down-right">
    Tooltip down right
  </span>
</div>
{% include demo_switch.html %}
```html
<span data-tooltip="..." data-tooltip-pos="down-left">...</span>
<span data-tooltip="..." data-tooltip-pos="down">...</span>
<span data-tooltip="..." data-tooltip-pos="down-right">...</span>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level flex-justify-end">
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="left-up">
    Tooltip<br>left up
  </span>
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="left">
    Tooltip<br>left
  </span>
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="left-down">
    Tooltip<br>left down
  </span>
</div>
{% include demo_switch.html %}
```html
<span data-tooltip="..." data-tooltip-pos="left-up">...</span>
<span data-tooltip="..." data-tooltip-pos="left">...</span>
<span data-tooltip="..." data-tooltip-pos="left-down">...</span>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="right-up">
    Tooltip<br>right up
  </span>
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="right">
    Tooltip<br>right
  </span>
  <span class="text-underline-dotted" data-tooltip="Tooltip" data-tooltip-pos="right-down">
    Tooltip<br>right down
  </span>
</div>
{% include demo_switch.html %}
```html
<span data-tooltip="..." data-tooltip-pos="right-up">...</span>
<span data-tooltip="..." data-tooltip-pos="right">...</span>
<span data-tooltip="..." data-tooltip-pos="right-down">...</span>
```
{% include demo_close.html %}
