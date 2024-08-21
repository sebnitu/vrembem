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

Drawers are composed using classes and data attributes for their triggers. The basic structure of a drawer is an element with an `id` and `drawer` class containing a child element with the `drawer__dialog` class. There are two required structure elements for drawers to work correctly:

- `drawer-frame`: Applied to the parent element wrapping all drawers and the main content.
- `drawer-main`: Applied to the element containing the main content. This should be the last child of the `drawer-frame` element.

{% include demo_open.html class_grid="grid_stack" %}
<div class="drawer-frame border radius" style="min-height: 16em;">
  <aside id="drawer-1" class="drawer">
    <div class="drawer__dialog padding-xl">
      <div class="flex flex-justify-between">
        <p>Drawer Default</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer-main padding-xl type">
    <ul>
      <li>
        <button data-drawer-open="drawer-1" class="link">Open</button>
      </li>
      <li>
        <button data-drawer-close="drawer-1" class="link">Close</button>
      </li>
      <li>
        <button data-drawer-toggle="drawer-1" class="link">Toggle</button>
      </li>
    </ul>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="drawer-frame">

  <aside id="drawer-id" class="drawer">
    <div class="drawer__dialog">
      ...
    </div>
  </aside>

  <div class="drawer-main">
    ...
  </div>

</div>
```
{% include demo_close.html %}

Drawer triggers are defined using three data attributes:

- `data-drawer-open`: Opens a drawer. Takes the id of the drawer it's meant to open.
- `data-drawer-close`: Closes a drawer. Will close the parent drawer if left value-less. Can also take an id of a drawer to close.
- `data-drawer-toggle`: Toggles a drawer opened or closed. Takes the id of the drawer it's meant to toggle.

```html
<button data-drawer-open="drawer-id">...</button>
<button data-drawer-close="drawer-id">...</button>
<button data-drawer-toggle="drawer-id">...</button>
```

The dialog element of a drawer is defined using the `drawer__dialog` class. Along with a role attribute (e.g. `role="dialog"`), authors should provide drawer dialogs with [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) and [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) attributes if applicable to further improve accessibility. The `aria-modal` attribute is applied automatically based on if the drawer is currently in `'modal'` mode.

{% include demo_open.html class_grid="grid_stack" %}
<div class="drawer-frame border radius" style="min-height: 16em;">
  <aside id="drawer-2" class="drawer is-opened">
    <div class="drawer__dialog dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Drawer dialog</h2>
        <button class="dialog__close icon-action drawer__trigger" data-drawer-close>
          {% include icon.html icon="x" %}
        </button>
      </div>
      <div class="dialog__body">
        <p>Dialog body content...</p>
      </div>
      <div class="dialog__footer">
        <p>Dialog footer content...</p>
      </div>
    </div>
  </aside>
  <div class="drawer-main padding-xl type">
    <ul>
      <li>
        <button class="link" data-drawer-open="drawer-2">Open</button>
      </li>
      <li>
        <button class="link" data-drawer-close="drawer-2">Close</button>
      </li>
      <li>
        <button class="link" data-drawer-toggle="drawer-2">Toggle</button>
      </li>
    </ul>
  </div>
</div>
{% include demo_switch.html %}
```html
<aside id="drawer-id" class="drawer">
  <div class="drawer__dialog dialog" role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description">
    <div class="dialog__header">
      <h2 id="dialog-title">...</h2>
    </div>
    <div class="dialog__body">
      <p id="dialog-description">...</p>
    </div>
    <div class="dialog__footer">
      ...
    </div>
  </div>
</aside>
```
{% include demo_close.html %}

> The [dialog component](https://github.com/sebnitu/vrembem/tree/main/packages/dialog) is a great fit for composing a drawer's dialog.

## Modal Drawers

To create a modal drawer, apply the `drawer_modal` modifier.

{% include demo_open.html class_grid="grid_stack" %}
<div class="drawer-frame border radius" style="min-height: 16em;">
  <aside id="drawer-modal" class="drawer drawer_modal" data-drawer-config="{ 'selectorInert': null, 'selectorOverflow': null }">
    <div class="drawer__dialog padding-xl">
      <div class="flex flex-justify-between">
        <p>Modal drawer</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer-main padding-xl type">
    <ul>
      <li>
        <button class="link" data-drawer-toggle="drawer-modal">Toggle</button>
      </li>
    </ul>
  </div>
</div>
{% include demo_switch.html %}
```html
<aside id="drawer-id" class="drawer drawer_modal">
  ...
</aside>
```
{% include demo_close.html %}

You can also switch a drawer from `'inline'` to `'modal'` by changing the collection API `mode` property:

```js
// Get the drawer object from the collection.
const entry = drawer.get('drawer-id');

// Set it's mode to either 'modal' or 'inline'.
entry.mode = 'modal';
```

In cases where you'd like a drawer to switch modes based on a specific viewport width, use the `data-drawer-breakpoint` data attribute with either a width value or a breakpoint key.

{% include demo_open.html class_grid="grid_stack" %}
<div class="drawer-frame border radius" style="min-height: 16em;">
  <aside id="drawer-4" class="drawer" data-drawer-breakpoint="1200px" data-drawer-config="{ 'selectorInert': null, 'selectorOverflow': null }">
    <div class="drawer__dialog padding-xl">
      <div class="flex flex-justify-between margin-bottom">
        <p>Breakpoint drawer</p>
        <button data-drawer-close class="link">Close</button>
      </div>
      <p>Media query string:<br><code class="code">(min-width: 1200px)</code></p>
    </div>
  </aside>
  <aside id="drawer-5" class="drawer" data-drawer-breakpoint="md" data-drawer-config="{ 'selectorInert': null, 'selectorOverflow': null }">
    <div class="drawer__dialog padding-xl">
      <div class="flex flex-justify-between margin-bottom">
        <p>Breakpoint drawer</p>
        <button data-drawer-close class="link">Close</button>
      </div>
      <p>Media query string:<br><code class="code">(min-width: 760px)</code></p>
    </div>
  </aside>
  <div class="drawer-main padding-xl type">
    <ul>
      <li>
        <button class="link" data-drawer-toggle="drawer-4" data-drawer-close="drawer-5">Toggle</button> - Switches to modal on < 1200px screens.
      </li>
      <li>
        <button class="link" data-drawer-toggle="drawer-5" data-drawer-close="drawer-4">Toggle</button> - Switches to modal on < 760px screens.
      </li>
    </ul>
  </div>
</div>
{% include demo_switch.html %}
```html
<!-- Switches to modal below 1200px viewports -->
<aside id="drawer-id" class="drawer" data-drawer-breakpoint="1200px">
  ...
</aside>

<!-- Switches to modal below "md" breakpoint viewports -->
<aside id="drawer-id" class="drawer" data-drawer-breakpoint="md">
  ...
</aside>
```
{% include demo_close.html %}

A custom breakpoints object can be passed in using the `breakpoints` option. Otherwise, breakpoints are resolved by looking up a CSS variable using the passed key (e.g: `--vb-breakpoint-[key]`).

```js
const drawer = new Drawer({
  breakpoints: {
    xs: '480px',
    sm: '620px',
    md: '760px',
    lg: '990px',
    xl: '1380px'
  }
});
```

```scss
:root {
  --vb-breakpoint-xs: 480px;
  --vb-breakpoint-sm: 620px;
  --vb-breakpoint-md: 760px;
  --vb-breakpoint-lg: 990px;
  --vb-breakpoint-xl: 1380px;
}
```

While a modal drawer is active, the contents obscured by the modal are made inaccessible to all users via a focus trap. This means that the `TAB` key, and a screen reader’s virtual cursor (arrow keys) should not be allowed to leave the drawer dialog and traverse the content outside of the dialog. This does not apply to inline drawers.

## Focus Management

Drawer dialogs are given focus when opened as long as the `setTabindex` option is set to `true` or if the drawer dialog has `tabindex="-1"` set manually. If focus on a specific element inside a drawer is preferred, give that element the `data-focus` attribute. Focus is returned to the element that initially triggered the drawer once closed.

{% include demo_open.html class_grid="grid_stack" %}
<div class="drawer-frame border radius">
  <aside id="drawer-focus-self" class="drawer" tabindex="-1">
    <div class="drawer__dialog padding">
      <div class="flex flex-justify-between">
        <p>Focus self</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <aside id="drawer-focus-inner" class="drawer drawer_switch">
    <div class="drawer__dialog padding">
      <div class="flex flex-justify-between margin-bottom">
        <p>Focus inner</p>
        <button data-drawer-close class="link">Close</button>
      </div>
      <input class="input" data-focus type="text">
    </div>
  </aside>
  <div class="drawer-main padding-xl">
    <ul class="list">
      <li>
        <button class="link" data-drawer-toggle="drawer-focus-self">Focus self</button>
      </li>
      <li>
        <button class="link" data-drawer-toggle="drawer-focus-inner">Focus inner</button>
      </li>
    </ul>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="drawer-frame">
  <!-- Focuses the drawer dialog on open -->
  <aside id="drawer-id" class="drawer">
    <div class="drawer__dialog" tabindex="-1">
      ...
    </div>
  </aside>

  <!-- Focuses an inner element on open -->
  <aside id="drawer-id" class="drawer">
    <div class="drawer__dialog">
      <input data-focus type="text">
      ...
    </div>
  </aside>
  
  <div class="drawer-main">
    <!-- Return focus to toggle on close -->
    <button data-drawer-toggle="drawer-id">...</button>
  </div>
</div>
```
{% include demo_close.html %}

> To change the selector used in finding the preferred focus element, pass your own selector via the `selectorFocus` option (defaults to `'[data-focus]'`).

## Drawer State

The state of all drawers are saved to local storage and applied persistently under the `VB:DrawerState` local storage key. Set `store: false` to disable the local storage feature. Use `storeKey: "CUSTOM-KEY"` to change the key that local store is saved under.

## Behavior and Accessibility

Drawers while in their modal state follow a set of patterns expected from other modals on the web. Here's what to expect:

1. When a modal drawer is opened, focus is moved to the dialog or an element inside.
2. Modal drawers provide standard methods for the user to close such as using the `esc` key or clicking outside the dialog.
3. While the modal drawer is active, contents obscured by the modal are inaccessible to all users.
4. When a modal drawer is closed, focus is returned to the initial trigger element that activated the dialog.

To take full advantage of modal drawer's accessibility features, it's recommended to set the `selectorInert` option to all elements that are outside the modal (most likely the `drawer-main` element). All elements that match the `selectorInert` selector will be given the `inert` attribute as well as `aria-hidden="true"` when a modal is opened.

### Example

Here's an example where we want the `drawer-main` content area to be inaccessible while drawer modals are open. We also want to disable other scrollable elements using the `selectorOverflow` option.

```js
const drawer = new Drawer({
  selectorInert: '.drawer-main',
  selectorOverflow: 'body, .drawer-main'
});

await drawer.init();
```

## drawer_modal

Applies modal drawer styles to a drawer. To convert a drawer to its modal state after its been registered, set the collection API `mode` property to `'modal'`. Only one modal drawer can be open at a time.

```html
<aside id="drawer-id" class="drawer drawer_modal">
  ...
</aside>
```

## drawer_switch

Drawers slide in from the left by default. To create a right side drawer, use the `drawer_switch` modifier.

{% include demo_open.html class_grid="grid_stack" %}
<div class="drawer-frame border radius">
  <aside id="drawer-left" class="drawer" tabindex="-1">
    <div class="drawer__dialog padding">
      <div class="flex flex-justify-between">
        <p>Drawer Left</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <aside id="drawer-right" class="drawer drawer_switch" tabindex="-1">
    <div class="drawer__dialog padding">
      <div class="flex flex-justify-between">
        <p>Drawer Right</p>
        <button data-drawer-close class="link">Close</button>
      </div>
    </div>
  </aside>
  <div class="drawer-main padding-xl">
    <ul>
      <li>
        <button class="link" data-drawer-toggle="drawer-left">Drawer left</button>
      </li>
      <li>
        <button class="link" data-drawer-toggle="drawer-right">Drawer right</button>
      </li>
    </ul>
  </div>
</div>
{% include demo_switch.html %}
```html
<aside id="drawer-right" class="drawer drawer_switch">
  ...
</aside>
```
{% include demo_close.html %}

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
      <!-- Classes -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-frame</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$prefix-block'drawer-frame'</code></td>
        <td data-mobile-label="Desc">Class name to use for the <code class="code">drawer-frame</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$class-main</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">$prefix-block'drawer-main'</code></td>
        <td data-mobile-label="Desc">Class name to use for the <code class="code">drawer-main</code> element.</td>
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
        <td data-mobile-label="Desc">Border color applied to dialog elements within drawers.</td>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-duration</code></td>
        <td data-mobile-label="Desc">Duration of drawer transition.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-timing-function</code></td>
        <td data-mobile-label="Desc">Timing function used for drawer transitions.</td>
      </tr>
      <!-- drawer-frame styles -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$frame-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">100vh</code></td>
        <td data-mobile-label="Desc">Height given to the <code class="code">drawer-frame</code> element.</td>
      </tr>
      <!-- drawer_modal styles -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-z-index</code></td>
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
        <td data-mobile-label="Desc">Border color applied to dialog elements within modal drawers.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Background color applied to modal drawer items.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$modal-box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$box-shadow-4</code></td>
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
        <td data-mobile-label="Desc">Automatically initializes the instance.</td>
      </tr>
      <!-- Data attributes -->
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
        <td data-mobile-label="Key"><code class="code text-nowrap">dataToggle</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer-toggle'</code></td>
        <td data-mobile-label="Desc">Data attribute for a drawer toggle trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataBreakpoint</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer-breakpoint'</code></td>
        <td data-mobile-label="Desc">Data attribute for setting a drawer's breakpoint.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataConfig</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer-config'</code></td>
        <td data-mobile-label="Desc">Data attribute to find drawer specific configuration settings. Value should be a JSON object.</td>
      </tr>
      <!-- Selectors -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorDrawer</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'.drawer'</code></td>
        <td data-mobile-label="Desc">Selector for dialog element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorDialog</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'.drawer__dialog'</code></td>
        <td data-mobile-label="Desc">Selector for drawer dialog element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorFocus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'[data-focus]'</code></td>
        <td data-mobile-label="Desc">Focus preference selector for when drawers are initially opened.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorInert</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Applies <code class="code">inert</code> and <code class="code">aria-hidden</code> attributes to all matching elements when a modal drawer is opened.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorOverflow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'body'</code></td>
        <td data-mobile-label="Desc">Applies <code class="code">overflow:hidden</code> styles on all matching elements when a modal drawer is opened.</td>
      </tr>
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
      <!-- Feature toggles -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">breakpoints</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">An object with key/value pairs defining a breakpoints set.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">customEventPrefix</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'drawer:'</code></td>
        <td data-mobile-label="Desc">Prefix to be used on custom events.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">eventListeners</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Whether or not to set the document event listeners on init.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">store</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggles the local store feature.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">storeKey</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'VB:DrawerState'</code></td>
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
        <td data-mobile-label="Desc">Toggle the transition animation of drawers.</td>
      </tr>
    </tbody>
  </table>
</div>

## Events

- `drawer:opened` Emits when a drawer has opened.
- `drawer:closed` Emits when a drawer has closed.
- `drawer:switchMode` Emits when a drawer's mode changes.

## API

### `drawer.collection`

Returns an array where all drawer objects are stored when registered. Each drawer object contains the following properties:

```js
{
  id: String, // The unique ID of the drawer.
  state: String, // The current state of the drawer ('closing', 'closed', 'opening' or 'opened').
  el: HTMLElement, // The drawer HTML element.
  dialog: HTMLElement // The drawer dialog HTML element.
  trigger: HTMLElement // The trigger element that opened the drawer.
  settings: Object // The drawer specific settings.
  breakpoint: String // Returns the set breakpoint of the drawer. If no breakpoint is set, returns 'null'.
  mode: String // The current mode of the drawer. Either 'inline' or 'modal'.
  open: Function // Method to open this drawer.
  close: Function // Method to close this drawer.
  toggle: Function // Method to toggle this drawer opened and closed.
  deregister: Function // Method to deregister this drawer.
  mountBreakpoint: Function // Method to mount the breakpoint feature.
  unmountBreakpoint: Function // Method to unmount the breakpoint feature.
  handleBreakpoint: Function // The function that runs whenever the breakpoint media match property is changed. Receives the event parameter.
  getSetting: Function // Method that returns either a drawer specific setting or global drawer setting.
}
```

**Returns**

- `Array` An array of collection entries.

### `drawer.activeModal`

Returns the currently active modal drawer. Returns `undefined` if there is no modal drawer open.

**Returns**

- `Object || undefined` Collection entry.

### `drawer.init(options)`

Initializes the drawer instance. During initialization, the following processes are run:

- Register each drawer in the collection by running `registerCollection()`.
- Sets up global event listeners by running `initEventListeners()`.

**Parameters**

- `options [Object] (optional)` An options object for passing custom settings.

```js
const drawer = new Drawer();
await drawer.init();
```

### `drawer.destroy()`

Destroys and cleans up the drawer initialization. During cleanup, the following processes are run:

- Deregister the drawer collection by running `deregisterCollection()`.
- Removes global event listeners by running `destroyEventListeners()`.

```js
const drawer = new Drawer();
await drawer.init();
// ...
await drawer.destroy();
```

### `drawer.initEventListeners()`

Set document event listeners.

```js
const drawer = new Drawer({ eventListeners: false });
await drawer.init();
drawer.initEventListeners();
```

### `drawer.destroyEventListeners()`

Remove document event listeners.

```js
const drawer = new Drawer();
await drawer.init();
// ...
drawer.destroyEventListeners();
```

### `drawer.register(query)`

Registers a drawer into the collection. This also sets the initial state, mode, mounts any media match breakpoints and applies missing accessibility attributes.

**Parameters**

- `query [String || Object]` A drawer ID or an HTML element of either the drawer or its trigger.

**Returns**

- `Object` The drawer object that got stored in the collection.

```js
const result = await drawer.register('drawer-id');
// => Object { id: 'drawer-id', ... }
```

### `drawer.deregister(query)`

Deregister the drawer from the collection. This closes the drawer if it's opened, removes any active media match breakpoints and removes the entry from the collection.

**Parameters**

- `query [String || Object]` A drawer ID or an HTML element of either the drawer or its trigger.

**Returns**

- `Array` Returns the newly modified collection array.

```js
const result = await drawer.deregister('drawer-id');
// => Array [{}, {}, ...]
```

### `drawer.registerCollection(items)`

Registers array of drawers to the collection. All drawers in array are run through the `register()` method.

**Parameters**

- `items [Array]` An array of drawers or drawer IDs to register.

**Returns**

- `Array` Returns the collection array.

```js
const drawers = document.querySelectorAll('.drawer');
const result = await drawer.registerCollection(drawers);
// => Array [{}, {}, ...]
```

### `drawer.deregisterCollection()`

Deregister all drawers in the collections array. All drawers in collection are run through the `deregister()` method.

**Returns**

- `Array` Returns the empty collection array.

```js
const result = await drawer.registerCollection();
// => Array []
```

### `drawer.get(value, key)`

Used to retrieve a registered drawer object from the collection. The value should match the key type to search by: e.g. to search by drawer elements, pass the drawer html node with a key of `'el'`. Defaults to `'id'`.

**Parameters**

- `value [String || Object]` The value to search for within the collection.
- `key [String] (optional) (default 'id')` The property key to search the value against.

**Returns**

- `Object || undefined` The first element in the collection that matches the provided query and key. Otherwise, undefined is returned.

```js
const entry = drawer.get('drawer-id');
// => Object { id: 'drawer-id', ... }
```

### `drawer.open(id, transition, focus)`

Opens a drawer using the provided ID.

**Parameters**

- `id [String]` The ID of the drawer to open.
- `transition [Boolean] (optional)` Whether or not to animate the transition.
- `focus [Boolean] (optional)` Whether or not to handle focus management.

**Returns**

- `Object` The drawer object that was opened.

```js
const entry = await drawer.open('drawer-key');
// => Object { id: 'drawer-id', ... }
```

### `drawer.close(id, transition, focus)`

Closes a drawer using the provided ID.

**Parameters**

- `id [String] (optional)` The ID of the drawer to close.
- `transition [Boolean] (optional)` Whether or not to animate the transition.
- `focus [Boolean] (optional)` Whether or not to handle focus management.

**Returns**

- `Object` The drawer object that was closed.

```js
const entry = await drawer.close();
// => Object { id: 'drawer-id', ... }
```

### `drawer.toggle(id, transition, focus)`

Toggles a drawer opened or closed using the provided ID.

**Parameters**

- `id [String] (optional)` The ID of the drawer to toggle.
- `transition [Boolean] (optional)` Whether or not to animate the transition.
- `focus [Boolean] (optional)` Whether or not to handle focus management.

**Returns**

- `Object` The drawer object that was closed.

```js
const entry = await drawer.toggle();
// => Object { id: 'drawer-id', ... }
```
