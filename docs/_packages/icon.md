---
layout: article
title: Icon
description: "A component for displaying glyphs that convey meaning through iconography."
category: simple
usage:
  npm: "@vrembem/icon"
  scss: "vrembem/icon/all"
---

<div class="notice notice_state_info" data-dismissible>
  <div class="notice__body type">
    <p>You can use any icon set but may require changing default icon variables. Default styles are intended for <a href="https://feathericons.com/">feather icons</a> which is a great open source option.</p>
  </div>
</div>

{% include flag.html heading="icon" %}

<div class="type" markdown="1">
You can inject svg icons directly or use svg sprites. The only requirement is the `icon` component class.
</div>

{% include demo_open.html %}
<div class="level">
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

{% include flag.html heading="icon + heading" %}

{% include demo_open.html %}
<div class="spacing">
  <h1 class="h1">
    {% include icon.html icon="anchor" %}
    Heading example
  </h1>
  <h2 class="h2">
    {% include icon.html icon="anchor" %}
    Heading example
  </h2>
</div>
{% include demo_switch.html %}
```html
<h1>
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
  ...
</h1>

<h2>
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
  ...
</h2>
```
{% include demo_close.html %}
