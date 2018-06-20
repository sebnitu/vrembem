---
title: Embed-wrap
---

# Embed-wrap

<p class="text_lead">A container component for wrapping embeded media content in order to make them responsive.</p>

## `embed-wrap`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="embed-wrap">
      <iframe class="embed-wrap__item" width="560" height="315" src="https://www.youtube.com/embed/IadsLclBOS8" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
    </div>
  </div>
  <div class="demo__code">

```html
<div class="embed-wrap">
  <iframe class="embed-wrap__item" ...></iframe>
</div>
```

  </div>
</div>

## `embed-wrap_ratio`

Some media require different aspect ratios. In these cases there are a few modifiers for common ratios.

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="embed-wrap embed-wrap_ratio_4x3">
      <iframe class="embed-wrap__item" width="560" height="315" src="https://www.youtube.com/embed/CtMllWsML5M" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
    </div>
  </div>
  <div class="demo__code">

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