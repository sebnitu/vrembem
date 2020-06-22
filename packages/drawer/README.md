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

The [dialog component](https://github.com/sebnitu/vrembem/tree/master/packages/dialog) is a great fit for composing a drawer’s content.

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
<aside data-drawer="[unique-id]" data-drawer-breakpoint="md" class="drawer">
  ...
</aside>

<!-- Switches to modal below 900px viewports -->
<aside data-drawer="[unique-id]" data-drawer-breakpoint="900px" class="drawer">
  ...
</aside>
```

#### `data-drawer-focus`

If a drawer has the attribute `tabindex="-1"`, it will be given focus when it's opened. If focus on a specific element inside a drawer is prefered, give it the `data-drawer-focus` attribute. The focus in either case is returned to the trigger element once the drawer is closed. Focus handling can be disabled using the `{ focus: false }` setting.

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

#### Drawer State

By default, the state of a drawer is saved to local storage and applied persistently under the "DrawerState" local storage variable. Set `saveState: false` to disable save state. Use `saveKey: "[CUSTOM-KEY]"` to change the key that save state is stored under.

## Modifiers

### `drawer_modal`

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
`$prefix-block` | `null` | String to prefix blocks with.
`$prefix-element` | `"__"` | String to prefix element with.
`$prefix-modifier` | `"_"` | String to prefix modifier with.
`$prefix-modifier-value` | `"_"` | String to prefix modifier values with.
`$width` | `18em` | The width of drawers.
`$travel` | `5em` | Distance that drawers travel during their transition.
`$transition-duration` | `0.3s` | Duration of drawer transition.
`$transition-timing-function` | `cubic-bezier(0.4, 0, 0.2, 1)` | Timing function used for drawer transitions.
`$item-background` | `#f5f5f5` | Background color applied to drawer items.
`$item-border` | `null` | Border applied to drawer items with position modifiers. Shown on side of drawers facing drawer main.
`$item-box-shadow` | `none` | Box shadow applied to drawer items.
`$item-sep-border-color` | `null` | Border color applied to dialog components within drawer items.
`$modal-zindex` | `900` | Modal z-index to help control the stack order. Should be highest priority as modal.
`$modal-item-background` | `#fff` | Background color applied to modal drawer items.
`$modal-item-box-shadow` | See: `core.$box-shadow-24dp` | Box shadow applied to modal drawer items.
`$modal-background` | `#424242` | Background color of modal screen.
`$modal-background-alpha` | `0.8` | The alpha channel for the modal screen.

### JavaScript Events

- `drawer:opened` Emits when the drawer has opened.
- `drawer:closed` Emits when the drawer has closed.
- `drawer:breakpoint` Emits when the drawer has hit a breakpoint.
- `drawer:toModal` Emits when the drawer is switched to it's modal state.
- `drawer:toDefault` Emits when the drawer is switched to it's default state.

### JavaScript Options

Key | Default | Description
---|---|---
`autoInit` | `false` | Automatically instantiates the instance.
`dataDrawer` | `'drawer'` | Data attribute for a drawer.
`dataToggle` | `'drawer-toggle'` | Data attribute for a drawer toggle trigger.
`dataClose` | `'drawer-close'` | Data attribute for a drawer close trigger.
`dataBreakpoint` | `'drawer-breakpoint'` | Data attribute for setting a drawer's breakpoint.
`dataFocus` | `'drawer-focus'` | Data attribute for setting a drawer's focus element.
`stateOpen` | `'is-opened'` | Class used for open state.
`stateOpening` | `'is-opening'` | Class used for transitioning to open state.
`stateClosing` | `'is-closing'` | Class used for transitioning to closed state.
`stateClosed` | `'is-closed'` | Class used for closed state.
`classModal` | `'drawer_modal'` | Class used for toggling the drawer modal state.
`customEventPrefix` | `'drawer:'` | Prefix to be used on custom events.
`breakpoints` | `core.breakpoints` | An object with key/value pairs defining a breakpoints set.
`focus` | `true` | Toggles the focus handling feature.
`saveState` | `true` | Toggles the save state feature.
`saveKey` | `"DrawerState"` | Defines the localStorage key where drawer states are saved.

### JavaScript API

Method | Description
---|---
`drawer.init()` | Initializes the drawer instance.
`drawer.destroy()` | Destroys and cleans up the drawer instantiation.
`drawer.toggle(drawerKey, callback)` | Toggles a drawer provided the drawer key and optional callback.
`drawer.open(drawerKey, callback)` | Opens a drawer provided the drawer key and optional callback.
`drawer.close(drawerKey, callback)` | Closes a drawer provided the drawer key and optional callback.
`drawer.breakpoint.init()` | Initializes the drawer breakpoint feature.
`drawer.breakpoint.destroy()` | Destroys the drawer breakpoint feature.
`drawer.breakpoint.check()` | Force a check if any drawers meet their breakpoint condition.
`drawer.switchToModal(drawer)` | Switches a drawer to it's modal state.
`drawer.switchToDefault(drawer)` | Switches a drawer to it's default state.
