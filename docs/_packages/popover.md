---
layout: article
title: Popover
description: "A component that is initially hidden and revealed upon user interaction either through a click or hover event. Popover can contain lists of actions, links, or additional supplementary content."
package: "@vrembem/popover"
category: compound
usage:
  npm: true
  scss: true
---

## popover

{% include demo_open.html class_parent="text-align-center" %}
<button class="button button_color_primary" data-popover-trigger>Trigger</button>
<div class="popover is-active" data-popover data-popover-placement="bottom-start">
  <!-- <div class="arrow" data-popper-arrow></div> -->
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
{% include demo_switch.html %}
```html
<div class="popover">
  <button class="button">...</button>
  <div class="popover__target">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## popover_pos_[value]

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div class="popover popover_pos_bottom-start">
    <button class="button">
      <span>bottom-start</span>
      <span class="arrow-down"></span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
  <div class="popover popover_pos_bottom">
    <button class="button">
      <span>bottom</span>
      <span class="arrow-down"></span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
  <div class="popover popover_pos_bottom-end">
    <button class="button">
      <span>bottom-end</span>
      <span class="arrow-down"></span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
</div>
{% include demo_switch.html %}
```html
<div class="popover popover_pos_bottom-start">...</div>
<div class="popover popover_pos_bottom">...</div>
<div class="popover popover_pos_bottom-end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div class="popover popover_pos_top-start">
    <button class="button">
      <span>top-start</span>
      <span class="arrow-up"></span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
  <div class="popover popover_pos_top">
    <button class="button">
      <span>top</span>
      <span class="arrow-up"></span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
  <div class="popover popover_pos_top-end">
    <button class="button">
      <span>top-end</span>
      <span class="arrow-up"></span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
</div>
{% include demo_switch.html %}
```html
<div class="popover popover_pos_top-start">...</div>
<div class="popover popover_pos_top">...</div>
<div class="popover popover_pos_top-end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level flex-justify-end">
  <div class="popover popover_pos_left-start">
    <button class="button">
      <span class="arrow-left"></span>
      <span>left-start</span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
  <div class="popover popover_pos_left">
    <button class="button">
      <span class="arrow-left"></span>
      <span>left</span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
  <div class="popover popover_pos_left-end">
    <button class="button">
      <span class="arrow-left"></span>
      <span>left-end</span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
</div>
{% include demo_switch.html %}
```html
<div class="popover popover_pos_left-start">...</div>
<div class="popover popover_pos_left">...</div>
<div class="popover popover_pos_left-end">...</div>
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div class="popover popover_pos_right-start">
    <button class="button">
      <span>right-start</span>
      <span class="arrow-right"></span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
  <div class="popover popover_pos_right">
    <button class="button">
      <span>right</span>
      <span class="arrow-right"></span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
  <div class="popover popover_pos_right-end">
    <button class="button">
      <span>right-end</span>
      <span class="arrow-right"></span>
    </button>
    <div class="popover__target">
      <div class="padding">This is a popover...</div>
    </div>
  </div><!-- .popover -->
</div>
{% include demo_switch.html %}
```html
<div class="popover popover_pos_right-start">...</div>
<div class="popover popover_pos_right">...</div>
<div class="popover popover_pos_right-end">...</div>
```
{% include demo_close.html %}

## popover_size_[value]

<div>
  <div class="level">
    <div class="popover popover_size_auto popover_pos_top">
      <button class="button button_color_secondary">popover_size_auto</button>
      <div class="popover__target">
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
    <div class="popover popover_size_sm popover_pos_top-start">
      <button class="button button_color_secondary">popover_size_sm</button>
      <div class="popover__target">
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
    <div class="popover popover_pos_top-start">
      <button class="button button_color_secondary">default</button>
      <div class="popover__target">
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
    <div class="popover popover_size_lg popover_pos_top-start">
      <button class="button button_color_secondary">popover_size_lg</button>
      <div class="popover__target">
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
