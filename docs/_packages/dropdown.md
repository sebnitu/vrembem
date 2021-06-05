---
layout: article
title: Dropdown
description: "A component that is initially hidden and revealed upon user interaction either through a click or hover event. Dropdown components typically display lists of possible actions or navigation."
package: "@vrembem/dropdown"
category: compound
usage:
  npm: true
  scss: true
---

## dropdown

{% include demo_open.html %}
<div class="dropdown">
  <button class="dropdown__trigger button button_color_primary">Trigger</button>
  <div class="dropdown__target">
    <ul class="menu">
      <li class="menu__item">
        <button class="menu__action">Undo</button>
      </li>
      <li class="menu__item">
        <button class="menu__action">Redo</button>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <button class="menu__action">Cut</button>
      </li>
      <li class="menu__item">
        <button class="menu__action">Copy</button>
      </li>
      <li class="menu__item">
        <button class="menu__action">Paste</button>
      </li>
    </ul>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dropdown">
  <button class="dropdown__trigger">...</button>
  <div class="dropdown__target">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## dropdown_pos_[value]

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div class="dropdown dropdown_pos_down-left">
    <button class="button">
      <span>Down left</span>
      <span class="arrow-down"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_down">
    <button class="button">
      <span>Down</span>
      <span class="arrow-down"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_down-right">
    <button class="button">
      <span>Down right</span>
      <span class="arrow-down"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
</div>
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_down-left">...</div>
<div class="dropdown dropdown_pos_down">...</div>
<div class="dropdown dropdown_pos_down-right">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div class="dropdown dropdown_pos_up-left">
    <button class="button">
      <span>Up left</span>
      <span class="arrow-up"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_up">
    <button class="button">
      <span>Up</span>
      <span class="arrow-up"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_up-right">
    <button class="button">
      <span>Up right</span>
      <span class="arrow-up"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
</div>
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_up-left">...</div>
<div class="dropdown dropdown_pos_up">...</div>
<div class="dropdown dropdown_pos_up-right">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level flex-justify-end">
  <div class="dropdown dropdown_pos_left-up">
    <button class="button">
      <span class="arrow-left"></span>
      <span>Left up</span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_left">
    <button class="button">
      <span class="arrow-left"></span>
      <span>Left</span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_left-down">
    <button class="button">
      <span class="arrow-left"></span>
      <span>Left down</span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
</div>
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_left-up">...</div>
<div class="dropdown dropdown_pos_left">...</div>
<div class="dropdown dropdown_pos_left-down">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div class="dropdown dropdown_pos_right-up">
    <button class="button">
      <span>Right up</span>
      <span class="arrow-right"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_right">
    <button class="button">
      <span>Right</span>
      <span class="arrow-right"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_right-down">
    <button class="button">
      <span>Right down</span>
      <span class="arrow-right"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
</div>
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_right-up">...</div>
<div class="dropdown dropdown_pos_right">...</div>
<div class="dropdown dropdown_pos_right-down">...</div>
```
{% include demo_close.html %}
