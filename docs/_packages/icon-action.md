---
layout: article
title: Icon-action
dsc: "A minimal container component for icon based actions."
category: simple
# usage:
  # npm: "@vrembem/icon-action"
  # scss: "vrembem/icon-action/all"
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

{% include demo_open.html class_parent="spacing" %}
<div class="padding radius background_white">
  <div class="level">
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
</div>
<div class="padding radius background_night">
  <div class="level">
    <button class="icon-action icon-action_invert">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action icon-action_invert icon-action_color_subtle">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action icon-action_invert icon-action_color_fade">
      {% include icon.html icon="x" %}
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
<button class="icon-action icon-action_color_invert">...</button>
<button class="icon-action icon-action_color_invert_subtle">...</button>
```
{% include demo_close.html %}
