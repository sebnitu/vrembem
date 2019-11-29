---
layout: article
title: Dropdown
description: "A component that is initially hidden and revealed upon user interaction either through a click or hover event. Dropdown components typically display lists of possible actions or navigation."
category: compound
usage:
  npm: "@vrembem/dropdown"
  scss: "vrembem/dropdown/index"
---

{% include flag.html heading="dropdown" %}

{% include demo_open.html %}
<div class="dropdown is-active">
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
<div class="dropdown is-active">
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

{% include flag.html heading="dropdown__item > dropdown__menu" %}

<div class="type" markdown="1">
This illustrates the use of sub dropdown menus and also the `dropdown_pos_switch` class for reversing the direction of a sub dropdown.
</div>

{% include demo_open.html %}
<div class="dropdown on-hover">
  <button class="dropdown__trigger button button_color_primary">Trigger</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__item dropdown on-hover">
      <a href="#" class="dropdown__link">Dropdown Item</a>
      <ul class="dropdown__menu">
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
        <li class="dropdown__item dropdown dropdown_pos_switch on-hover">
          <a href="#" class="dropdown__link">Dropdown Item</a>
          <ul class="dropdown__menu">
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
            </li>
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
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
<div class="dropdown is-active">
  <button class="dropdown__trigger button button_color_primary">Trigger</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
      <ul class="dropdown__menu">
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
          <ul class="dropdown__menu dropdown_pos_switch">
            <li class="dropdown__item">
              <a href="#" class="dropdown__link">Dropdown Item</a>
            </li>
            ...
          </ul>
        </li>
        ...
      </ul>
    </li>
    ...
  </ul>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="dropdown_pos" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="level">
  <div class="dropdown dropdown_pos_down-left on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-down" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_down on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-down" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_down-right on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-down" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_left-down on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-left" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_left on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-left" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_left-up on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-left" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_up-left on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-up" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_up on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-up" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_up-right on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-up" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_right-down on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-right" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_right on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-right" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown dropdown_pos_right-up on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-right" %}
    </button>
    <ul class="dropdown__menu">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
</div><!-- .demo__group -->
{% include demo_switch.html %}
```html
<div class="dropdown dropdown_pos_up-left">...</div>
<div class="dropdown dropdown_pos_up">...</div>
<div class="dropdown dropdown_pos_up-right">...</div>
<div class="dropdown dropdown_pos_down-left">...</div>
<div class="dropdown dropdown_pos_down">...</div>
<div class="dropdown dropdown_pos_down-right">...</div>
<div class="dropdown dropdown_pos_left-up">...</div>
<div class="dropdown dropdown_pos_left">...</div>
<div class="dropdown dropdown_pos_left-down">...</div>
<div class="dropdown dropdown_pos_right-up">...</div>
<div class="dropdown dropdown_pos_right">...</div>
<div class="dropdown dropdown_pos_right-down">...</div>
```
{% include demo_close.html %}
