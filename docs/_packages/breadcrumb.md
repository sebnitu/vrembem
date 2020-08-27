---
layout: article
title: Breadcrumb
description: "The breadcrumb component is a navigation component that shows the hierarchical path to a users current location."
package: "@vrembem/breadcrumb"
category: compound
usage:
  npm: true
  scss: true
---

## breadcrumb

{% include demo_open.html class_grid="grid_stack" %}
<ol class="breadcrumb">
  <li class="breadcrumb__item">
    <a href="#" class="breadcrumb__link">&larr; Home</a>
  </li>
  <li class="breadcrumb__item">
    <a href="#" class="breadcrumb__link">Blog</a>
  </li>
  <li class="breadcrumb__item">
    <a href="#" class="breadcrumb__link">Category</a>
  </li>
  <li class="breadcrumb__item">
    <span class="breadcrumb__text">Current Page</span>
  </li>
</ol>
{% include demo_switch.html %}
```html
<ol class="breadcrumb">
  <li class="breadcrumb__item">
    <a href="/" class="breadcrumb__link">Home</a>
  </li>
  ...
  <li class="breadcrumb__item">
    Current Page
  </li>
</ol>
```
{% include demo_close.html %}

## breadcrumb_invert

{% include demo_open.html class_grid="grid_stack" %}
<div class="padding background-night radius">
  <ol class="breadcrumb breadcrumb_invert">
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link">&larr; Home</a>
    </li>
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link">Blog</a>
    </li>
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link">Category</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__text">Current Page</span>
    </li>
  </ol>
</div>
{% include demo_switch.html %}
```html
<ol class="breadcrumb breadcrumb_invert">
  ...
</ol>
```
{% include demo_close.html %}
