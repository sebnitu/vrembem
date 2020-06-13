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

## modal

Modals are composed using classes for styling and data attributes for JavaScript functionality. To open a modal using a trigger, use a unique identifier as the values for both of their respective data attributes. Close buttons are left value-less and should be placed inside the modal element they're meant to close.

* `data-modal="[unique-id]"`
* `data-modal-open="[unique-id]"`
* `data-modal-close`

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

The [dialog component](/packages/dialog) is a great fit for composing a modal’s content.

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

## modal_full

Adds styles to a modal that make it fill the entire viewport when opened.

{% include demo_open.html class_grid="grid_break" class_parent="padding border radius" %}
<button class="link" data-modal-open="modal-full">Modal</button>
{% include demo_switch.html %}
```html
<div class="modal modal_full" data-modal="[unique-id]">...</div>
```
{% include demo_close.html %}

## modal_pos_[key]

The default position of modals is in the center of the viewport. The position modifier allows you four other options:

* `modal_pos_top`
* `modal_pos_left`
* `modal_pos_right`
* `modal_pos_bottom`

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

## modal_size_[key]

Adjusts the size of modals. This modifier provides two options, `modal_size_sm` and `modal_size_lg` all relative to the default modal size.

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

## data-modal-focus

If a modal has the attribute `tabindex="-1"`, it will be given focus when it's opened. If focus on a specific element inside a modal is preferred, give it the `data-modal-focus` attribute. The focus in either case is returned to the trigger element once the modal is closed. Focus handling can be disabled using the `{ focus: false }` setting.

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

## data-modal-required

Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close is disabled. Add the `data-modal-required` data attribute to a modal to enable this behavior.

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
      <!-- Prefixes -->
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
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.3s</code></td>
        <td data-mobile-label="Desc">Duration of modal transition.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">cubic-bezier(0.4, 0, 0.2, 1)</code></td>
        <td data-mobile-label="Desc">Timing function used for modal transitions.</td>
      </tr>

      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">#424242</code></td>
        <td data-mobile-label="Desc">Background color of modal screen.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-alpha</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.8</code></td>
        <td data-mobile-label="Desc">The alpha channel for the modal screen.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">
          0 0 0 1px rgba(#212121, 0.05),<br>
          0 11px 15px -7px rgba(#212121, 0.1),<br>
          0 24px 38px 3px rgba(#212121, 0.08),<br>
          0 9px 46px 8px rgba(#212121, 0.06)
        </code></td>
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

## JavaScript Events

* `modal:opened` Emits when the modal has opened.
* `modal:closed` Emits when the modal has closed.

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
        <td data-mobile-label="Desc">Automatically instantiates the instance.</td>
      </tr>

      <!-- Data attributes -->
      <tr>
        <td data-mobile-label="Key"><code class="code text-nowrap">dataModal</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal'</code></td>
        <td data-mobile-label="Desc">Data attribute for a modal.</td>
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

    <!-- Feature toggles -->
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">customEventPrefix</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">'modal:'</code></td>
      <td data-mobile-label="Desc">Prefix to be used on custom events.</td>
    </tr>
    <tr>
      <td data-mobile-label="Key"><code class="code text-nowrap">focus</code></td>
      <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">true</code></td>
      <td data-mobile-label="Desc">Toggles the focus handling feature.</td>
    </tr>
  </table>
</div>

## JavaScript API

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Method</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Method"><code class="code text-nowrap">modal.init()</code></td>
        <td data-mobile-label="Desc">Initializes the modal instance.</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text-nowrap">modal.destroy()</code></td>
        <td data-mobile-label="Desc">Destroys and cleans up the modal instantiation.</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text-nowrap">modal.open(modalKey, callback)</code></td>
        <td data-mobile-label="Desc">Opens a modal provided the modal key and optional callback.</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text-nowrap">modal.close(returnFocus, callback)</code></td>
        <td data-mobile-label="Desc">Closes a modal and returns focus to trigger element with optional callback.</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- modals -->
<div>

  <!-- modal default -->
  <div class="modal" data-modal="modal-default" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__body level flex-justify-between">
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

  <!-- modal_size_[key] -->
  <div class="modal modal_size_sm" data-modal="modal-size-sm" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__body level flex-justify-between">
        <p>Small modal</p>
        <button class="link" data-modal-close>Close</button>
      </div>
    </div>
  </div>
  <div class="modal modal_size_lg" data-modal="modal-size-lg" tabindex="-1">
    <div class="modal__dialog dialog">
      <div class="dialog__body level flex-justify-between">
        <p>Large modal</p>
        <button class="link" data-modal-close>Close</button>
      </div>
    </div>
  </div>

  <!-- modal_full -->
  <div class="modal modal_full" data-modal="modal-full">
    <div class="modal__dialog dialog">
      <div class="dialog__body">
        <div class="level flex-justify-between">
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
  <div class="modal modal_pos_bottom" data-modal="modal-pos-bottom" tabindex="-1">
    <div class="modal__dialog dialog">
      <button class="dialog__close icon-action icon-action_color_fade" data-modal-close>
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
      <div class="dialog__body level flex-justify-between">
        <p>Focus self on open</p>
        <button class="link" data-modal-close>Close</button>
      </div>
    </div>
  </div>
  <div class="modal" data-modal="modal-focus-inner">
    <div class="modal__dialog dialog">
      <div class="dialog__body">
        <div class="level flex-justify-between margin-bottom-md">
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
        <h2 class="dialog__title">Required modal</h2>
        <p>Required modals can not be closed without an explicit action. That means clicking on the background or pressing the escape key to close is disabled.</p>
        <div class="flex flex-justify-end">
          <div class="button-group">
            <button data-modal-close class="button button_color_primary">
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
