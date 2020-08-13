---
layout: article
title: Checkbox
description: "Checkboxes allow the user to select multiple options from a set."
package: "@vrembem/checkbox"
category: simple
usage:
  npm: true
  scss: true
  js: true
---

## checkbox

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

<div class="notice notice_type_info type"  markdown="1">
For indeterminate checkboxes, apply the `aria-checked="mixed"` attribute and init the checkbox component script.
</div>

```js
import Checkbox from "@vrembem/checkbox";
const checkbox = new Checkbox({ autoInit: true });
```

## checkbox + label

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

## JavaScript Options

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr class="border_top_0">
        <th>Key</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">autoInit</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">false</code></td>
        <td data-mobile-label="Desc">Automatically instantiates the instance</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">stateAttr</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'aria-checked'</code></td>
        <td data-mobile-label="Desc">Attribute to check mixed against</td>
      </tr>
      <tr>
        <td data-mobile-label="Key"><code class="code text_nowrap">stateValue</code></td>
        <td data-mobile-label="Default"><code class="code color_secondary text_nowrap">'mixed'</code></td>
        <td data-mobile-label="Desc">Mixed value to check for</td>
      </tr>
    </tbody>
  </table>
</div>

## JavaScript API

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr class="border_top_0">
        <th>Method</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">checkbox.init()</code></td>
        <td data-mobile-label="Desc">Initializes the checkbox instance</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">checkbox.destroy()</code></td>
        <td data-mobile-label="Desc">Destroys and cleans up the checkbox instantiation</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">checkbox.setAriaState(el, value)</code></td>
        <td data-mobile-label="Desc">Sets the attribute value for mixed checkboxes</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">checkbox.removeAriaState(el)</code></td>
        <td data-mobile-label="Desc">Removes the mixed checkbox attribute</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">checkbox.setIndeterminate(el)</code></td>
        <td data-mobile-label="Desc">Sets the checkbox to an indeterminate (mixed) state</td>
      </tr>
    </tbody>
  </table>
</div>
