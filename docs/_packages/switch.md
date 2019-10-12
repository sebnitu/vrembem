---
layout: article
title: "Switch"
description: "Switches are a binary form element used to toggle between two options."
category: simple
usage:
  npm: "@vrembem/switch"
  scss: "vrembem/switch/index"
---

{% include flag.html heading="switch" %}

{% include demo_open.html %}
<div>
  <span class="checkbox">
    <input type="checkbox" class="checkbox__native">
    <span class="checkbox__background">
      <span class="checkbox__box">
        <span class="checkbox__icon"></span>
      </span>
    </span>
  </span>
  <span class="switch">
    <input type="checkbox" class="switch__native">
    <span class="switch__background">
      <span class="switch__track">
        <span class="switch__thumb"></span>
      </span>
    </span>
  </span>
</div>
<div>
  <span class="radio">
    <input type="radio" class="radio__native" name="radio">
    <span class="radio__background">
      <span class="radio__circle">
        <span class="radio__dot"></span>
      </span>
    </span>
  </span>
  <span class="radio">
    <input type="radio" class="radio__native" name="radio">
    <span class="radio__background">
      <span class="radio__circle">
        <span class="radio__dot"></span>
      </span>
    </span>
  </span>
</div>
{% include demo_switch.html %}
```html
...
```
{% include demo_close.html %}
