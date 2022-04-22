# Modal

A component for changing the mode of a page to complete a critical task. This is usually used in conjunction with the dialog component to make modal dialogs.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fmodal.svg)](https://www.npmjs.com/package/%40vrembem%2Fmodal)

[Documentation](https://vrembem.com/packages/modal)

## Installation

```sh
npm install @vrembem/modal
```

### Styles

```scss
@use "@vrembem/modal";
```

### JavaScript

```js
import Modal from '@vrembem/modal';
const modal = new Modal({ autoInit: true });
```

### Markup

Modals are composed using classes and data attributes for their triggers. The basic structure of a modal is an element with an `id` and the `modal` class containing a child element with the `modal__dialog` class. There are three types of modal triggers, each defined by a data attribute:

- `data-modal-open`: Opens a modal. Should take the id of the modal it's meant to open. Will stack modals if triggered from inside an already opened modal.
- `data-modal-close`: Closes a modal. Will close the last opened modal if left value-less. Can also take a modal id to close a specific modal, or `"*"` to close all open modals.
- `data-modal-replace`: Replaces currently opened modal(s) with the modal of the id provided.

```html
<button data-modal-open="modal-id">...</button>

<div id="modal-id" class="modal">
  <div class="modal__dialog" role="dialog" aria-modal="true">
    <button data-modal-close>...</button>
    ...
  </div>
</div>
```

The dialog element of a modal is defined using the `modal__dialog` class. Modal dialogs should also be given the `role` attribute with a value of either [`dialog`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role) or [`alertdialog`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role) and the `aria-modal` attribute with a value of `true`. Authors should provide modal dialogs with [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) and [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) attributes if applicable to further improve accessibility.

```html
<div id="modal-id" class="modal">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-description">
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
</div>
```

> The [dialog component](https://github.com/sebnitu/vrembem/tree/main/packages/dialog) is a great fit for composing a modal’s dialog.

#### Focus Management

Modal dialogs are given focus when opened as long as the `setTabindex` option is set to `true` or if the modal dialog has `tabindex="-1"` set manually. If focus on a specific element inside a modal is preferred, give that element the `data-focus` attribute. Focus is returned to the element that initially triggered the modal once closed.

```html
<!-- Focus is returned to the trigger when a modal is closed -->
<button data-modal-open="modal-id">...</button>

<!-- Sets focus to modal dialog when opened -->
<div id="modal-id" class="modal">
  <div class="modal__dialog" role="dialog" aria-modal="true" tabindex="-1">
    ...
  </div>
</div>

<!-- Sets focus to data-focus element when opened -->
<div id="modal-id" class="modal">
  <div class="modal__dialog" role="dialog" aria-modal="true">
    <input data-focus type="text">
    ...
  </div>
</div>
```

While a modal is active, the contents obscured by the modal are made inaccessible to all users via a focus trap. This means that the `TAB` key, and a screen reader’s virtual cursor (arrow keys) should not be allowed to leave the modal dialog and traverse the content outside of the dialog.

> To change the selector used in finding the preferred focus element, pass your own selector via the `selectorFocus` option (defaults to `'[data-focus]'`).

#### Required Modals

Required modals are modals that need an explicit action to be closed. That means clicking on the background or pressing the escape key to close a required modal is disabled. Required modals are set by giving a dialog the attribute `role` with a value of `alertdialog`.

```html
<div id="modal-id" class="modal">
  <div class="modal__dialog" role="alertdialog" aria-modal="true">
    ...
    <button data-modal-close>Agree</button>
  </div>
</div>
```

> To change the selector used in creating required modals, pass your own selector via the `selectorRequired` option (defaults to `'[role="alertdialog"]'`).

## Behavior and Accessibility

Modals on the web have an expected set of patterns that this component follows. Here's what to expect:

1. When a modal is opened, focus is moved to the dialog or an element inside.
2. Modals provide standard methods for the user to close such as using the `esc` key or clicking outside the dialog.
3. While the modal is active, contents obscured by the modal are inaccessible to all users.
4. When a modal is closed, focus is returned to the initial trigger element that activated the dialog.

To take full advantage of modal's accessibility features, it's recommended to set the `selectorInert` option to all elements that are outside the modal. If you have modal markup throughout your document, use the `teleport` option to consolidate all modals in the DOM to a single location. All elements that match the `selectorInert` selector will be given the `inert` attribute as well as `aria-hidden="true"` when a modal is opened.

> Inert is not currently widely supported by all browsers. Consider using a polyfill such as [wicg-inert](https://github.com/WICG/inert) or Google's [inert-polyfill](https://github.com/GoogleChrome/inert-polyfill).

### Example

Here's an example where we want the `<main>` content area to be inaccessible while modals are open. We also want all modals to be moved outside the main content element using the `after` method.

```js
const modal = new Modal({
  selectorInert: 'main',
  teleport: 'main',
  teleportMethod: 'after'
});

await modal.init();
```

To return a modal to its original location, use the collection API method `teleportReturn()`:

```js
// Get an entry from the modal collection.
const entry = modal.get('modal-id');

// Returns the modal to its previously teleported location.
entry.teleportReturn();
```

## Modifiers

### `modal_full`

Adds styles to a modal that make it fill the entire viewport when opened.

```html
<div id="modal-id" class="modal modal_full">...</div>
```

### `modal_pos_[value]`

The default position of modals is in the center of the viewport. The position modifier allows positioning a modal to the top, bottom, left and right side of the document viewport.

```html
<div id="..." class="modal modal_pos_top">...</div>
<div id="..." class="modal modal_pos_bottom">...</div>
<div id="..." class="modal modal_pos_left">...</div>
<div id="..." class="modal modal_pos_right">...</div>
```

#### Available Variations
- `modal_pos_top`
- `modal_pos_left`
- `modal_pos_right`
- `modal_pos_bottom`

### `modal_size_[value]`

Adjusts the size of modals. This modifier provides five options that get built using the [`$size-scale`](#size-scale) variable map.

```html
<div id="modal-id" class="modal modal_size_sm">...</div>
```

#### Available Variations

- `modal_size_xs`
- `modal_size_sm`
- `modal_size_md`
- `modal_size_lg`
- `modal_size_xl`

## Customization

### Sass Variables

| Variable                      | Default                            | Description                                                                         |
| ----------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                             | String to prefix blocks with.                                                       |
| `$prefix-element`             | `"__"`                             | String to prefix elements with.                                                     |
| `$prefix-modifier`            | `"_"`                              | String to prefix modifiers with.                                                    |
| `$prefix-modifier-value`      | `"_"`                              | String to prefix modifier values with.                                              |
| `$z-index`                    | `1000`                             | Base z-index of modals. Stacked modals are incremented by 1.                        |
| `$width`                      | `36em`                             | The default max width of modals.                                                    |
| `$travel`                     | `5em`                              | Distance that modal travel during their transition.                                 |
| `$transition-duration`        | `core.$transition-duration`        | Duration of modal transition.                                                       |
| `$transition-timing-function` | `core.$transition-timing-function` | Timing function used for modal transitions.                                         |
| `$background`                 | `core.$night`                      | Background color of modal screen.                                                   |
| `$background-alpha`           | `0.8`                              | The alpha channel for the modal screen.                                             |
| `$box-shadow`                 | `core.$box-shadow-5`               | Box shadow applied to modal dialog elements.                                        |
| `$outline`                    | `0 solid rgba(core.$primary, 0)`   | Outline applied to modal dialog elements.                                           |
| `$outline-focus`              | `4px solid rgba(core.$primary, 1)` | Outline applied to modal dialog elements in their focus state.                      |
| `$outline-focus-alert`        | `4px solid rgba(core.$danger, 1)`  | Outline applied to required modal dialog elements in their focus state.             |
| `$aside-width`                | `16em`                             | Width applied to modals using `modal_pos_left` and `modal_pos_right` modifiers.     |
| `$aside-max-width`            | `90%`                              | Max width applied to modals using `modal_pos_left` and `modal_pos_right` modifiers. |
| `$size-scale`                 | [Map Ref &darr;](#size-scale)      | The size scale map the `modal_size_[key]` modifier uses to build its styles.        |

#### $size-scale

The size scale map the `modal_size_[key]` modifier uses to build its styles.

```scss
$size-scale: (
  'xs': 20em, // 288px
  'sm': 24em, // 384px
  'md': 36em, // 576px
  'lg': 48em, // 768px
  'xl': 60em  // 960px
) !default;
```

### JavaScript Options

| Key                 | Default                  | Description                                                                                                   |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `autoInit`          | `false`                  | Automatically initializes the instance.                                                                       |
| `dataOpen`          | `'modal-open'`           | Data attribute for a modal open trigger.                                                                      |
| `dataClose`         | `'modal-close'`          | Data attribute for a modal close trigger.                                                                     |
| `dataReplace`       | `'modal-replace'`        | Data attribute for a modal replace trigger.                                                                   |
| `dataConfig`        | `'modal-config'`         | Data attribute to find modal specific configuration settings. Value should be a JSON object.                  |
| `selectorModal`     | `'.modal'`               | Selector for modal element.                                                                                   |
| `selectorDialog`    | `'.modal__dialog'`       | Selector for modal dialog element.                                                                            |
| `selectorRequired`  | `'[role="alertdialog"]'` | Selector used to apply required modal state.                                                                  |
| `selectorFocus`     | `'[data-focus]'`         | Focus preference selector for when modals are initially opened.                                               |
| `selectorInert`     | `null`                   | Applies `inert` and `aria-hidden` attributes to all matching elements when a modal is opened.                 |
| `selectorOverflow`  | `'body'`                 | Applies `overflow:hidden` styles on all matching elements when a modal is opened.                             |
| `stateOpened`       | `'is-opened'`            | Class used for open state.                                                                                    |
| `stateOpening`      | `'is-opening'`           | Class used for transitioning to open state.                                                                   |
| `stateClosing`      | `'is-closing'`           | Class used for transitioning to closed state.                                                                 |
| `stateClosed`       | `'is-closed'`            | Class used for closed state.                                                                                  |
| `customEventPrefix` | `'modal:'`               | Prefix to be used on custom events.                                                                           |
| `eventListeners`    | `true`                   | Whether or not to set the document event listeners on init.                                                   |
| `teleport`          | `null`                   | Teleport selector where modals get moved to. Leave as `null` to disable teleport.                             |
| `teleportMethod`    | `'append'`               | Teleport method options include `after`, `before`, `append` and `prepend` relative to the teleport reference. |
| `setTabindex`       | `true`                   | Whether or not to set `tabindex="-1"` on all modal dialog elements on init.                                   |
| `transition`        | `true`                   | Toggle the transition animation of modals.                                                                    |

## Events

- `modal:opened` Emits when a modal has opened.
- `modal:closed` Emits when a modal has closed.

## API

### `modal.collection`

Returns an array where all modal objects are stored when registered. Each modal object contains the following properties:

```js
{
  id: String, // The unique ID of the modal.
  state: String, // The current state of the modal ('closing', 'closed', 'opening' or 'opened').
  el: HTMLElement, // The modal HTML element.
  dialog: HTMLElement // The modal dialog HTML element.
  returnRef: HTMLComment // The return reference left when a modal is teleported.
  settings: Object // The modal specific settings.
  open: Function // Method to open this modal.
  close: Function // Method to close this modal.
  replace: Function // Method to replace open modal(s) with this modal.
  deregister: Function // Method to deregister this modal.
  teleport: Function // Method to teleport this modal.
  teleportReturn: Function // Method to return this modal to its previous location.
  getSetting: Function // Method that returns either a modal specific setting or global modal setting.
}
```

**Returns**

- `Array` An array of collection entries.

### `modal.stack`

Returns an array of all currently opened modals. These are sorted in the order they're added to the array (first item was opened first, last item was opened last).

**Returns**

- `Array` An array of collection entries.

### `modal.active`

Returns the currently active modal or the modal at the top of the stack if multiple modals are open. Will return `undefined` if no modals are open.

**Returns**

- `Object || undefined` Collection entry.

### `modal.init(options)`

Initializes the modal instance. During initialization, the following processes are run:

- Register each modal in the collection by running `registerCollection()`.
- Sets up global event listeners by running `initEventListeners()`.

**Parameters**

- `options [Object] (optional)` An options object for passing custom settings.

```js
const modal = new Modal();
await modal.init();
```

### `modal.destroy()`

Destroys and cleans up the modal initialization. During cleanup, the following processes are run:

- Deregister the modal collection by running `deregisterCollection()`.
- Removes global event listeners by running `destroyEventListeners()`.

```js
const modal = new Modal();
await modal.init();
// ...
await modal.destroy();
```

### `modal.initEventListeners()`

Set document event listeners.

```js
const modal = new Modal({ eventListeners: false });
await modal.init();
modal.initEventListeners();
```

### `modal.destroyEventListeners()`

Remove document event listeners.

```js
const modal = new Modal();
await modal.init();
// ...
modal.destroyEventListeners();
```

### `modal.register(query)`

Registers a modal into the collection. This also sets the initial state and applies missing accessibility attributes such as `role="dialog"` and `aria-modal="true"`.

**Parameters**

- `query [String || Object]` A modal ID or an HTML element of either the modal or its trigger.

**Returns**

- `Object` The modal object that got stored in the collection.

```js
const result = await modal.register('modal-id');
// => Object { id: 'modal-id', ... }
```

### `modal.deregister(query)`

Deregister the modal from the collection. This closes the modal if it's opened, returns a modal if it has been teleported and removes the entry from the collection.

**Parameters**

- `query [String || Object]` A modal ID or an HTML element of either the modal or its trigger.

**Returns**

- `Array` Returns the newly modified collection array.

```js
const result = await modal.deregister('modal-id');
// => Array [{}, {}, ...]
```

### `modal.registerCollection(items)`

Registers array of modals to the collection. All modals in array are run through the `register()` method.

**Parameters**

- `items [Array]` An array of modals or modal IDs to register.

**Returns**

- `Array` Returns the collection array.

```js
const modals = document.querySelectorAll('.modal');
const result = await modal.registerCollection(modals);
// => Array [{}, {}, ...]
```

### `modal.deregisterCollection()`

Deregister all modals in the collections array. All modals in collection are run through the `deregister()` method.

**Returns**

- `Array` Returns the empty collection array.

```js
const result = await modal.registerCollection();
// => Array []
```

### `modal.get(value, key)`

Used to retrieve a registered modal object from the collection. The value should match the key type to search by: e.g. to search by modal elements, pass the modal html node with a key of `'el'`. Defaults to `'id'`.

**Parameters**

- `value [String || Object]` The value to search for within the collection.
- `key [String] (optional) (default 'id')` The property key to search the value against.

**Returns**

- `Object || undefined` The first element in the collection that matches the provided query and key. Otherwise, undefined is returned.

```js
const entry = modal.get('modal-id');
// => Object { id: 'modal-id', ... }
```

### `modal.open(id, transition, focus)`

Opens a modal using the provided ID.

**Parameters**

- `id [String]` The ID of the modal to open.
- `transition [Boolean] (optional)` Whether or not to animate the transition.
- `focus [Boolean] (optional)` Whether or not to handle focus management.

**Returns**

- `Object` The modal object that was opened.

```js
const entry = await modal.open('modal-key');
// => Object { id: 'modal-id', ... }
```

### `modal.close(id, transition, focus)`

Closes a modal using the provided ID. Can be called without an ID to close most recently opened modal.

**Parameters**

- `id [String] (optional)` The ID of the modal to close.
- `transition [Boolean] (optional)` Whether or not to animate the transition.
- `focus [Boolean] (optional)` Whether or not to handle focus management.

**Returns**

- `Object` The modal object that was closed.

```js
const entry = await modal.close();
// => Object { id: 'modal-id', ... }
```

### `modal.replace(id, transition, focus`

Replaces currently opened modal(s) with the modal of the id provided. This could be used to trigger a modal when modal stacking is not desired.

**Parameters**

- `id [String]` The ID of the modal to open. Will close all other opened modals.
- `transition [Boolean] (optional)` Whether or not to animate the transition.
- `focus [Boolean] (optional)` Whether or not to handle focus management.

**Returns**

- `Object` An object with `opened` and `closed` properties whose values will be the opened modal and an array of modals that were closed.

```js
const obj = await modal.replace('modal-id');
// => Object { opened: { id: 'modal-id', ... }, closed: [...] }
```

### `modal.closeAll(exclude, transition, focus)`

Closes all open modals. Will exclude closing a modal using the provided ID.

**Parameters**

- `exclude [String] (optional)` The ID of a modal to exclude from closing. Will close all other opened modals.
- `transition [Boolean] (optional)` Whether or not to animate the transition.
- `focus [Boolean] (optional)` Whether or not to handle focus management.

**Returns**

- `Array` An array of all modals that were closed.

```js
const array = await modal.closeAll();
// => Array [{}, {}, ...]
```
