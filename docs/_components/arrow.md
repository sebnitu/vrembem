---
layout: page
title: Arrow
description: "A directional triangle drawn with CSS."
category: simple
# usage:
  # npm: "@vrembem/arrow"
  # scss: "vrembem/arrow/all"
---

{% include flag.html heading="arrow" %}

{% include demo_open.html %}

<span class="arrow"></span>
<span class="arrow arrow_up"></span>
<span class="arrow arrow_left"></span>
<span class="arrow arrow_right"></span>

{% include demo_switch.html %}

```html
<span class="arrow"></span>
<span class="arrow arrow_up"></span>
<span class="arrow arrow_left"></span>
<span class="arrow arrow_right"></span>
```

{% include demo_close.html %}

{% include flag.html heading="button > arrow" %}

{% include demo_open.html %}

<div class="button-group button-group_wrap">
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
</div>

{% include demo_switch.html %}

```html
<button class="button">
  <span>Button</span>
  <span class="arrow"></span>
</button>
```

{% include demo_close.html %}

{% include flag.html heading="menu > arrow" %}

{% include demo_open.html %}

<ul class="menu menu_wrap">
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

{% include demo_switch.html %}

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

{% include demo_close.html %}
