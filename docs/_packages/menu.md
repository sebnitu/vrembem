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

The menu component is composed of three parts: `menu`, `menu__item` and `menu__action`. The menu action can be either an `<a>` or `<button>` element. Also available is the optional `menu__sep` elements to create separators in between menu items.

{% include demo_open.html %}
<div class="scroll-box">
  <ul class="menu">
    <li class="menu__item">
      <button class="menu__action">Cut</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Copy</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Paste</button>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu">
  <li class="menu__item">
    <button class="menu__action">
      ...
    </button>
  </li>
  <li class="menu__sep"></li>
</ul>
```
{% include demo_close.html %}

Use the `menu__text` element to wrap action text inside `menu__action`.

{% include demo_open.html %}
<div class="scroll-box">
  <ul class="menu">
    <li class="menu__item">
      <button class="menu__action">
        {% include icon.html class="color-primary" icon="scissors" %}
        <span class="menu__text">Cut</span>
        <span class="color-subtle">&#x2318;X</span>
      </button>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">
        {% include icon.html class="color-primary" icon="copy" %}
        <span class="menu__text">Copy</span>
        <span class="color-subtle">&#x2318;C</span>
      </a>
    </li>
    <li class="menu__item">
      <button class="menu__action">
        {% include icon.html class="color-primary" icon="clipboard" %}
        <span class="menu__text">Paste</span>
        <span class="color-subtle">&#x2318;V</span>
      </button>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">
        {% include icon.html class="color-primary" icon="log-out" %}
        <span class="menu__text">Logout</span>
      </a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
...
<button class="menu__action">
  <span class="menu__text">...</span>
  ...
</button>
```
{% include demo_close.html %}

For links that only contain an icon, you can use the `menu__action_icon` modifier to create a square link similar to the `button_icon` modifier.

{% include demo_open.html %}
<div class="scroll-box">
  <ul class="menu menu_inline">
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="arrow-left" %}
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="arrow-right" %}
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="rotate-cw" %}
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="home" %}
      </a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="at-sign" %}
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="more-vertical" %}
      </a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<a class="menu__action menu__action_icon" href="#">
  ...
</a>
```
{% include demo_close.html %}

Elements inside the `menu__action` element receive appropriate children spacing as long as text nodes are wrapped with `span` elements.

{% include demo_open.html %}
<div class="scroll-box">
  <ul class="menu menu_inline">
    <li class="menu__item">
      <a class="menu__action" href="#">
        {% include icon.html icon="thumbs-up" %}
        <span>30k</span>
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">
        {% include icon.html icon="thumbs-down" %}
        <span>1k</span>
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">
        {% include icon.html icon="share" %}
        <span>Share</span>
      </a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="more-horizontal" %}
      </a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<a class="menu__action" href="#">
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
      <a class="menu__action is-active" href="#">Active</a>
    </li>
    <li class="menu__item">
      <a class="menu__action is-disabled" href="#">Disabled</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Normal</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__action is-active" href="#">
      ...
    </a>
  </li>
  <li class="menu__item">
    <a class="menu__action is-disabled" href="#">
      ...
    </a>
  </li>
</ul>
```
{% include demo_close.html %}

## menu_inline

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  <ul class="menu menu_inline">
    <li class="menu__item">
      <a class="menu__action" href="#">Create</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Edit</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Delete</a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_inline">...</ul>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  <ul class="menu menu_inline_lg">
    <li class="menu__item">
      <a class="menu__action" href="#">Create</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Edit</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Delete</a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_inline_lg">...</ul>
```
{% include demo_close.html %}

## menu_full

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  <ul class="menu menu_inline menu_full">
    <li class="menu__item">
      <a class="menu__action" href="#">Create</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Edit</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Delete</a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
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
  <ul class="menu menu_inline menu_full_lg">
    <li class="menu__item">
      <a class="menu__action" href="#">Create</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Edit</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Delete</a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_full_lg">...</ul>
```
{% include demo_close.html %}

## menu_invert

A theme for using menus on a dark background.

{% include demo_open.html class_grid="grid_stack" %}
<div class="padding background-night radius gap">
  <div class="scroll-box">
    <ul class="menu menu_inline menu_invert">
      <li class="menu__item">
        <a class="menu__action is-active" href="#">Create</a>
      </li>
      <li class="menu__item">
        <a class="menu__action" href="#">Read</a>
      </li>
      <li class="menu__item">
        <a class="menu__action is-disabled" href="#">Update</a>
      </li>
      <li class="menu__item">
        <a class="menu__action" href="#">Delete</a>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <a class="menu__action" href="#">Logout</a>
      </li>
    </ul>
  </div>
  <ul class="menu menu_invert">
    <li class="menu__item">
      <a class="menu__action is-active" href="#">Create</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Read</a>
    </li>
    <li class="menu__item">
      <a class="menu__action is-disabled" href="#">Update</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Delete</a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_invert">
  ...
</ul>
```
{% include demo_close.html %}
