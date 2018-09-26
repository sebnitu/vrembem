---
layout: page
title: Menu
desc: "Menus represent groups of links, actions or navigation that a user can interact with. They come with a variety of elements and modifiers to facilitate many contexts and roles."
---

## `menu`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="#">Menu Item</a>
  </li>
  <li class="menu__sep"></li>
</ul>
```
  </div>
  </div>
</div>

## `menu__link_icon`

Used for displaying icon-only links.

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          {% include icon.html icon="arrow-left" %}
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          {% include icon.html icon="arrow-right" %}
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          {% include icon.html icon="rotate-cw" %}
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          {% include icon.html icon="home" %}
        </a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          {% include icon.html icon="at-sign" %}
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          {% include icon.html icon="more-vertical" %}
        </a>
      </li>
    </ul>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link menu__link_icon" href="#">
      <svg role="img" class="icon">
        <use xlink:href="#arrow-left"></use>
      </svg>
    </a>
  </li>
</ul>
```
  </div>
  </div>
</div>

## `menu__text`

For creating non-link menu item content.

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <strong class="menu__text">Actions:</strong>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
    </ul>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<ul class="menu">
  <li class="menu__item">
    <strong class="menu__text">Actions:</strong>
  </li>
</ul>
```
  </div>
  </div>
</div>

## `menu > *`

Elements inside the menu__link and menu__text elements receive appropriate spacing.

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link" href="#">
          {% include icon.html icon="thumbs-up" %}
          <span>30k</span>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">
          {% include icon.html icon="thumbs-down" %}
          <span>1k</span>
        </a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">
          {% include icon.html icon="share" %}
          <span>Share</span>
        </a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link menu__link_icon" href="#">
          {% include icon.html icon="more-horizontal" %}
        </a>
      </li>
    </ul>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="#">
      <svg role="img" class="icon">
        <use xlink:href="#thumbs-up"></use>
      </svg>
      <span>30k</span>
    </a>
  </li>
</ul>
```
  </div>
  </div>
</div>

## `is-active` `is-disabled`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link is-active" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link is-disabled" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link is-active" href="#">
      Create
    </a>
  </li>
  <li class="menu__item">
    <a class="menu__link is-disabled" href="#">
      Edit
    </a>
  </li>
</ul>
```
  </div>
  </div>
</div>

<div class="type" markdown="1">
## Menu Modifiers
</div>

## `menu_full`

Allows a horizontal menu to span the full width of it's container.

<div class="demo spacing">
  <div class="demo__render">
    <ul class="menu menu_full">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div>
  <div class="demo__code" markdown="1">
```html
<ul class="menu menu_full">
  ...
</ul>
```
  </div>
</div>

## `menu_scroll`

Allows a horizontal menu to scroll if it exceeds the full width of it's container.

<div class="demo spacing">
  <div class="demo__render">
    <ul class="menu menu_scroll">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Read</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Read</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Settings</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div>
  <div class="demo__code" markdown="1">
```html
<ul class="menu menu_scroll">
  ...
</ul>
```
  </div>
</div>

## `menu_wrap`

Allows a horizontal menus to wrap if it exceeds the full width of it's container.

<div class="demo spacing">
  <div class="demo__render">
    <div>
    <ul class="menu menu_wrap">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Read</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Read</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Settings</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
    </div>
  </div>
  <div class="demo__code" markdown="1">
```html
<div>
  <ul class="menu menu_wrap">
    ...
  </ul>
</div>
```
  </div>
</div>

## `menu_stack`

<div class="demo grid grid_md">
<div class="grid__item">
  <div class="demo__render">
    <ul class="menu menu_stack">
      <li class="menu__item">
        <a class="menu__link" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Edit</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__link" href="#">Logout</a>
      </li>
    </ul>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<ul class="menu menu_stack">
  ...
</ul>
```
  </div>
  </div>
</div>

## `menu_invert`

This theme is perfect for using menus on a dark background.

<div class="demo grid grid_md">
  <div class="grid__item">
    <div class="demo__render invert">
      <div class="demo__group">
        <ul class="menu menu_invert">
          <li class="menu__item">
            <a class="menu__link is-active" href="#">Create</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Read</a>
          </li>
          <li class="menu__item">
            <a class="menu__link is-disabled" href="#">Update</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Delete</a>
          </li>
          <li class="menu__sep"></li>
          <li class="menu__item">
            <a class="menu__link" href="#">Logout</a>
          </li>
        </ul>
      </div>
      <div class="demo__group">
        <ul class="menu menu_stack menu_invert">
          <li class="menu__item">
            <a class="menu__link is-active" href="#">Create</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Read</a>
          </li>
          <li class="menu__item">
            <a class="menu__link is-disabled" href="#">Update</a>
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#">Delete</a>
          </li>
          <li class="menu__sep"></li>
          <li class="menu__item">
            <a class="menu__link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<ul class="menu menu_invert">
  <li class="menu__item">
    <a class="menu__link is-active" href="#">Create</a>
  </li>
  <li class="menu__item">
    <a class="menu__link" href="#">Read</a>
  </li>
  <li class="menu__item">
    <a class="menu__link is-disabled" href="#">Edit</a>
  </li>
  <li class="menu__item">
    <a class="menu__link" href="#">Delete</a>
  </li>
  <li class="menu__sep"></li>
  <li class="menu__item">
    <a class="menu__link" href="#">Logout</a>
  </li>
</ul>
```
  </div>
  </div>
</div>
