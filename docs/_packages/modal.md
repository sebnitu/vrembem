---
layout: article
title: Modal
description: "A component for changing the mode of a page to complete a critical task. This is usually used in conjunction with the dialog component to make modal dialogs."
package: "@vrembem/modal"
category: compound
usage:
  npm: true
  scss: true
  js: true
---

## Modal

Modals are composed using classes for styling and data attributes for JavaScript functionality. To open a modal using a trigger, use a unique identifier as the values for both of their respective data attributes. Close buttons are left value-less and should be placed inside the modal element they're meant to close.

- `data-modal="[unique-id]"`
- `data-modal-dialog`
- `data-modal-open="[unique-id]"`
- `data-modal-close`

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-default">Modal</button>
<div data-modal="modal-default" class="modal">
  <div data-modal-dialog class="modal__dialog dialog">
    <div class="dialog__body level flex-justify-between">
      <p>This is a basic modal</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
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
{% include demo_close.html %}

Modal dialogs are the actual dialog element within a modal and are defined using a the value-less `data-modal-dialog` attribute. The [dialog component](https://github.com/sebnitu/vrembem/tree/master/packages/dialog) is a great fit for composing a modal’s dialog.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<button data-modal-open="modal-dialog" class="link">Modal dialog</button>
<div data-modal="modal-dialog" class="modal">
  <div data-modal-dialog class="modal__dialog dialog">
    <div class="dialog__header">
      <h2 class="dialog__title">Modal Dialog</h2>
      <button class="icon-action" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
    </div>
    <div class="dialog__body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta diam eget lectus interdum, eu aliquet augue rutrum. Morbi faucibus mauris lectus, in imperdiet augue cursus vel.</p>
    </div>
    <div class="dialog__footer flex-justify-end">
      <div class="button-group">
        <button data-modal-close class="button button_color_primary">
          Some action
        </button>
        <button data-modal-close class="button">
          Close
        </button>
      </div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
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
{% include demo_close.html %}

## data-modal-focus

By default, the modal dialog gains focus when a modal is opened. If focus on a specific element inside a modal is preferred, give that element the `data-modal-focus` attribute. Focus is returned to the element that activated the modal once the modal is closed.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<div class="level">
  <button data-modal-open="modal-focus-dialog" class="link">
    Modal focus dialog
  </button>
  <button data-modal-open="modal-focus-inner" class="link">
    Modal focus element
  </button>
</div>

<div data-modal="modal-focus-dialog" class="modal">
  <div data-modal-dialog class="modal__dialog dialog">
    <div class="dialog__body level flex-justify-between">
      <p>Focus modal dialog on open</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>

<div data-modal="modal-focus-inner" class="modal">
  <div data-modal-dialog class="modal__dialog dialog">
    <div class="dialog__body">
      <div class="level flex-justify-between margin-bottom-md">
        <p>Focus input element on open</p>
        <button data-modal-close class="link">Close</button>
      </div>
      <input data-modal-focus type="text" class="input" placeholder="Text input...">
    </div>
  </div>
</div>
{% include demo_switch.html %}
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
{% include demo_close.html %}

While a modal is active, the contents obscured by the modal should be inaccessible to all users. This means that the `TAB` key, and a screen reader’s virtual cursor (arrow keys) should not be allowed to leave the modal dialog and traverse the content outside of the dialog.

## data-modal-required

Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close a required modal is disabled. Add the `data-modal-required` data attribute to a modal to enable this behavior and make sure to provide an action inside the modal that closes it.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<button data-modal-open="modal-required" class="link">Modal required</button>
<div data-modal="modal-required" data-modal-required class="modal">
  <div class="modal__dialog dialog">
    <div class="dialog__body gap">
      <h2 class="dialog__title">Required modal</h2>
      <p>Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close is disabled.</p>
      <div class="flex flex-justify-end">
        <div class="button-group">
          <button data-modal-close class="button button_color_primary">I undersand</button>
          <button data-modal-close class="button button_color_secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div data-modal="[unique-id]" data-modal-required class="modal">
  <div data-modal-dialog class="modal__dialog">
    ...
    <button data-modal-close>Agree</button>
  </div>
</div>
```
{% include demo_close.html %}

## Behavior and Accessibility

Modals on the web have an expected set of patterns that this component follows. Here's what to expect:

1. When a modal is opened, focus is moved to the dialog or an element inside.
2. Modals provide standard methods for the user to close such as using the `esc` key or clicking outside the dialog.
3. While the modal is active, contents obscured by the modal are inaccessible to all users.
4. When a modal is closed, focus is returned to the initial trigger element that activated the dialog.

To take full advantage of modal's accessibility features, it's recommened to that you set the `selectorInert` option to all elements that are ouside the modal. If you have modal markup throughout your document, use the `moveModals` option or `moveModals()` method to consolidate all modals in the DOM to a single location. All elements that match the `selectorInert` selector will be given the `inert` attribute as well as `aria-hidden="true"` when a modal is opened.

> Inert is not currently widly supportted by all browsers. Consider using a polyfill such as [wicg-inert](https://github.com/WICG/inert) or Google's [inert-polyfill](https://github.com/GoogleChrome/inert-polyfill).

### Example

Here's an example where we want the `[role="main"]` content area to be inaccessible while modals are open. We also want for all modals to be moved outside the main content element in the DOM.

```js
const modal = new Modal({
  autoInit: true,
  selectorInert: '[role="main"]',
  moveModals: {
    type: 'after',
    ref: '[role="main"]'
  }
});
```

## modal_full

Adds styles to a modal that make it fill the entire viewport when opened.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<button data-modal-open="modal-full" class="link">Modal</button>
<div data-modal="modal-full" class="modal modal_full">
  <div data-modal-dialog class="modal__dialog dialog">
    <div class="dialog__body">
      <div class="level flex-justify-between">
        <p>Full modal</p>
        <button data-modal-close data-modal-focus class="link">Close</button>
      </div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div data-modal="[unique-id]" class="modal modal_full">...</div>
```
{% include demo_close.html %}

## modal_pos_[value]

The default position of modals is in the center of the viewport. The position modifier allows you four other options:

- `modal_pos_top`
- `modal_pos_left`
- `modal_pos_right`
- `modal_pos_bottom`

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<div class="level">
  <button data-modal-open="modal-pos-top" class="link">
    &uarr; Modal top
  </button>
  <button data-modal-open="modal-pos-bottom" class="link">
    &darr; Modal bottom
  </button>
  <button data-modal-open="modal-pos-left" class="link">
    &larr; Modal left
  </button>
  <button data-modal-open="modal-pos-right" class="link">
    &rarr; Modal right
  </button>
</div>

<div data-modal="modal-pos-top" class="modal modal_pos_top">
  <div data-modal-dialog class="modal__dialog dialog">
    <button data-modal-close class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>Top position modal</p>
    </div>
    <div class="dialog__footer flex-justify-between">
      <button data-modal-open="modal-pos-left" class="link">
        &larr; Left modal
      </button>
      <button data-modal-open="modal-pos-bottom" class="link">
        &darr; Bottom modal
      </button>
      <button data-modal-open="modal-pos-right" class="link">
        &rarr; Right modal
      </button>
    </div>
  </div>
</div>

<div data-modal="modal-pos-bottom" class="modal modal_pos_bottom">
  <div data-modal-dialog class="modal__dialog dialog">
    <button data-modal-close class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>Bottom position modal</p>
    </div>
    <div class="dialog__footer flex-justify-between">
      <button data-modal-open="modal-pos-left" class="link">
        &larr; Left modal
      </button>
      <button data-modal-open="modal-pos-top" class="link">
        &uarr; Top modal
      </button>
      <button data-modal-open="modal-pos-right" class="link">
        &rarr; Right modal
      </button>
    </div>
  </div>
</div>

<div data-modal="modal-pos-left" class="modal modal_pos_left">
  <div data-modal-dialog class="modal__dialog dialog">
    <button data-modal-close class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>Left position modal</p>
    </div>
    <div class="dialog__footer">
      <button data-modal-open="modal-pos-top" class="link">
        &uarr; Top modal
      </button>
    </div>
    <div class="dialog__footer">
      <button data-modal-open="modal-pos-right" class="link">
        &rarr; Right modal
      </button>
    </div>
    <div class="dialog__footer">
      <button data-modal-open="modal-pos-bottom" class="link">
        &darr; Bottom modal
      </button>
    </div>
  </div>
</div>

<div data-modal="modal-pos-right" class="modal modal_pos_right">
  <div data-modal-dialog class="modal__dialog dialog">
    <button data-modal-close class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>Right position modal</p>
    </div>
    <div class="dialog__footer">
      <button data-modal-open="modal-pos-top" class="link">
        &uarr; Top modal
      </button>
    </div>
    <div class="dialog__footer">
      <button data-modal-open="modal-pos-left" class="link">
        &larr; Left modal
      </button>
    </div>
    <div class="dialog__footer">
      <button data-modal-open="modal-pos-bottom" class="link">
        &darr; Bottom modal
      </button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div data-modal="[unique-id]" class="modal modal_pos_top">...</div>
<div data-modal="[unique-id]" class="modal modal_pos_bottom">...</div>
<div data-modal="[unique-id]" class="modal modal_pos_left">...</div>
<div data-modal="[unique-id]" class="modal modal_pos_right">...</div>
```
{% include demo_close.html %}

## modal_size_[value]

Adjusts the size of modals. This modifier provides two options, `modal_size_sm` and `modal_size_lg` all relative to the default modal size.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<div class="level">
  <button data-modal-open="modal-size-sm" class="link">Small modal</button>
  <button data-modal-open="modal-size-lg" class="link">Large modal</button>
</div>

<div data-modal="modal-size-sm" class="modal modal_size_sm">
  <div data-modal-dialog class="modal__dialog dialog">
    <div class="dialog__body level flex-justify-between">
      <p>Small modal</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>

<div data-modal="modal-size-lg" class="modal modal_size_lg">
  <div data-modal-dialog class="modal__dialog dialog">
    <div class="dialog__body level flex-justify-between">
      <p>Large modal</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div data-modal="[unique-id]" class="modal modal_size_sm">...</div>
<div data-modal="[unique-id]" class="modal modal_size_lg">...</div>
```
{% include demo_close.html %}

## Sass variables

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-block</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifier values with.</td>
      </tr>

      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$zindex</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1000</code></td>
        <td data-mobile-label="Desc">Applied z-index to modals to control the stack order.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">38em</code></td>
        <td data-mobile-label="Desc">The default max width of modals.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$width-sm</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">18em</code></td>
        <td data-mobile-label="Desc">The small width applied to modals with <code class="code">_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$width-lg</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">56em</code></td>
        <td data-mobile-label="Desc">The large width applied to modals with <code class="code">_size_lg</code> modifier.</td>
      </tr>

      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$travel</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">5em</code></td>
        <td data-mobile-label="Desc">Distance that modal travel during their transition.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-duration</code></td>
        <td data-mobile-label="Desc">Duration of modal transition.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-timing-function</code></td>
        <td data-mobile-label="Desc">Timing function used for modal transitions.</td>
      </tr>

      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$night</code></td>
        <td data-mobile-label="Desc">Background color of modal screen.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-alpha</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.8</code></td>
        <td data-mobile-label="Desc">The alpha channel for the modal screen.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$box-shadow-24dp</code></td>
        <td data-mobile-label="Desc">Box shadow applied to modal dialog elements.</td>
      </tr>

      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$aside-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">16em</code></td>
        <td data-mobile-label="Desc">Width applied to modals using <code class="code">_pos_left</code> and <code class="code">_pos_right</code> modifiers.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$aside-max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">90%</code></td>
        <td data-mobile-label="Desc">Max width applied to modals using <code class="code">_pos_left</code> and <code class="code">_pos_right</code> modifiers.</td>
      </tr>

    </tbody>
  </table>
</div>

## JavaScript Options

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Key</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">autoInit</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">false</code></td>
        <td data-mobile-label="Desc">Automatically initializes the instance.</td>
      </tr>

      <!-- Data attributes -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataModal</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal'</code></td>
        <td data-mobile-label="Desc">Data attribute for a modal.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataDialog</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal-dialog'</code></td>
        <td data-mobile-label="Desc">Data attribute for a modal dialog.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataOpen</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal-open'</code></td>
        <td data-mobile-label="Desc">Data attribute for a modal open trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataClose</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal-close'</code></td>
        <td data-mobile-label="Desc">Data attribute for a modal close trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataFocus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal-focus'</code></td>
        <td data-mobile-label="Desc">Data attribute for setting a modal's focus element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataRequired</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal-required'</code></td>
        <td data-mobile-label="Desc">Data attribute for making a modal required.</td>
      </tr>
    </tbody>

    <!-- State classes -->
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateOpened</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'is-opened'</code></td>
      <td data-mobile-label="Desc">Class used for open state.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateOpening</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'is-opening'</code></td>
      <td data-mobile-label="Desc">Class used for transitioning to open state.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateClosing</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'is-closing'</code></td>
      <td data-mobile-label="Desc">Class used for transitioning to closed state.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">stateClosed</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'is-closed'</code></td>
      <td data-mobile-label="Desc">Class used for closed state.</td>
    </tr>

    <!-- Selectors -->
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">selectorInert</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
      <td data-mobile-label="Desc">Applies <code class="code">inert</code> and <code class="code">aria-hidden</code> attributes to all matching elements when a modal is opened.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">selectorOverflow</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'body'</code></td>
      <td data-mobile-label="Desc">Applies <code class="code">overflow:hidden</code> styles on all matching elements when a modal is opened.</td>
    </tr>

    <!-- Feature toggles -->
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">customEventPrefix</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal:'</code></td>
      <td data-mobile-label="Desc">Prefix to be used on custom events.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">moveModals</code></td>
      <td data-mobile-label="Default">
        <pre class="code color-secondary">{
  type: null,
  ref: null
}</pre>
      </td>
      <td data-mobile-label="Desc">Moves all modals to a location in the DOM relative to the passed reference selector on <code class="code">init()</code>. Move type options include <code class="code">after</code>, <code class="code">before</code>, <code class="code">append</code> and <code class="code">prepend</code>.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">setTabindex</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
      <td data-mobile-label="Desc">Whether or not to set <code class="code">tabindex="-1"</code> on all modal dialog elements on init.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">transition</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
      <td data-mobile-label="Desc">Toggle the transition animation for the modal. Set to <code class="code">false</code> to disable.</td>
    </tr>
  </table>
</div>

## Events

* `modal:opened` Emits when the modal has opened.
* `modal:closed` Emits when the modal has closed.

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

### `modal.getModal(key)`

Returns a modal that matches the provided unique modal key.

**Parameters**

- `key [String]` A unique key that matches the value of a modal `data-modal` attribute.

**Returns**

- `HTML object` The matching modal element.


```html
<div class="modal is-closed" data-modal="modal-key">...</div>
```

```js
const el = modal.getModal('modal-key');

// Returns HTML Element Object
console.log(el);
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

### `modal.moveModals(type, ref)`

Moves all modals to a location in the DOM relative to the passed selector and location reference.

**Parameters**

- `type [String]` The move type to move modals relative to the reference selector. Options include `after`, `before`, `append` and `prepend`.
- `ref [String]` The reference selector that modals should be moved relative to.

```html
<!-- Initial HTML -->
<div class="main">
  <div data-modal="[unique-id]">...</div>
</div>
```

```js
modal.moveModals('after', '.main');
```

```html
<!-- Result -->
<div class="main"></div>
<div data-modal="[unique-id]">...</div>
```
