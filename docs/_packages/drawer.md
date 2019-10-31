---
layout: article
title: Drawer
description: "A container component that slides in from the left or right. Typically containing menus, search or other content."
category: compound
usage:
  npm: "@vrembem/drawer"
  scss: "@vrembem/drawer/index"
  js: "@vrembem/drawer"
---

{% include flag.html heading="drawer" %}

{% include demo_open.html class_gridItem="span_12" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-key" class="drawer" tabindex="-1">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Drawer Default</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer__main">
    <div class="padding_xl">
      <button data-drawer-toggle="drawer-key" class="link">
        Drawer Toggle
      </button>
    </div>
  </div>
</div>
{% include demo_switch.html class_gridItem="span_12" %}
```html
<div class="drawer__wrapper">
  <aside data-drawer="drawer-default" class="drawer" tabindex="-1">
    <div class="drawer__item">
      <button data-drawer-close>...</button>
    </div>
  </aside>
  <div class="drawer__main">
    <button data-drawer-toggle="drawer-default">...</button>
  </div>
</div>
```
{% include demo_close.html %}

<div class="type" markdown="1">
The [dialog component](/packages/dialog) is a great fit for composing a drawer's content.
</div>

{% include demo_open.html %}
<div class="drawer__wrapper border radius">
  <div data-drawer="drawer-dialog" class="drawer is-open">
    <div class="drawer__item dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Drawer Dialog</h2>
        <button class="dialog__close icon-action icon-action_color_fade drawer__trigger" data-drawer-close>
          {% include icon.html icon="x" %}
        </button>
      </div>
      <div class="dialog__body">
        <p>Dialog body content...</p>
      </div>
      <div class="dialog__footer">
        <p>Dialog footer area...</p>
      </div>
    </div>
  </div>
  <div class="drawer__main padding_xl type">
    <button class="link" data-drawer-toggle="drawer-dialog">Drawer Dialog</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="drawer">
  <div class="drawer__item dialog">
    <div class="dialog__header">
      ...
    </div>
    <div class="dialog__body">
      ...
    </div>
    <div class="dialog__footer">
      ...
    </div>
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="drawer_pos_[location]" %}

<div class="type" markdown="1">
Drawers can slide in from the left or right using the position modifiers:

* `drawer_pos_left`
* `drawer_pos_right`
</div>

{% include demo_open.html class_gridItem="span_12" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-left" class="drawer drawer_pos_left">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Drawer Left</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <aside data-drawer="drawer-right" class="drawer drawer_pos_right">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Drawer Right</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer__main padding_xl">
    <button class="link" data-drawer-toggle="drawer-left">
      Drawer left
    </button>
    <button class="link" data-drawer-toggle="drawer-right">
      Drawer right
    </button>
  </div>
</div>
{% include demo_switch.html class_gridItem="span_12" %}
```html
<div class="drawer__wrapper">
  <div data-drawer="drawer-left" class="drawer drawer_pos_left">
    ...
  </div>
  <div data-drawer="drawer-right" class="drawer drawer_pos_right">
    ...
  </div>
  <div class="drawer__main">
    <button data-drawer-toggle="drawer-left">
      ...
    </button>
    <button data-drawer-toggle="drawer-right">
      ...
    </button>
  </div>
</div>
```
{% include demo_close.html %}

If a position modifier is not provided, the drawer will appear based on it's location in the DOM relative to the main content area.

{% include flag.html heading="Drawer Focus" %}

<div class="type" markdown="1">
If a drawer has the attribute `tabindex="-1"`, it will be given focus when it's opened. If focus on a specific element inside a drawer is prefered, give it the `data-drawer-focus` attribute. The focus in either case is returned to the trigger element once the drawer is closed. Focus handling can be disabled using the `{ focus: false }` setting.
</div>

{% include demo_open.html class_gridItem="span_12" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-focus-self" class="drawer drawer_pos_left" tabindex="-1">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Focus Drawer</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <aside data-drawer="drawer-focus-close" class="drawer drawer_pos_right">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Focus Close</p>
        <button data-drawer-close data-drawer-focus class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer__main padding_xl">
    <button class="link" data-drawer-toggle="drawer-focus-self">
      Focus Self
    </button>
    <button class="link" data-drawer-toggle="drawer-focus-close">
      Focus Close
    </button>
  </div>
</div>
{% include demo_switch.html class_gridItem="span_12" %}
```html
<div cass="drawer__wrapper">
  <!-- Focus the drawer on open -->
  <div data-drawer="[unique-id]" class="drawer"  tabindex="-1">
    ...
  </div>
  <!-- Focus the close button on open -->
  <div data-drawer="[unique-id]" class="drawer">
    ...
    <button data-drawer-close data-drawer-focus>Close</button>
  </div>
  <div class="drawer__main">
    <!-- Return focus to toggle on close -->
    <button data-drawer-toggle="[unique-id]">Drawer Toggle</button>
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="Drawer Save State" %}


{% include flag.html heading="Drawer breakpoints" %}
