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
```

### Markup

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

## Modifiers

### `drawer_modal`

TBD

### `drawer_pos`

TBD

## Customization

### Sass Variables

TBD

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
`breakpoint` | `core.breakpoint` | An object with key/value pairs defining a breakpoint set
`focus` | `true` | Toggles the focus handling feature
`saveState` | `true` | Toggles the save state feature
`saveKey` | `"DrawerState"` | Defines the localStorage key where drawer states are saved

### JavaScript API

TBD
