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

Modals are composed using classes and data attributes for their triggers. The basic structure of a modal is an element with an `id` and the `modal` class containing a child element with the `modal__dialog` class. There are three types of modal triggers, each defined by a data attribute:

- `data-modal-open`: Opens a modal. Should take the id of the modal it's meant to open. Will stack modals if triggered from inside an already opened modal.
- `data-modal-close`: Closes a modal. Will close the last opened modal if left value-less. Can also take a modal id to close a specific modal, or `"*"` to close all open modals.
- `data-modal-replace`: Replaces currently opened modal(s) with the modal of the id provided.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-default">Modal</button>
<div id="modal-default" class="modal">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <div class="dialog__body level flex-justify-between">
      <p>This is a basic modal</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<button data-modal-open="modal-id">...</button>

<div id="modal-id" class="modal">
  <div class="modal__dialog" role="dialog" aria-modal="true">
    <button data-modal-close>...</button>
    ...
  </div>
</div>
```
{% include demo_close.html %}

The dialog element of a modal is defined using the `modal__dialog` class. Modal dialogs should also be given the `role` attribute with a value of either [`dialog`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role) or [`alertdialog`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role) and the `aria-modal` attribute with a value of `true`. Authors should provide modal dialogs with [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) and [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) attributes if applicable to further improve accessibility.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-dialog">Modal dialog</button>
<div id="modal-dialog" class="modal">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true" aria-labelledby="modal-dialog-title" aria-describedby="modal-dialog-description">
    <div class="dialog__header">
      <h2 id="modal-dialog-title" class="dialog__title">Modal Dialog</h2>
      <button class="icon-action" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
    </div>
    <div class="dialog__body">
      <p id="modal-dialog-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta diam eget lectus interdum, eu aliquet augue rutrum. Morbi faucibus mauris lectus, in imperdiet augue cursus vel.</p>
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
{% include demo_close.html %}

> The [dialog component](https://github.com/sebnitu/vrembem/tree/main/packages/dialog) is a great fit for composing a modal’s dialog.

## Focus Management

Modal dialogs are given focus when opened as long as the `setTabindex` option is set to `true` or if the modal dialog has `tabindex="-1"` set manually. If focus on a specific element inside a modal is preferred, give that element the `data-focus` attribute. Focus is returned to the element that initially triggered the modal once closed.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<div class="level">
  <button class="link" data-modal-open="modal-focus-dialog">
    Modal focus dialog
  </button>
  <button class="link" data-modal-open="modal-focus-inner">
    Modal focus element
  </button>
</div>

<div id="modal-focus-dialog" class="modal">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <div class="dialog__body level flex-justify-between">
      <p>Focus modal dialog on open</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>

<div id="modal-focus-inner" class="modal">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <div class="dialog__body">
      <div class="level flex-justify-between margin-bottom-md">
        <p>Focus input element on open</p>
        <button data-modal-close class="link">Close</button>
      </div>
      <input data-focus type="text" class="input" placeholder="Text input...">
    </div>
  </div>
</div>
{% include demo_switch.html %}
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
{% include demo_close.html %}

While a modal is active, the contents obscured by the modal are made inaccessible to all users via a focus trap. This means that the `TAB` key, and a screen reader’s virtual cursor (arrow keys) should not be allowed to leave the modal dialog and traverse the content outside of the dialog.

> To change the selector used in finding the preferred focus element, pass your own selector via the `selectorFocus` option (defaults to `'[data-focus]'`).

## Required Modals

Required modals are modals that need an explicit action to be closed. That means clicking on the background or pressing the escape key to close a required modal is disabled. Required modals are set by giving a dialog the attribute `role` with a value of `alertdialog`.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-required">Modal required</button>
<div id="modal-required" class="modal">
  <div class="modal__dialog dialog" role="alertdialog" aria-modal="true">
    <div class="dialog__body gap-y">
      <h2 class="dialog__title">Required modal</h2>
      <p>Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close is disabled.</p>
      <div class="flex flex-justify-end">
        <div class="button-group">
          <button data-modal-close class="button button_color_primary">I understand</button>
          <button data-modal-close class="button button_color_secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div id="[unique-id]" class="modal">
  <div class="modal__dialog" role="alertdialog" aria-modal="true">
    ...
    <button data-modal-close>Agree</button>
  </div>
</div>
```
{% include demo_close.html %}

> To change the selector used in creating required modals, pass your own selector via the `selectorRequired` option (defaults to `'[role="alertdialog"]'`).

## Behavior and Accessibility

Modals on the web have an expected set of patterns that this component follows. Here's what to expect:

1. When a modal is opened, focus is moved to the dialog or an element inside.
2. Modals provide standard methods for the user to close such as using the `esc` key or clicking outside the dialog.
3. While the modal is active, contents obscured by the modal are inaccessible to all users.
4. When a modal is closed, focus is returned to the initial trigger element that activated the dialog.

To take full advantage of modal's accessibility features, it's recommended to set the `selectorInert` option to all elements that are outside the modal. If you have modal markup throughout your document, use the `teleport` option to consolidate all modals in the DOM to a single location. All elements that match the `selectorInert` selector will be given the `inert` attribute as well as `aria-hidden="true"` when a modal is opened.

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

## modal_full

Adds styles to a modal that make it fill the entire viewport when opened.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-full">Modal</button>
<div id="modal-full" class="modal modal_full">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
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
<div id="[unique-id]" class="modal modal_full">...</div>
```
{% include demo_close.html %}

## modal_pos_[value]

The default position of modals is in the center of the viewport. The position modifier allows positioning a modal to the top, bottom, left and right side of the document viewport.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<div class="level">
  <button class="link" data-modal-open="modal-pos-top">
    &uarr; Modal top
  </button>
  <button class="link" data-modal-open="modal-pos-bottom">
    &darr; Modal bottom
  </button>
  <button class="link" data-modal-open="modal-pos-left">
    &larr; Modal left
  </button>
  <button class="link" data-modal-open="modal-pos-right">
    &rarr; Modal right
  </button>
</div>

<div id="modal-pos-top" class="modal modal_pos_top">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <button data-modal-close class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>Top position modal</p>
    </div>
    <div class="dialog__footer flex-justify-between">
      <button class="link" data-modal-open="modal-pos-left">
        &larr; Left modal
      </button>
      <button class="link" data-modal-open="modal-pos-bottom">
        &darr; Bottom modal
      </button>
      <button class="link" data-modal-open="modal-pos-right">
        &rarr; Right modal
      </button>
    </div>
  </div>
</div>

<div id="modal-pos-bottom" class="modal modal_pos_bottom">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <button data-modal-close class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>Bottom position modal</p>
    </div>
    <div class="dialog__footer flex-justify-between">
      <button class="link" data-modal-open="modal-pos-left">
        &larr; Left modal
      </button>
      <button class="link" data-modal-open="modal-pos-top">
        &uarr; Top modal
      </button>
      <button class="link" data-modal-open="modal-pos-right">
        &rarr; Right modal
      </button>
    </div>
  </div>
</div>

<div id="modal-pos-left" class="modal modal_pos_left">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <button data-modal-close class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>Left position modal</p>
    </div>
    <div class="dialog__footer">
      <button class="link" data-modal-open="modal-pos-top">
        &uarr; Top modal
      </button>
    </div>
    <div class="dialog__footer">
      <button class="link" data-modal-open="modal-pos-right">
        &rarr; Right modal
      </button>
    </div>
    <div class="dialog__footer">
      <button class="link" data-modal-open="modal-pos-bottom">
        &darr; Bottom modal
      </button>
    </div>
  </div>
</div>

<div id="modal-pos-right" class="modal modal_pos_right">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <button data-modal-close class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>Right position modal</p>
    </div>
    <div class="dialog__footer">
      <button class="link" data-modal-open="modal-pos-top">
        &uarr; Top modal
      </button>
    </div>
    <div class="dialog__footer">
      <button class="link" data-modal-open="modal-pos-left">
        &larr; Left modal
      </button>
    </div>
    <div class="dialog__footer">
      <button class="link" data-modal-open="modal-pos-bottom">
        &darr; Bottom modal
      </button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div id="[unique-id]" class="modal modal_pos_top">...</div>
<div id="[unique-id]" class="modal modal_pos_bottom">...</div>
<div id="[unique-id]" class="modal modal_pos_left">...</div>
<div id="[unique-id]" class="modal modal_pos_right">...</div>
```
{% include demo_close.html %}

### Available Variations

- `modal_pos_top`
- `modal_pos_left`
- `modal_pos_right`
- `modal_pos_bottom`

## modal_size_[key]

Adjusts the size of modals. This modifier provides five options that get built using the [`$size-scale`](#size-scale) variable map.

{% include demo_open.html class_grid="grid_stack" class_parent="padding border radius" %}
<div class="level">
  <button class="link" data-modal-open="modal-size-xs">Extra small modal</button>
  <button class="link" data-modal-open="modal-size-sm">Small modal</button>
  <button class="link" data-modal-open="modal-size-md">Medium modal</button>
  <button class="link" data-modal-open="modal-size-lg">Large modal</button>
  <button class="link" data-modal-open="modal-size-xl">Extra large modal</button>
</div>

<div id="modal-size-xs" class="modal modal_size_xs">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <div class="dialog__body level flex-justify-between">
      <p>Extra small modal</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>

<div id="modal-size-sm" class="modal modal_size_sm">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <div class="dialog__body level flex-justify-between">
      <p>Small modal</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>

<div id="modal-size-md" class="modal modal_size_md">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <div class="dialog__body level flex-justify-between">
      <p>Medium modal</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>

<div id="modal-size-lg" class="modal modal_size_lg">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <div class="dialog__body level flex-justify-between">
      <p>Large modal</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>

<div id="modal-size-xl" class="modal modal_size_xl">
  <div class="modal__dialog dialog" role="dialog" aria-modal="true">
    <div class="dialog__body level flex-justify-between">
      <p>Extra large modal</p>
      <button data-modal-close class="link">Close</button>
    </div>
  </div>
</div>

{% include demo_switch.html %}
```html
<div id="[unique-id]" class="modal modal_size_sm">...</div>
<div id="[unique-id]" class="modal modal_size_lg">...</div>
```
{% include demo_close.html %}

### Available Variations

- `modal_size_xs`
- `modal_size_sm`
- `modal_size_md`
- `modal_size_lg`
- `modal_size_xl`

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$z-index</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1000</code></td>
        <td data-mobile-label="Desc">Base z-index of modals. Stacked modals are incremented by 1.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">36em</code></td>
        <td data-mobile-label="Desc">The default max width of modals.</td>
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
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$box-shadow-4</code></td>
        <td data-mobile-label="Desc">Box shadow applied to modal dialog elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0 solid rgba(core.$primary, 0)</code></td>
        <td data-mobile-label="Desc">Outline applied to modal dialog elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">4px solid rgba(core.$primary, 1)</code></td>
        <td data-mobile-label="Desc">Outline applied to modal dialog elements in their focus state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-focus-alert</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">4px solid rgba(core.$danger, 1)</code></td>
        <td data-mobile-label="Desc">Outline applied to required modal dialog elements in their focus state.</td>
      </tr>
      <!-- modal_pos_[value] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$aside-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">16em</code></td>
        <td data-mobile-label="Desc">Width applied to modals using <code class="code">modal_pos_left</code> and <code class="code">modal_pos_right</code> modifiers.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$aside-max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">90%</code></td>
        <td data-mobile-label="Desc">Max width applied to modals using <code class="code">modal_pos_left</code> and <code class="code">modal_pos_right</code> modifiers.</td>
      </tr>
      <!-- modal_size_[key] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-scale</code></td>
        <td data-mobile-label="Default">
          <a class="link text-nowrap" href="#size-scale">Map Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">The size scale map the <code class="code">modal_size_[key]</code> modifier uses to build its styles.</td>
      </tr>
    </tbody>
  </table>
</div>

### $size-scale

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
        <td data-mobile-label="Key"><code class="code text-nowrap">dataReplace</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal-replace'</code></td>
        <td data-mobile-label="Desc">Data attribute for a modal replace trigger.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataConfig</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal-config'</code></td>
        <td data-mobile-label="Desc">Data attribute to find modal specific configuration settings. Value should be a JSON object.</td>
      </tr>
      <!-- Selectors -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorModal</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'.modal'</code></td>
        <td data-mobile-label="Desc">Selector for modal component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorDialog</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'.modal__dialog'</code></td>
        <td data-mobile-label="Desc">Selector for modal dialog element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorRequired</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'[role="alertdialog"]'</code></td>
        <td data-mobile-label="Desc">Selector used to apply required modal state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">selectorFocus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'[data-focus]'</code></td>
        <td data-mobile-label="Desc">Focus preference selector for when modals are initially opened.</td>
      </tr>
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
      <!-- Feature toggles -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">customEventPrefix</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal:'</code></td>
        <td data-mobile-label="Desc">Prefix to be used on custom events.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">eventListeners</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Whether or not to set the document event listeners on init.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">teleport</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Teleport selector where modals get moved to. Leave as <code class="code">null</code> to disable teleport.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">teleportMethod</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'append'</code></td>
        <td data-mobile-label="Desc">Teleport method options include <code class="code">after</code>, <code class="code">before</code>, <code class="code">append</code> and <code class="code">prepend</code> relative to the teleport reference.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">setTabindex</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Whether or not to set <code class="code">tabindex="-1"</code> on all modal dialog elements on init.</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">transition</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
        <td data-mobile-label="Desc">Toggle the transition animation of modals.</td>
      </tr>
    </tbody>
  </table>
</div>

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
