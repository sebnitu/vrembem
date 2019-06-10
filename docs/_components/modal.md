---
layout: article
title: Modal
description: "A component for changing the mode of a page to complete a critical task. This is usually used in conjunction with the Dialog component to make modal dialogs."
category: compound
# usage:
  # npm: "@vrembem/modal"
  # scss: "vrembem/modal/all"
---

{% include flag.html heading="modal" %}

<div class="type" markdown="1">

The core parts of a modal include the following elements:

* `modal__trigger`: The initial modal trigger. Uses the `data-modal` attribute to set trigger target.
* `modal`
  * `modal__dialog`
    * `modal__trigger`: Used without the `data-modal` attribute for closing modal from within a dialog.

</div>

{% include demo_open.html %}

<button class="modal__trigger button button_color_primary" data-modal="modal-default">Modal</button>

{% include demo_switch.html %}

```html
<button class="modal__trigger" data-modal="modal-example-1">Modal</button>

<div class="modal" id="modal-default">
  <div class="modal__dialog">
    ...
  </div>
</div>
```

{% include demo_close.html %}

{% include flag.html heading="modal_size" %}

{% include demo_open.html %}

<div class="level level_wrap">
  <button class="modal__trigger button button_color_primary" data-modal="modal-size-sm">Small Modal</button>
  <button class="modal__trigger button button_color_primary" data-modal="modal-size-lg">Large Modal</button>
</div>

{% include demo_switch.html %}

```html
<div class="modal modal_size_sm" id="modal-size-sm">...</div>
<div class="modal modal_size_lg" id="modal-size-lg">...</div>
```

{% include demo_close.html %}

{% include flag.html heading="modal_full" %}

{% include demo_open.html %}

<button class="modal__trigger button button_color_primary" data-modal="modal-full">Modal</button>

{% include demo_switch.html %}

```html
<div class="modal modal_full" id="modal-full">...</div>
```

{% include demo_close.html %}

{% include flag.html heading="modal_pos" %}

{% include demo_open.html %}

<div class="level level_wrap">
  <button class="modal__trigger button button_color_primary" data-modal="modal-pos-top">Modal Top</button>
  <button class="modal__trigger button button_color_primary" data-modal="modal-pos-bottom">Modal Bottom</button>
  <button class="modal__trigger button button_color_primary" data-modal="modal-pos-left">Modal Left</button>
  <button class="modal__trigger button button_color_primary" data-modal="modal-pos-right">Modal Right</button>
</div>

{% include demo_switch.html %}

```html
<div class="modal modal_pos_top" id="modal-pos-top">...</div>
<div class="modal modal_pos_bottom" id="modal-pos-bottom">...</div>
<div class="modal modal_pos_left" id="modal-pos-left">...</div>
<div class="modal modal_pos_right" id="modal-pos-right">...</div>
```

{% include demo_close.html %}

<!-- modal -->
<div>

  <div class="modal" id="modal-default" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="modal__trigger dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is using the dialog component...</p>
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
