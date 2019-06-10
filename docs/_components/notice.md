---
layout: article
title: Notice
description: "A component for highlighting messages to the user."
category: simple
# usage:
  # npm: "@vrembem/notice"
  # scss: "vrembem/notice/all"
---

{% include flag.html heading="notice" %}

{% include demo_open.html %}

<div class="notice">
  Notice content goes here...
</div>

{% include demo_switch.html %}

```html
<div class="notice">
  ...
</div>
```

{% include demo_close.html %}

{% include flag.html heading="notice__close" %}

{% include demo_open.html class_parent="spacing" %}

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

{% include demo_switch.html %}

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

{% include demo_close.html %}

{% include flag.html heading="notice_type_[name]" %}

{% include demo_open.html class_parent="type" %}

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

{% include flag.html heading="notice_type_[name] > [content]" %}

{% include demo_open.html class_parent="type" %}

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

{% include demo_switch.html %}

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

{% include demo_close.html %}
