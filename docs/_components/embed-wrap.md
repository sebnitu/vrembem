---
layout: page
title: Embed-wrap
description: "A container component for wrapping embeded media content in order to make them responsive."
---

## `embed-wrap`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="embed-wrap">
      <iframe class="embed-wrap__item" width="560" height="315" src="https://www.youtube.com/embed/IadsLclBOS8" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="embed-wrap">
  <iframe class="embed-wrap__item" ...></iframe>
</div>
```
  </div>
  </div>
</div>

## `embed-wrap_ratio`

Some media require different aspect ratios. In these cases there are a few modifiers for common ratios.

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="embed-wrap embed-wrap_ratio_4x3">
      <iframe class="embed-wrap__item" width="560" height="315" src="https://www.youtube.com/embed/CtMllWsML5M" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="embed-wrap embed-wrap_ratio_16x9">
  <iframe class="embed-wrap__item" ...></iframe>
</div>

<div class="embed-wrap embed-wrap_ratio_4x3">
  <iframe class="embed-wrap__item" ...></iframe>
</div>

<div class="embed-wrap embed-wrap_ratio_3x2">
  <iframe class="embed-wrap__item" ...></iframe>
</div>
```
  </div>
  </div>
</div>