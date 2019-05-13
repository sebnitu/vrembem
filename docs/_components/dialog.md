---
layout: page
title: Dialog
description: "A component that facilitates a conversation between the system and the user. They often request information or an action from the user."
tags: block compound
---

<div class="flag">
  <h2>dialog + dialog__body</h2>
</div>

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <div class="dialog">
      <div class="dialog__body">
        <p>This is some dialog content...</p>
      </div>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="dialog">
  <div class="dialog__body">
    ...
  </div>
</div>
```
  </div>
  </div>
</div>

<div class="flag">
  <h2>dialog__close</h2>
</div>

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <div class="dialog">
      <button class="dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body">
        <p>This is some dialog content...</p>
      </div>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="dialog">
  <button class="dialog__close icon-action icon-action_color_fade">
    <svg role="img" class="icon">
      <use xlink:href="#x"></use>
    </svg>
  </button>
  <div class="dialog__body">
    ...
  </div>
</div>
```
  </div>
  </div>
</div>

<div class="flag">
  <h2>dialog__title</h2>
</div>

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <div class="dialog">
      <button class="dialog__close icon-action icon-action_color_fade">
        {% include icon.html icon="x" %}
      </button>
      <div class="dialog__body spacing">
        <h2 class="dialog__title">Dialog Title</h2>
        <p>This is some dialog content...</p>
      </div>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="dialog">
  <button class="dialog__close">...</button>
  <div class="dialog__body">
    <h2 class="dialog__title">...</h2>
    ...
  </div>
</div>
```
  </div>
  </div>
</div>

<div class="flag">
  <h2>dialog__header + dialog__footer</h2>
</div>

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <div class="dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Dialog Title</h2>
        <button class="dialog__close icon-action icon-action_color_fade">
          {% include icon.html icon="x" %}
        </button>
      </div>
      <div class="dialog__body">
        <p>This is some dialog content...</p>
      </div>
      <div class="dialog__footer">
        <div class="button-group">
          <button class="button button_color_primary">Accept</button>
          <button class="button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
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
  </div>
  </div>
</div>

<div class="type" markdown="1">

---

## Dialog examples

The dialog is a very flexible component and can be used in many different contexts. Below are more compositional examples of the dialog component.

</div>

<div class="flag">
  <h2>Message</h2>
</div>

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <div class="dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">New Message</h2>
        <div class="dialog__group">
          <button class="dialog__group-item icon-action icon-action_color_fade">
            {% include icon.html icon="minus" %}
          </button>
          <button class="dialog__group-item icon-action icon-action_color_fade">
            {% include icon.html icon="maximize-2" %}
          </button>
          <button class="dialog__group-item dialog__close icon-action icon-action_color_fade">
            {% include icon.html icon="x" %}
          </button>
        </div>
      </div>
      <form class="dialog__body spacing">
        <input type="text" class="input" placeholder="Recipients" />
        <input type="text" class="input" placeholder="Subjects" />
        <textarea class="input input_type_textarea" placeholder="..."></textarea>
      </form>
      <div class="dialog__footer justify_between">
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
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
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
  <div class="dialog__footer justify_between">
    <div class="button-group">
      ...
    </div>
    <div class="button-group">
      ...
    </div>
  </div>
</div>
```
  </div>
  </div>
</div>

<div class="flag">
  <h2>Confirmation</h2>
</div>

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <div class="dialog">
      <div class="dialog__body spacing p_2">
        <h2 class="dialog__title">Did you forget an attachment?</h2>
        <p>You wrote "I have attached" in your message, but there are no files attached. Send anyway?</p>
      </div>
      <div class="dialog__footer justify_end">
        <div class="button-group">
          <button class="button">Cancel</button>
          <button class="button button_color_primary">Send</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="dialog">
  <div class="dialog__body p_2">
    ...
  </div>
  <div class="dialog__footer justify_end">
    <div class="button-group">
      ...
    </div>
  </div>
</div>
```
  </div>
  </div>
</div>
