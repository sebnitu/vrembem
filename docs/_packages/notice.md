---
layout: article
title: Notice
description: "A component for highlighting messages to the user."
package: "@vrembem/notice"
category: compound
usage:
  npm: true
  scss: true
---

## notice

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

## notice + media

{% include demo_open.html class_parent="gap" %}
<div class="notice notice_type_danger">
  <div class="media media_gap_sm">
    <div class="media__obj">
      {% include icon.html icon="alert-circle" %}
    </div>
    <div class="media__body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
    </div>
  </div>
</div>
<div class="notice notice_type_info">
  <div class="media media_gap_sm">
    <div class="media__body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
    </div>
    <div class="media__obj">
      {% include icon.html icon="archive" %}
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice">
  <div class="media media_gap_sm">
    <div class="media__obj">
      ...
    </div>
    <div class="media__body">
      ...
    </div>
  </div>
</div>
```
{% include demo_close.html %}

## notice__actions

{% include demo_open.html class_parent="gap" %}
<div class="notice">
  <div class="notice__body">
    <p>Notice content goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="notice__dismiss icon-action">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice">
  <div class="notice__body">
    <p>Did you mean to do this action?</p>
  </div>
  <div class="notice__actions">
    <button class="button button_size_sm">
      Undo
    </button>
    <button class="button button_size_sm button_icon">
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

## notice__title

{% include demo_open.html %}
<div class="notice flex_align_start">
  <div class="notice__body gap-sm">
    <h2 class="notice__title">Oops, wait what?</h2>
    <p>You should know that the action you just did had some consequences.</p>
  </div>
  <div class="notice__actions">
    <button class="icon-action">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice flex_align_start">
  <div class="notice__body">
    <h2 class="notice__title">...</h2>
    <p>...</p>
  </div>
  <div class="notice__actions">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## notice_stack

{% include demo_open.html class_parent="gap" %}
<div class="notice notice_stack">
  <div class="notice__body gap-sm">
    <h2 class="notice__title">Oops, wait what?</h2>
    <p>You should know that the action you just did had some consequences.</p>
  </div>
  <div class="notice__actions">
    <button class="button">
      Delete
    </button>
    <button class="button">
      Add Item
    </button>
    <button class="button button_color_subtle button_icon">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice notice_stack">
  <div class="notice__body gap-sm">
    <h2 class="notice__title">...</h2>
    <p>...</p>
  </div>
  <div class="notice__actions">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## notice_color_[key]

{% include demo_open.html class_parent="gap" %}
<div class="notice notice_color_primary">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="icon-action">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_color_secondary">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="icon-action">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_color_dark">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="icon-action">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice notice_color_primary">...</div>
<div class="notice notice_color_secondary">...</div>
<div class="notice notice_color_dark">...</div>
```
{% include demo_close.html %}

## notice_type_[key]

{% include demo_open.html class_parent="gap" %}
<div class="notice notice_type_info">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_type_success">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_type_caution">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_type_danger">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice notice_type_info">...</div>
<div class="notice notice_type_success">...</div>
<div class="notice notice_type_caution">...</div>
<div class="notice notice_type_danger">...</div>
```
{% include demo_close.html %}

## notice_type_[key]-bold

{% include demo_open.html class_parent="gap" %}
<div class="notice notice_type_info-bold">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_type_success-bold">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_type_caution-bold">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice notice_type_danger-bold">
  <div class="notice__body">
    <p>Notice <a href="#">content</a> goes here...</p>
  </div>
  <div class="notice__actions">
    <button class="flex">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice notice_type_info-bold">...</div>
<div class="notice notice_type_success-bold">...</div>
<div class="notice notice_type_caution-bold">...</div>
<div class="notice notice_type_danger-bold">...</div>
```
{% include demo_close.html %}

## Examples

{% include demo_open.html %}
<div class="notice notice_stack notice_color_dark elevate-16dp">
  <div class="notice__body margin-bottom-lg gap-sm">
    <h2 class="notice__title flex">
      <span class="flex-grow-1">This site uses cookies</span>
      <button class="icon-action icon-action_invert icon-action_color_subtle">
        {% include icon.html icon="x" %}
      </button>
    </h2>
    <p>By using this site you agree with our use of cookies. <a class="link link_invert" href="#">Read more about our cookie policy &rarr;</a></p>
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
<div class="notice notice_stack notice_color_dark elevate-16dp">
  <div class="notice__body margin-bottom-lg gap-sm">
    <h2 class="notice__title flex">
      <span class="flex-grow-1">...</span>
      <button class="icon-action icon-action_invert icon-action_color_subtle">
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
