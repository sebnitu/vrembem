# Drawer

A container component that slides in from the left or right. Typically containing menus, search or other content.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fdrawer.svg)](https://www.npmjs.com/package/%40vrembem%2Fdrawer)

[Documentation](https://vrembem.com/packages/drawer)

## Installation

```sh
npm install @vrembem/drawer
```

### Styles

```scss
@use "@vrembem/drawer";
```

### JavaScript

```js
import Drawer from '@vrembem/drawer';
const drawer = new Drawer({ autoInit: true });
```

### Markup

Drawers are composed using classes for styling and data attributes for JavaScript functionality. To link a drawer toggle, open or close trigger to a drawer, use a unique identifier as the values for both the trigger and drawer's respective data attributes. Close buttons can be left value-less if placed inside a drawer element they're meant to close.

- `data-drawer="[unique-id]"`
- `data-drawer-dialog`
- `data-drawer-toggle="[unique-id]"`
- `data-drawer-open="[unique-id]"`
- `data-drawer-close="[unique-id]"` (or value-less if inside drawer)

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

Drawer dialogs are the actual dialog element within a drawer and are defined using a the value-less `data-drawer-dialog` attribute. The [dialog component](/packages/dialog) is a great fit for composing a drawer’s content.

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

A custom breakpoints object can be passed in using the `breakpoints` option. Otherwise, default values are set via the core variables module.

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

#### `data-drawer-focus`

Drawer dialogs are given focus on open by default as long as the `setTabindex` option is set to `true` or if the drawer dialog has `tabindex="-1"` set manually. If focus on a specific element inside a drawer is preferred, give it the `data-drawer-focus` attribute. The focus in either case is returned to the trigger element once the drawer is closed.

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

#### Drawer State

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
const drawer = new Drawer({
  autoInit: true,
  selectorInert: '[role="main"]',
  selectorOverflow: 'body, [role="main"]'
});
```

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

| Variable                         | Default                            | Description                                                                                          |
| -------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `$prefix-block`                  | `null`                             | String to prefix blocks with.                                                                        |
| `$prefix-element`                | `"__"`                             | String to prefix element with.                                                                       |
| `$prefix-modifier`               | `"_"`                              | String to prefix modifier with.                                                                      |
| `$prefix-modifier-value`         | `"_"`                              | String to prefix modifier values with.                                                               |
| `$width`                         | `18em`                             | The width of drawers.                                                                                |
| `$max-width`                     | `100%`                             | The max-width of drawers.                                                                            |
| `$border`                        | `null`                             | Border applied to drawer items with position modifiers. Shown on side of drawers facing drawer main. |
| `$sep-border`                    | `null`                             | Border color applied to dialog components within drawer items.                                       |
| `$background`                    | `core.$shade`                      | Background color applied to drawer items.                                                            |
| `$box-shadow`                    | `none`                             | Box shadow applied to drawer items.                                                                  |
| `$travel`                        | `5em`                              | Distance that drawers travel during their transition.                                                |
| `$transition-duration`           | `core.$transition-duration`        | Duration of drawer transition.                                                                       |
| `$transition-timing-function`    | `core.$transition-timing-function` | Timing function used for drawer transitions.                                                         |
| `$wrapper-height`                | `100%`                             | The height given to drawer wrapper element.                                                          |
| `$modal-zindex`                  | `900`                              | Modal z-index to help control the stack order. Should be highest priority as modal.                  |
| `$modal-width`                   | `$width`                           | The width of modal drawers.                                                                          |
| `$modal-max-width`               | `80%`                              | The max-width of modal drawers.                                                                      |
| `$modal-sep-border`              | `null`                             | Border color applied to dialog components within modal drawer items.                                 |
| `$modal-background`              | `core.$white`                      | Background color applied to modal drawer items.                                                      |
| `$modal-box-shadow`              | `core.$box-shadow-24dp`            | Box shadow applied to modal drawer items.                                                            |
| `$modal-screen-background`       | `core.$night`                      | Background color of modal screen.                                                                    |
| `$modal-screen-background-alpha` | `0.8`                              | The alpha channel for the modal screen.                                                              |

### JavaScript Options

| Key                 | Default               | Description                                                                                          |
| ------------------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| `autoInit`          | `false`               | Automatically initializes the instance.                                                              |
| `dataDrawer`        | `'drawer'`            | Data attribute for a drawer.                                                                         |
| `dataDialog`        | `'drawer-dialog'`     | Data attribute for a drawer dialog.                                                                  |
| `dataToggle`        | `'drawer-toggle'`     | Data attribute for a drawer toggle trigger.                                                          |
| `dataOpen`          | `'drawer-open'`       | Data attribute for a drawer open trigger.                                                            |
| `dataClose`         | `'drawer-close'`      | Data attribute for a drawer close trigger.                                                           |
| `dataBreakpoint`    | `'drawer-breakpoint'` | Data attribute for setting a drawer's breakpoint.                                                    |
| `dataFocus`         | `'drawer-focus'`      | Data attribute for setting a drawer's focus element.                                                 |
| `stateOpen`         | `'is-opened'`         | Class used for open state.                                                                           |
| `stateOpening`      | `'is-opening'`        | Class used for transitioning to open state.                                                          |
| `stateClosing`      | `'is-closing'`        | Class used for transitioning to closed state.                                                        |
| `stateClosed`       | `'is-closed'`         | Class used for closed state.                                                                         |
| `classModal`        | `'drawer_modal'`      | Class used for toggling the drawer modal state.                                                      |
| `selectorInert`     | `null`                | Applies `inert` and `aria-hidden` attributes to all matching elements when a modal drawer is opened. |
| `selectorOverflow`  | `null`                | Applies `overflow:hidden` styles on all matching elements when a modal drawer is opened.             |
| `breakpoints`       | `core.breakpoints`    | An object with key/value pairs defining a breakpoints set.                                           |
| `customEventPrefix` | `'drawer:'`           | Prefix to be used on custom events.                                                                  |
| `stateSave`         | `true`                | Toggles the save state feature.                                                                      |
| `stateKey`          | `"DrawerState"`       | Defines the localStorage key where drawer states are saved.                                          |
| `setTabindex`       | `true`                | Whether or not to set `tabindex="-1"` on all drawer dialog elements on init.                         |
| `transition`        | `true`                | Toggle the transition animation for the drawer. Set to `false` to disable.                           |

## Events

- `drawer:opened` Emits when the drawer has opened.
- `drawer:closed` Emits when the drawer has closed.
- `drawer:breakpoint` Emits when the drawer has hit a breakpoint.
- `drawer:toModal` Emits when the drawer is switched to it's modal state.
- `drawer:toDefault` Emits when the drawer is switched to it's default state.

## API

### `drawer.init()`

Initializes the drawer instance. During initialization, the following processes are run:

- Runs `stateSet()` to apply the initial state for all drawers.
- Runs `setTabindex()` to apply tabindex for all drawer dialogs.
- Runs `breakpoint.init()` to initialize all breakpoints for drawers.
- Adds the `click` event listener to the document.
- Adds the `keyup` event listener for closing modal drawers with the `esc` key.

```js
const drawer = new Drawer();
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
const drawer = new Drawer();
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

### `drawer.getDrawer(key)`

Returns a drawer that matches the provided unique drawer key.

**Parameters**

- `key [String]` A unique key that matches the value of a drawer `data-drawer` attribute.

**Returns**

- `HTML object` The matching drawer element.


```html
<div class="drawer" data-drawer="drawer-key">...</div>
```

```js
const el = drawer.getDrawer('drawer-key');

// Returns HTML Element Object
console.log(el);
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
<aside data-drawer="drawer-1" data-drawer-breakpoint="420px" class="drawer">
  ...
</aside>

<aside data-drawer="drawer-2" data-drawer-breakpoint="740px" class="drawer">
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
  drawer: 'drawer-1' // String
}, {
  mql: MediaQueryList // Obj
  drawer: 'drawer-2' // String
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

### `drawer.stateSet()`

Sets the current saved state of all drawer elements based on the values set in localStorage and updates the instance `drawer.state` object.

```html
<!-- Initial HTML -->
<aside data-drawer="drawer-1" class="drawer is-opened">...</aside>
<aside data-drawer="drawer-2" class="drawer is-opened">...</aside>
```

```js
// If the current saved state in localStorage looks like this:
// { 
//   "drawer-1": "is-closed", 
//   "drawer-2": "is-closed" 
// }
drawer.stateSet();
```

```html
<!-- Output -->
<aside data-drawer="drawer-1" class="drawer is-closed">...</aside>
<aside data-drawer="drawer-2" class="drawer is-closed">...</aside>
```

### `drawer.stateSave(target)`

Saves the current state of drawers to localStorage and drawer's `drawer.state` object. This is useful when state becomes out of sync or the DOM is re-rendered in a way that breaks current state.

**Parameters**

- `HTML Element [Object]` (Default: null) A specific target to save state. If nothing is passed, all drawers in the DOM will have their state saved.

```html
<!-- Initial HTML -->
<aside data-drawer="drawer-1" class="drawer is-closed">...</aside>
<aside data-drawer="drawer-2" class="drawer is-opened">...</aside>
```

```js
// If current saved state looks like:
console.log(drawer.state);
// { 
//   "drawer-1": "is-closed", 
//   "drawer-2": "is-closed" 
// }
drawer.stateSave();

// Result
console.log(drawer.state);
// { 
//   "drawer-1": "is-closed", 
//   "drawer-2": "is-opened" 
// }
```

### `drawer.stateClear()`

Clears the existing saved states in both localStorage and drawer's `drawer.state` object.

```js
console.log(drawer.state);
// Returns: { 
//   "drawer-1": "is-closed", 
//   "drawer-2": "is-closed" 
// }
drawer.stateClear();

console.log(drawer.state);
// Returns: Object { }
```
