---
layout: article
title: Icon
description: "A component for displaying glyphs that convey meaning through iconography."
category: simple
# usage:
  # npm: "@vrembem/icon"
  # scss: "vrembem/icon/all"
---

<div class="notice notice_type_info type">You can use any icon set but may require changing default icon variables. Default styles are intended for <a href="https://feathericons.com/">feather icons</a> which is a great open source option.</div>

{% include flag.html heading="icon" %}

<div class="type" markdown="1">
You can inject svg icons directly or use svg sprites. The only requirement is the `icon` component class.
</div>

{% include demo_open.html %}

<div class="demo__group level level_wrap">
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

{% include demo_switch.html %}

```html
<svg role="img" class="icon">
  <use xlink:href="#github"></use>
</svg>
```

{% include demo_close.html %}

{% include flag.html heading="icon_size" %}

{% include demo_open.html class_parent="spacing" %}

<div class="demo__group level level_wrap">
  {% include icon.html icon="anchor" class="icon_size_sm" %}
  {% include icon.html icon="anchor" %}
  {% include icon.html icon="anchor" class="icon_size_lg" %}
</div>

{% include demo_switch.html %}

```html
<svg role="img" class="icon icon_size_sm">
  <use xlink:href="#anchor"></use>
</svg>

<svg role="img" class="icon icon_size_lg">
  <use xlink:href="#anchor"></use>
</svg>
```

{% include demo_close.html %}

{% include flag.html heading="icon_abs" %}

{% include demo_open.html %}

<div class="demo__group type">
  <h2>
    {% include icon.html icon="anchor" %}
    Heading example
  </h2>
  <h2>
    {% include icon.html icon="anchor" class="icon_abs" %}
    Heading example
  </h2>
</div>

{% include demo_switch.html %}

```html
<h2>
  <svg role="img" class="icon icon_abs">
    <use xlink:href="#anchor"></use>
  </svg>
  ...
</h2>
```

{% include demo_close.html %}
