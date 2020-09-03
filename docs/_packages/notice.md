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
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
</div>
{% include demo_switch.html %}
```html
<div class="notice">
  ...
</div>
```
{% include demo_close.html %}

## notice + media

{% include demo_open.html class_parent="gap-y" %}
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

## notice_type_[key]

{% include demo_open.html class_parent="spacing" %}

<div class="notice notice_type_info">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est.</p>
</div>

<div class="notice notice_type_success">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est.</p>
</div>

<div class="notice notice_type_caution">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est.</p>
</div>

<div class="notice notice_type_danger">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est.</p>
</div>

{% include demo_switch.html %}
```html
<div class="notice notice_type_info">
  ...
</div>

<div class="notice notice_type_success">
  ...
</div>

<div class="notice notice_type_caution">
  ...
</div>

<div class="notice notice_type_danger">
  ...
</div>
```
{% include demo_close.html %}
