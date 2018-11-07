---
layout: page
title: Icon
description: "A component for displaying glyphs that convey meaning through iconography."
tags: block simple
---

<div class="notice notice_type_info">You can use any icon set but may require changing default icon variables. Default styles are intended for <a href="https://feathericons.com/">feather icons</a> which is a great open source option.</div>

## `icon`

You can inject svg icons directly or use svg sprites. The only requirement is the `icon` component class.

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    {% include icon.html icon="anchor" %}
    {% include icon.html icon="arrow-left" %}
    {% include icon.html icon="arrow-right" %}
    {% include icon.html icon="arrow-up" %}
    {% include icon.html icon="arrow-down" %}
    {% include icon.html icon="clipboard" %}
    {% include icon.html icon="clock" %}
    {% include icon.html icon="cpu" %}
    {% include icon.html icon="delete" %}
    {% include icon.html icon="download-cloud" %}
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<svg role="img" class="icon">
  <use xlink:href="#github"></use>
</svg>
```
  </div>
  </div>
</div>

## `icon_size`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render spacing">
    <div class="demo__group level level_wrap">
      {% include icon.html icon="anchor" class="icon_size_sm" %}
      {% include icon.html icon="anchor" class="icon_size_lg" %}
    </div>
    <div class="demo__group type">
      <h2>
        {% include icon.html icon="anchor" %}
        Heading Test
      </h2>
      <h2>
        {% include icon.html icon="anchor" class="icon_abs" %}
        Heading Test
      </h2>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<svg role="img" class="icon icon_size_sm">
  <use xlink:href="#anchor"></use>
</svg>

<svg role="img" class="icon icon_size_lg">
  <use xlink:href="#anchor"></use>
</svg>
```
  </div>
  </div>
</div>
