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

Drawers are composed using classes for styling and data attributes for JavaScript functionality. To link a drawer toggle, open or close trigger to a drawer, use a unique identifier as the values for both the trigger and drawer's respective data attributes. Close buttons can be left value-less if placed inside a drawer element they're meant to close.

- `data-drawer="[unique-id]"`
- `data-drawer-dialog`
- `data-drawer-toggle="[unique-id]"`
- `data-drawer-open="[unique-id]"`
- `data-drawer-close="[unique-id]"` (or value-less if inside drawer)

{% include demo_open.html class_grid="grid_break" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-key" class="drawer drawer_pos_right">
    <div data-drawer-dialog class="drawer__dialog padding-xl">
      <div class="flex flex-justify-between">
        <p>Drawer Default</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer__main padding-xl type">
    <ul>
      <li>
        <button data-drawer-toggle="drawer-key" class="link">Drawer Toggle</button>
      </li>
      <li>
        <button data-drawer-open="drawer-key" class="link">Open</button>
      </li>
      <li>
        <button data-drawer-close="drawer-key" class="link">Close</button>
      </li>
    </ul>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="drawer__wrapper">
  <aside data-drawer="[unique-id]" class="drawer">
    <div data-drawer-dialog class="drawer__dialog">
      <button data-drawer-close>...</button>
    </div>
  </aside>
  <div class="drawer__main">
    <button data-drawer-toggle="[unique-id]">...</button>
    <button data-drawer-open="[unique-id]">...</button>
    <button data-drawer-close="[unique-id]">...</button>
  </div>
</div>
```
{% include demo_close.html %}

Drawer dialogs are the actual dialog element within a drawer and are defined using a the value-less `data-drawer-dialog` attribute. The [dialog component](/packages/dialog) is a great fit for composing a drawer’s content.

{% include demo_open.html class_grid="grid_break" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-dialog" class="drawer drawer_pos_right is-opened">
    <div data-drawer-dialog class="drawer__dialog dialog">
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
  <div class="drawer__main padding-xl type">
    <ul>
      <li>
        <button class="link" data-drawer-toggle="drawer-dialog">Drawer Dialog</button>
      </li>
      <li>
        <button class="link" data-drawer-open="drawer-dialog">Open</button>
      </li>
      <li>
        <button class="link" data-drawer-close="drawer-dialog">Close</button>
      </li>
    </ul>
  </div>
</div>
{% include demo_switch.html %}
```html
<aside data-drawer="[unique-id]" class="drawer">
  <div data-drawer-dialog class="drawer__dialog dialog">
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

## data-drawer-breakpoint

In cases where you'd like a drawer to switch to a drawer modal on a specific breakpoint, use the `data-drawer-breakpoint` data attribute with either a breakpoint key or a specific pixel value.

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

A custom breakpoints object can be passed in using the `breakpoints` option. Otherwise, default values are set via the core variables module.

```js
const drawer = Drawer({
  breakpoints: {
    xs: '480px',
    sm: '620px',
    md: '760px',
    lg: '990px',
    xl: '1380px'
  }
});
```

## data-drawer-focus

Drawer dialogs are given focus on open by default as long as the `setTabindex` option is set to `true` or if the drawer dialog has `tabindex="-1"` set manually. If focus on a specific element inside a drawer is preferred, give it the `data-drawer-focus` attribute. The focus in either case is returned to the trigger element once the drawer is closed.

{% include demo_open.html class_grid="grid_break" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-focus-self" class="drawer drawer_pos_left" tabindex="-1">
    <div data-drawer-dialog class="drawer__dialog padding">
      <div class="flex flex-justify-between">
        <p>Focus Dialog</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <aside data-drawer="drawer-focus-close" class="drawer drawer_pos_right">
    <div data-drawer-dialog class="drawer__dialog padding">
      <div class="flex flex-justify-between">
        <p>Focus Close</p>
        <button data-drawer-close data-drawer-focus class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer__main padding-xl">
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
  <!-- Focuses the drawer dialog on open -->
  <aside data-drawer="[unique-id]" class="drawer">
    <div data-drawer-dialog class="drawer__dialog">
      ...
    </div>
  </aside>

  <!-- Focuses an inner element on open -->
  <aside data-drawer="[unique-id]" class="drawer">
    <div data-drawer-dialog class="drawer__dialog">
      <button data-drawer-focus>...</button>
    </div>
  </aside>
  
  <div class="drawer__main">
    <!-- Return focus to toggle on close -->
    <button data-drawer-toggle="[unique-id]">...</button>
  </div>
</div>
```
{% include demo_close.html %}

## Drawer State

By default, the state of a drawer is saved to local storage and applied persistently under the "DrawerState" local storage variable. Set `stateSave: false` to disable save state. Use `stateKey: "[CUSTOM-KEY]"` to change the key that save state is stored under.

## Behavior and Accessibility

Drawers when in their modal context follow a set of patterns expected from other modals on the web. Here's what to expect:

1. When a drawer modal is opened, focus is moved to the dialog or an element inside.
2. Drawer modals provide standard methods for the user to close such as using the `esc` key or clicking outside the dialog.
3. While the drawer modal is active, contents obscured by the drawer modal are inaccessible to all users.
4. When a drawer modal is closed, focus is returned to the initial trigger element that activated the dialog.

To take full advantage of drawer modal's accessibility features, it's recommened to that you set the `selectorInert` option to all elements that are ouside the drawer modal (most likely the `drawer__main` element). All elements that match the `selectorInert` selector will be given the `inert` attribute as well as `aria-hidden="true"` when a modal is opened.

> Inert is not currently widly supportted by all browsers. Consider using a polyfill such as [wicg-inert](https://github.com/WICG/inert) or Google's [inert-polyfill](https://github.com/GoogleChrome/inert-polyfill).

### Example

Here's an example where we want the `[role="main"]` content area to be inaccessible while drawer modals are open. We also want to disable other scrollable elements using the `selectorOverflow` option.

```js
Drawer({
  autoInit: true,
  selectorInert: '[role="main"]',
  selectorOverflow: 'body, [role="main"]'
});
```

## drawer_modal

Convert a drawer into it’s modal state with the `drawer_modal` modifier class. Only one modal can be open at a time.

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

## drawer_pos_[value]

Drawers can slide in from the left or right using the position modifiers:

* `drawer_pos_left`
* `drawer_pos_right`

{% include demo_open.html class_grid="grid_break" %}
<div class="drawer__wrapper border radius">
  <aside data-drawer="drawer-left" class="drawer drawer_pos_left" tabindex="-1">
    <div data-drawer-dialog class="drawer__dialog padding">
      <div class="flex flex-justify-between">
        <p>Drawer Left</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <aside data-drawer="drawer-right" class="drawer drawer_pos_right" tabindex="-1">
    <div data-drawer-dialog class="drawer__dialog padding">
      <div class="flex flex-justify-between">
        <p>Drawer Right</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer__main padding-xl">
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-block</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifier values with.</td>
      </tr>

      <!-- General styles -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">18em</code></td>
        <td data-mobile-label="Desc">The width of drawers.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">100%</code></td>
        <td data-mobile-label="Desc">The max-width of drawers.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Border applied to drawer items with position modifiers. Shown on side of drawers facing drawer main.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$sep-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Border color applied to dialog components within drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">#f5f5f5</code></td>
        <td data-mobile-label="Desc">Background color applied to drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">none</code></td>
        <td data-mobile-label="Desc">Box shadow applied to drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$travel</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">5em</code></td>
        <td data-mobile-label="Desc">Distance that drawers travel during their transition.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-duration</code></td>
        <td data-mobile-label="Desc">Duration of drawer transition.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-timing-function</code></td>
        <td data-mobile-label="Desc">Timing function used for drawer transitions.</td>
      </tr>

      <!-- drawer_wrapper styles -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$wrapper-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">100%</code></td>
        <td data-mobile-label="Desc">The height given to drawer wrapper element.</td>
      </tr>

      <!-- drawer_modal styles -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-zindex</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">900</code></td>
        <td data-mobile-label="Desc">Modal z-index to help control the stack order. Should be highest priority as modal.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$width</code></td>
        <td data-mobile-label="Desc">The width of modal drawers.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">80%</code></td>
        <td data-mobile-label="Desc">The max-width of modal drawers.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-sep-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Border color applied to dialog components within modal drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Background color applied to modal drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$box-shadow-24dp</code></td>
        <td data-mobile-label="Desc">Box shadow applied to modal drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-screen-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$night</code></td>
        <td data-mobile-label="Desc">Background color of modal screen.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-screen-background-alpha</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.8</code></td>
        <td data-mobile-label="Desc">The alpha channel for the modal screen.</td>
      </tr>

    </tbody>
  </table>
</div>

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
        <td data-mobile-label="Key"><code class="code text-nowrap">autoInit</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">false</code></td>
        <td data-mobile-label="Desc">Automatically instantiates the instance.</td>
      </tr>

      <!-- Data attributes -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataDrawer</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer'</code></td>
        <td data-mobile-label="Desc">Data attribute for a drawer.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataDialog</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer-dialog'</code></td>
        <td data-mobile-label="Desc">Data attribute for a drawer dialog.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataToggle</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer-toggle'</code></td>
        <td data-mobile-label="Desc">Data attribute for a drawer toggle trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataOpen</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer-open'</code></td>
        <td data-mobile-label="Desc">Data attribute for a drawer open trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataClose</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer-close'</code></td>
        <td data-mobile-label="Desc">Data attribute for a drawer close trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataBreakpoint</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer-breakpoint'</code></td>
        <td data-mobile-label="Desc">Data attribute for setting a drawer's breakpoint.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataFocus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer-focus'</code></td>
        <td data-mobile-label="Desc">Data attribute for setting a drawer's focus element.</td>
      </tr>
    </tbody>

    <!-- State classes -->
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateOpen</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'is-opened'</code></td>
      <td data-mobile-label="Desc">Class used for open state.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateOpening</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'is-opening'</code></td>
      <td data-mobile-label="Desc">Class used for transitioning to open state.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateClosing</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'is-closing'</code></td>
      <td data-mobile-label="Desc">Class used for transitioning to closed state.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateClosed</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'is-closed'</code></td>
      <td data-mobile-label="Desc">Class used for closed state.</td>
    </tr>

    <!-- Classes -->
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">classModal</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer_modal'</code></td>
      <td data-mobile-label="Desc">Class used for toggling the drawer modal state.</td>
    </tr>

    <!-- Selectors -->
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">selectorInert</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
      <td data-mobile-label="Desc">Applies <code class="code">inert</code> and <code class="code">aria-hidden</code> attributes to all matching elements when a modal drawer is opened.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">selectorOverflow</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
      <td data-mobile-label="Desc">Applies <code class="code">overflow:hidden</code> styles on all matching elements when a modal drawer is opened.</td>
    </tr>

    <!-- Feature toggles -->
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">breakpoints</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.breakpoints</code></td>
      <td data-mobile-label="Desc">An object with key/value pairs defining a breakpoints set.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">customEventPrefix</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer:'</code></td>
      <td data-mobile-label="Desc">Prefix to be used on custom events.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateSave</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
      <td data-mobile-label="Desc">Toggles the save state feature.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateKey</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'DrawerState'</code></td>
      <td data-mobile-label="Desc">Defines the localStorage key where drawer states are saved.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">setTabindex</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
      <td data-mobile-label="Desc">Whether or not to set <code class="code">tabindex="-1"</code> on all drawer dialog elements on init.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">transition</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
      <td data-mobile-label="Desc">Toggle the transition animation for the drawer. Set to <code class="code">false</code> to disable.</td>
    </tr>
  </table>
</div>

## Events

* `drawer:opened` Emits when the drawer has opened.
* `drawer:closed` Emits when the drawer has closed.
* `drawer:breakpoint` Emits when the drawer has hit a breakpoint.
* `drawer:toModal` Emits when the drawer is switched to it's modal state.
* `drawer:toDefault` Emits when the drawer is switched to it's default state.

## API

### `drawer.init()`

Initializes the drawer instance. During initialization, the following processes are run:

- Runs `stateSet()` to apply the initial state for all drawers.
- Runs `setTabindex()` to apply tabindex for all drawer dialogs.
- Runs `breakpoint.init()` to initialize all breakpoints for drawers.
- Adds the `click` event listener to the document.
- Adds the `keyup` event listener for closing modal drawers with the `esc` key.

```js
const drawer = Drawer();
drawer.init();
```

### `drawer.destroy()`

Destroys and cleans up the drawer instantiation. During cleanup, the following processes are run:

- Runs `breakpoint.destroy()` to remove all active breakpoints.
- Clears the stored `drawer.memory` object.
- Clears the stored `drawer.state` object.
- Removes the saved state from local storage.
- Removes the `click` event listener from the document.
- Removes the `keyup` event listener from the document.

```js
const drawer = Drawer();
drawer.init();
// ...
drawer.destroy();
```

### `drawer.toggle(key)`

Toggles a drawer when provided the drawer key and returns a promise that resolves to the drawer object once the transition has finished.

**Parameters**

- `key [String]` A unique key that matches the value of a drawer `data-drawer` attribute.

**Returns**

- `Promise` The returned promise value will either be the `HTML object` of the drawer that was toggled, or `error` if a drawer was not found.

```html
<div class="drawer" data-drawer="drawer-key">...</div>
```

```js
// Toggle drawer
drawer.toggle('drawer-key');

// Run some code after promise resolves
drawer.toggle('drawer-key').then((result) => {
console.log(result);
});
```

### `drawer.open(key)`

Opens a drawer when provided the drawer key and returns a promise that resolves to the drawer object once the transition has finished.

**Parameters**

- `key [String]` A unique key that matches the value of a drawer `data-drawer` attribute.

**Returns**

- `Promise` The returned promise value will either be the `HTML object` of the drawer that was opened, or `error` if a drawer was not found.

```html
<div class="drawer" data-drawer="drawer-key">...</div>
```

```js
// Open drawer
drawer.open('drawer-key');

// Run some code after promise resolves
drawer.open('drawer-key').then((result) => {
console.log(result);
});
```

### `drawer.close(key)`

Closes a drawer when provided the drawer key and returns a promise that resolves to the drawer object once the transition has finished.

**Parameters**

- `key [String]` A unique key that matches the value of a drawer `data-drawer` attribute.

**Returns**

- `Promise` The returned promise value will either be the `HTML object` of the drawer that was closed, or `error` if a drawer was not found.

```html
<div class="drawer" data-drawer="drawer-key">...</div>
```

```js
// Close drawer
drawer.close('drawer-key');

// Run some code after promise resolves
drawer.close('drawer-key').then((result) => {
console.log(result);
});
```

### `drawer.setTabindex`

Sets the `tabindex="-1"` attribute on all drawer dialogs. This makes it possible to set focus on the dialog when opened but won't allow users to focus it using the keyboard. This is ran automatically on `drawer.init()` if the `setTabindex` option is set to `true`.

```html
<!-- Initial HTML -->
<aside data-drawer="[unique-id]" class="drawer">
  <div data-drawer-dialog class="drawer__dialog">
    ...
  </div>
</aside>
```

```js
drawer.setTabindex();
```

```html
<!-- Result -->
<aside data-drawer="[unique-id]" class="drawer">
  <div data-drawer-dialog class="drawer__dialog" tabindex="-1">
    ...
  </div>
</aside>
```

### `drawer.breakpoint.init()`

Initializes the drawer breakpoint feature. During initialization, all drawers with `data-drawer-breakpoint` are retrieved and a `MediaQueryList` is created for each. Each `MediaQueryList` and it's associated drawer key is stored in the `drawer.mediaQueryLists` array. This is ran automatically on `drawer.init()`.

```html
<aside data-drawer="[unique-id]" data-drawer-breakpoint="420px" class="drawer">
  ...
</aside>
```

```js
// Initialize breakpoints
drawer.breakpoint.init();

// Output stored lists
console.log(drawer.mediaQueryLists);

// Log result
[{
mql: MediaQueryList // Obj
drawer: '[unique-id]' // String
}]
```

### `drawer.breakpoint.destroy()`

Destroys the drawer breakpoint feature. This process involves removeing all attached media match listeners from the stored `MediaQueryList`s and then clearing the stored array. This is ran automatically on `drawer.destroy()`.

```js
// Initialize breakpoints
drawer.breakpoint.destroy();

// Output stored lists
console.log(drawer.mediaQueryLists);

// Log result
null
```

### `drawer.breakpoint.check()`

Force a check of any drawers that meet their breakpoint condition. If their state doesn't match the current breakpoint condition, they'll be updated. This is useful when used with frameworks that dynamically re-render components on the fly.

```html
<!-- Initial HTML -->
<aside data-drawer="[unique-id]" data-drawer-breakpoint="sm" class="drawer">
  ...
</aside>
```

```js
// Manually run a breakpoint check
drawer.breakpoint.check();
```

```html
<!-- Output if matches breakpoint -->
<aside data-drawer="[unique-id]" data-drawer-breakpoint="sm" class="drawer drawer_modal">
  ...
</aside>
```

### `drawer.switchToModal(key)`

Switches a drawer to it's modal state.

**Parameters**

- `key [String]` A unique key that matches the value of a drawer `data-drawer` attribute.

```html
<!-- Initial HTML -->
<div class="drawer" data-drawer="drawer-key">...</div>
```

```js
// Switch a drawer to modal state
drawer.switchToModal('drawer-key');
```

```html
<!-- Output -->
<div class="drawer drawer_modal" data-drawer="drawer-key">...</div>
```

### `drawer.switchToDefault(key)`

Switches a drawer to it's default non-modal state.

**Parameters**

- `key [String]` A unique key that matches the value of a drawer `data-drawer` attribute.

```html
<!-- Initial HTML -->
<div class="drawer drawer_modal" data-drawer="drawer-key">...</div>
```

```js
// Switch a drawer to default non-modal state
drawer.switchToDefault('drawer-key');
```
```html
<!-- Output -->
<div class="drawer" data-drawer="drawer-key">...</div>
```
