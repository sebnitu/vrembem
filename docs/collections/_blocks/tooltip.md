---
title: Tooltip
desc: "Text labels that appear when a user hovers over, focuses on or touches an element."
---

## `tooltip`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <button class="button button_color_primary tooltip" data-tooltip="Some tooltip...">Tooltip</button>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="tooltip" data-tooltip="Some tooltip...">
  ...
</button>
```
  </div>
  </div>
</div>

## `tooltip_pos`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing_xs">
  <div class="demo__group level level_wrap">
    <button class="button button_size_large button_icon tooltip tooltip_pos_up" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-up" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_up-left" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-up" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_up-right" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-up" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_down" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-down" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_down-left" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-down" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_down-right" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-down" %}
    </button>
  </div>
  <div class="demo__group level level_wrap">
    <button class="button button_size_large button_icon tooltip tooltip_pos_right" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-right" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_right-up" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-right" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_right-down" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-right" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_left" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-left" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_left-up" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-left" %}
    </button>
    <button class="button button_size_large button_icon tooltip tooltip_pos_left-down" data-tooltip="Some tooltip...">
      {% include icon.html icon="chevron-left" %}
    </button>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="tooltip tooltip_pos_up" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_up-left" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_up-right" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_down" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_down-left" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_down-right" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_right" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_right-up" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_right-down" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_left" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_left-up" data-tooltip="...">...</button>
<button class="tooltip tooltip_pos_left-down" data-tooltip="...">...</button>
```
  </div>
  </div>
</div>
