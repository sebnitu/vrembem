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

Modals and their dialogs are composed using classes and data attributes for their triggers. The basic structure of a modal is the `modal` element and a `modal__dialog` child element. There are three types of modal triggers, each defined by a data attribute:

- `data-modal-open` - Opens a modal. Should take the id of the modal it's meant to open.
- `data-modal-close` - Closes a modal. If left value-less, it'll close the last opened modal. Can also take a modal id or `"*"` to close all open modals.
- `data-modal-replace` - Replaces currently opened modal(s) with the modal of the id provided.

```html
<!-- Modal trigger -->
<button data-modal-open="modal-id">...</button>

<!-- Modal -->
<div id="modal-id" class="modal">
  <!-- Modal dialog -->
  <div class="modal__dialog" role="dialog" aria-modal="true">
    <!-- Modal close trigger -->
    <button data-modal-close>...</button>
    ...
  </div>
</div>
```

Modal dialogs are the actual dialog element within a modal and are defined using the `modal__dialog` class. Modal dialogs should also be given the `role` attribute with a value of either [`dialog`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role) or [`alertdialog`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role) and the `aria-modal` attribute with a value of `true`. Authors should also provide modal dialogs with [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) and [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) attributes to enhance their accessibility.

```html
<div id="modal-id" class="modal">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
    <div class="dialog__header">
      <h2 id="modal-title">...</h2>
    </div>
    <div class="dialog__body">
      <p id="modal-description">...</p>
    </div>
    <div class="dialog__footer">
      ...
    </div>
  </div>
</div>
```

> The [dialog component](https://github.com/sebnitu/vrembem/tree/main/packages/dialog) is a great fit for composing a modal’s dialog.

#### Focus Management

Modal dialogs are given focus when they're opened by default as long as the `setTabindex` option is set to `true` or if the drawer dialog has `tabindex="-1"` set manually. If focus on a specific element inside a modal is preferred, give that element the `data-focus` attribute. Focus is returned to the element that activated the modal once the modal is closed.

```html
<!-- Focus is returned to the trigger when a modal is closed -->
<button data-modal-open="[unique-id]">...</button>

<!-- Sets focus to modal dialog when opened -->
<div id="[unique-id]" class="modal">
  <div class="modal__dialog" role="dialog" aria-modal="true" tabindex="-1">
    ...
  </div>
</div>

<!-- Sets focus to data-focus element when opened -->
<div ud="[unique-id]" class="modal">
  <div class="modal__dialog" role="dialog" aria-modal="true">
    <input data-focus type="text">
    ...
  </div>
</div>
```

While a modal is active, the contents obscured by the modal are made inaccessible to all users via a focus trap. This means that the `TAB` key, and a screen reader’s virtual cursor (arrow keys) should not be allowed to leave the modal dialog and traverse the content outside of the dialog.

> To change the selector used in finding the preferred focus element, pass your own selector via the `selectorFocus` option (defaults to `'[data-focus]'`).

#### Required Modals

Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close a required modal is disabled. By default, required modals are set by giving a dialog the attribute `role` with a value of `alertdialog`.

```html
<div id="[unique-id]" class="modal">
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

Here's an example where we want the `<main>` content area to be inaccessible while modals are open. We also want for all modals to be moved outside the main content element using the `after` method.

```js
const modal = new Modal({
  selectorInert: 'main',
  teleport: 'main',
  teleportMethod: 'after'
});

modal.init();
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
<div id="[unique-id]" class="modal modal_full">...</div>
```

### `modal_pos_[value]`

The default position of modals is in the center of the viewport. The position modifier allows positioning a modal to the top, bottom, left and right side of the document viewport.

```html
<div id="[unique-id]" class="modal modal_pos_top">...</div>
<div id="[unique-id]" class="modal modal_pos_bottom">...</div>
<div id="[unique-id]" class="modal modal_pos_left">...</div>
<div id="[unique-id]" class="modal modal_pos_right">...</div>
```

#### Available Variations
- `modal_pos_top`
- `modal_pos_left`
- `modal_pos_right`
- `modal_pos_bottom`

### `modal_size_[value]`

Adjusts the size of modals. This modifier provides five options that get built from the [`$size-scale`](#size-scale) variable map.

```html
<div id="[unique-id]" class="modal modal_size_sm">...</div>
```

#### Available Variations

- `modal_size_xs`
- `modal_size_sm`
- `modal_size_md`
- `modal_size_lg`
- `modal_size_xl`

## Customization

### Sass Variables

| Variable                      | Default                            | Description                                                                  |
| ----------------------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                             | String to prefix blocks with.                                                |
| `$prefix-element`             | `"__"`                             | String to prefix elements with.                                              |
| `$prefix-modifier`            | `"_"`                              | String to prefix modifiers with.                                             |
| `$prefix-modifier-value`      | `"_"`                              | String to prefix modifier values with.                                       |
| `$z-index`                    | `1000`                             | Applied z-index to modals to control the stack order.                        |
| `$width`                      | `36em`                             | The default max width of modals.                                             |
| `$travel`                     | `5em`                              | Distance that modal travel during their transition.                          |
| `$transition-duration`        | `core.$transition-duration`        | Duration of modal transition.                                                |
| `$transition-timing-function` | `core.$transition-timing-function` | Timing function used for modal transitions.                                  |
| `$background`                 | `core.$night`                      | Background color of modal screen.                                            |
| `$background-alpha`           | `0.8`                              | The alpha channel for the modal screen.                                      |
| `$box-shadow`                 | `core.$box-shadow-24dp`            | Box shadow applied to modal dialog elements.                                 |
| `$outline`                    | `0 solid rgba(core.$primary, 0)`   | Outline applied to modal dialog elements.                                    |
| `$outline-focus`              | `4px solid rgba(core.$primary, 1)` | Outline applied to modal dialog elements in their focus state.               |
| `$outline-focus-alert`        | `4px solid rgba(core.$danger, 1)`  | Outline applied to required modal dialog elements in their focus state.      |
| `$aside-width`                | `16em`                             | Width applied to modals using `_pos_left` and `_pos_right` modifiers.        |
| `$aside-max-width`            | `90%`                              | Max width applied to modals using `_pos_left` and `_pos_right` modifiers.    |
| `$size-scale`                 | [Map Ref &darr;](#size-scale)      | The size scale map the `modal_size_[key]` modifier uses to build its styles. |

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
| `selectorModal`     | `'.modal'`               | Selector for modal component.                                                                                 |
| `selectorDialog`    | `'.modal__dialog'`       | Selector for modal dialog element.                                                                            |
| `selectorRequired`  | `'[role="alertdialog"]'` | Selector used to apply required modal state.                                                                  |
| `selectorFocus`     | `'[data-focus]'`         | Selector to apply focus preference to when modals are initially opened.                                       |
| `selectorInert`     | `null`                   | Applies `inert` and `aria-hidden` attributes to all matching elements when a modal is opened.                 |
| `selectorOverflow`  | `'body'`                 | Applies `overflow:hidden` styles on all matching elements when a modal is opened.                             |
| `stateOpened`       | `'is-opened'`            | Class used for open state.                                                                                    |
| `stateOpening`      | `'is-opening'`           | Class used for transitioning to open state.                                                                   |
| `stateClosing`      | `'is-closing'`           | Class used for transitioning to closed state.                                                                 |
| `stateClosed`       | `'is-closed'`            | Class used for closed state.                                                                                  |
| `customEventPrefix` | `'modal:'`               | Prefix to be used on custom events.                                                                           |
| `eventListeners`    | `true`                   | Whether or not to set the document event listeners on init.                                                   |
| `teleport`          | `null`                   | Teleport selector where modals get moved to. Leave as `null` to disable teleport.                             |
| `teleportMethod`    | `null`                   | Teleport method options include `after`, `before`, `append` and `prepend` relative to the teleport reference. |
| `setTabindex`       | `true`                   | Whether or not to set `tabindex="-1"` on all modal dialog elements on init.                                   |
| `transition`        | `true`                   | Toggle the transition animation for the modal. Set to `false` to disable.                                     |

## Events

- `modal:opened` Emits when the modal has opened.
- `modal:closed` Emits when the modal has closed.

## API

### `modal.collection`

An array where all registered modals are stored. Each entry in the collection contains the following properties:

```js
{
  id: String, // The unique ID of the modal.
  state: String, // The current state of the modal ('closing', 'closed', 'opening' or 'opened').
  trigger: HTMLElement, // The trigger HTML element that opened the modal.
  target: HTMLElement, // The modal HTML element.
  dialog: HTMLElement // The modal dialog JS instance.
  returnRef: HTMLComment // The return reference comment left when a modal is teleported.
  open: Function // Method to open this modal.
  close: Function // Method to close this modal.
  replace: Function // Method to replace an open modal with this modal.
  deregister: Function // Method to deregister this modal.
  teleport: Function // Method to teleport this modal.
  teleportReturn: Function // Method to return this modal to its previous location.
}
```
### `modal.init(options)`

Initializes the modal instance. During initialization, the following processes are run:

- Builds the modal collection by running `registerCollection()`
- Sets up the global event listeners by running `initEventListeners()`

**Parameters**

- `options [Object] (optional) (default null)` An options object for passing your custom settings.

```js
const modal = new Modal();
modal.init();
```

### `modal.destroy()`

Destroys and cleans up the modal instantiation. During cleanup, the following processes are run:

- Builds the modal collection by running `deregisterCollection()`
- Sets up the global event listeners by running `destroyEventListeners()`

```js
const modal = new Modal();
modal.init();
// ...
modal.destroy();
```

### `modal.initEventListeners()`

Set the document event listeners for click, touchend and keydown events.

```js
const modal = new Modal({ eventListeners: false });
modal.init();
modal.initEventListeners();
```

### `modal.destroyEventListeners()`

Remove the document event listeners for click, touchend and keydown events.

```js
const modal = new Modal();
modal.init();
// ...
modal.destroyEventListeners();
```

### `modal.register(query)`

Registers a modal into the collection. This also sets the initial state and applies missing accessibility attributes such as `role="dialog"` and `aria-modal="true"`.

**Parameters**

- `query [String | Object]` A modal ID or an HTML element of either a modal or its trigger.

**Returns**

- `Object` The modal object that got stored in the collection.

```js
const result = modal.register('modal-id');

console.log(result);
// => Object { id: 'modal-id', state: 'closed', target: HTMLElement, dialog: HTMLElement, ... }
```

### `modal.deregister(query)`

Deregister the modal from the collection. This closes the modal if it's opened, returns a modal if it has been teleported and then removes the entry from the collection.

**Parameters**

- `query [String | Object]` A modal ID or an HTML element of either a modal or its trigger.

**Returns**

- `Array` Returns the newly modified collection array.

```js
const result = modal.deregister('modal-id');

console.log(result);
// => Array [ ... ]
```

### `modal.registerCollection(items)`

Registers array of modals to the collection. All modals in array are run through the `register()` method.

**Parameters**

- `items [Array]` An array of items to register.

**Returns**

- `Array` Returns the collection array.

```js
modal.registerCollection(items);
// => Array [...]
```

### `modal.deregisterCollection()`

Deregister all modals in the collections array. All modals in collection are run through the `deregister()` method.

**Returns**

- `Array` Returns an empty collection array.

```js
modal.registerCollection();
// => Array []
```

### `modal.get(id, key)`

Used to look up a modal entry within the collection. Query should match the key type to search by: e.g. to search by target elements, pass the target html node with a key of `'target'`. Defaults to `'id'`.

**Parameters**

- `query [String | Object]` The value or object to match against within the collection.
- `key [String] (optional) (default 'id')` The property key to query.

**Returns**

- `Object | null` The collection entry if found otherwise `null`.

```js
modal.get('modal-id')
// => Object { id: 'modal-id', ... }
```

### `modal.open(id, transition)`

Opens a modal provided the modal key and returns a promise that resolves to the modal object once the transition has finished.

**Parameters**

- `id [String]` The ID of the modal to open.
- `transition [Boolean]` Whether or not to animate the transition.

**Returns**

- `Promise` The returned promise value will either be the `HTML object` of the modal that was opened, or `error` if a modal was not found.

```html
<div class="modal is-closed" data-modal="modal-key">...</div>
```

```js
// Open modal
modal.open('modal-key');

// Run some code after promise resolves
modal.open('modal-key').then((result) => {
  console.log(result);
  // => Object { id: 'modal-id', ... }
});
```

### `modal.close(id, transition)`

Closes a modal and returns a promise that resolves to the modal object once the transition has finished. Optionally disable the return focus on trigger by passing `false` as the parameter.

**Parameters**

- `id [String]` The ID of the modal to close. Will close the most recently opened modal if no ID is passed.
- `transition [Boolean]` Whether or not to animate the transition.

**Returns**

- `Promise` The returned promise value will either be the `HTML object` of the modal that was closed, or `null` if an open modal was not found.

```html
<div class="modal is-opened" data-modal="modal-key">...</div>
```

```js
// Open modal
modal.close();

// Run some code after promise resolves
modal.close().then((result) => {
  console.log(result);
  // => Object { id: 'modal-id', ... }
});
```

### `modal.replace(id, transition)`

Replaces the currently opened modal(s) with the modal of the provided ID. This should be used to trigger a modal when it's preferred for modals not to stack.

**Parameters**

- `id [String]` The ID of the modal to open. Will close all other opened modals.
- `transition [Boolean]` Whether or not to animate the transition.

**Returns**

- `Promise` The returned promise value will be an object with `opened` and `closed` properties the values being the opened modal and an array of modals that were closed.

```js
// Replace modal
modal.replace('modal-id');

// Run some code after promise resolves
modal.replace().then((result) => {
  console.log(result);
  // => Object { opened: {}, closed: [{}, {}, ...] }
});
```

### `modal.closeAll(exclude, transition)`

Closes all open modals. Will exclude a modal if provided ID is an open modal.

**Parameters**

- `exclude [String]` The ID of the modal to exclude from closing. Will close all other opened modals.
- `transition [Boolean]` Whether or not to animate the transition.

**Returns**

- `Promise` The returned promise value will be an array of all modals that got closed.

```js
modal.closeAll().then((result) => {
  console.log(result);
  // => Array [{}, {}, ...]
});
```
