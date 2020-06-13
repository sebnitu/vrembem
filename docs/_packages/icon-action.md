---
layout: article
title: Icon-action
description: "A component for displaying simple action buttons using icons."
package: "@vrembem/icon-action"
category: simple
usage:
  npm: true
  scss: true
---

## icon-action

{% include demo_open.html class_grid="grid_break" %}
<div class="level">
  <button class="icon-action" aria-label="Close">
    {% include icon.html icon="x" %}
  </button>
  <button class="icon-action" aria-label="Minimize">
    {% include icon.html icon="minus" %}
  </button>
  <button class="icon-action" aria-label="Fullscreen">
    {% include icon.html icon="maximize-2" %}
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="icon-action" aria-label="Close">
  <svg role="img" class="icon">
    <!-- SVG markup or link ID goes here.. -->
  </svg>
</button>
```
{% include demo_close.html %}

## icon-action_color

{% include demo_open.html class_grid="grid_break" %}
<div class="level">
  <button class="icon-action icon-action_color_danger" aria-label="Close">
    {% include icon.html icon="x" %}
  </button>
  <button class="icon-action icon-action_color_caution" aria-label="Minimize">
    {% include icon.html icon="minus" %}
  </button>
  <button class="icon-action icon-action_color_success" aria-label="Fullscreen">
    {% include icon.html icon="maximize-2" %}
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="icon-action icon-action_color_danger" aria-label="Close">...</button>
<button class="icon-action icon-action_color_caution" aria-label="Minimize">...</button>
<button class="icon-action icon-action_color_success" aria-label="Fullscreen">...</button>
```
{% include demo_close.html %}

## icon-action_invert

{% include demo_open.html class_grid="grid_break" %}
<div class="padding radius background-night">
  <button class="icon-action icon-action_invert" aria-label="Close">
    {% include icon.html icon="x" %}
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="icon-action" aria-label="Close">...</button>
<button class="icon-action icon-action_invert" aria-label="Close">...</button>
```
{% include demo_close.html %}

## icon-action_subtle

{% include demo_open.html class_grid="grid_break" class_parent="flex flex-items-equal" %}
<div class="padding radius background-white border margin-right-sm">
  <button class="icon-action icon-action_subtle" aria-label="Close">
    {% include icon.html icon="x" %}
  </button>
</div>
<div class="padding radius background-night margin-left-sm">
  <button class="icon-action icon-action_invert icon-action_subtle" aria-label="Close">
    {% include icon.html icon="x" %}
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="icon-action icon-action_subtle" aria-label="Close">...</button>
<button class="icon-action icon-action_subtle icon-action_invert" aria-label="Close">...</button>
```
{% include demo_close.html %}
