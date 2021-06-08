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

{% include demo_open.html class_parent="level" %}
<div>
  <button class="button button_color_primary" data-popover-trigger data-popover-event="click">
    <span>Click Trigger</span>
    <span class="arrow-down"></span>
  </button>
  <div class="popover" data-popover>
    <ul class="menu">
      <li class="menu__item">
        <button class="menu__action">
          <span class="menu__text">Bold</span>
          <span class="color-subtle">&#8984;B</span>
        </button>
      </li>
      <li class="menu__item">
        <button class="menu__action">
          <span class="menu__text">Italic</span>
          <span class="color-subtle">&#8984;I</span>
        </button>
      </li>
      <li class="menu__item">
        <button class="menu__action">
          <span class="menu__text">Underline</span>
          <span class="color-subtle">&#8984;U</span>
        </button>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <button class="menu__action">
          <span class="menu__text">Paragraph Styles</span>
          <span class="color-subtle arrow-right"></span>
        </button>
      </li>
      <li class="menu__item">
        <button class="menu__action">
          <span class="menu__text">Align</span>
          <span class="color-subtle arrow-right"></span>
        </button>
      </li>
      <li class="menu__item">
        <button class="menu__action">
          <span class="menu__text">Line spacing</span>
          <span class="color-subtle arrow-right"></span>
        </button>
      </li>
      <li class="menu__item">
        <button class="menu__action">
          <span class="menu__text">Numbered lists</span>
          <span class="color-subtle arrow-right"></span>
        </button>
      </li>
      <li class="menu__item">
        <button class="menu__action">
          <span class="menu__text">List options</span>
          <span class="color-subtle arrow-right"></span>
        </button>
      </li>
      <li class="menu__sep"></li>
      <li class="menu__item">
        <button class="menu__action">
          <span class="menu__text">Clear formatting</span>
          <span class="color-subtle">&#8984;/</span>
        </button>
      </li>
    </ul>
  </div>
</div>
<div>
  <button class="button button_color_secondary" data-popover-trigger data-popover-event="hover">
    <span>Hover Trigger</span>
    <span class="arrow-down"></span>
  </button>
  <div class="popover" data-popover>
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
...
```
{% include demo_close.html %}

## data-popover-placement

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div>
    <button class="button" data-popover-trigger>
      <span>bottom-start</span>
      <span class="arrow-down"></span>
    </button>
    <div class="popover" data-popover data-popover-placement="bottom-start">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
  <div>
    <button class="button" data-popover-trigger>
      <span>bottom</span>
      <span class="arrow-down"></span>
    </button>
    <div class="popover" data-popover data-popover-placement="bottom">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
  <div>
    <button class="button" data-popover-trigger>
      <span>bottom-end</span>
      <span class="arrow-down"></span>
    </button>
    <div class="popover" data-popover data-popover-placement="bottom-end">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
...
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div>
    <button class="button" data-popover-trigger>
      <span>top-start</span>
      <span class="arrow-up"></span>
    </button>
    <div class="popover" data-popover data-popover-placement="top-start">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
  <div>
    <button class="button" data-popover-trigger>
      <span>top</span>
      <span class="arrow-up"></span>
    </button>
    <div class="popover" data-popover data-popover-placement="top">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
  <div>
    <button class="button" data-popover-trigger>
      <span>top-end</span>
      <span class="arrow-up"></span>
    </button>
    <div class="popover" data-popover data-popover-placement="top-end">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
...
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level flex-justify-end">
  <div>
    <button class="button" data-popover-trigger>
      <span class="arrow-left"></span>
      <span>left-start</span>
    </button>
    <div class="popover" data-popover data-popover-placement="left-start">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
  <div>
    <button class="button" data-popover-trigger>
      <span class="arrow-left"></span>
      <span>left</span>
    </button>
    <div class="popover" data-popover data-popover-placement="left-start">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
  <div>
    <button class="button" data-popover-trigger>
      <span class="arrow-left"></span>
      <span>left-end</span>
    </button>
    <div class="popover" data-popover data-popover-placement="left-end">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
...
```
{% include demo_close.html %}

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <div>
    <button class="button" data-popover-trigger>
      <span>right-start</span>
      <span class="arrow-right"></span>
    </button>
    <div class="popover" data-popover data-popover-placement="right-start">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
  <div>
    <button class="button" data-popover-trigger>
      <span>right</span>
      <span class="arrow-right"></span>
    </button>
    <div class="popover" data-popover data-popover-placement="right">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
  <div>
    <button class="button" data-popover-trigger>
      <span>right-end</span>
      <span class="arrow-right"></span>
    </button>
    <div class="popover" data-popover data-popover-placement="right-end">
      <div class="padding">This is a popover...</div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
...
```
{% include demo_close.html %}

## popover_size_[value]

<div>
  <div class="level">
    <button class="button" data-popover-trigger="size-auto">popover_size_auto</button>
    <button class="button" data-popover-trigger="size-sm">popover_size_sm</button>
    <button class="button" data-popover-trigger="size-default">default</button>
    <button class="button" data-popover-trigger="size-lg">popover_size_lg</button>
  </div>
</div>

<div class="popover popover_size_auto" data-popover="size-auto">
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

<div class="popover popover_size_sm" data-popover="size-sm">
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

<div class="popover" data-popover="size-default">
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

<div class="popover popover_size_lg" data-popover="size-lg">
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
