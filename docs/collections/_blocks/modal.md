---
title: Modal
---

# modal

<p class="text_lead">A component for changing the mode of a page to complete a critical task. This is usually used in conjunction with the Dialog component to make modal dialogs.</p>

## `modal`

The core poarts of a modal include the following elements:

* `modal__trigger`: The initial modal trigger. Uses the `data-modal` attribute to set trigger target.
* `modal`
  * `modal__dialog`
    * `modal__trigger`: Used without the `data-modal` attribute for closing modal from within a dialog.

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <button class="modal__trigger button button_color_primary" data-modal="modal-default">Modal</button>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="modal__trigger" data-modal="modal-example-1">Modal</button>

<div class="modal" id="modal-default">
  <div class="modal__dialog">
    ...
  </div>
</div>
```
  </div>
  </div>
</div>

## `modal_size`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <button class="modal__trigger button button_color_primary" data-modal="modal-size-sm">Small Modal</button>
    <button class="modal__trigger button button_color_primary" data-modal="modal-size-lg">Large Modal</button>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="modal modal_size_sm" id="modal-size-sm">...</div>
<div class="modal modal_size_lg" id="modal-size-lg">...</div>
```
  </div>
  </div>
</div>

## `modal_full`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <button class="modal__trigger button button_color_primary" data-modal="modal-full">Modal</button>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="modal modal_full" id="modal-full">...</div>
```
  </div>
  </div>
</div>

## `modal_pos`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <button class="modal__trigger button button_color_primary" data-modal="modal-pos-top">Modal Top</button>
    <button class="modal__trigger button button_color_primary" data-modal="modal-pos-bottom">Modal Bottom</button>
    <button class="modal__trigger button button_color_primary" data-modal="modal-pos-left">Modal Left</button>
    <button class="modal__trigger button button_color_primary" data-modal="modal-pos-right">Modal Right</button>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="modal modal_pos_top" id="modal-pos-top">...</div>
<div class="modal modal_pos_bottom" id="modal-pos-bottom">...</div>
<div class="modal modal_pos_left" id="modal-pos-left">...</div>
<div class="modal modal_pos_right" id="modal-pos-right">...</div>
```
  </div>
  </div>
</div>

<!-- Modal Markup -->

<div class="modal" id="modal-default">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<div class="modal modal_size_sm" id="modal-size-sm">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<div class="modal modal_size_lg" id="modal-size-lg">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<div class="modal modal_full" id="modal-full">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<!-- #modal_pos -->

<div class="modal modal_pos_top" id="modal-pos-top">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<div class="modal modal_pos_bottom" id="modal-pos-bottom">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<div class="modal modal_pos_left" id="modal-pos-left">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>

<div class="modal modal_pos_right" id="modal-pos-right">
  <div class="modal__dialog dialog">
    <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
      {% include icon.html icon="x" %}
    </button>
    <div class="dialog__body">
      <p>This is using the dialog component...</p>
    </div>
  </div>
</div>
