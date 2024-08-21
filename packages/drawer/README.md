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

The dialog element of a drawer is defined using the `drawer__dialog` class. Along with a role attribute (e.g. `role="dialog"`), authors should provide drawer dialogs with [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) and [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) attributes if applicable to further improve accessibility. The `aria-modal` attribute is applied automatically based on if the drawer is currently in `'modal'` mode.

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
<!-- Switches to modal below 1200px viewports -->
<aside id="drawer-id" class="drawer" data-drawer-breakpoint="1200px">
  ...
</aside>

<!-- Switches to modal below "md" breakpoint viewports -->
<aside id="drawer-id" class="drawer" data-drawer-breakpoint="md">
  ...
</aside>
```

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
| `$class-frame`                   | `$prefix-block'drawer-frame'`      | Class name to use for the `drawer-frame` element.                                                    |
| `$class-main`                    | `$prefix-block'drawer-main'`       | Class name to use for the `drawer-main` element.                                                     |
| `$width`                         | `18em`                             | The width of drawers.                                                                                |
| `$max-width`                     | `100%`                             | The max-width of drawers.                                                                            |
| `$border`                        | `null`                             | Border applied to drawer items with position modifiers. Shown on side of drawers facing drawer main. |
| `$sep-border`                    | `null`                             | Border color applied to dialog elements within drawers.                                              |
| `$background`                    | `core.$shade`                      | Background color applied to drawer items.                                                            |
| `$box-shadow`                    | `none`                             | Box shadow applied to drawer items.                                                                  |
| `$transition-duration`           | `core.$transition-duration`        | Duration of drawer transition.                                                                       |
| `$transition-timing-function`    | `core.$transition-timing-function` | Timing function used for drawer transitions.                                                         |
| `$frame-height`                  | `100vh`                            | Height given to the `drawer-frame` element.                                                          |
| `$modal-z-index`                 | `900`                              | Modal z-index to help control the stack order. Should be highest priority as modal.                  |
| `$modal-width`                   | `$width`                           | The width of modal drawers.                                                                          |
| `$modal-max-width`               | `80%`                              | The max-width of modal drawers.                                                                      |
| `$modal-sep-border`              | `null`                             | Border color applied to dialog elements within modal drawers.                                        |
| `$modal-background`              | `core.$white`                      | Background color applied to modal drawer items.                                                      |
| `$modal-box-shadow`              | `core.$box-shadow-5`               | Box shadow applied to modal drawer items.                                                            |
| `$modal-screen-background`       | `core.$night`                      | Background color of modal screen.                                                                    |
| `$modal-screen-background-alpha` | `0.8`                              | The alpha channel for the modal screen.                                                              |

### JavaScript Options

| Key                 | Default               | Description                                                                                          |
| ------------------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| `autoInit`          | `false`               | Automatically initializes the instance.                                                              |
| `dataOpen`          | `'drawer-open'`       | Data attribute for a drawer open trigger.                                                            |
| `dataClose`         | `'drawer-close'`      | Data attribute for a drawer close trigger.                                                           |
| `dataToggle`        | `'drawer-toggle'`     | Data attribute for a drawer toggle trigger.                                                          |
| `dataBreakpoint`    | `'drawer-breakpoint'` | Data attribute for setting a drawer's breakpoint.                                                    |
| `dataBreakpoint`    | `'drawer-config'`     | Data attribute to find drawer specific configuration settings. Value should be a JSON object.        |
| `selectorDrawer`    | `'.drawer'`           | Selector for dialog element.                                                                         |
| `selectorDialog`    | `'.drawer__dialog'`   | Selector for drawer dialog element.                                                                  |
| `selectorFocus`     | `'[data-focus]'`      | Focus preference selector for when drawers are initially opened.                                     |
| `selectorInert`     | `null`                | Applies `inert` and `aria-hidden` attributes to all matching elements when a modal drawer is opened. |
| `selectorOverflow`  | `'body'`              | Applies `overflow:hidden` styles on all matching elements when a modal drawer is opened.             |
| `stateOpen`         | `'is-opened'`         | Class used for open state.                                                                           |
| `stateOpening`      | `'is-opening'`        | Class used for transitioning to open state.                                                          |
| `stateClosing`      | `'is-closing'`        | Class used for transitioning to closed state.                                                        |
| `stateClosed`       | `'is-closed'`         | Class used for closed state.                                                                         |
| `classModal`        | `'drawer_modal'`      | Class used for toggling the drawer modal state.                                                      |
| `breakpoints`       | `null`                | An object with key/value pairs defining a breakpoint set.                                            |
| `customEventPrefix` | `'drawer:'`           | Prefix to be used on custom events.                                                                  |
| `eventListeners`    | `true`                | Whether or not to set the document event listeners on init.                                          |
| `store`             | `true`                | Toggles the local store feature.                                                                     |
| `storeKey`          | `'VB:DrawerState'`    | Defines the localStorage key where drawer states are saved.                                          |
| `setTabindex`       | `true`                | Whether or not to set `tabindex="-1"` on all drawer dialog elements on init.                         |
| `transition`        | `true`                | Toggle the transition animation of drawers.                                                          |

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
