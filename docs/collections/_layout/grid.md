---
layout: page
title: "Grid"
desc: "A flexbox based grid system."
---

## `.grid` `+` `.grid__item`

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

## `.grid__item_fill`

The fill modifier class creates equal height columns for a grid.

<div class="demo spacing">
  <div class="demo__render">
    <div class="grid grid_flatten">
      <div class="grid__item">
        <div class="box">...<br /><br /><br /><br /></div>
      </div>
      <div class="grid__item grid__item_fill">
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
  <div class="grid__item">
    ...<br /><br /><br /><br />
  </div>
  <div class="grid__item grid__item_fill">...</div>
  <div class="grid__item">...</div>
</div>
```
  </div>
</div>

## `.grid__break`

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

## `.grid_[breakpoint]`

<div class="demo spacing">
  <div class="demo__render spacing">

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
<div class="grid grid_md">
  <div class="grid__item">...</div>
  ...
</div>
<div class="grid grid_sm">
  <div class="grid__item">...</div>
  ...
</div>
```
  </div>
</div>

## `.grid_size_[type]`

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

## `.grid_flush`

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
