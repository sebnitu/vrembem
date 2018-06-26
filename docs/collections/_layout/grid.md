---
title: Grid
order: 3
---

# Grid

<p class="text_lead">A flexbox based grid system.</p>

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
