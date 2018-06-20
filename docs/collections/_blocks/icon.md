---
title: Icon
---

# Icon

<p class="text_lead">A component for displaying glyphs that convey meaning through iconography.</p>

<div class="notice notice_type_info">You can use any icon set but may require changing default icon variables. Default styles are intended for <a href="https://feathericons.com/">feather icons</a> which is a great open source option.</div>

## `icon`

You can inject svg icons directly or use svg sprites. The only requirement is the `icon` component class.

<div class="demo demo_medium_row">
  <div class="demo__render">
    <svg role="img" class="icon"><use xlink:href="#anchor"></use></svg>
    <svg role="img" class="icon"><use xlink:href="#arrow-left"></use></svg>
    <svg role="img" class="icon"><use xlink:href="#arrow-right"></use></svg>
    <svg role="img" class="icon"><use xlink:href="#arrow-up"></use></svg>
    <svg role="img" class="icon"><use xlink:href="#arrow-down"></use></svg>
    <svg role="img" class="icon"><use xlink:href="#clipboard"></use></svg>
    <svg role="img" class="icon"><use xlink:href="#clock"></use></svg>
    <svg role="img" class="icon"><use xlink:href="#cpu"></use></svg>
    <svg role="img" class="icon"><use xlink:href="#delete"></use></svg>
    <svg role="img" class="icon"><use xlink:href="#download-cloud"></use></svg>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<svg role="img" class="icon">
  <use xlink:href="#github"></use>
</svg>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `icon_size`

<div class="demo demo_medium_row">
  <div class="demo__render demo__render_tile">
    <svg role="img" class="icon icon_size_small"><use xlink:href="#anchor"></use></svg>
    <svg role="img" class="icon icon_size_large"><use xlink:href="#anchor"></use></svg>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<svg role="img" class="icon">
  <use xlink:href="#github"></use>
</svg>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->
