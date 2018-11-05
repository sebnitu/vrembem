---
layout: page
title: "Size"
description: "A flexbox based grid system."
tags: layout
---

## `.size_auto`

<div class="demo spacing">
  <div class="demo__render">
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
  </div>
  <div class="demo__code" markdown="1">
```html
<div class="grid">
  <div class="grid__item size_auto">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
  </div>
</div>

## `size_[col]`

<div class="demo spacing">
  <div class="demo__render">
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
  </div>
  <div class="demo__code" markdown="1">
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
  </div>
</div>

## `.size_[breakpoint]_[col]`

<div class="demo spacing">
  <div class="demo__render">
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
  </div>
  <div class="demo__code" markdown="1">
```html
<div class="grid">
  <div class="grid__item size_12 size_6_xs size_8_sm size_4_md size_3_lg">...</div>
  <div class="grid__item size_12 size_6_xs size_4_sm size_4_md size_3_lg">...</div>
  <div class="grid__item size_12 size_6_xs size_4_sm size_4_md size_3_lg">...</div>
  <div class="grid__item size_12 size_6_xs size_8_sm size_12_md size_3_lg">...</div>
</div>
```
  </div>
</div>
