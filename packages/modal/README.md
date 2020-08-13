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

Modals are composed using classes for styling and data attributes for JavaScript functionality. To open a modal using a trigger, use a unique identifier as the values for both of their respective data attributes. Close buttons are left value-less and should be placed inside the modal element they're meant to close.

- `data-modal="[unique-id]"`
- `data-modal-dialog`
- `data-modal-open="[unique-id]"`
- `data-modal-close`

```html
<!-- Modal trigger -->
<button data-modal-open="[unique-id]">Modal</button>

<!-- Modal -->
<div data-modal="[unique-id]" class="modal">
  <div data-modal-dialog class="modal__dialog">
    <button data-modal-close>Close</button>
    ...
  </div>
</div>
```

Modal dialogs are the actual dialog element within a modal and are defined using a the value-less `data-modal-dialog` attribute. The [dialog component](https://github.com/sebnitu/vrembem/tree/master/packages/dialog) is a great fit for composing a modal’s dialog.

```html
<div data-modal="[unique-id]" class="modal">
  <div data-modal-dialog class="modal__dialog dialog">
    <div class="dialog__header">
      ...
    </div>
    <div class="dialog__body">
      ...
    </div>
    <div class="dialog__footer">
      ...
    </div>
  </div>
</div>
```

#### `data-modal-focus`

By default, the modal dialog gains focus when a modal is opened. If focus on a specific element inside a modal is preferred, give that element the `data-modal-focus` attribute. Focus is returned to the element that activated the modal once the modal is closed.

```html
<!-- Focus is returned to the trigger when a modal is closed -->
<button data-modal-open="[unique-id]">...</button>

<!-- Sets focus to modal dialog when opened -->
<div data-modal="[unique-id]" class="modal">
  <div data-modal-dialog class="modal__dialog">
    ...
  </div>
</div>

<!-- Sets focus to data-modal-focus element when opened -->
<div data-modal="[unique-id]" class="modal">
  <div data-modal-dialog class="modal__dialog">
    <input data-modal-focus type="text">
    ...
  </div>
</div>
```

While a modal is active, the contents obscured by the modal should be inaccessible to all users. This means that the `TAB` key, and a screen reader’s virtual cursor (arrow keys) should not be allowed to leave the modal dialog and traverse the content outside of the dialog.

#### `data-modal-required`

Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close a required modal is disabled. Add the `data-modal-required` data attribute to a modal to enable this behavior and make sure to provide an action inside the modal that closes it.

```html
<div data-modal="[unique-id]" data-modal-required class="modal">
  <div data-modal-dialog class="modal__dialog">
    ...
    <button data-modal-close>Agree</button>
  </div>
</div>
```

## Behavior and Accessibility

Modals on the web have an expected set of patterns that this component follows. Here's what to expect:

1. When a modal is opened, focus is moved to the dialog or an element inside.
2. Modals provide standard methods for the user to close such as using the `esc` key or clicking outside the dialog.
3. While the modal is active, contents obscured by the modal are inaccessible to all users.
4. When a modal is closed, focus is returned to the initial trigger element that activated the dialog.

To take full advantage of modal's accessibility features, it's recommened to that you set the `selectorMain` option to all elements that are ouside the modal. If you have modal markup throughout your document, use the `moveModals` option or `moveModals()` method to consolidate all modals in the DOM to a single location. All elements that match the `selectorMain` selector will be given the `inert` attribute as well as `aria-hidden="true"` when a modal is opened.

> Inert is not currently widly supportted by all browsers. Consider using a polyfill such as [wicg-inert](https://github.com/WICG/inert) or Google's [inert-polyfill](https://github.com/GoogleChrome/inert-polyfill).

### Example

Here's an example where we want the `[role="main"]` content area to be inaccessible while modals are open. We also want for all modals to be moved outside the main content element in the DOM.

```js
const modal = new Modal({
  autoInit: true,
  selectorMain: '[role="main"]',
  moveModals: {
    selector: '[role="main"]',
    location: 'after'
  }
});
```

## Modifiers

### `modal_full`

Adds styles to a modal that make it fill the entire viewport when opened.

```html
<div data-modal="[unique-id]" class="modal modal_full">...</div>
```

### `modal_pos_[key]`

The default position of modals is in the center of the viewport. The position modifier allows you four other options:

- `modal_pos_top`
- `modal_pos_left`
- `modal_pos_right`
- `modal_pos_bottom`

```html
<div data-modal="[unique-id]" class="modal modal_pos_top">...</div>
<div data-modal="[unique-id]" class="modal modal_pos_bottom">...</div>
<div data-modal="[unique-id]" class="modal modal_pos_left">...</div>
<div data-modal="[unique-id]" class="modal modal_pos_right">...</div>
```

### `modal_size_[key]`

Adjusts the size of modals. This modifier provides two options, `modal_size_sm` and `modal_size_lg` all relative to the default modal size.

```html
<div data-modal="[unique-id]" class="modal modal_size_sm">...</div>
<div data-modal="[unique-id]" class="modal modal_size_lg">...</div>
```

## Customization

### Sass Variables

| Variable                      | Default                            | Description                                                               |
| ----------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| `$prefix-block`               | `null`                             | String to prefix blocks with.                                             |
| `$prefix-element`             | `"__"`                             | String to prefix element with.                                            |
| `$prefix-modifier`            | `"_"`                              | String to prefix modifier with.                                           |
| `$prefix-modifier-value`      | `"_"`                              | String to prefix modifier values with.                                    |
| `$zindex`                     | `1000`                             | Applied z-index to modals to control the stack order.                     |
| `$width`                      | `38em`                             | The default max width of modals.                                          |
| `$width-sm`                   | `18em`                             | The small width applied to modals with `_size_sm` modifier.               |
| `$width-lg`                   | `56em`                             | The large width applied to modals with `_size_lg` modifier.               |
| `$travel`                     | `5em`                              | Distance that modal travel during their transition.                       |
| `$transition-duration`        | `core.$transition-duration`        | Duration of modal transition.                                             |
| `$transition-timing-function` | `core.$transition-timing-function` | Timing function used for modal transitions.                               |
| `$background`                 | `core.$night`                      | Background color of modal screen.                                         |
| `$background-alpha`           | `0.8`                              | The alpha channel for the modal screen.                                   |
| `$box-shadow`                 | `core.$box-shadow-24dp`            | Box shadow applied to modal dialog elements.                              |
| `$aside-width`                | `16em`                             | Width applied to modals using `_pos_left` and `_pos_right` modifiers.     |
| `$aside-max-width`            | `90%`                              | Max width applied to modals using `_pos_left` and `_pos_right` modifiers. |

### JavaScript Options

| Key                 | Default                              | Description                                                                                                                                            |
| ------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `autoInit`          | `false`                              | Automatically instantiates the instance.                                                                                                               |
| `dataModal`         | `'modal'`                            | Data attribute for a modal.                                                                                                                            |
| `dataDialog`        | `'modal-dialog'`                     | Data attribute for a modal. dialog                                                                                                                     |
| `dataOpen`          | `'modal-open'`                       | Data attribute for a modal open trigger.                                                                                                               |
| `dataClose`         | `'modal-close'`                      | Data attribute for a modal close trigger.                                                                                                              |
| `dataFocus`         | `'modal-focus'`                      | Data attribute for setting a modal's focus element.                                                                                                    |
| `dataRequired`      | `'modal-required'`                   | Data attribute for making a modal required.                                                                                                            |
| `stateOpened`       | `'is-opened'`                        | Class used for open state.                                                                                                                             |
| `stateOpening`      | `'is-opening'`                       | Class used for transitioning to open state.                                                                                                            |
| `stateClosing`      | `'is-closing'`                       | Class used for transitioning to closed state.                                                                                                          |
| `stateClosed`       | `'is-closed'`                        | Class used for closed state.                                                                                                                           |
| `selectorInert`     | `null`                               | Applies `inert` and `aria-hidden` attributes to all matching elements when a modal is opened.                                                          |
| `selectorOverflow`  | `'body'`                             | Applies `overflow:hidden` styles on all matching elements when a modal is opened.                                                                      |
| `customEventPrefix` | `'modal:'`                           | Prefix to be used on custom events.                                                                                                                    |
| `moveModals`        | `{ selector: null, location: null }` | Moves all modals to a location in the DOM relative to the passed selector on init. Location options include `after`, `before`, `append` and `prepend`. |
| `setTabindex`       | `true`                               | Whether or not to set `tabindex="-1"` on all modal dialog elements on init.                                                                            |
| `transition`        | `true`                               | Toggle the transition animation for the modal. Set to `false` to disable.                                                                              |

## Events

- `modal:opened` Emits when the modal has opened.
- `modal:closed` Emits when the modal has closed.

## API

### `modal.init()`

Initializes the modal instance. During initialization, the following processes are run:

- Sets the initial state of modals. This is important as modals can only be opened if their current state is closed.
- Sets `tabindex="-1"` on all modal dialog elements if `setTabindex` is set to `true`.
- Moves all modals in the DOM to a location specified in the `moveModals` option.
- Adds the `click` event listener to the document.
- Adds the `keyup` event listener for closing modals with the `esc` key.

```js
const modal = new Modal();
modal.init();
```

### `modal.destroy()`

Destroys and cleans up the modal instantiation. During cleanup, the following processes are run:

- Clears the stored `modal.memory` object.
- Removes the `click` event listener from the document.
- Removes the `keyup` event listener from the document.

```js
const modal = new Modal();
modal.init();
// ...
modal.destroy();
```

### `modal.open(key)`

Opens a modal provided the modal key and returns a promise that resolves to the modal object once the transition has finished.

**Parameters**

- `key [String]` A unique key that matches the value of a modal `data-modal` attribute.

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
});
```

### `modal.close(returnFocus)`

Closes a modal and returns a promise that resolves to the modal object once the transition has finished. Optionally disable the return focus on trigger by passing `false` as the parameter.

**Parameters**

- `returnFocus [Boolean]` Whether or not to return focus on trigger once closed. Defaults to `true`. Helpful when opening a modal from another modal and you want to hold on to the initial activating trigger for later focus.

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
  console.log(result); // result = HTML Object || null
});
```

### `modal.setInitialState()`

Sets the initial state of all modals. This includes removing all transitional classes, opened states and applies the closed state class. This is ran automatically on `modal.init()` but is exposed if states need to be reset for some reason.

```html
<!-- Missing a state class... -->
<div data-modal="[unique-id]" class="modal">...</div>

<!-- Opened state... -->
<div data-modal="[unique-id]" class="modal is-opened">...</div>

<!-- Transitioning state... -->
<div data-modal="[unique-id]" class="modal is-opening">...</div>
<div data-modal="[unique-id]" class="modal is-closing">...</div>
```
```js
modal.setInitialState();
```
```html
<!-- Output -->
<div data-modal="[unique-id]" class="modal is-closed"></div>
<div data-modal="[unique-id]" class="modal is-closed"></div>
<div data-modal="[unique-id]" class="modal is-closed"></div>
<div data-modal="[unique-id]" class="modal is-closed"></div>
```

### `modal.setTabindex()`

Sets the `tabindex="-1"` attribute on all modal dialogs. This makes it possible to set focus on the dialog when opened but won't allow users to focus it using the keyboard. This is ran automatically on `modal.init()` if the `setTabindex` option is set to `true`.

```html
<!-- Initial HTML -->
<div data-modal="[unique-id]" class="modal">
  <div data-modal-dialog class="modal__dialog">
    ...
  </div>
</div>
```

```js
modal.setTabindex();
```

```html
<!-- Result -->
<div data-modal="[unique-id]" class="modal">
  <div data-modal-dialog class="modal__dialog" tabindex="-1">
    ...
  </div>
</div>
```

### `modal.moveModals(selector, location)`

Moves all modals to a location in the DOM relative to the passed selector and location reference.

**Parameters**

- `selector [String]` The selector that modals should be moved relative to.
- `location [String]` The location to move modals relative to the selector. Options include `after`, `before`, `append` and `prepend`.

```html
<!-- Initial HTML -->
<div class="main">
  <div data-modal="[unique-id]">...</div>
</div>
```

```js
modal.moveModals('.main', 'after');
```

```html
<!-- Result -->
<div class="main"></div>
<div data-modal="[unique-id]">...</div>
```
