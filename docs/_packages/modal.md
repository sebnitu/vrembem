---
layout: article
title: Modal
description: "A component for changing the mode of a page to complete a critical task. This is usually used in conjunction with the dialog component to make modal dialogs."
category: compound
usage:
  npm: "modal"
  scss: "modal"
  js: "modal"
---

{% include flag.html heading="modal" %}

<div class="type" markdown="1">
Modals are composed using classes for styling and data attributes for JavaScript functionality. To open a modal using a trigger, use a unique identifier as the values for both of their respective data attributes. Close buttons are left value-less and should be placed inside the modal element they're meant to close.

* `data-modal="[unique-id]"`
* `data-modal-open="[unique-id]"`
* `data-modal-close`
</div>

{% include demo_open.html class_grid="grid_break" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-default">
  Modal
</button>
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

{% include demo_open.html class_grid="grid_break" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-dialog">
  Modal dialog
</button>
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

{% include demo_open.html class_grid="grid_break" class_parent="padding border radius" %}
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

{% include demo_open.html class_grid="grid_break" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-full">Modal</button>
{% include demo_switch.html %}
```html
<div class="modal modal_full" data-modal="[unique-id]">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="modal_pos_[key]" %}

{% include demo_open.html class_grid="grid_break" class_parent="padding border radius" %}
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

<div class="type" markdown="1">
If a modal has the attribute `tabindex="-1"`, it will be given focus when it's opened. If focus on a specific element inside a drawer is prefered, give it the `data-modal-focus` attribute. The focus in either case is returned to the trigger element once the modal is closed. Focus handling can be disabled using the `{ focus: false }` setting.
</div>

{% include demo_open.html class_grid="grid_break" class_parent="padding border radius" %}
<div class="level">
  <button class="link" data-modal-open="modal-focus-self">
    Modal focus self
  </button>
  <button class="link" data-modal-open="modal-focus-inner">
    Modal focus element
  </button>
</div>
{% include demo_switch.html %}
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
{% include demo_close.html %}

{% include flag.html heading="data-modal-required" %}

<div class="type" markdown="1">
Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close is disabled. Add the `data-modal-required` data attribute to a modal to enable this behavior.
</div>

{% include demo_open.html class_grid="grid_break" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-required">
  Modal required
</button>
{% include demo_switch.html %}
```html
<div class="modal" data-modal="[unique-id]" data-modal-required>
  <div class="modal__dialog">
    ...
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="Modal settings" %}

<div class="scroll-box">
  <table class="table table_zebra">
    <thead>
      <tr class="border_top_0">
        <th>Key</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code class="code text_nowrap">autoInit</code></td>
        <td><code class="code text_nowrap">false</code></td>
        <td>Automatically instantiates the instance</td>
      </tr>

      <!-- Data attributes -->
      <tr>
        <td><code class="code text_nowrap">dataModal</code></td>
        <td><code class="code text_nowrap">"modal"</code></td>
        <td>Data attribute for a modal</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dataOpen</code></td>
        <td><code class="code text_nowrap">"modal-open"</code></td>
        <td>Data attribute for a modal open trigger</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dataClose</code></td>
        <td><code class="code text_nowrap">"modal-close"</code></td>
        <td>Data attribute for a modal close trigger</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dataFocus</code></td>
        <td><code class="code text_nowrap">"modal-focus"</code></td>
        <td>Data attribute for setting a modal's focus element</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dataRequired</code></td>
        <td><code class="code text_nowrap">"modal-required"</code></td>
        <td>Data attribute for making a modal required</td>
      </tr>
    </tbody>

    <!-- State classes -->
    <tr>
      <td><code class="code text_nowrap">stateOpened</code></td>
      <td><code class="code text_nowrap">"is-opened"</code></td>
      <td>Class used for open state</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">stateOpening</code></td>
      <td><code class="code text_nowrap">"is-opening"</code></td>
      <td>Class used for transitioning to open state</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">stateClosing</code></td>
      <td><code class="code text_nowrap">"is-closing"</code></td>
      <td>Class used for transitioning to closed state</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">stateClosed</code></td>
      <td><code class="code text_nowrap">"is-closed"</code></td>
      <td>Class used for closed state (is ommitted in application)</td>
    </tr>

    <!-- Feature toggles -->
    <tr>
      <td><code class="code text_nowrap">focus</code></td>
      <td><code class="code text_nowrap">true</code></td>
      <td>Toggles the focus handling feature</td>
    </tr>
  </table>
</div>

{% include flag.html heading="Modal API" %}

<div class="scroll-box">
  <table class="table table_zebra">
    <thead>
      <tr class="border_top_0">
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code class="code text_nowrap">modal.init()</code></td>
        <td>Initializes the modal instance</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">modal.destroy()</code></td>
        <td>Destroys and cleans up the modal instantiation</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">modal.open(modalKey, callback)</code></td>
        <td>Opens a modal provided the modal key and optional callback</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">modal.close(returnFocus, callback)</code></td>
        <td>Closes a modal and returns focus to trigger element with optional callback</td>
      </tr>
    </tbody>
  </table>
</div>

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

  <div class="modal modal_full" data-modal="modal-full">
    <div class="modal__dialog dialog">
      <div class="dialog__body">
        <div class="level flex_justify_between">
          <p>Full modal</p>
          <button class="link" data-modal-close data-modal-focus>Close</button>
        </div>
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

  <div class="modal" data-modal="modal-focus-self" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__body level flex_justify_between">
        <p>Focus self on open</p>
        <button class="link" data-modal-close>Close</button>
      </div>
    </div>
  </div>

  <div class="modal" data-modal="modal-focus-inner">
    <div class="modal__dialog dialog">
      <div class="dialog__body">
        <div class="level flex_justify_between margin_bottom_md">
          <p>Focus input element on open</p>
          <button class="link" data-modal-close>Close</button>
        </div>
        <input class="input" data-modal-focus placeholder="Search..." />
      </div>
    </div>
  </div>

  <!-- data-modal-required -->

  <div class="modal" data-modal="modal-required" data-modal-required tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__body spacing">
        <h3 class="dialog__title">Required modal</h3>
        <p>Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close is disabled.</p>
        <div class="flex flex_justify_end">
          <div class="button-group">
            <button data-modal-close class="button">
              I undersand
            </button>
            <button data-modal-close class="button button_color_secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
