---
layout: article
title: Drawer
description: "A container component that slides in from the left or right. Typically containing menus, search or other content."
package: "@vrembem/drawer"
category: compound
usage:
  npm: true
  scss: true
  js: true
---

## drawer

Drawers are composed using classes for styling and data attributes for JavaScript functionality. To link a drawer toggle to a drawer, use a unique identifier as the values for both of their respective data attributes. Close buttons are left value-less and should be placed inside the drawer element they're meant to close.

* `data-drawer="[unique-id]"`
* `data-drawer-toggle="[unique-id]"`
* `data-drawer-close`

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

The [dialog component](/packages/dialog) is a great fit for composing a drawer’s content.

{% include demo_open.html class_grid="grid_break" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-dialog" class="drawer is-opened">
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
  </aside>
  <div class="drawer__main padding_xl type">
    <button class="link" data-drawer-toggle="drawer-dialog">Drawer Dialog</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<aside data-drawer="[unique-id]" class="drawer">
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
</aside>
```
{% include demo_close.html %}

## drawer_modal

Convert a drawer into it’s modal state with the `drawer_modal` modifier class. Only one modal can be open at a time.

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
  <aside data-drawer="[unique-id]" class="drawer drawer_modal">
    ...
  </aside>
  <div class="drawer__main">
    <button data-drawer-toggle="[unique-id]">
      ...
    </button>
  </div>
</div>
```
{% include demo_close.html %}

## drawer_pos_[value]

Drawers can slide in from the left or right using the position modifiers:

* `drawer_pos_left`
* `drawer_pos_right`

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
  <aside data-drawer="[unique-id]" class="drawer drawer_pos_left">
    ...
  </aside>
  <aside data-drawer="[unique-id]" class="drawer drawer_pos_right">
    ...
  </aside>
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

> If a position modifier is not provided, the drawer will appear based on it's location in the DOM relative to the main content area and other drawers.

## data-drawer-breakpoint

In cases where you'd like a drawer to switch to a drawer modal on a specific breakpoint, use the `data-drawer-breakpoint` data attribute with either a breakpoint key or a specific pixel value.

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
<!-- Switches to modal below `md` breakpoint viewports -->
<aside data-drawer="[unique-id]" data-drawer-breakpoint="md" class="drawer">
  ...
</aside>

<!-- Switches to modal below 900px viewports -->
<aside data-drawer="[unique-id]" data-drawer-breakpoint="900px" class="drawer">
  ...
</aside>
```
{% include demo_close.html %}

## data-drawer-focus

If a drawer has the attribute `tabindex="-1"`, it will be given focus when it's opened. If focus on a specific element inside a drawer is prefered, give it the `data-drawer-focus` attribute. The focus in either case is returned to the trigger element once the drawer is closed. Focus handling can be disabled using the `{ focus: false }` setting.

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
  <aside data-drawer="[unique-id]" class="drawer" tabindex="-1">
    ...
  </aside>
  <!-- Focus the close button on open -->
  <aside data-drawer="[unique-id]" class="drawer">
    ...
    <button data-drawer-close data-drawer-focus>Close</button>
  </aside>
  <div class="drawer__main">
    <!-- Return focus to toggle on close -->
    <button data-drawer-toggle="[unique-id]">Drawer Toggle</button>
  </div>
</div>
```
{% include demo_close.html %}

## Drawer State

By default, the state of a drawer is saved to local storage and applied persistently under the "DrawerState" local storage variable. Set `saveState: false` to disable save state. Use `saveKey: "[CUSTOM-KEY]"` to change the key that save state is stored under.

## Sass variables

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <!-- Prefixes -->
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$prefix-block</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifier values with.</td>
      </tr>

      <!-- General styles -->
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$width</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">18em</code></td>
        <td data-mobile-label="Desc">The width of drawers.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$travel</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">5em</code></td>
        <td data-mobile-label="Desc">Distance that drawers travel during their transition.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">0.3s</code></td>
        <td data-mobile-label="Desc">Duration of drawer transition.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">cubic-bezier(0.4, 0, 0.2, 1)</code></td>
        <td data-mobile-label="Desc">Timing function used for drawer transitions.</td>
      </tr>

      <!-- drawer__item styles -->
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$item-background</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">#f5f5f5</code></td>
        <td data-mobile-label="Desc">Background color applied to drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$item-border</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">null</code></td>
        <td data-mobile-label="Desc">Border applied to drawer items with position modifiers. Shown on side of drawers facing drawer main.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$item-box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">none</code></td>
        <td data-mobile-label="Desc">Box shadow applied to drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$item-sep-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">null</code></td>
        <td data-mobile-label="Desc">Border color applied to dialog components within drawer items.</td>
      </tr>

      <!-- drawer_modal styles -->
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$modal-zindex</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">900</code></td>
        <td data-mobile-label="Desc">Modal z-index to help control the stack order. Should be highest priority as modal.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$modal-item-background</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">#fff</code></td>
        <td data-mobile-label="Desc">Background color applied to modal drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$modal-item-box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">
          0 0 0 1px rgba(#212121, 0.05),<br>
          0 11px 15px -7px rgba(#212121, 0.1),<br>
          0 24px 38px 3px rgba(#212121, 0.08),<br>
          0 9px 46px 8px rgba(#212121, 0.06)
        </code></td>
        <td data-mobile-label="Desc">Box shadow applied to modal drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$modal-background</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">#424242</code></td>
        <td data-mobile-label="Desc">Background color of modal screen.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text_nowrap">$modal-background-alpha</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">0.8</code></td>
        <td data-mobile-label="Desc">The alpha channel for the modal screen.</td>
      </tr>

    </tbody>
  </table>
</div>

## JavaScript Events

* `drawer:opened` Emits when the drawer has opened.
* `drawer:closed` Emits when the drawer has closed.
* `drawer:breakpoint` Emits when the drawer has hit a breakpoint.

## JavaScript Options

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Key</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">autoInit</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">false</code></td>
        <td data-mobile-label="Desc">Automatically instantiates the instance.</td>
      </tr>

      <!-- Data attributes -->
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">dataDrawer</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'drawer'</code></td>
        <td data-mobile-label="Desc">Data attribute for a drawer.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">dataToggle</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'drawer-toggle'</code></td>
        <td data-mobile-label="Desc">Data attribute for a drawer toggle trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">dataClose</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'drawer-close'</code></td>
        <td data-mobile-label="Desc">Data attribute for a drawer close trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">dataBreakpoint</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'drawer-breakpoint'</code></td>
        <td data-mobile-label="Desc">Data attribute for setting a drawer's breakpoint.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">dataFocus</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'drawer-focus'</code></td>
        <td data-mobile-label="Desc">Data attribute for setting a drawer's focus element.</td>
      </tr>
    </tbody>

    <!-- State classes -->
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">stateOpen</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'is-opened'</code></td>
      <td data-mobile-label="Desc">Class used for open state.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">stateOpening</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'is-opening'</code></td>
      <td data-mobile-label="Desc">Class used for transitioning to open state.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">stateClosing</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'is-closing'</code></td>
      <td data-mobile-label="Desc">Class used for transitioning to closed state.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">stateClosed</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'is-closed'</code></td>
      <td data-mobile-label="Desc">Class used for closed state.</td>
    </tr>

    <!-- Classes -->
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">classModal</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'drawer_modal'</code></td>
      <td data-mobile-label="Desc">Class used for toggling the drawer modal state.</td>
    </tr>

    <!-- Feature toggles -->
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">customEventPrefix</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'drawer:'</code></td>
      <td data-mobile-label="Desc">Prefix to be used on custom events.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">breakpoints</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">core.breakpoints</code></td>
      <td data-mobile-label="Desc">An object with key/value pairs defining a breakpoints set.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">focus</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">true</code></td>
      <td data-mobile-label="Desc">Toggles the focus handling feature.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">saveState</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">true</code></td>
      <td data-mobile-label="Desc">Toggles the save state feature.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text_nowrap">saveKey</code></td>
      <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'DrawerState'</code></td>
      <td data-mobile-label="Desc">Defines the localStorage key where drawer states are saved.</td>
    </tr>
  </table>
</div>

## JavaScript API

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Method</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">drawer.init()</code></td>
        <td data-mobile-label="Desc">Initializes the drawer instance.</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">drawer.destroy()</code></td>
        <td data-mobile-label="Desc">Destroys and cleans up the drawer instantiation.</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">drawer.toggle(drawerKey, callback)</code></td>
        <td data-mobile-label="Desc">Toggles a drawer provided the drawer key and optional callback.</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">drawer.open(drawerKey, callback)</code></td>
        <td data-mobile-label="Desc">Opens a drawer provided the drawer key and optional callback.</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">drawer.close(drawerKey, callback)</code></td>
        <td data-mobile-label="Desc">Closes a drawer provided the drawer key and optional callback.</td>
      </tr>
    </tbody>
  </table>
</div>
