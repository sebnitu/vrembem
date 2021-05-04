---
layout: article
title: Dialog
description: "A component that facilitates a conversation between the system and the user. They often request information or an action from the user."
package: "@vrembem/dialog"
category: compound
usage:
  npm: true
  scss: true
---

## dialog

Dialog is a highly composable container component that comes with a variety of elements. The most basic implementation being `dialog` and a `dialog__body` element:

{% include demo_open.html %}
<div class="dialog">
  <div class="dialog__body">
    <p>This is some dialog content...</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
  <div class="dialog__body">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## dialog__close

Use the `dialog__close` element as a hook for providing users a way to dismiss dialogs arbitrarily. This can either be placed before the `dialog__body` element which will add appropriate padding, or inside the `dialog__header` element along side a `dialog__title`.

{% include demo_open.html %}
<div class="dialog">
  <button class="dialog__close icon-action">
    {% include icon.html icon="x" %}
  </button>
  <div class="dialog__body">
    <p>This is some dialog content...</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
  <button class="dialog__close icon-action">
    <svg role="img" class="icon">
      <use xlink:href="#x"></use>
    </svg>
  </button>
  <div class="dialog__body">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## dialog__title

Used for adding a title to the dialog.

{% include demo_open.html %}
<div class="dialog">
  <button class="dialog__close icon-action">
    {% include icon.html icon="x" %}
  </button>
  <div class="dialog__body gap-y">
    <h2 class="dialog__title">Dialog Title</h2>
    <p>This is some dialog content...</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
  <button class="dialog__close">
    ...
  </button>
  <div class="dialog__body">
    <h2 class="dialog__title">...</h2>
    <p>...</p>
  </div>
</div>
```
{% include demo_close.html %}

## dialog__header + dialog__footer

Used to separate distinct dialog sections for headers and footers. Typically the `dialog__header` element will contain the `dialog__title` and `dialog__close` elements while the `dialog__footer` contains a dialogs call to actions. It's also possible to include multiple `dialog__body` elements as needed.

{% include demo_open.html %}
<div class="dialog">
  <div class="dialog__header">
    <h2 class="dialog__title">Dialog Title</h2>
    <button class="dialog__close icon-action">
      {% include icon.html icon="x" %}
    </button>
  </div>
  <div class="dialog__body">
    <p>This is some dialog content...</p>
  </div>
  <div class="dialog__footer">
    <button class="button button_color_primary">Accept</button>
    <button class="button">Cancel</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
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
```
{% include demo_close.html %}
