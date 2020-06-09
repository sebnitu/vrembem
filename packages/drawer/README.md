# Drawer

A container component that slides in from the left or right. Typically containing menus, search or other content.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fdrawer.svg)](https://www.npmjs.com/package/%40vrembem%2Fdrawer)

[Documentation](https://vrembem.com/packages/drawer)

## Installation

```
npm install @vrembem/drawer
```

### Styles

```scss
@use "@vrembem/drawer";
```

### JavaScript

```js
import { Drawer } from '@vrembem/drawer';
const drawer = new Drawer({ autoInit: true });
```

### Markup

Drawers are composed using classes for styling and data attributes for JavaScript functionality. To link a drawer toggle to a drawer, use a unique identifier as the values for both of their respective data attributes. Close buttons are left value-less and should be placed inside the drawer element they’re meant to close.

- `data-drawer="[unique-id]"`
- `data-drawer-toggle="[unique-id]"`
- `data-drawer-close`

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

The [dialog component](https://vrembem.com/packages/dialog) is a great fit for composing a drawer’s content.

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

#### `data-drawer-breakpoint`

In cases where you'd like a drawer to switch to a drawer modal on a specific breakpoint, use the `data-drawer-breakpoint` data attribute with either a breakpoint key or a specific pixel value.

```html
<!-- Switches to modal below `md` breakpoint viewports -->
<div data-drawer="[unique-id]" data-drawer-breakpoint="md" class="drawer">
  ...
</div>

<!-- Switches to modal below 900px viewports -->
<div data-drawer="[unique-id]" data-drawer-breakpoint="900px" class="drawer">
  ...
</div>
```

#### `data-drawer-focus`

If a drawer has the attribute `tabindex="-1"`, it will be given focus when it's opened. If focus on a specific element inside a drawer is prefered, give it the `data-drawer-focus` attribute. The focus in either case is returned to the trigger element once the drawer is closed. Focus handling can be disabled using the `{ focus: false }` setting.

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

#### Drawer State

By default, the state of a drawer is saved to local storage and applied persistently under the "DrawerState" local storage variable. Set `saveState: false` to disable save state. Use `saveKey: "[CUSTOM-KEY]"` to change the key that save state is stored under.

## Modifiers

### `drawer_modal`

Convert a drawer into it’s modal state with the `drawer_modal` modifier class. Only one modal drawer can be open at a time.

```html
<div class="drawer__wrapper">
  <div data-drawer="[unique-id]" class="drawer drawer_modal">
    ...
  </div>
  <div class="drawer__main">
    <button data-drawer-toggle="[unique-id]">
      ...
    </button>
  </div>
</div>
```

### `drawer_pos_[value]`

Drawers can slide in from the left or right using the position modifiers:

- `drawer_pos_left`
- `drawer_pos_right`

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

> If a position modifier is not provided, the drawer will appear based on it’s location in the DOM relative to the main content area and other drawers.

## Customization

### Sass Variables

Variable | Default | Description
---|---|---
`$prefix-block` | `core.$prefix-block` | String to prefix each block with.
`$prefix-element` | `core.$prefix-element` | String to prefix each element with.
`$prefix-modifier` | `core.$prefix-modifier` | String to prefix each modifier with.
`$prefix-modifier-value` | `core.$prefix-modifier-value` | String to prefix each modifier value with.

### JavaScript Options

Key | Default | Description
---|---|---
`autoInit` | `false` | Automatically instantiates the instance
`dataDrawer` | `"drawer"` | Data attribute for a drawer
`dataToggle` | `"drawer-toggle"` | Data attribute for a drawer toggle trigger
`dataClose` | `"drawer-close"` | Data attribute for a drawer close trigger
`dataBreakpoint` | `"drawer-breakpoint"` | Data attribute for setting a drawer's breakpoint
`dataFocus` | `"drawer-focus"` | Data attribute for setting a drawer's focus element
`stateOpen` | `"is-open"` | Class used for open state
`stateOpening` | `"is-opening"` | Class used for transitioning to open state
`stateClosing` | `"is-closing"` | Class used for transitioning to closed state
`stateClosed` | `"is-closed"` | Class used for closed state (is ommitted in application)
`classModal` | `"drawer_modal"` | Class used for toggling the drawer modal state
`breakpoints` | `core.breakpoints` | An object with key/value pairs defining a breakpoints set
`focus` | `true` | Toggles the focus handling feature
`saveState` | `true` | Toggles the save state feature
`saveKey` | `"DrawerState"` | Defines the localStorage key where drawer states are saved

### JavaScript API

Name | Description
---|---
`drawer.init()` | Initializes the drawer instance
`drawer.destroy()` | Destroys and cleans up the drawer instantiation
`drawer.toggle(drawerKey, callback)` | Toggles a drawer provided the drawer key and optional callback
`drawer.open(drawerKey, callback)` | Opens a drawer provided the drawer key and optional callback
`drawer.close(drawerKey, callback)` | Closes a drawer provided the drawer key and optional callback
