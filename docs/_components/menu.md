---
layout: article
title: Menu
description: "Menus represent groups of links, actions or navigation that a user can interact with. They come with a variety of elements and modifiers to facilitate many contexts and roles."
category: compound
# usage:
  # npm: "@vrembem/menu"
  # scss: "vrembem/menu/all"
---

{% include flag.html heading="menu_theme_tabs" %}

{% include demo_open.html %}
<div class="demo__group">
  <ul class="menu menu_theme_tabs">
    <li class="menu__item">
      <a class="menu__link is-active" href="#">Create</a>
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
<div class="demo__group">
  <ul class="menu menu_stack menu_theme_tabs">
    <li class="menu__item">
      <a class="menu__link is-active" href="#">Create</a>
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
{% include demo_switch.html %}
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="#">Menu Item</a>
  </li>
  <li class="menu__sep"></li>
</ul>
```
{% include demo_close.html %}

{% include flag.html heading="menu" %}

{% include demo_open.html %}
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
{% include demo_switch.html %}
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="#">Menu Item</a>
  </li>
  <li class="menu__sep"></li>
</ul>
```
{% include demo_close.html %}

{% include flag.html heading="menu__link_icon" %}

{% include demo_open.html %}

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

{% include demo_switch.html %}

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

{% include demo_close.html %}

{% include flag.html heading="menu__text" %}

{% include demo_open.html %}

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

{% include demo_switch.html %}

```html
<ul class="menu">
  <li class="menu__item">
    <strong class="menu__text">Actions:</strong>
  </li>
</ul>
```

{% include demo_close.html %}

{% include flag.html heading="menu > *" %}

<div class="type" markdown="1">
Elements inside the `menu__link` and `menu__text` elements receive appropriate spacing.
</div>

{% include demo_open.html %}

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

{% include demo_switch.html %}

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

{% include demo_close.html %}

{% include flag.html heading="is-active is-disabled" %}

{% include demo_open.html %}

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

{% include demo_switch.html %}

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

{% include demo_close.html %}

{% include flag.html heading="menu_full" %}

{% include demo_open.html %}

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

{% include demo_switch.html %}

```html
<ul class="menu menu_full">
  ...
</ul>
```

{% include demo_close.html %}

{% include flag.html heading="menu_scroll" %}

<div class="type" markdown="1">
Allows a horizontal menu to scroll if it exceeds the full width of it's container.
</div>

{% include demo_open.html class_gridItem="span_6" %}

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

{% include demo_switch.html %}

```html
<ul class="menu menu_scroll">
  ...
</ul>
```

{% include demo_close.html %}

{% include flag.html heading="menu_wrap" %}

{% include demo_open.html %}

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

{% include demo_switch.html %}

```html
<ul class="menu menu_wrap">
  ...
</ul>
```

{% include demo_close.html %}

{% include flag.html heading="menu_stack" %}

{% include demo_open.html %}

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

{% include demo_switch.html %}

```html
<ul class="menu menu_stack">
  ...
</ul>
```

{% include demo_close.html %}

{% include flag.html heading="menu_theme_invert" %}

<div class="type" markdown="1">
This theme is perfect for using menus on a dark background.
</div>

{% include demo_open.html class_parent="invert" %}
<div class="demo__group">
  <ul class="menu menu_theme_invert">
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
  <ul class="menu menu_stack menu_theme_invert">
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
{% include demo_switch.html %}
```html
<ul class="menu menu_theme_invert">
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
{% include demo_close.html %}
