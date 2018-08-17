---
title: Notice
desc: "A component for highlighting messages to the user."
---

## `.notice`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="notice">
      Notice content goes here...
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

## `.notice__close`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="notice">
      <span class="notice__close">Close</span>
      Notice content goes here...
    </div>
    <div class="notice">
      {% include icon.html icon="x" class="notice__close" %}
      Notice content goes here...
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="notice">
  <span class="notice__close">Close</span>
  ...
</div>

<div class="notice">
  <svg role="img" class="notice__close icon">
    <use xlink:href="#x"></use>
  </svg>
  ...
</div>
```
  </div>
  </div>
</div>

## `.notice__content` `+` `.notice__heading`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="notice">
      {% include icon.html icon="x" class="notice__close" %}
      <div class="notice__content">
        <h2 class="notice__heading">Heading</h2>
        <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing</a> elit. Etiam sed semper dui. Donec malesuada, augue sit amet auctor elementum, est sem consectetur nisi, ac pretium massa sapien eu quam.</p>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="notice">
  <svg role="img" class="notice__close icon">
    <use xlink:href="#x"></use>
  </svg>
  <div class="notice__content">
    ...
  </div>
</div>
```
  </div>
  </div>
</div>

## `.notice_type_[name]`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="notice notice_type_info">
      {% include icon.html icon="x" class="notice__close" %}
      Notice content goes here...
    </div>
    <div class="notice notice_type_success">
      {% include icon.html icon="x" class="notice__close" %}
      Notice content goes here...
    </div>
    <div class="notice notice_type_caution">
      {% include icon.html icon="x" class="notice__close" %}
      Notice content goes here...
    </div>
    <div class="notice notice_type_danger">
      {% include icon.html icon="x" class="notice__close" %}
      Notice content goes here...
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

## `.notice_type_[name]` `>` `.notice__content`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="notice notice_type_info">
      {% include icon.html icon="x" class="notice__close" %}
      <div class="notice__content">
        <h2 class="notice__heading">Heading</h2>
        <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing</a> elit. Etiam sed semper dui. Donec malesuada, augue sit amet auctor elementum, est sem consectetur nisi, ac pretium massa sapien eu quam.</p>
      </div>
    </div>
    <div class="notice notice_type_success">
      {% include icon.html icon="x" class="notice__close" %}
      <div class="notice__content">
        <h2 class="notice__heading">Heading</h2>
        <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing</a> elit. Etiam sed semper dui. Donec malesuada, augue sit amet auctor elementum, est sem consectetur nisi, ac pretium massa sapien eu quam.</p>
      </div>
    </div>
    <div class="notice notice_type_caution">
      {% include icon.html icon="x" class="notice__close" %}
      <div class="notice__content">
        <h2 class="notice__heading">Heading</h2>
        <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing</a> elit. Etiam sed semper dui. Donec malesuada, augue sit amet auctor elementum, est sem consectetur nisi, ac pretium massa sapien eu quam.</p>
      </div>
    </div>
    <div class="notice notice_type_danger">
      {% include icon.html icon="x" class="notice__close" %}
      <div class="notice__content">
        <h2 class="notice__heading">Heading</h2>
        <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing</a> elit. Etiam sed semper dui. Donec malesuada, augue sit amet auctor elementum, est sem consectetur nisi, ac pretium massa sapien eu quam.</p>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="notice notice_type_info">
  <span class="notice__close">
    ...
  </span>
  <div class="notice__content">
    ...
  </div>
</div>

<div class="notice notice_type_success">
  <span class="notice__close">
    ...
  </span>
  <div class="notice__content">
    ...
  </div>
</div>

<div class="notice notice_type_caution">
  <span class="notice__close">
    ...
  </span>
  <div class="notice__content">
    ...
  </div>
</div>

<div class="notice notice_type_danger">
  <span class="notice__close">
    ...
  </span>
  <div class="notice__content">
    ...
  </div>
</div>
```
  </div>
  </div>
</div>
