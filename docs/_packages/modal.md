---
layout: article
title: Modal
description: "A component for changing the mode of a page to complete a critical task. This is usually used in conjunction with the Dialog component to make modal dialogs."
category: compound
usage:
  npm: "@vrembem/modal"
  scss: "vrembem/modal/index"
  js: "@vrembem/modal"
---

{% include flag.html heading="modal" %}

<div class="type" markdown="1">

Modals are comprised using the following data attributes for JavaScript functionality:

* `data-modal="[modal-identifier]"`: Apply to a modal as a unique identifier.
* `data-modal-open="[modal-identifier]"`: Apply to a button or link with the value of a modal's unique identifier to open modal.
* `data-modal-close`: Apply to a button or link to close any open modals.
* `data-modal-required="true"`: When applied to a modal and set to true, prevents the ability to dismiss the modal via escape key or clicking outside the dialog.
* `data-modal-focus`: When applied to an element inside the modal, is focused on open.

</div>

{% include demo_open.html %}

<button class="button button_color_primary" data-modal-open="modal-default">
  Modal
</button>

{% include demo_switch.html %}

```html
<button class="modal__trigger" data-modal-open="modal-default">Modal</button>

<div class="modal" data-modal="modal-default">
  <div class="modal__dialog">
    ...
  </div>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="modal_size" %}

{% include demo_open.html %}

<div class="level">
  <button class="button button_color_primary" data-modal-open="modal-size-sm">Small Modal</button>
  <button class="button button_color_primary" data-modal-open="modal-size-lg">Large Modal</button>
</div>

{% include demo_switch.html %}

```html
<div class="modal modal_size_sm" data-modal="modal-size-sm">...</div>
<div class="modal modal_size_lg" data-modal="modal-size-lg">...</div>
```

{% include demo_close.html %}

{% include flag.html heading="modal_full" %}

{% include demo_open.html %}

<button class="button button_color_primary" data-modal-open="modal-full">Modal</button>

{% include demo_switch.html %}

```html
<div class="modal modal_full" data-modal="modal-full">...</div>
```

{% include demo_close.html %}

{% include flag.html heading="modal_pos" %}

{% include demo_open.html %}

<div class="level">
  <button class="button button_color_primary" data-modal-open="modal-pos-top">Modal Top</button>
  <button class="button button_color_primary" data-modal-open="modal-pos-bottom">Modal Bottom</button>
  <button class="button button_color_primary" data-modal-open="modal-pos-left">Modal Left</button>
  <button class="button button_color_primary" data-modal-open="modal-pos-right">Modal Right</button>
</div>

{% include demo_switch.html %}

```html
<div class="modal modal_pos_top" data-modal="modal-pos-top">...</div>
<div class="modal modal_pos_bottom" data-modal="modal-pos-bottom">...</div>
<div class="modal modal_pos_left" data-modal="modal-pos-left">...</div>
<div class="modal modal_pos_right" data-modal="modal-pos-right">...</div>
```

{% include demo_close.html %}

<!-- modals -->
<div>

  <div class="modal" data-modal="modal-default" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Modal Dialog</h2>
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

  <div class="modal" data-modal="modal-default-second" data-modal-required="true" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Required Modal Dialog</h2>
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

  <!-- modal_size_[key] -->

  <div class="modal modal_size_sm" data-modal="modal-size-sm" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_size_lg" data-modal="modal-size-lg" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_full" data-modal="modal-full" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <!-- modal_pos_[key] -->

  <div class="modal modal_pos_top" data-modal="modal-pos-top" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_pos_bottom" data-modal="modal-pos-bottom" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_pos_left" data-modal="modal-pos-left" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

  <div class="modal modal_pos_right" data-modal="modal-pos-right" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
      </div>
    </div>
  </div>

</div>
