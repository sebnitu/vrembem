---
layout: article
title: Icon-action
description: "A component for displaying simple action buttons using icons."
category: simple
usage:
  npm: "@vrembem/icon-action"
  scss: "vrembem/icon-action/index"
---

{% include flag.html heading="icon-action" %}

{% include demo_open.html %}
<div class="level">
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
{% include demo_switch.html %}
```html
<button class="icon-action">
  <svg role="img" class="icon">
    <use xlink:href="#x"></use>
  </svg>
</button>
```
{% include demo_close.html %}

{% include flag.html heading="icon-action_color" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="padding radius background_white">
  <div class="level">
    <button class="icon-action">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action icon-action_color_subtle">
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
</div>
{% include demo_switch.html %}
```html
<button class="icon-action">...</button>
<button class="icon-action icon-action_color_subtle">...</button>
<button class="icon-action icon-action_color_danger">...</button>
<button class="icon-action icon-action_color_caution">...</button>
<button class="icon-action icon-action_color_success">...</button>
```
{% include demo_close.html %}

{% include flag.html heading="icon-action_invert" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="padding radius background_night">
  <div class="level">
    <button class="icon-action icon-action_invert">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action icon-action_invert icon-action_color_subtle">
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
</div>
{% include demo_switch.html %}
```html
<!-- Use the invert modifier for dark backgrounds -->
<button class="icon-action icon-action_invert">...</button>
<button class="icon-action icon-action_invert icon-action_color_subtle">...</button>

<!-- Some color modifiers work on any color contrast -->
<button class="icon-action icon-action_color_danger">...</button>
<button class="icon-action icon-action_color_caution">...</button>
<button class="icon-action icon-action_color_success">...</button>
```
{% include demo_close.html %}
