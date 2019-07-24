---
layout: article
title: "Span"
description: "A component that sets the flex-basis and max-width of a flexed element."
category: layout
# usage:
  # npm: "@vrembem/span"
  # scss: "vrembem/span/all"
---

{% include flag.html heading="span_auto" %}

{% include demo_open.html class_grid="grid_stack" %}

<div class="grid grid_flatten">

  <div class="grid__item span_auto">
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
  <div class="grid__item span_auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="span_[col]" %}

{% include demo_open.html class_grid="grid_stack" %}

<div class="grid grid_flatten">

  <div class="grid__item span_6">
    <div class="box">...</div>
  </div>

  <div class="grid__item span_6">
    <div class="box">...</div>
  </div>

  <div class="grid__break"></div>

  <div class="grid__item span_6">
    <div class="box">...</div>
  </div>

  <div class="grid__item span_3">
    <div class="box">...</div>
  </div>

  <div class="grid__item span_3">
    <div class="box">...</div>
  </div>

</div>

{% include demo_switch.html %}

```html
<div class="grid">
  <div class="grid__item span_6">...</div>
  <div class="grid__item span_6">...</div>
  <div class="grid__break"></div>
  <div class="grid__item span_6">...</div>
  <div class="grid__item span_3">...</div>
  <div class="grid__item span_3">...</div>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="span_[breakpoint]_[col]" %}

{% include demo_open.html class_grid="grid_stack" %}

<div class="grid grid_flatten">

  <div class="grid__item span_12 span_6_xs span_8_sm span_4_md span_3_lg">
    <div class="box">...</div>
  </div>

  <div class="grid__item span_12 span_6_xs span_4_sm span_4_md span_3_lg">
    <div class="box">...</div>
  </div>

  <div class="grid__item span_12 span_6_xs span_4_sm span_4_md span_3_lg">
    <div class="box">...</div>
  </div>

  <div class="grid__item span_12 span_6_xs span_8_sm span_12_md span_3_lg">
    <div class="box">...</div>
  </div>

</div>

{% include demo_switch.html %}

```html
<div class="grid">
  <div class="grid__item span_12 span_6_xs span_8_sm span_4_md span_3_lg">...</div>
  <div class="grid__item span_12 span_6_xs span_4_sm span_4_md span_3_lg">...</div>
  <div class="grid__item span_12 span_6_xs span_4_sm span_4_md span_3_lg">...</div>
  <div class="grid__item span_12 span_6_xs span_8_sm span_12_md span_3_lg">...</div>
</div>
```

{% include demo_close.html %}
