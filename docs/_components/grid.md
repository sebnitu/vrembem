---
layout: page
title: "Grid"
description: "A flexbox based grid system."
tags: layout
# usage:
  # npm: "@vrembem/grid"
  # scss: "vrembem/grid/all"
---

{% include flag.html heading="grid + grid__item" %}

<div class="demo spacing">
  <div class="demo__render">
    <div class="grid grid_flatten">
      <div class="grid__item">
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
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
  </div>
</div>

{% include flag.html heading="grid__item_fill" %}

<div class="type" markdown="1">
The fill modifier class creates equal height columns for a grid.
</div>

<div class="demo spacing">
  <div class="demo__render">
    <div class="grid grid_flatten">
      <div class="grid__item grid__item_fill">
        <div class="box">
          Duis nec augue nec massa feugiat bibendum eu et nisl. Vivamus accumsan consequat justo, sed faucibus lorem sodales vitae. Integer et consectetur tellus. Aliquam pellentesque est id sapien tristique, eget lobortis enim luctus.
        </div>
      </div>
      <div class="grid__item grid__item_fill">
        <div class="box">
          ...
        </div>
      </div>
      <div class="grid__item grid__item_fill">
        <div class="box">
          ...
        </div>
      </div>
    </div>
  </div>
  <div class="demo__code" markdown="1">
```html
<div class="grid">
  <div class="grid__item grid__item_fill">...</div>
  <div class="grid__item grid__item_fill">...</div>
  <div class="grid__item grid__item_fill">...</div>
</div>
```
  </div>
</div>

{% include flag.html heading="grid__break" %}

<div class="demo spacing">
  <div class="demo__render">

    <div class="grid grid_flatten">

      <div class="grid__item">
        <div class="box">...</div>
      </div>

      <div class="grid__item">
        <div class="box">...</div>
      </div>

      <div class="grid__break"></div>

      <div class="grid__item">
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
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__break"></div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```
  </div>
</div>

{% include flag.html heading="grid_[breakpoint]" %}

<div class="demo spacing">
  <div class="demo__render spacing">

    <div class="grid grid_flatten grid_lg">
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
    </div>

    <div class="grid grid_flatten grid_md">
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
    </div>

    <div class="grid grid_flatten grid_sm">
      <div class="grid__item">
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
<div class="grid grid_lg">...</div>
<div class="grid grid_md">...</div>
<div class="grid grid_sm">...</div>
```
  </div>
</div>

{% include flag.html heading="grid_size_[type]" %}

<div class="demo spacing">
  <div class="demo__render">

    <div class="grid grid_size_xs">
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
    </div>

    <div class="grid grid_size_sm">
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
    </div>

    <div class="grid grid_size_lg">
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
    </div>

    <div class="grid grid_size_xl">
      <div class="grid__item">
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
<div class="grid grid_size_xs">...</div>
<div class="grid grid_size_sm">...</div>
<div class="grid grid_size_lg">...</div>
<div class="grid grid_size_xl">...</div>
```
  </div>
</div>

{% include flag.html heading="grid_flush" %}

<div class="demo spacing">
  <div class="demo__render">

    <div class="grid grid_flush">
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
        <div class="box">...</div>
      </div>
    </div>

    <div class="grid grid_flush">
      <div class="grid__item">
        <div class="box">...</div>
      </div>
      <div class="grid__item">
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
<div class="grid grid_flush">...</div>
```
  </div>
</div>
