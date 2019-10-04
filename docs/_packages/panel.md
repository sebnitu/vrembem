---
layout: article
title: Panel
description: "Panels are a compositional container component that allows you to wrap and theme groups of content."
category: layout
usage:
  npm: "@vrembem/panel"
  scss: "vrembem/panel/index"
---

{% include flag.html heading="panel" %}

<div class="type" markdown="1">

Along with example `panel__section` usage.

</div>

{% include demo_open.html class_parent="spacing" %}
<div class="panel">
  <div class="panel__section spacing">
    <h3 class="panel__title">Panel header</h3>
    <p>Aliquam vitae sapien vehicula, viverra massa non, gravida lacus. Nam facilisis dictum felis, quis lacinia elit rhoncus eget. Donec id pellentesque lorem.</p>
  </div>
</div>

<div class="panel">
  <div class="panel__section">
    Item One
  </div>
  <div class="panel__section">
    Item Two
  </div>
  <div class="panel__section">
    Item Three
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="panel">
  <div class="panel__section">
    <h3 class="panel__title">...</h3>
    ...
  </div>
</div>

<div class="panel">
  <div class="panel__section">
    ...
  </div>
  <div class="panel__section">
    ...
  </div>
  <div class="panel__section">
    ...
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="panel__header + panel__footer" %}

{% include demo_open.html class_parent="spacing" %}
<div class="panel">
  <div class="panel__header">
    <h3 class="panel__title">Panel header</h3>
  </div>
  <div class="panel__section">
    <p>Aliquam vitae sapien vehicula, viverra massa non, gravida lacus. Nam facilisis dictum felis, quis lacinia elit rhoncus eget. Donec id pellentesque lorem.</p>
  </div>
  <div class="panel__footer">
    <p>Panel footer</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="panel">
  <div class="panel__header">
    <h3 class="panel__title">...</h3>
  </div>
  <div class="panel__section">
    ...
  </div>
  <div class="panel__footer">
    ...
  </div>
</div>
```
{% include demo_close.html %}
