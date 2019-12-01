---
layout: article
title: Notice
description: "A component for highlighting messages to the user."
category: compound
usage:
  npm: "@vrembem/notice"
  scss: "vrembem/notice/index"
---

{% include flag.html heading="notice" %}

{% include demo_open.html %}
<div class="notice">
  <div class="notice__body">
    <p>Notice content goes here...</p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice">
  <div class="notice__body">
    ...
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="notice + media" %}

{% include demo_open.html class_parent="spacing" %}
<div class="notice notice_state_danger">
  <div class="media">
    <div class="media__icon">
      {% include icon.html icon="alert-circle" %}
    </div>
    <div class="media__body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
    </div>
  </div>
</div>
<div class="notice notice_state_info">
  <div class="media">
    <div class="media__body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
    </div>
    <div class="media__icon">
      {% include icon.html icon="archive" %}
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice">
  <div class="media">
    <div class="media__icon">
      ...
    </div>
    <div class="media__body">
      ...
    </div>
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="notice__actions" %}

{% include demo_open.html class_parent="spacing" %}
<div class="notice" data-dismissible>
  <div class="notice__body">
    <p>Notice content goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="notice__dismiss icon-action" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice" data-dismissible>
  <div class="notice__body">
    <p>Did you mean to do this action?</p>
  </div>
  <div class="notice__actions">
    <button class="button button_size_sm">
      Undo
    </button>
    <button class="button button_size_sm button_icon" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice">
  <div class="notice__body">
    ...
  </div>
  <div class="notice__actions">
    ...
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="notice__label" %}

{% include demo_open.html %}
<div class="notice flex_align_start" data-dismissible>
  <div class="notice__body spacing_sm">
    <h2 class="notice__label">Oops, wait what?</h2>
    <p>You should know that the action you just did had some consequences.</p>
  </div>
  <div class="notice__actions">
    <button class="icon-action" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice flex_align_start">
  <div class="notice__body">
    <h2 class="notice__label">...</h2>
    <p>...</p>
  </div>
  <div class="notice__actions">
    ...
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="notice_stack" %}

{% include demo_open.html class_parent="spacing" %}
<div class="notice notice_stack" data-dismissible>
  <div class="notice__body spacing_sm">
    <h2 class="notice__label">Oops, wait what?</h2>
    <p>You should know that the action you just did had some consequences.</p>
  </div>
  <div class="notice__actions">
    <button class="button">
      Delete
    </button>
    <button class="button">
      Add Item
    </button>
    <button class="button button_color_subtle button_icon" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice notice_stack" data-dismissible>
  <div class="notice__body spacing_sm">
    <h2 class="notice__label">...</h2>
    <p>...</p>
  </div>
  <div class="notice__actions">
    ...
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="notice_color_[key]" %}

{% include demo_open.html class_parent="spacing" %}
<div class="notice notice_color_primary" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="icon-action" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_color_secondary" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="icon-action" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_color_dark" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="icon-action" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice notice_state_primary">...</div>
<div class="notice notice_state_secondary">...</div>
<div class="notice notice_state_dark">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="notice_state_[key]" %}

{% include demo_open.html class_parent="spacing" %}
<div class="notice notice_state_info" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_state_success" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_state_caution" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_state_danger" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice notice_state_info">...</div>
<div class="notice notice_state_success">...</div>
<div class="notice notice_state_caution">...</div>
<div class="notice notice_state_danger">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="notice_state_[key]-bold" %}

{% include demo_open.html class_parent="spacing" %}
<div class="notice notice_state_info-bold" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_state_success-bold" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_state_caution-bold" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_state_danger-bold" data-dismissible>
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex" data-dismiss>
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice notice_state_info-bold">...</div>
<div class="notice notice_state_success-bold">...</div>
<div class="notice notice_state_caution-bold">...</div>
<div class="notice notice_state_danger-bold">...</div>
```
{% include demo_close.html %}

{% include flag.html heading="Examples" %}

{% include demo_open.html %}
<div class="notice notice_stack notice_color_dark elevate_16dp" data-dismissible>
  <div class="notice__body margin_bottom_lg spacing_sm">
    <h2 class="notice__label flex">
      <span class="flex_grow_1">This site uses cookies</span>
      <button class="icon-action icon-action_invert icon-action_color_subtle" data-dismiss>
        {% include icon.html icon="x" %}
      </button>
    </h2>
    <p>By using this site you agree with our use of cookies. <a class="link" href="#">Read more about our cookie policy &rarr;</a></p>
  </div>
  <div class="notice__body">
    <div class="button-group button-group_full button-group_wrap">
      <button class="button button_invert">
        I consent to cookies
      </button>
      <button class="button button_invert">
        Want to know more?
      </button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice notice_stack notice_color_dark elevate_16dp" data-dismissible>
  <div class="notice__body margin_bottom_lg spacing_sm">
    <h2 class="notice__label flex">
      <span class="flex_grow_1">...</span>
      <button class="icon-action icon-action_invert icon-action_color_subtle" data-dismiss>
        ...
      </button>
    </h2>
    <p>...</p>
  </div>
  <div class="notice__body">
    <div class="button-group button-group_full button-group_wrap">
      <button class="button button_invert">
        ...
      </button>
      <button class="button button_invert">
        ...
      </button>
    </div>
  </div>
</div>
```
{% include demo_close.html %}
