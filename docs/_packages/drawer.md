---
layout: article
title: Drawer
description: "A container component that slides in from the left or right. Typically containing menus, search or other content."
category: compound
usage:
  npm: "drawer"
  scss: "drawer"
  js: "drawer"
---

{% include flag.html heading="drawer" %}

<div class="type" markdown="1">
Drawers are composed using classes for styling and data attributes for JavaScript functionality. To link a drawer toggle to a drawer, use a unique identifier as the values for both of their respective data attributes. Close buttons are left value-less and should be placed inside the drawer element they're meant to close.

* `data-drawer="[unique-id]"`
* `data-drawer-toggle="[unique-id]"`
* `data-drawer-close`
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-key" class="drawer">
    <div class="drawer__item padding_xl">
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
{% include demo_switch.html %}
```html
<div class="drawer__wrapper">
  <aside data-drawer="[unique-id]" class="drawer">
    <div class="drawer__item">
      <button data-drawer-close>...</button>
    </div>
  </aside>
  <div class="drawer__main">
    <button data-drawer-toggle="[unique-id]">...</button>
  </div>
</div>
```
{% include demo_close.html %}

<div class="type" markdown="1">
The [dialog component](/packages/dialog) is a great fit for composing a drawer's content.
</div>

{% include demo_open.html class_grid="grid_break" %}
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
<div data-drawer="[unique-id]" class="drawer">
  <div class="drawer__item dialog">
    <div class="dialog__header">
      ...
      <button data-drawer-close>...</button>
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

{% include demo_open.html class_grid="grid_break" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-left" class="drawer drawer_pos_left" tabindex="-1">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Drawer Left</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <aside data-drawer="drawer-right" class="drawer drawer_pos_right" tabindex="-1">
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
{% include demo_switch.html %}
```html
<div class="drawer__wrapper">
  <div data-drawer="[unique-id]" class="drawer drawer_pos_left">
    ...
  </div>
  <div data-drawer="[unique-id]" class="drawer drawer_pos_right">
    ...
  </div>
  <div class="drawer__main">
    <button data-drawer-toggle="[unique-id]">
      ...
    </button>
    <button data-drawer-toggle="[unique-id]">
      ...
    </button>
  </div>
</div>
```
{% include demo_close.html %}

<div class="type" markdown="1">
If a position modifier is not provided, the drawer will appear based on it's location in the DOM relative to the main content area.
</div>

{% include flag.html heading="drawer_modal" %}

<div class="type" markdown="1">
To convert a drawer into it's modal state, use the `drawer_modal` modifier class.
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-modal-left" class="drawer drawer_modal drawer_pos_left" tabindex="-1">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Drawer Left</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <aside data-drawer="drawer-modal-right" class="drawer drawer_modal drawer_pos_right" tabindex="-1">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Drawer Right</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer__main padding_xl">
    <button class="link" data-drawer-toggle="drawer-modal-left">
      Drawer modal left
    </button>
    <button class="link" data-drawer-toggle="drawer-modal-right">
      Drawer modal right
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="drawer__wrapper">
  <div data-drawer="[unique-id]" class="drawer drawer_modal drawer_pos_left">
    ...
  </div>
  <div data-drawer="[unique-id]" class="drawer drawer_modal drawer_pos_right">
    ...
  </div>
  <div class="drawer__main">
    <button data-drawer-toggle="[unique-id]">
      ...
    </button>
    <button data-drawer-toggle="[unique-id]">
      ...
    </button>
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="data-drawer-breakpoint" %}

<div class="type" markdown="1">
In cases where you'd like a drawer to switch to a drawer modal on a specific breakpoint, use the `data-drawer-breakpoint` data attribute with either a breakpoint key or a specific pixel value.
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-bp-left" data-drawer-breakpoint="md" class="drawer drawer_pos_left" tabindex="-1">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Drawer Left</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <aside data-drawer="drawer-bp-right" data-drawer-breakpoint="900px" class="drawer drawer_pos_right" tabindex="-1">
    <div class="drawer__item padding">
      <div class="flex flex_justify_between">
        <p>Drawer Right</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer__main padding_xl">
    <button class="link" data-drawer-toggle="drawer-bp-left">
      Drawer breakpoint left
    </button>
    <button class="link" data-drawer-toggle="drawer-bp-right">
      Drawer breakpoint right
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="drawer__wrapper">
  <div data-drawer="[unique-id]" data-drawer-breakpoint="md" class="drawer drawer_pos_left">
    ...
  </div>
  <div data-drawer="[unique-id]" data-drawer-breakpoint="900px" class="drawer drawer_pos_right">
    ...
  </div>
  <div class="drawer__main">
    <button data-drawer-toggle="[unique-id]">
      ...
    </button>
    <button data-drawer-toggle="[unique-id]">
      ...
    </button>
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="data-drawer-focus" %}

<div class="type" markdown="1">
If a drawer has the attribute `tabindex="-1"`, it will be given focus when it's opened. If focus on a specific element inside a drawer is prefered, give it the `data-drawer-focus` attribute. The focus in either case is returned to the trigger element once the drawer is closed. Focus handling can be disabled using the `{ focus: false }` setting.
</div>

{% include demo_open.html class_grid="grid_break" %}
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
      Focus self
    </button>
    <button class="link" data-drawer-toggle="drawer-focus-close">
      Focus close
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div cass="drawer__wrapper">
  <!-- Focus the drawer on open -->
  <div data-drawer="[unique-id]" class="drawer" tabindex="-1">
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

{% include flag.html heading="Drawer State" %}

<div class="type" markdown="1">
By default, the state of a drawer is saved to local storage and applied persistently under the `"DrawerState"` local storage variable. Set `{ saveState: false }` to disable save state. Use `{ saveKey: "[customKey]" }` to change the key that save state is stored under.
</div>

{% include flag.html heading="Drawer Settings" %}

<div class="scroll-box">
  <table class="table table_zebra">
    <thead>
      <tr class="border_top_0">
        <th>Key</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code class="code text_nowrap">autoInit</code></td>
        <td><code class="code text_nowrap">false</code></td>
        <td>Automatically instantiates the instance</td>
      </tr>

      <!-- Data attributes -->
      <tr>
        <td><code class="code text_nowrap">dataDrawer</code></td>
        <td><code class="code text_nowrap">"drawer"</code></td>
        <td>Data attribute for a drawer</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dataToggle</code></td>
        <td><code class="code text_nowrap">"drawer-toggle"</code></td>
        <td>Data attribute for a drawer toggle trigger</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dataClose</code></td>
        <td><code class="code text_nowrap">"drawer-close"</code></td>
        <td>Data attribute for a drawer close trigger</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dataBreakpoint</code></td>
        <td><code class="code text_nowrap">"drawer-breakpoint"</code></td>
        <td>Data attribute for setting a drawer's breakpoint</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dataFocus</code></td>
        <td><code class="code text_nowrap">"drawer-focus"</code></td>
        <td>Data attribute for setting a drawer's focus element</td>
      </tr>
    </tbody>

    <!-- State classes -->
    <tr>
      <td><code class="code text_nowrap">stateOpen</code></td>
      <td><code class="code text_nowrap">"is-open"</code></td>
      <td>Class used for open state</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">stateOpening</code></td>
      <td><code class="code text_nowrap">"is-opening"</code></td>
      <td>Class used for transitioning to open state</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">stateClosing</code></td>
      <td><code class="code text_nowrap">"is-closing"</code></td>
      <td>Class used for transitioning to closed state</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">stateClosed</code></td>
      <td><code class="code text_nowrap">"is-closed"</code></td>
      <td>Class used for closed state (is ommitted in application)</td>
    </tr>

    <!-- Classes -->
    <tr>
      <td><code class="code text_nowrap">classModal</code></td>
      <td><code class="code text_nowrap">"drawer_modal"</code></td>
      <td>Class used for toggling the drawer modal state</td>
    </tr>

    <!-- Feature toggles -->
    <tr>
      <td><code class="code text_nowrap">breakpoints</code></td>
      <td><code class="code text_nowrap">core.breakpoints</code></td>
      <td>An object with key/value pairs defining a breakpoint set</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">focus</code></td>
      <td><code class="code text_nowrap">true</code></td>
      <td>Toggles the focus handling feature</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">saveState</code></td>
      <td><code class="code text_nowrap">true</code></td>
      <td>Toggles the save state feature</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">saveKey</code></td>
      <td><code class="code text_nowrap">"DrawerState"</code></td>
      <td>Defines the localStorage key where drawer states are saved</td>
    </tr>
  </table>
</div>

{% include flag.html heading="Drawer API" %}

<div class="scroll-box">
  <table class="table table_zebra">
    <thead>
      <tr class="border_top_0">
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code class="code text_nowrap">drawer.init()</code></td>
        <td>Initializes the drawer instance</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">drawer.destroy()</code></td>
        <td>Destroys and cleans up the drawer instantiation</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">drawer.toggle(drawerKey, callback)</code></td>
        <td>Toggles a drawer provided the drawer key and optional callback</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">drawer.open(drawerKey, callback)</code></td>
        <td>Opens a drawer provided the drawer key and optional callback</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">drawer.close(drawerKey, callback)</code></td>
        <td>Closes a drawer provided the drawer key and optional callback</td>
      </tr>
    </tbody>
  </table>
</div>
