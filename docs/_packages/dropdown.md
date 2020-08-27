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

{% include demo_open.html class_grid="grid_stack" %}
<div class="dropdown">
  <button class="dropdown__trigger button button_color_primary">Trigger</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <div class="dropdown__content">
        <h2 class="dropdown__title">Dropdown Title</h2>
        <p>This is some content for a dropdown...</p>
      </div>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link is-active">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<div class="dropdown">
  <button class="dropdown__trigger button button_color_primary">Dropdown</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <div class="dropdown__content">
        <h2 class="dropdown__title">Dropdown Title</h2>
        <p>This is some content for a dropdown...</p>
      </div>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link is-active">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link is-disabled">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
  </ul>
</div>
```
{% include demo_close.html %}

## dropdown_pos_[key]

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div class="dropdown dropdown_pos_down-left">
    <button class="button">
      <span>Down left</span>
      {% include icon.html icon="chevron-down" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_down">
    <button class="button">
      <span>Down</span>
      {% include icon.html icon="chevron-down" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_down-right">
    <button class="button">
      <span>Down right</span>
      {% include icon.html icon="chevron-down" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
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
      {% include icon.html icon="chevron-up" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_up">
    <button class="button">
      <span>Up</span>
      {% include icon.html icon="chevron-up" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_up-right">
    <button class="button">
      <span>Up right</span>
      {% include icon.html icon="chevron-up" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
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
      {% include icon.html icon="chevron-left" %}
      <span>Left up</span>
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_left">
    <button class="button">
      {% include icon.html icon="chevron-left" %}
      <span>Left</span>
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_left-down">
    <button class="button">
      {% include icon.html icon="chevron-left" %}
      <span>Left down</span>
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
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
      {% include icon.html icon="chevron-right" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_right">
    <button class="button">
      <span>Right</span>
      {% include icon.html icon="chevron-right" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_right-down">
    <button class="button">
      <span>Right down</span>
      {% include icon.html icon="chevron-right" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
</div>
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_right-up">...</div>
<div class="dropdown dropdown_pos_right">...</div>
<div class="dropdown dropdown_pos_right-down">...</div>
```
{% include demo_close.html %}
