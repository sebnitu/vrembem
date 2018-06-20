---
title: Arrow
---

# Arrow

<p class="text_lead">A directional triangle drawn with CSS.</p>

## `arrow`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <span class="arrow"></span>
    <span class="arrow arrow_up"></span>
    <span class="arrow arrow_left"></span>
    <span class="arrow arrow_right"></span>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<span class="arrow"></span>
<span class="arrow arrow_up"></span>
<span class="arrow arrow_left"></span>
<span class="arrow arrow_right"></span>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `button > arrow`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <button class="button button_color_primary">
      <span>Button</span>
      <span class="arrow"></span>
    </button>
    <button class="button button_outline_dark">
      <span class="arrow arrow_up"></span>
      <span>Button</span>
    </button>
    <button class="button button_color_primary">
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
      <span class="arrow arrow_right"></span>
    </button>
    <button class="button button_outline_dark">
      <span class="arrow arrow_left"></span>
      <svg role="img" class="icon">
        <use xlink:href="#github"></use>
      </svg>
    </button>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<button class="button">
  <span>Button</span>
  <span class="arrow"></span>
</button>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->

## `menu > arrow`

<div class="demo demo_medium_row">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link" href="#">
          <span>Create</span>
          <span class="arrow"></span>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link is-active" href="#">
          <span class="arrow arrow_up"></span>
          <span>Update</span>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link is-disabled" href="#">
          <span>Delete</span>
          <span class="arrow arrow_right"></span>
        </a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">
          <span class="arrow arrow_left"></span>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </div><!-- .demo__render -->
  <div class="demo__code">

```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="#">
      <span>Create</span>
      <span class="arrow"></span>
    </a>
  </li>
</ul>
```

  </div><!-- .demo__code -->
</div><!-- .demo -->
