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

<div class="notice notice_type_caution size_8_lg">
  <h2 class="notice__title">Dependencies</h2>
  <div class="type">
    <p>The drawer component depends on the following components to be imported:</p>
    <ul>
      <li>
        <a href="/components/dialog"><strong>Dialog</strong></a> - Drawers are a container component. You can add any content you'd like but wrapping your content with the dialog component allows for the most flexibility and consistent layouts.
      </li>
      <li>
        <a href="/components/modal"><strong>Modal</strong></a> - Used for switch functionality.
      </li>
    </ul>
  </div>
</div>

{% include flag.html heading="drawer" %}

<div class="type size_8_lg" markdown="1">
Composing a drawer requires a few basic styles to be applied to it's parent and the main content sibling which exists within a drawer set. Because of this, drawers make available the primary component along with optional sub-components:

* `drawer` - the primary component of the drawer functionality.
* `drawer-parent` - defines the wrapper which contains a drawer set.
* `drawer-sibling` - defines the main content area that drawers are siblings to.

To create a trigger for your drawer, simply use the `drawer__trigger` element class along with a `[data-target]` attribute containing a valid drawer selector as it's value.
</div>

{% include demo_open.html class_gridItem="size_12" %}

<div class="drawer">

  <aside class="drawer__item drawer-demo-left">
    <div class="drawer__dialog dialog">
      <div class="dialog__body">
        <p>Hi! I'm a drawer</p>
      </div>
    </div>
  </aside>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer-sibling</code></p>
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

{% include flag.html heading="drawer_pos_[location]" %}

{% include demo_open.html class_gridItem="size_12" %}

<div class="drawer">

  <aside class="drawer__item drawer__item_pos_left drawer-demo-pos-left">
    <div class="drawer__dialog dialog">
      <div class="dialog__body">
        <p>Hi! I'm a drawer positioned left</p>
      </div>
    </div>
  </aside>

  <aside class="drawer__item drawer__item_pos_right drawer-demo-pos-right">
    <div class="drawer__dialog dialog">
      <div class="dialog__body">
        <p>Hi! I'm a drawer positioned right</p>
      </div>
    </div>
  </aside>

  <div class="drawer__main box box_bordered type">
    <p>This is the content inside of <code>drawer-sibling</code></p>
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
<div class="drawer-parent">
  <div class="drawer drawer_pos_left">
    ...
  </div>
  <div class="drawer drawer_pos_right">
    ...
  </div>
  <div class="drawer-sibling">
    ...
    <button class="drawer__trigger" data-target=".drawer_pos_left">...</button>
    <button class="drawer__trigger" data-target=".drawer_pos_right">...</button>
  </div>
</div>
```

{% include demo_close.html %}



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
