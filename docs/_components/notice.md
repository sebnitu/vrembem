---
layout: page
title: Notice
description: "A component for highlighting messages to the user."
tags: block simple
---

## `.notice`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <div class="notice">
      Notice content goes here...
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="notice">
  ...
</div>
```
  </div>
  </div>
</div>

## `.notice_link`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <a href="#" class="notice notice_link">
      Notice content goes here...
    </a>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<a href="#" class="notice notice_link">
  ...
</a>
```
  </div>
  </div>
</div>

## `.notice__close`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render type">
    <div class="notice" data-dismissible>
      <span class="notice__close" data-dismiss>
        <a href="#" class="link">Close</a>
      </span>
      Notice content goes here...
    </div>
    <div class="notice" data-dismissible>
      <button class="notice__close icon-action" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </button>
      Notice content goes here...
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="notice" data-dismissible>
  <span class="notice__close" data-dismiss>
    <a href="#" class="link">Close</a>
  </span>
  ...
</div>

<div class="notice" data-dismissible>
  <button class="notice__close icon-action" data-dismiss>
    <svg role="img" class="icon">
      <use xlink:href="#x"></use>
    </svg>
  </button>
  ...
</div>
```
  </div>
  </div>
</div>

## `.notice_type_[name]`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render spacing type">
    <div class="notice notice_type_primary" data-dismissible>
      <button class="notice__close icon-action" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </button>
      Notice <a href="#">content</a> goes here...
    </div>
    <div class="notice notice_type_secondary" data-dismissible>
      <button class="notice__close icon-action" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </button>
      Notice <a href="#">content</a> goes here...
    </div>
    <div class="notice notice_type_accent" data-dismissible>
      <button class="notice__close icon-action" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </button>
      Notice <a href="#">content</a> goes here...
    </div>
    <div class="notice notice_type_shade" data-dismissible>
      <button class="notice__close icon-action" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </button>
      Notice <a href="#">content</a> goes here...
    </div>
    <div class="notice notice_type_dark" data-dismissible>
      <button class="notice__close icon-action icon-action_color_invert" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </button>
      Notice <a href="#">content</a> goes here...
    </div>
    <div class="notice notice_type_info" data-dismissible>
      <span class="notice__close" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </span>
      Notice <a href="#">content</a> goes here...
    </div>
    <div class="notice notice_type_success" data-dismissible>
      <span class="notice__close" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </span>
      Notice <a href="#">content</a> goes here...
    </div>
    <div class="notice notice_type_caution" data-dismissible>
      <span class="notice__close" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </span>
      Notice <a href="#">content</a> goes here...
    </div>
    <div class="notice notice_type_danger" data-dismissible>
      <span class="notice__close" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </span>
      Notice <a href="#">content</a> goes here...
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
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
  </div>
  </div>
</div>

## `.notice_type_[name]` `>` `[content]`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render type">
    <div class="notice notice_type_info" data-dismissible>
      <span class="notice__close" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </span>
      <h4>Heading</h4>
      <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing</a> elit. Etiam sed semper dui. Donec malesuada, augue sit amet auctor elementum, est sem consectetur nisi, ac pretium massa sapien eu quam.</p>
    </div>
    <div class="notice notice_type_success" data-dismissible>
      <span class="notice__close" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </span>
      <h4>Heading</h4>
      <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing</a> elit. Etiam sed semper dui. Donec malesuada, augue sit amet auctor elementum, est sem consectetur nisi, ac pretium massa sapien eu quam.</p>
    </div>
    <div class="notice notice_type_caution" data-dismissible>
      <span class="notice__close" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </span>
      <h4>Heading</h4>
      <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing</a> elit. Etiam sed semper dui. Donec malesuada, augue sit amet auctor elementum, est sem consectetur nisi, ac pretium massa sapien eu quam.</p>
    </div>
    <div class="notice notice_type_danger" data-dismissible>
      <span class="notice__close" data-dismiss>
      {% include icon.html icon="x" class="icon" %}
      </span>
      <h4>Heading</h4>
      <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing</a> elit. Etiam sed semper dui. Donec malesuada, augue sit amet auctor elementum, est sem consectetur nisi, ac pretium massa sapien eu quam.</p>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="notice notice_type_info" data-dismissible>
  <span class="notice__close" data-dismiss>
    ...
  </span>
    ...
</div>

<div class="notice notice_type_success" data-dismissible>
  <span class="notice__close" data-dismiss>
    ...
  </span>
    ...
</div>

<div class="notice notice_type_caution" data-dismissible>
  <span class="notice__close" data-dismiss>
    ...
  </span>
    ...
</div>

<div class="notice notice_type_danger" data-dismissible>
  <span class="notice__close" data-dismiss>
    ...
  </span>
    ...
</div>
```
  </div>
  </div>
</div>
