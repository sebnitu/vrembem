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
  <div class="dropdown dropdown_pos_bottom-start">
    <button class="button">
      <span>bottom-start</span>
      <span class="arrow-down"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_bottom">
    <button class="button">
      <span>bottom</span>
      <span class="arrow-down"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_bottom-end">
    <button class="button">
      <span>bottom-end</span>
      <span class="arrow-down"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
</div>
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_bottom-start">...</div>
<div class="dropdown dropdown_pos_bottom">...</div>
<div class="dropdown dropdown_pos_bottom-end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div class="dropdown dropdown_pos_top-start">
    <button class="button">
      <span>top-start</span>
      <span class="arrow-up"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_top">
    <button class="button">
      <span>top</span>
      <span class="arrow-up"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_top-end">
    <button class="button">
      <span>top-end</span>
      <span class="arrow-up"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
</div>
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_top-start">...</div>
<div class="dropdown dropdown_pos_top">...</div>
<div class="dropdown dropdown_pos_top-end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level flex-justify-end">
  <div class="dropdown dropdown_pos_left-start">
    <button class="button">
      <span class="arrow-left"></span>
      <span>left-start</span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_left">
    <button class="button">
      <span class="arrow-left"></span>
      <span>left</span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_left-end">
    <button class="button">
      <span class="arrow-left"></span>
      <span>left-end</span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
</div>
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_left-start">...</div>
<div class="dropdown dropdown_pos_left">...</div>
<div class="dropdown dropdown_pos_left-end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div class="dropdown dropdown_pos_right-start">
    <button class="button">
      <span>right-start</span>
      <span class="arrow-right"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_right">
    <button class="button">
      <span>right</span>
      <span class="arrow-right"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_right-end">
    <button class="button">
      <span>right-end</span>
      <span class="arrow-right"></span>
    </button>
    <div class="dropdown__target">
      <div class="padding">This is a dropdown...</div>
    </div>
  </div><!-- .dropdown -->
</div>
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_right-start">...</div>
<div class="dropdown dropdown_pos_right">...</div>
<div class="dropdown dropdown_pos_right-end">...</div>
```
{% include demo_close.html %}

## dropdown_size_[value]

<div>
  <div class="level">
    <div class="dropdown dropdown_size_auto dropdown_pos_top">
      <button class="dropdown__trigger button button_color_secondary">dropdown_size_auto</button>
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
    <div class="dropdown dropdown_size_sm dropdown_pos_top-start">
      <button class="dropdown__trigger button button_color_secondary">dropdown_size_sm</button>
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
    <div class="dropdown dropdown_pos_top-start">
      <button class="dropdown__trigger button button_color_secondary">default</button>
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
    <div class="dropdown dropdown_size_lg dropdown_pos_top-start">
      <button class="dropdown__trigger button button_color_secondary">dropdown_size_lg</button>
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
  </div>
</div>
