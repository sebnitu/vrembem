---
layout: page
title: Tooltip
description: "Text labels that appear when a user hovers over, focuses on or touches an element."
tags: block simple
---

## `[data-tooltip]`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <button class="button button_color_primary" data-tooltip="Some tooltip">Tooltip</button>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button data-tooltip="Some tooltip">
  ...
</button>
```
  </div>
  </div>
</div>

## `[data-tooltip-pos]`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render spacing_xs">
  <div class="demo__group level level_wrap">
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="up">
      {% include icon.html icon="chevron-up" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="up-left">
      {% include icon.html icon="chevron-up" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="up-right">
      {% include icon.html icon="chevron-up" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="down">
      {% include icon.html icon="chevron-down" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="down-left">
      {% include icon.html icon="chevron-down" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="down-right">
      {% include icon.html icon="chevron-down" %}
    </button>
  </div>
  <div class="demo__group level level_wrap">
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="right">
      {% include icon.html icon="chevron-right" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="right-up">
      {% include icon.html icon="chevron-right" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="right-down">
      {% include icon.html icon="chevron-right" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="left">
      {% include icon.html icon="chevron-left" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="left-up">
      {% include icon.html icon="chevron-left" %}
    </button>
    <button class="button button_size_large button_icon" data-tooltip="Some tooltip" data-tooltip-pos="left-down">
      {% include icon.html icon="chevron-left" %}
    </button>
  </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button data-tooltip="..." data-tooltip-pos="down">...</button>
<button data-tooltip="..." data-tooltip-pos="down-left">...</button>
<button data-tooltip="..." data-tooltip-pos="down-right">...</button>
...
```
  </div>
  </div>
</div>
