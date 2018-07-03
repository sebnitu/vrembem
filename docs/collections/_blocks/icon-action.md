---
title: Icon-action
---

# Icon-action

<p class="text_lead">A minimal container component for icon based actions.</p>

## `icon-action`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
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
  <div class="demo__render grid__item">
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
  <div class="demo__render grid__item spacing">
    <div class="demo__group">
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
    <div class="demo__group bg_gray p_1">
      <button class="icon-action icon-action_color_fade-inverted">
        {% include icon.html icon="x" %}
      </button>
      <button class="icon-action icon-action_color_light">
        {% include icon.html icon="x" %}
      </button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="icon-action icon-action_color_fade">...</button>
<button class="icon-action icon-action_color_fade-inverted">...</button>
<button class="icon-action icon-action_color_light">...</button>
<button class="icon-action icon-action_color_danger">...</button>
<button class="icon-action icon-action_color_caution">...</button>
<button class="icon-action icon-action_color_success">...</button>
```
  </div>
  </div>
</div>
