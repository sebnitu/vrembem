---
layout: article
title: Checkbox
description: "Checkboxes allow the user to select multiple options from a set."
category: simple
usage:
  npm: "checkbox"
  scss: "checkbox"
  js: "checkbox"
---

{% include flag.html heading="checkbox" %}

{% include demo_open.html %}
  {% include checkbox.html checked="" %}
  {% include checkbox.html indeterminate="true" %}
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

<div class="notice notice_state_info type"  markdown="1">
For indeterminate checkboxes, apply the `aria-checked="mixed"` attribute and init the checkbox component script.
</div>

<div class="type" markdown="1">
```js
import { Checkbox } from "@vrembem/checkbox"
new Checkbox({ autoInit: true })
```
</div>

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
    {% include checkbox.html indeterminate="true" %}
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

{% include flag.html heading="Checkbox Settings" %}

<div class="scroll-box">
  <table class="table table_zebra">
    <thead>
      <tr class="border_top_0">
        <th>Key</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code class="code text_nowrap">autoInit</code></td>
        <td><code class="code text_nowrap">false</code></td>
        <td>Automatically instantiates the instance</td>
      </tr>

      <tr>
        <td><code class="code text_nowrap">stateAttr</code></td>
        <td><code class="code text_nowrap">"aria-checked"</code></td>
        <td>Attribute to check mixed against</td>
      </tr>

      <tr>
        <td><code class="code text_nowrap">stateValue</code></td>
        <td><code class="code text_nowrap">"mixed"</code></td>
        <td>Mixed value to check for</td>
      </tr>
    </tbody>
  </table>
</div>

{% include flag.html heading="Checkbox API" %}

<div class="scroll-box">
  <table class="table table_zebra">
    <thead>
      <tr class="border_top_0">
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code class="code text_nowrap">checkbox.init()</code></td>
        <td>Initializes the checkbox instance</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">checkbox.destroy()</code></td>
        <td>Destroys and cleans up the checkbox instantiation</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">checkbox.setAriaState(el, value)</code></td>
        <td>Sets the attribute value for mixed checkboxes</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">checkbox.removeAriaState(el)</code></td>
        <td>Removes the mixed checkbox attribute</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">checkbox.setIndeterminate(el)</code></td>
        <td>Sets the checkbox to an indeterminate (mixed) state</td>
      </tr>
    </tbody>
  </table>
</div>
