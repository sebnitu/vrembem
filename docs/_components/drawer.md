---
layout: article
title: Drawer
description: "A container component that slides in from the left or right. It typically contains menus, search or other content for your app."
category: compound
# usage:
  # npm: "@vrembem/drawer"
  # scss: "vrembem/drawer/all"
  # js: "vrembem/drawer"
---

<div class="notice notice_type_info">
  <h2 class="notice__title">Dependencies</h2>
  <div class="type">
    <p>The drawer component depends on the following components to be imported:</p>
    <ul>
      <li>
        <a href="/components/dialog"><strong>Dialog</strong></a> - Drawers are a container component. You can add any content you'd like but wrapping your content with the dialog component allows for the most flexibility and consistent layouts.
      </li>
      <li>
        <a href="/components/modal"><strong>Modal</strong></a> - Used for switch functionality. If enabled, drawer items get switched into modals for smaller screens.
      </li>
    </ul>
  </div>
</div>

{% include flag.html heading="drawer" %}

<div class="type" markdown="1">

A drawer component is composed of at minimum three elements:

* `drawer`: Defines the wrapper which contains a drawer set.
  * `drawer__item`: The primary component of the drawer functionality. You can have one or many drawer items per drawer component.
  * `drawer__main`: Defines the main content area that drawers are siblings to. Only one of these should exist per drawer component.

To create a trigger for your drawer, create a link or button and use the `drawer__trigger` class along with a `[data-target]` attribute containing a valid drawer selector as it's value.

</div>

{% include demo_open.html class_gridItem="size_12" %}

<div class="drawer">

  <aside class="drawer__item drawer-demo-left">
    <div class="drawer__dialog dialog">
      <div class="dialog__body">
        <p>Hi! I'm a drawer. I have the following class(es):</p>
        <ul>
          <li><code>drawer__item</code></li>
        </ul>
      </div>
    </div>
  </aside>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer__main</code></p>
    <div class="button-group">
      <button class="button button_color_primary drawer__trigger" data-target=".drawer-demo-left">
        Drawer left
      </button>
    </div>
  </div>

</div>

{% include demo_switch.html class_gridItem="size_12" %}

```html
<div class="drawer-parent">
  <div class="drawer">
    ...
  </div>
  <div class="drawer-sibling">
    ...
    <button class="drawer__trigger" data-target=".drawer">...</button>
  </div>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="drawer__item_pos_[location]" %}

{% include demo_open.html class_gridItem="size_12" %}

<div class="drawer">

  <aside class="drawer__item drawer__item_pos_left drawer-demo-pos-left">
    <div class="drawer__dialog dialog">
      <div class="dialog__body type">
        <p>Hi! I'm a drawer. I have the following class(es):</p>
        <ul>
          <li><code>drawer__item</code></li>
          <li><code>drawer__item_pos_left</code></li>
        </ul>
      </div>
    </div>
  </aside>

  <aside class="drawer__item drawer__item_pos_right drawer-demo-pos-right">
    <div class="drawer__dialog dialog">
      <div class="dialog__body type">
        <p>Hi! I'm a drawer. I have the following class(es):</p>
        <ul>
          <li><code>drawer__item</code></li>
          <li><code>drawer__item_pos_right</code></li>
        </ul>
      </div>
    </div>
  </aside>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer__main</code></p>
    <div class="button-group">
      <button class="button button_color_primary drawer__trigger" data-target=".drawer-demo-pos-left">
        Drawer left
      </button>
      <button class="button button_color_primary drawer__trigger" data-target=".drawer-demo-pos-right">
        Drawer right
      </button>
    </div>
  </div>

</div>

{% include demo_switch.html class_gridItem="size_12" %}

```html
<div class="drawer">
  <div class="drawer drawer__item_pos_left">
    ...
  </div>
  <div class="drawer drawer__item_pos_right">
    ...
  </div>
  <div class="drawer__main">
    ...
    <button class="drawer__trigger" data-target=".drawer__item_pos_left">...</button>
    <button class="drawer__trigger" data-target=".drawer__item_pos_right">...</button>
  </div>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="Documentation TODOs" %}

<div class="type" markdown="1">

* Explain drawer save state via providing an id
* Explain default state using `is-active` class
* Explain media query modal switching
* Explain the public api

</div>

{% include flag.html heading="Public API" %}

<div class="type">
  <ul>
    <li>
      <a href="#" class="drawer--open">
        drawer.open
      </a>
    </li>
    <li>
      <a href="#" class="drawer--close">
        drawer.close
      </a>
    </li>
    <li>
      <a href="#" class="drawer--toggle">
        drawer.toggle
      </a>
    </li>
    <li>
      <a href="#" class="drawer--toggle-example">
        drawer.toggle('#drawer-example')
      </a>
    </li>
    <li>
      <a href="#" class="drawer--switch-drawer">
        drawer.switchDrawer
      </a>
    </li>
    <li>
      <a href="#" class="drawer--switch-modal">
        drawer.switchModal
      </a>
    </li>
    <li>
      <a href="#" class="drawer--save">
        drawer.stateSave
      </a>
    </li>
    <li>
      <a href="#" class="drawer--reset">
        drawer.stateReset
      </a>
    </li>
  </ul>
</div>
