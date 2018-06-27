---
title: Arrow
---

# Arrow

<p class="text_lead">A directional triangle drawn with CSS.</p>

## `arrow`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <span class="arrow"></span>
    <span class="arrow arrow_up"></span>
    <span class="arrow arrow_left"></span>
    <span class="arrow arrow_right"></span>
  </div><!-- .demo__render -->
  <div class="grid__item">
  <div class="demo__code" markdown="1">
```html
<span class="arrow"></span>
<span class="arrow arrow_up"></span>
<span class="arrow arrow_left"></span>
<span class="arrow arrow_right"></span>
```
  </div>
  </div>
</div>

## `button > arrow`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <button class="button button_color_primary">
      <span>Button</span>
      <span class="arrow"></span>
    </button>
    <button class="button button_outline_dark">
      <span class="arrow arrow_up"></span>
      <span>Button</span>
    </button>
    <button class="button button_color_primary">
      {% include icon.html icon="github" %}
      <span class="arrow arrow_right"></span>
    </button>
    <button class="button button_outline_dark">
      <span class="arrow arrow_left"></span>
      {% include icon.html icon="github" %}
    </button>
  </div><!-- .demo__render -->
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="button">
  <span>Button</span>
  <span class="arrow"></span>
</button>
```
  </div>
  </div>
</div>

## `menu > arrow`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
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
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
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
  </div>
  </div>
</div>
