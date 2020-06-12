---
layout: article
title: "Switch"
description: "Switches are a binary form element used to toggle between two options."
package: "@vrembem/switch"
category: simple
usage:
  npm: true
  scss: true
---

## switch

{% include demo_open.html %}
  {% include switch.html checked="" %}
  {% include switch.html %}
{% include demo_switch.html %}
```html
<span class="switch">
  <input type="checkbox" class="switch__native">
  <span class="switch__background">
    <span class="switch__track">
      <span class="switch__thumb"></span>
    </span>
  </span>
</span>
```
{% include demo_close.html %}

## switch + label

{% include demo_open.html %}
<p>
  <label>
    {% include switch.html checked="" %}
    Switch with a label
  </label>
</p>
<p>
  <label>
    {% include switch.html %}
    Switch with a label
  </label>
</p>
{% include demo_switch.html %}
```html
<label>
  <span class="switch">
    <input type="checkbox" class="switch__native">
    <span class="switch__background">
      <span class="switch__track">
        <span class="switch__thumb"></span>
      </span>
    </span>
  </span>
  Switch with a label
</label>
```
{% include demo_close.html %}
