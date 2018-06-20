---
title: Tooltip
---

# Tooltip

<p class="text_lead">Text laybels that appear when a user hovers over, focuses on or touches an element.</p>

## `tooltip`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <button class="button button_color_primary tooltip" data-tooltip="Some tooltip...">Tooltip</button>
  </div>
  <div class="demo__code">

```html
<button class="tooltip" data-tooltip="Some tooltip...">
  ...
</button>
```

  </div>
</div>

## `tooltip_pos`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group demo__group_tile">
      <button class="button button_size_large button_icon tooltip tooltip_pos_up" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-up"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_up-left" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-up"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_up-right" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-up"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_down" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-down"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_down-left" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-down"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_down-right" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-down"></use>
        </svg>
      </button>
    </div>
    <div class="demo__group demo__group_tile">
      <button class="button button_size_large button_icon tooltip tooltip_pos_right" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-right"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_right-up" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-right"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_right-down" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-right"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_left" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-left"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_left-up" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-left"></use>
        </svg>
      </button>
      <button class="button button_size_large button_icon tooltip tooltip_pos_left-down" data-tooltip="Some tooltip...">
        <svg role="img" class="icon">
          <use xlink:href="#chevron-left"></use>
        </svg>
      </button>
    </div>
  </div>
  <div class="demo__code">

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
