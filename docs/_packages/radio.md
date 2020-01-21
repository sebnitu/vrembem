---
layout: article
title: Radio Button
description: "Radios allow the user to select a single option from a set."
category: simple
usage:
  npm: "radio"
  scss: "radio"
---

{% include flag.html heading="radio" %}

{% include demo_open.html %}
  {% include radio.html name="radio-1" checked="" %}
  {% include radio.html name="radio-1" %}
{% include demo_switch.html %}
```html
<span class="radio">
  <input type="radio" class="radio__native" name="...">
  <span class="radio__background">
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
  </span>
</span>
```
{% include demo_close.html %}

{% include flag.html heading="radio + label" %}

{% include demo_open.html %}
<p>
  <label>
    {% include radio.html name="radio-2" checked="" %}
    Radio with a label
  </label>
</p>
<p>
  <label>
    {% include radio.html name="radio-2" %}
    Radio with a label
  </label>
</p>
{% include demo_switch.html %}
```html
<label>
  <span class="radio">
    <input type="radio" class="radio__native" name="...">
    <span class="radio__background">
      <span class="radio__circle">
        <span class="radio__dot"></span>
      </span>
    </span>
  </span>
  Radio with a label
</label>
```
{% include demo_close.html %}
