# Modal

A component for changing the mode of a page to complete a critical task. This is usually used in conjunction with the dialog component to make modal dialogs.

[![npm version](https://img.shields.io/npm/v/%40vrembem%2Fmodal.svg)](https://www.npmjs.com/package/%40vrembem%2Fmodal)

[Documentation](https://vrembem.com/packages/modal)

## Installation

```
npm install @vrembem/modal
```

### Styles

```scss
@use "@vrembem/modal";
```

### JavaScript

```js
import { Modal } from '@vrembem/modal';
const modal = new Modal({ autoInit: true });
```

### Markup

Modals are composed using classes for styling and data attributes for JavaScript functionality. To open a modal using a trigger, use a unique identifier as the values for both of their respective data attributes. Close buttons are left value-less and should be placed inside the modal element they're meant to close.

- `data-modal="[unique-id]"`
- `data-modal-open="[unique-id]"`
- `data-modal-close`

```html
<button data-modal-open="[unique-id]">Modal</button>
<div class="modal" data-modal="[unique-id]">
  <div class="modal__dialog">
    <button data-modal-close>Close</button>
    ...
  </div>
</div>
```

The [dialog component](https://github.com/sebnitu/vrembem/tree/master/packages/dialog) is a great fit for composing a modal’s content.

```html
<div class="modal" data-modal="[unique-id]">
  <div class="modal__dialog dialog">
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

If a modal has the attribute `tabindex="-1"`, it will be given focus when it's opened. If focus on a specific element inside a modal is preferred, give it the `data-modal-focus` attribute. The focus in either case is returned to the trigger element once the modal is closed. Focus handling can be disabled using the `{ focus: false }` setting.

```html
<!-- Focus is returned when modal is closed -->
<button class="link" data-modal-open="[unique-id]">
  Open modal
</button>

<!-- Sets focus to self when opened -->
<div class="modal" data-modal="[unique-id]" tabindex="-1">
  <div class="modal__dialog">
    <button data-modal-close>Close</button>
  </div>
</div>

<!-- Sets focus to input element when opened -->
<div class="modal" data-modal="[unique-id]">
  <div class="modal__dialog">
    <input class="input" data-modal-focus />
  </div>
</div>
```

#### `data-modal-required`

Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close is disabled. Add the `data-modal-required` data attribute to a modal to enable this behavior.

```html
<div class="modal" data-modal="[unique-id]" data-modal-required>
  <div class="modal__dialog">
    ...
  </div>
</div>
```

## Modifiers

### `modal_full`

Adds styles to a modal that make it fill the entire viewport when opened.

```html
<div class="modal modal_full" data-modal="[unique-id]">...</div>
```

### `modal_pos_[key]`

The default position of modals is in the center of the viewport. The position modifier allows you four other options:

- `modal_pos_top`
- `modal_pos_left`
- `modal_pos_right`
- `modal_pos_bottom`

```html
<div class="modal modal_pos_top" data-modal="[unique-id]">...</div>
<div class="modal modal_pos_bottom" data-modal="[unique-id]">...</div>
<div class="modal modal_pos_left" data-modal="[unique-id]">...</div>
<div class="modal modal_pos_right" data-modal="[unique-id]">...</div>
```

### `modal_size_[key]`

Adjusts the size of modals. This modifier provides two options, `modal_size_sm` and `modal_size_lg` all relative to the default modal size.

```html
<div class="modal modal_size_sm" data-modal="[unique-id]">...</div>
<div class="modal modal_size_lg" data-modal="[unique-id]">...</div>
```

## Customization

### Sass Variables

Variable | Default | Description
---|---|---
`$prefix-block` | `null` | String to prefix blocks with.
`$prefix-element` | `"__"` | String to prefix element with.
`$prefix-modifier` | `"_"` | String to prefix modifier with.
`$prefix-modifier-value` | `"_"` | String to prefix modifier values with.
`$zindex` | `1000` | Applied z-index to modals to control the stack order.
`$width` | `38em` | The default max width of modals.
`$width-sm` | `18em` | The small width applied to modals with `_size_sm` modifier.
`$width-lg` | `56em` | The large width applied to modals with `_size_lg` modifier.
`$travel` | `5em` | Distance that modal travel during their transition.
`$transition-duration` | `0.3s` | Duration of modal transition.
`$transition-timing-function` | `cubic-bezier(0.4, 0, 0.2, 1)` | Timing function used for modal transitions.
`$background` | `#424242` | Background color of modal screen.
`$background-alpha` | `0.8` | The alpha channel for the modal screen.
`$box-shadow` | See: `core.$box-shadow-24dp` | Box shadow applied to modal dialog elements.
`$aside-width` | `16em` | Width applied to modals using `_pos_left` and `_pos_right` modifiers.
`$aside-max-width` | `90%` | Max width applied to modals using `_pos_left` and `_pos_right` modifiers.

### JavaScript Options

Key | Default | Description
---|---|---
`autoInit` | `false` | Automatically instantiates the instance.
`dataModal` | `'modal'` | Data attribute for a modal.
`dataOpen` | `'modal-open'` | Data attribute for a modal open trigger.
`dataClose` | `'modal-close'` | Data attribute for a modal close trigger.
`dataFocus` | `'modal-focus'` | Data attribute for setting a modal's focus element.
`dataRequired` | `'modal-required'` | Data attribute for making a modal required.
`stateOpened` | `'is-opened'` | Class used for open state.
`stateOpening` | `'is-opening'` | Class used for transitioning to open state.
`stateClosing` | `'is-closing'` | Class used for transitioning to closed state.
`stateClosed` | `'is-closed'` | Class used for closed state.
`customEventPrefix` | `'modal:'` | Prefix to be used on custom events.
`focus` | `true` | Toggles the focus handling feature.
`toggleOverflow` | `'body'` |  Toggle `overflow:hidden` on all matching elements provided by the CSS selector. Set to [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) to disable.
`transition` | `true` | Toggle the transition animation for the modal. Set to `false` to disable.

## Events

- `modal:opened` Emits when the modal has opened.
- `modal:closed` Emits when the modal has closed.

## API

### `modal.init()`

Initializes the modal instance.

```js
const modal = new Modal();
modal.init();
```

### `drawer.destroy()`

Destroys and cleans up the modal instantiation.

```js
const modal = new Modal();
modal.init();
// ...
modal.destroy();
```

### `modal.open(key, callback)`

Opens a modal provided the modal key and optional callback.

**Parameters**

- `key [String]` A unique key that matches the value of a modal `data-modal` attribute.
- `callback [Function]` (optional) A callback function to be run after the open process is completed.

```html
<div class="modal is-closed" data-modal="modal-key">...</div>
```

```js
modal.open('modal-key', () => {
  // Your custom code here...
});
```

### `modal.close(returnFocus, callback)`

Closes a modal and returns focus to trigger element with optional callback.

**Parameters**

- `returnFocus [Boolean]` Whether or not to return focus on trigger once closed. Defaults to `true`.
- `callback [Function]` (optional) A callback function to be run after the close process is completed.

```html
<div class="modal is-opened" data-modal="modal-key">...</div>
```

```js
modal.close(true, () => {
  // Your custom code here...
});
```
