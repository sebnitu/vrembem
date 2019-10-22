---
layout: article
title: Modal
description: "A component for changing the mode of a page to complete a critical task. This is usually used in conjunction with the Dialog component to make modal dialogs."
category: compound
usage:
  npm: "@vrembem/modal"
  scss: "vrembem/modal/index"
---

{% include flag.html heading="modal" %}

<div class="type" markdown="1">

The core parts of a modal include the following elements:

* `modal__trigger`: The initial modal trigger. Uses the `data-target` attribute to set trigger target.
* `modal`
  * `modal__dialog`
    * `modal__trigger`: Used without the `data-target` attribute for closing modal from within a dialog.

</div>

{% include demo_open.html %}

<button class="button button_color_primary" data-modal-open="modal-default">
  Modal
</button>

{% include demo_switch.html %}

```html
<button class="modal__trigger" data-target="#modal-id">Modal</button>

<div class="modal" id="modal-id">
  <div class="modal__dialog">
    ...
  </div>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="modal_size" %}

{% include demo_open.html %}

<div class="level">
  <button class="modal__trigger button button_color_primary" data-target="#modal-size-sm">Small Modal</button>
  <button class="modal__trigger button button_color_primary" data-target="#modal-size-lg">Large Modal</button>
</div>

{% include demo_switch.html %}

```html
<div class="modal modal_size_sm" id="modal-size-sm">...</div>
<div class="modal modal_size_lg" id="modal-size-lg">...</div>
```

{% include demo_close.html %}

{% include flag.html heading="modal_full" %}

{% include demo_open.html %}

<button class="modal__trigger button button_color_primary" data-target="#modal-full">Modal</button>

{% include demo_switch.html %}

```html
<div class="modal modal_full" id="modal-full">...</div>
```

{% include demo_close.html %}

{% include flag.html heading="modal_pos" %}

{% include demo_open.html %}

<div class="level">
  <button class="modal__trigger button button_color_primary" data-target="#modal-pos-top">Modal Top</button>
  <button class="modal__trigger button button_color_primary" data-target="#modal-pos-bottom">Modal Bottom</button>
  <button class="modal__trigger button button_color_primary" data-target="#modal-pos-left">Modal Left</button>
  <button class="modal__trigger button button_color_primary" data-target="#modal-pos-right">Modal Right</button>
</div>

{% include demo_switch.html %}

```html
<div class="modal modal_pos_top" id="modal-pos-top">...</div>
<div class="modal modal_pos_bottom" id="modal-pos-bottom">...</div>
<div class="modal modal_pos_left" id="modal-pos-left">...</div>
<div class="modal modal_pos_right" id="modal-pos-right">...</div>
```

{% include demo_close.html %}

<!-- modals -->
<div>

  <div class="modal" data-modal="modal-default" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Dialog Header</h2>
        <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
          {% include icon.html icon="x" %}
        </button>
      </div>
      <div class="dialog__body spacing">
        <label>Text Input</label>
        <input class="input" type="text" data-modal-focus />
        <p>This is using the dialog component...</p>
      </div>
      <div class="dialog__footer flex_justify_between">
        <button class="button" data-modal-close>
          Cancel
        </button>
        <button class="button button_color_primary" data-modal-open="modal-default-second">
          Next Modal
        </button>
      </div>
    </div>
  </div>

  <div class="modal" data-modal="modal-default-second" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Dialog Header</h2>
        <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
          {% include icon.html icon="x" %}
        </button>
      </div>
      <div class="dialog__body spacing">
        <label>Text Input</label>
        <input class="input" type="text" data-modal-focus />
        <p>This is using the dialog component...</p>
      </div>
      <div class="dialog__footer flex_justify_between">
        <button class="button button_color_primary" data-modal-open="modal-default">
          Previous Modal
        </button>
        <button class="button" data-modal-close>
          Done
        </button>
      </div>
    </div>
  </div>

  <div class="modal modal_size_sm" id="modal-size-sm" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_size_lg" id="modal-size-lg" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_full" id="modal-full" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <!-- modal_pos_[key] -->

  <div class="modal modal_pos_top" id="modal-pos-top" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_pos_bottom" id="modal-pos-bottom" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_pos_left" id="modal-pos-left" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_pos_right" id="modal-pos-right" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

</div>
