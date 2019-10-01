---
layout: article
title: Panel
description: "Panels are flexible view container with auto-expand content section."
category: layout
usage:
  npm: "@vrembem/panel"
  scss: "vrembem/panel/index"
---

{% include flag.html heading="panel" %}

{% include demo_open.html class_parent="spacing" %}

<div class="panel panel_theme_shade">
  <div class="panel__section spacing">
    <h3 class="panel__title">Panel header</h3>
    <p>Aliquam vitae sapien vehicula, viverra massa non, gravida lacus. Nam facilisis dictum felis, quis lacinia elit rhoncus eget. Donec id pellentesque lorem.</p>
  </div>
</div>

<div class="panel">
  <div class="panel__header">
    <h3 class="panel__title">Panel header</h3>
  </div>
  <div class="panel__section background_shade_light">
    <p>Aliquam vitae sapien vehicula, viverra massa non, gravida lacus. Nam facilisis dictum felis, quis lacinia elit rhoncus eget. Donec id pellentesque lorem.</p>
  </div>
  <div class="panel__footer">
    <p>Panel footer</p>
  </div>
</div>

<div class="panel panel_theme_bordered">
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

<div class="panel panel_size_sm panel_theme_dark">
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

<div class="panel panel_size_lg panel_theme_shade">
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
...
```
{% include demo_close.html %}
