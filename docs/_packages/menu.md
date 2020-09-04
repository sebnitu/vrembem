---
layout: article
title: Menu
description: "Menus represent groups of links, actions or tools that a user can interact with."
package: "@vrembem/menu"
category: compound
usage:
  npm: true
  scss: true
---

## menu

The primary elements when composing the `menu` component are `menu__item`'s containing `menu__link`'s. Use the optional `menu__sep` in between `menu__item`'s to create separators.

{% include demo_open.html %}
<div class="scroll-box">
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
{% include demo_switch.html %}
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="#">
      ...
    </a>
  </li>
  <li class="menu__sep"></li>
</ul>
```
{% include demo_close.html %}

For links that only contain an icon, you can use the `menu__link_icon` modifier to create a square link similar to the `button_icon` modifier.

{% include demo_open.html %}
<div class="scroll-box">
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
{% include demo_switch.html %}
```html
<a class="menu__link menu__link_icon" href="#">
  ...
</a>
```
{% include demo_close.html %}

Elements inside the `menu__link` and `menu__text` elements receive appropriate children spacing as long as text nodes are wrapped with `span` elements.

{% include demo_open.html %}
<div class="scroll-box">
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
{% include demo_switch.html %}
```html
<a class="menu__link" href="#">
  <svg class="icon" role="img">
    <!-- Icon markup... -->
  </svg>
  <span>Text node...</span>
</a>
```
{% include demo_close.html %}

## is-active is-disabled

{% include demo_open.html %}
<div class="scroll-box">
  <ul class="menu">
    <li class="menu__item">
      <a class="menu__link is-active" href="#">Active</a>
    </li>
    <li class="menu__item">
      <a class="menu__link is-disabled" href="#">Disabled</a>
    </li>
    <li class="menu__item">
      <a class="menu__link" href="#">Normal</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link is-active" href="#">
      ...
    </a>
  </li>
  <li class="menu__item">
    <a class="menu__link is-disabled" href="#">
      ...
    </a>
  </li>
</ul>
```
{% include demo_close.html %}

## menu_full

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
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
{% include demo_switch.html %}
```html
<ul class="menu menu_full">...</ul>
```
{% include demo_close.html %}

To set a menu to full below a specific breakpoint, use the full breakpoint modifier: `menu_full_[key]`

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  <ul class="menu menu_full_lg">
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
{% include demo_switch.html %}
```html
<ul class="menu menu_full_lg">...</ul>
```
{% include demo_close.html %}

## menu_stack

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

To create a stacked menu below a specific breakpoint, use the stack breakpoint modifier: `menu_stack_[key]`

{% include demo_open.html %}
<ul class="menu menu_stack_lg">
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
<ul class="menu menu_stack_lg">
  ...
</ul>
```
{% include demo_close.html %}

## menu_theme_invert

A theme for using menus on a dark background.

{% include demo_open.html class_grid="grid_stack" %}
<div class="padding background-night radius gap">
  <div class="scroll-box">
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
  ...
</ul>
```
{% include demo_close.html %}

## menu_theme_tabs

A theme for creating tab styled menus.

{% include demo_open.html class_grid="grid_stack" %}
<div class="gap">
  <div class="scroll-box">
    <ul class="menu menu_theme_tabs">
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
  <ul class="menu menu_stack menu_theme_tabs">
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
<ul class="menu menu_theme_tabs">
  ...
</ul>
```
{% include demo_close.html %}
