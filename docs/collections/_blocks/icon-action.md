---
title: Icon-action
---

# Icon-action

<p class="text_lead">A minimal container component for icon based actions.</p>

## `icon-action`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <button class="icon-action">
      <svg role="img" class="icon"><use xlink:href="#x"></use></svg>
    </button>
    <button class="icon-action">
      <svg role="img" class="icon"><use xlink:href="#minus"></use></svg>
    </button>
    <button class="icon-action">
      <svg role="img" class="icon"><use xlink:href="#maximize-2"></use></svg>
    </button>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="icon-action">
  <svg role="img" class="icon">
    <use xlink:href="#x"></use>
  </svg>
</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `icon-action_size`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <button class="icon-action icon-action_size_small">
      <svg role="img" class="icon">
        <use xlink:href="#x"></use>
      </svg>
    </button>
    <button class="icon-action">
      <svg role="img" class="icon">
        <use xlink:href="#x"></use>
      </svg>
    </button>
    <button class="icon-action icon-action_size_large">
      <svg role="img" class="icon">
        <use xlink:href="#x"></use>
      </svg>
    </button>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="icon-action icon-action_size_small">...</button>
<button class="icon-action">...</button>
<button class="icon-action icon-action_size_large">...</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `icon-action_color`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <div class="demo__group">
      <button class="icon-action icon-action_color_fade">
        <svg role="img" class="icon">
          <use xlink:href="#x"></use>
        </svg>
      </button>
      <button class="icon-action icon-action_color_danger">
        <svg role="img" class="icon">
          <use xlink:href="#x"></use>
        </svg>
      </button>
      <button class="icon-action icon-action_color_caution">
        <svg role="img" class="icon">
          <use xlink:href="#x"></use>
        </svg>
      </button>
      <button class="icon-action icon-action_color_success">
        <svg role="img" class="icon">
          <use xlink:href="#x"></use>
        </svg>
      </button>
    </div>
    <div class="demo__group demo__group_inverted">
      <button class="icon-action icon-action_color_fade-inverted">
        <svg role="img" class="icon">
          <use xlink:href="#x"></use>
        </svg>
      </button>
      <button class="icon-action icon-action_color_light">
        <svg role="img" class="icon">
          <use xlink:href="#x"></use>
        </svg>
      </button>
    </div>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="icon-action icon-action_color_fade">...</button>
<button class="icon-action icon-action_color_fade-inverted">...</button>
<button class="icon-action icon-action_color_light">...</button>
<button class="icon-action icon-action_color_danger">...</button>
<button class="icon-action icon-action_color_caution">...</button>
<button class="icon-action icon-action_color_success">...</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->
