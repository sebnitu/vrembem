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
Modals are composed using classes for styling and data attributes for JavaScript functionality. To open a modal using a trigger, use a unique identifier as the values for both of their respective data attributes. Close buttons are left value-less and should be placed inside the modal element they're meant to close.

* `data-modal="[unique-id]"`
* `data-modal-open="[unique-id]"`
* `data-modal-close`
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="padding border radius">
  <button class="link" data-modal-open="modal-default">
    Modal
  </button>
</div>
{% include demo_switch.html %}
```html
<button data-modal-open="[unique-id]">Modal</button>
<div class="modal" data-modal="[unique-id]">
  <div class="modal__dialog">
    <button data-modal-close>Close</button>
    ...
  </div>
</div>
```
{% include demo_close.html %}

<div class="type" markdown="1">
The [dialog component](/packages/dialog) is a great fit for composing a modal's content.
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="padding border radius">
  <button class="link" data-modal-open="modal-dialog">
    Modal dialog
  </button>
</div>
{% include demo_switch.html %}
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
{% include demo_close.html %}

{% include flag.html heading="modal_size_[key]" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="level">
  <button class="link" data-modal-open="modal-size-sm">Small modal</button>
  <button class="link" data-modal-open="modal-size-lg">Large modal</button>
</div>
{% include demo_switch.html %}
```html
<div class="modal modal_size_sm" data-modal="[unique-id]">...</div>
<div class="modal modal_size_lg" data-modal="[unique-id]">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="modal_full" %}

{% include demo_open.html class_grid="grid_break" %}
<button class="link" data-modal-open="modal-full">Modal</button>
{% include demo_switch.html %}
```html
<div class="modal modal_full" data-modal="[unique-id]">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="modal_pos_[key]" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="level">
  <button class="link" data-modal-open="modal-pos-top">Modal top</button>
  <button class="link" data-modal-open="modal-pos-bottom">Modal bottom</button>
  <button class="link" data-modal-open="modal-pos-left">Modal left</button>
  <button class="link" data-modal-open="modal-pos-right">Modal right</button>
</div>
{% include demo_switch.html %}
```html
<div class="modal modal_pos_top" data-modal="[unique-id]">...</div>
<div class="modal modal_pos_bottom" data-modal="[unique-id]">...</div>
<div class="modal modal_pos_left" data-modal="[unique-id]">...</div>
<div class="modal modal_pos_right" data-modal="[unique-id]">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="data-modal-focus" %}

{% include flag.html heading="data-modal-required" %}

{% include flag.html heading="Modal settings" %}

{% include flag.html heading="Modal API" %}


<!-- modals -->
<div>

  <div class="modal" data-modal="modal-default" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__body level flex_justify_between">
        <p>This is a basic modal</p>
        <button class="link" data-modal-close>Close</button>
      </div>
    </div>
  </div>

  <div class="modal" data-modal="modal-dialog" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Modal Dialog</h2>
        <button class="icon-action" data-modal-close>
          {% include icon.html icon="x" %}
        </button>
      </div>
      <div class="dialog__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta diam eget lectus interdum, eu aliquet augue rutrum. Morbi faucibus mauris lectus, in imperdiet augue cursus vel.</p>
      </div>
      <div class="dialog__footer flex_justify_end">
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

  <!-- modal_size_[key] -->

  <div class="modal modal_size_sm" data-modal="modal-size-sm" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__body level flex_justify_between">
        <p>Small modal</p>
        <button class="link" data-modal-close>Close</button>
      </div>
    </div>
  </div>

  <div class="modal modal_size_lg" data-modal="modal-size-lg" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__body level flex_justify_between">
        <p>Large modal</p>
        <button class="link" data-modal-close>Close</button>
      </div>
    </div>
  </div>

  <!-- modal_full -->

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
        <p>Top position modal</p>
      </div>
      <div class="dialog__footer flex_justify_between">
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

  <div class="modal modal_pos_bottom" data-modal="modal-pos-bottom" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>Bottom position modal</p>
      </div>
      <div class="dialog__footer flex_justify_between">
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

  <div class="modal modal_pos_left" data-modal="modal-pos-left" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
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

  <div class="modal modal_pos_right" data-modal="modal-pos-right" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
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

  <!-- data-modal-focus -->

  <div class="modal" data-modal="modal-focus">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <input class="input" data-modal-focus placeholder="Search..." />
      </div>
    </div>
  </div>

  <!-- data-modal-required -->

  <div class="modal" data-modal="modal-default-second" data-modal-required="true" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Required Modal Dialog</h2>
        <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
          {% include icon.html icon="x" %}
        </button>
      </div>
      <div class="dialog__body">
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

  <div class="modal" data-modal="modal-default-second" data-modal-required="true" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Required Modal Dialog</h2>
        <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
          {% include icon.html icon="x" %}
        </button>
      </div>
      <div class="dialog__body">
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

</div>
