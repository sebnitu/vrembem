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

## dialog + dialog__body

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

{% include demo_open.html %}
<div class="dialog">
  <button class="dialog__close icon-action">
    {% include icon.html icon="x" %}
  </button>
  <div class="dialog__body gap">
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

## Dialog examples

The dialog is a very flexible component and can be used in many different contexts. Here are more examples of the dialog component.

## Message

{% include demo_open.html %}
<div class="dialog">
  <div class="dialog__header">
    <h2 class="dialog__title">New Message</h2>
    <div class="dialog__group">
      <button class="dialog__group-item icon-action">
        {% include icon.html icon="minus" %}
      </button>
      <button class="dialog__group-item icon-action">
        {% include icon.html icon="maximize-2" %}
      </button>
      <button class="dialog__group-item dialog__close icon-action">
        {% include icon.html icon="x" %}
      </button>
    </div>
  </div>
  <form class="dialog__body gap">
    <input type="text" class="input" placeholder="Recipients" />
    <input type="text" class="input" placeholder="Subjects" />
    <textarea class="input input_type_textarea" rows="3" placeholder="..."></textarea>
  </form>
  <div class="dialog__footer flex-justify-between">
    <div class="button-group">
      <button class="button button_color_primary">Send</button>
      <button class="button button_icon">
        {% include icon.html icon="paperclip" %}
      </button>
      <button class="button button_icon">
        {% include icon.html icon="image" %}
      </button>
    </div>
    <div class="button-group">
      <button class="button button_icon">
        {% include icon.html icon="trash" %}
      </button>
      <button class="button button_icon">
        {% include icon.html icon="chevron-up" %}
      </button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
  <div class="dialog__header">
    <h2 class="dialog__title">...</h2>
    <div class="dialog__group">
      ...
    </div>
  </div>
  <form class="dialog__body">
    ...
  </form>
  <div class="dialog__footer flex-justify-between">
    <div class="button-group">
      ...
    </div>
    <div class="button-group">
      ...
    </div>
  </div>
</div>
```
{% include demo_close.html %}

## Confirmation

{% include demo_open.html %}
<div class="dialog">
  <div class="dialog__body gap-y padding-lg">
    <h2 class="dialog__title">Did you forget an attachment?</h2>
    <p>You wrote "I have attached" in your message, but there are no files attached. Send anyway?</p>
  </div>
  <div class="dialog__footer flex-justify-end">
    <button class="button">Cancel</button>
    <button class="button button_color_primary">Send</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="dialog">
  <div class="dialog__body padding-lg">
    ...
  </div>
  <div class="dialog__footer flex-justify-end">
    ...
  </div>
</div>
```
{% include demo_close.html %}
