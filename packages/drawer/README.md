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

Drawers are composed using classes and data attributes for their triggers. The basic structure of a drawer is an element with an `id` and `drawer` class containing a child element with the `drawer__dialog` class. There are two required structure elements for drawers to work correctly:

- `drawer-frame`: Applied to the parent element wrapping all drawers and the main content.
- `drawer-main`: Applied to the element containing the main content. This should be the last child of the `drawer-frame` element.


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

Drawer triggers are defined using three data attributes:

- `data-drawer-open`: Opens a drawer. Takes the id of the drawer it's meant to open.
- `data-drawer-close`: Closes a drawer. Will close the parent drawer if left value-less. Can also take an id of a drawer to close.
- `data-drawer-toggle`: Toggles a drawer opened or closed. Takes the id of the drawer it's meant to toggle.

```html
<button data-drawer-open="drawer-id">...</button>
<button data-drawer-close="drawer-id">...</button>
<button data-drawer-toggle="drawer-id">...</button>
```

The dialog element of a drawer is defined using the `drawer__dialog` class. Along with a role attribute (e.g. `role="dialog"`), authors should provide drawer dialogs with [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) and [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) attributes if applicable to further improve accessibility. The `aria-modal` attribute is applied automatically based on the drawers current mode (either `modal` or `inline`).

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

> The [dialog component](https://github.com/sebnitu/vrembem/tree/main/packages/dialog) is a great fit for composing a drawer's dialog.

#### Modal Drawers

To create a modal drawer, apply the `drawer_modal` modifier.

```html
<aside id="drawer-id" class="drawer drawer_modal">
  ...
</aside>
```

You can also switch a drawer from `'inline'` to `'modal'` by changing the collection API `mode` property:

```js
// Get the drawer object from the collection.
const entry = drawer.get('drawer-id');

// Set it's mode to either 'modal' or 'inline'.
entry.mode = 'modal';
```

In cases where you'd like a drawer to switch modes based on a specific viewport width, use the `data-drawer-breakpoint` data attribute with either a width value or a breakpoint key.

```html
<!-- Switches to modal below 900px viewports -->
<aside id="drawer-id" class="drawer" data-drawer-breakpoint="900px">
  ...
</aside>

<!-- Switches to modal below "md" breakpoint viewports -->
<aside id="drawer-id" class="drawer" data-drawer-breakpoint="md">
  ...
</aside>
```

A custom breakpoints object can be passed in using the `breakpoints` option. Otherwise, breakpoints are resolved by looking up a CSS variable using the passed key (e.g: `--breakpoint-[key]`).

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
  --breakpoint-xs: 480px;
  --breakpoint-sm: 620px;
  --breakpoint-md: 760px;
  --breakpoint-lg: 990px;
  --breakpoint-xl: 1380px;
}
```

While a modal drawer is active, the contents obscured by the modal are made inaccessible to all users via a focus trap. This means that the `TAB` key, and a screen reader’s virtual cursor (arrow keys) should not be allowed to leave the drawer dialog and traverse the content outside of the dialog. This does not apply to inline drawers.

#### Focus Management

Drawer dialogs are given focus when opened as long as the `setTabindex` option is set to `true` or if the drawer dialog has `tabindex="-1"` set manually. If focus on a specific element inside a drawer is preferred, give that element the `data-focus` attribute. Focus is returned to the element that initially triggered the drawer once closed.

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

> To change the selector used in finding the preferred focus element, pass your own selector via the `selectorFocus` option (defaults to `'[data-focus]'`).

#### Drawer State

The state of all drawers are saved to local storage and applied persistently under the `VB:DrawerState` local storage key. Set `store: false` to disable the local storage feature. Use `storeKey: "CUSTOM-KEY"` to change the key that local store is saved under.

## Behavior and Accessibility

Drawers while in their modal state follow a set of patterns expected from other modals on the web. Here's what to expect:

1. When a modal drawer is opened, focus is moved to the dialog or an element inside.
2. Modal drawers provide standard methods for the user to close such as using the `esc` key or clicking outside the dialog.
3. While the modal drawer is active, contents obscured by the modal are inaccessible to all users.
4. When a modal drawer is closed, focus is returned to the initial trigger element that activated the dialog.

To take full advantage of modal drawer's accessibility features, it's recommended to set the `selectorInert` option to all elements that are outside the modal (most likely the `drawer-main` element). All elements that match the `selectorInert` selector will be given the `inert` attribute as well as `aria-hidden="true"` when a modal is opened.

> Inert is not currently widely supported by all browsers. Consider using a polyfill such as [wicg-inert](https://github.com/WICG/inert) or Google's [inert-polyfill](https://github.com/GoogleChrome/inert-polyfill).

### Example

Here's an example where we want the `drawer-main` content area to be inaccessible while drawer modals are open. We also want to disable other scrollable elements using the `selectorOverflow` option.

```js
const drawer = new Drawer({
  selectorInert: '.drawer-main',
  selectorOverflow: 'body, .drawer-main'
});

await drawer.init();
```

## Modifiers

### `drawer_modal`

Applies modal drawer styles to a drawer. To convert a drawer to its modal state after its been registered, set the collection API `mode` property to `'modal'`. Only one modal can be open at a time.

```html
<aside id="drawer-id" class="drawer drawer_modal">
  ...
</aside>
```

### `drawer_switch`

Drawers slide in from the left by default. To create a right side drawer, use the `drawer_switch` modifier.

```html
<aside id="drawer-right" class="drawer drawer_switch">
  ...
</aside>
```

## Customization

### Sass Variables

| Variable                         | Default                            | Description                                                                                          |
| -------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `$prefix-block`                  | `null`                             | String to prefix blocks with.                                                                        |
| `$prefix-element`                | `"__"`                             | String to prefix elements with.                                                                      |
| `$prefix-modifier`               | `"_"`                              | String to prefix modifiers with.                                                                     |
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
| `$frame-height`                  | `100vh`                            | The height given to drawer frame element.                                                            |
| `$modal-z-index`                 | `900`                              | Modal z-index to help control the stack order. Should be highest priority as modal.                  |
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
| `eventListeners`    | `true`                | Whether or not to set the document event listeners on init.                                          |
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

### `drawer.init(options)`

Initializes the drawer instance. During initialization, the following processes are run:

- Runs `stateSet()` to apply the initial state for all drawers.
- Runs `breakpoint.init()` to initialize all breakpoints for drawers.
- Adds the `click` event listener to the document.
- Adds the `keydown` event listener for closing modal drawers with the `esc` key.

**Parameters**

- `options [Object] (optional) (default null)` An options object for passing your custom settings.

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
- Removes the `keydown` event listener from the document.

```js
const drawer = new Drawer();
drawer.init();
// ...
drawer.destroy();
```

### `drawer.initEventListeners()`

Set the document event listeners for click, touchend and keydown events.

```js
const drawer = new Drawer({ eventListeners: false });
drawer.init();
drawer.initEventListeners();
```

### `drawer.destroyEventListeners()`

Remove the document event listeners for click, touchend and keydown events.

```js
const drawer = new Drawer();
drawer.init();
// ...
drawer.destroyEventListeners();
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
