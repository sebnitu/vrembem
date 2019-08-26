---
layout: article
title: Dropdown
description: "A component that is initially hidden and revealed upon user interaction either through a click or hover event. Dropdown components typically display lists of possible actions or navigation."
category: compound
# usage:
  # npm: "@vrembem/dropdown"
  # scss: "vrembem/dropdown/all"
---

{% include flag.html heading="dropdown" %}

<div class="type" markdown="1">

The dropdown component provides the following elements:

* `dropdown`
  * `dropdown__trigger`
  * `dropdown__menu`
    * `dropdown__item`
      * `dropdown__link`
      * `dropdown__content`
        * `dropdown__title`
    * `dropdown__sep`

State classes:

* `is-active`
* `is-disabled`

Trigger classes:

* `on-hover`
* `on-focus`

</div>

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

{% include demo_switch.html class_gridItem="span_8" %}

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

This illustrates the use of sub dropdown menus and also the `dropdown__menu_pos_switch` class for reversing the direction of a sub dropdown.

</div>

{% include demo_open.html %}

<div class="dropdown on-hover" style="display:inline-block;">
  <button class="dropdown__trigger button button_color_primary">Trigger</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
      <ul class="dropdown__menu">
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
        </li>
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
          <ul class="dropdown__menu dropdown__menu_pos_switch">
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

{% include demo_switch.html class_gridItem="span_8" %}

```html
<div class="dropdown is-active">
  <button class="dropdown__trigger button button_color_primary">Trigger</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Dropdown Item</a>
      <ul class="dropdown__menu">
        <li class="dropdown__item">
          <a href="#" class="dropdown__link">Dropdown Item</a>
          <ul class="dropdown__menu dropdown__menu_pos_switch">
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

{% include flag.html heading="dropdown__menu_pos" %}

{% include demo_open.html class_parent="spacing spacing_xs" %}

<div class="demo__group level">
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-down" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_down-left">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-down" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_down">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-down" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_down-right">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-left" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_left-down">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-left" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_left">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-left" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_left-up">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
</div><!-- .demo__group -->

<div class="demo__group level">
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-up" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_up-left">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-up" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_up">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-up" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_up-right">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-right" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_right-down">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-right" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_right">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
  <div class="dropdown on-hover">
    <button class="button button_icon">
      {% include icon.html icon="chevron-right" %}
    </button>
    <ul class="dropdown__menu dropdown__menu_pos_right-up">
      <li class="dropdown__item dropdown__content">This is a dropdown...</li>
    </ul>
  </div><!-- .dropdown -->
</div><!-- .demo__group -->

{% include demo_switch.html class_gridItem="span_8" %}

```html
<ul class="dropdown__menu dropdown__menu_pos_up-left">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_up">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_up-right">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_down-left">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_down">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_down-right">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_left-up">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_left">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_left-down">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_right-up">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_right">...</ul>
<ul class="dropdown__menu dropdown__menu_pos_right-down">...</ul>
```

{% include demo_close.html %}

<div class="type" markdown="1">

## Dropdown examples

Here are some examples of complex dropdowns and how they can be used along with some utility modifiers.

</div>

{% include flag.html heading="Twitter" %}

{% include demo_open.html %}

<div class="dropdown on-hover" style="display:inline-block;">
  <button class="dropdown__trigger button button_outline">
    <img class="radius_circle" src="https://picsum.photos/id/237/32/32" alt="" />
    <span>@sebnitu</span>
  </button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <a href="#" class="dropdown__content">
        <div>
          <h2 class="dropdown__title">Sebastian Nitu</h2>
          <span class="text_subtle">@sebnitu</span>
        </div>
      </a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">
          {% include icon.html icon="user" %}
        </span>
        <span class="dropdown__text">Profile</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">
          {% include icon.html icon="list" %}
        </span>
        <span class="dropdown__text">Lists</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">
          {% include icon.html icon="zap" %}
        </span>
        <span class="dropdown__text">Moments</span>
      </a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">
          {% include icon.html icon="heart" %}
        </span>
        <span class="dropdown__text">Promote Mode</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">
          {% include icon.html icon="external-link" %}
        </span>
        <span class="dropdown__text">Twitter Ads</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">
          {% include icon.html icon="activity" %}
        </span>
        <span class="dropdown__text">Analytics</span>
      </a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Settings and privacy</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Help Center</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Keyboard shortcuts</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Log out</a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link justify_between">
        <span class="dropdown__text">Night mode</span>
        <span class="text_subtle">
          {% include icon.html icon="moon" %}
        </span>
      </a>
    </li>
  </ul>
</div>

{% include demo_switch.html class_gridItem="span_8" %}

```html
<div class="dropdown on-hover">
  <button class="dropdown__trigger button button_color_primary">Twitter</button>
  <ul class="dropdown__menu">
    <li class="dropdown__item">
      <a href="#" class="dropdown__content">
        <div>
          <h2 class="dropdown__title">Sebastian Nitu</h2>
          <span class="text_subtle">@sebnitu</span>
        </div>
      </a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        {<span class="text_subtle">...</span>
        <span class="dropdown__text">Profile</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">...</span>
        <span class="dropdown__text">Lists</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">...</span>
        <span class="dropdown__text">Moments</span>
      </a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">...</span>
        <span class="dropdown__text">Promote Mode</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">...</span>
        <span class="dropdown__text">Twitter Ads</span>
      </a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">
        <span class="text_subtle">...</span>
        <span class="dropdown__text">Analytics</span>
      </a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Settings and privacy</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Help Center</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Keyboard shortcuts</a>
    </li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link">Log out</a>
    </li>
    <li class="dropdown__sep"></li>
    <li class="dropdown__item">
      <a href="#" class="dropdown__link justify_between">
        <span class="dropdown__text">Night mode</span>
        <span class="text_subtle">...</span>
      </a>
    </li>
  </ul>
</div>
```

{% include demo_close.html %}
