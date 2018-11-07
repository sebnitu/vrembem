---
layout: page
title: Icon-action
dsc: "A minimal container component for icon based actions."
tags: block simple
---

## `icon-action`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <div class="demo__group level level_wrap">
      <button class="icon-action">
        {% include icon.html icon="x" %}
      </button>
      <button class="icon-action">
        {% include icon.html icon="minus" %}
      </button>
      <button class="icon-action">
        {% include icon.html icon="maximize-2" %}
      </button>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="icon-action">
  <svg role="img" class="icon">
    <use xlink:href="#x"></use>
  </svg>
</button>
```
  </div>
  </div>
</div>

## `icon-action_size`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <div class="demo__group level level_wrap">
      <button class="icon-action icon-action_size_sm">
        {% include icon.html icon="x" %}
      </button>
      <button class="icon-action">
        {% include icon.html icon="x" %}
      </button>
      <button class="icon-action icon-action_size_lg">
        {% include icon.html icon="x" %}
      </button>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="icon-action icon-action_size_sm">...</button>
<button class="icon-action">...</button>
<button class="icon-action icon-action_size_lg">...</button>
```
  </div>
  </div>
</div>

## `icon-action_color`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render spacing">

    <div class="demo__group level level_wrap p_1">
      <button class="icon-action">
        {% include icon.html icon="x" %}
      </button>
      <button class="icon-action icon-action_color_subtle">
        {% include icon.html icon="x" %}
      </button>
      <button class="icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>

      <button class="icon-action icon-action_color_danger">
        {% include icon.html icon="x" %}
      </button>
      <button class="icon-action icon-action_color_caution">
        {% include icon.html icon="minus" %}
      </button>
      <button class="icon-action icon-action_color_success">
        {% include icon.html icon="maximize-2" %}
      </button>
    </div>

    <div class="demo__group level level_wrap bg_dark p_1">
      <button class="icon-action icon-action_color_invert">
        {% include icon.html icon="x" %}
      </button>
      <button class="icon-action icon-action_color_invert_subtle">
        {% include icon.html icon="x" %}
      </button>
      <button class="icon-action icon-action_color_invert_fade">
        {% include icon.html icon="x" %}
      </button>
    </div>

  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="icon-action">...</button>
<button class="icon-action icon-action_color_subtle">...</button>
<button class="icon-action icon-action_color_danger">...</button>
<button class="icon-action icon-action_color_caution">...</button>
<button class="icon-action icon-action_color_success">...</button>
<button class="icon-action icon-action_color_invert">...</button>
<button class="icon-action icon-action_color_invert_subtle">...</button>
```
  </div>
  </div>
</div>
