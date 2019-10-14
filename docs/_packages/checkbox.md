---
layout: article
title: Checkbox
description: "Checkboxes allow the user to select multiple options from a set."
category: simple
usage:
  npm: "@vrembem/checkbox"
  scss: "@vrembem/checkbox/index"
---

{% include flag.html heading="checkbox" %}

{% include demo_open.html %}
  {% include checkbox.html checked="" %}
  {% include checkbox.html %}
{% include demo_switch.html %}
```html
<span class="checkbox">
  <input type="checkbox" class="checkbox__native">
  <span class="checkbox__background">
    <span class="checkbox__box">
      <span class="checkbox__icon"></span>
    </span>
  </span>
</span>
```
{% include demo_close.html %}

{% include flag.html heading="checkbox + label" %}

{% include demo_open.html %}
<p>
  <label>
    {% include checkbox.html checked="" %}
    Checkbox with a label
  </label>
</p>
<p>
  <label>
    {% include checkbox.html %}
    Checkbox with a label
  </label>
</p>
{% include demo_switch.html %}
```html
<label>
  <span class="checkbox">
    <input type="checkbox" class="checkbox__native">
    <span class="checkbox__background">
      <span class="checkbox__box">
        <span class="checkbox__icon"></span>
      </span>
    </span>
  </span>
  Checkbox with a label
</label>
```
{% include demo_close.html %}
