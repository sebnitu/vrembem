---
layout: article
title: "Size"
description: "A flexbox based grid system."
category: layout
# usage:
  # npm: "@vrembem/size"
  # scss: "vrembem/size/all"
---

{% include flag.html heading="size_auto" %}

{% include demo_open.html class_grid="grid_stack" %}

<div class="grid grid_flatten">

  <div class="grid__item size_auto">
    <div class="box">...</div>
  </div>

  <div class="grid__item">
    <div class="box">...</div>
  </div>

  <div class="grid__item">
    <div class="box">...</div>
  </div>

</div>

{% include demo_switch.html %}

```html
<div class="grid">
  <div class="grid__item size_auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="size_[col]" %}

{% include demo_open.html class_grid="grid_stack" %}

<div class="grid grid_flatten">

  <div class="grid__item size_6">
    <div class="box">...</div>
  </div>

  <div class="grid__item size_6">
    <div class="box">...</div>
  </div>

  <div class="grid__break"></div>

  <div class="grid__item size_6">
    <div class="box">...</div>
  </div>

  <div class="grid__item size_3">
    <div class="box">...</div>
  </div>

  <div class="grid__item size_3">
    <div class="box">...</div>
  </div>

</div>

{% include demo_switch.html %}

```html
<div class="grid">
  <div class="grid__item size_6">...</div>
  <div class="grid__item size_6">...</div>
  <div class="grid__break"></div>
  <div class="grid__item size_6">...</div>
  <div class="grid__item size_3">...</div>
  <div class="grid__item size_3">...</div>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="size_[breakpoint]_[col]" %}

{% include demo_open.html class_grid="grid_stack" %}

<div class="grid grid_flatten">

  <div class="grid__item size_12 size_6_xs size_8_sm size_4_md size_3_lg">
    <div class="box">...</div>
  </div>

  <div class="grid__item size_12 size_6_xs size_4_sm size_4_md size_3_lg">
    <div class="box">...</div>
  </div>

  <div class="grid__item size_12 size_6_xs size_4_sm size_4_md size_3_lg">
    <div class="box">...</div>
  </div>

  <div class="grid__item size_12 size_6_xs size_8_sm size_12_md size_3_lg">
    <div class="box">...</div>
  </div>

</div>

{% include demo_switch.html %}

```html
<div class="grid">
  <div class="grid__item size_12 size_6_xs size_8_sm size_4_md size_3_lg">...</div>
  <div class="grid__item size_12 size_6_xs size_4_sm size_4_md size_3_lg">...</div>
  <div class="grid__item size_12 size_6_xs size_4_sm size_4_md size_3_lg">...</div>
  <div class="grid__item size_12 size_6_xs size_8_sm size_12_md size_3_lg">...</div>
</div>
```

{% include demo_close.html %}
