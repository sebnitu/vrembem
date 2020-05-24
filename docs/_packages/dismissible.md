---
layout: article
title: Dismissible
description: "A component for removing an element from the DOM or hiding it with a CSS class."
category: simple
usage:
  npm: "dismissible"
  js: "dismissible"
---

{% include flag.html heading="dismissible" %}

<div class="type" markdown="1">
Dismissible uses two data attributes to utilize it's functionality. The first is a trigger, created using the `data-dismiss` attribute on a button or anchor element. The second is a parent element of the trigger created using `data-dismissible`. You can optionally pass a dismiss method to either hide an element using a class or remove it from the DOM.

* `data-dismissible="[method]"`
* `data-dismiss`
</div>

{% include demo_open.html %}
<div class="padding background_shade radius" data-dismissible>
  <button class="link" data-dismiss>Dismiss</button>
</div>
{% include demo_switch.html %}
```html
<div data-dismissible>
  <button data-dismiss>Dismiss</button>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="padding background_shade radius" data-dismissible="hide">
  <button class="link" data-dismiss>Hide method</button>
</div>
{% include demo_switch.html %}
```html
<div data-dismissible="hide">
  <button data-dismiss>Hide method</button>
</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="padding background_shade radius" data-dismissible="remove">
  <button class="link" data-dismiss>Remove method</button>
</div>
{% include demo_switch.html %}
```html
<div data-dismissible="remove">
  <button data-dismiss>Remove method</button>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="dismissible + notice" %}

{% include demo_open.html %}
<div data-dismissible class="notice notice_state_success">
  <div class="notice__body">
    <p>This is a notice message</p>
  </div>
  <div class="notice__actions">
    <button data-dismiss class="icon-action">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div data-dismissible class="notice notice_state_success">
  <div class="notice__body">...</div>
  <div class="notice__actions">
    <button data-dismiss class="icon-action">...</button>
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="dismissible + dialog" %}

{% include demo_open.html %}
<div data-dismissible class="dialog">
  <div class="dialog__header">
    <h2 class="dialog__title">Dismissible Dialog</h2>
    <button data-dismiss class="icon-action icon-action_color_subtle">
      {% include icon.html icon="x" %}
    </button>
  </div>
  <div class="dialog__body">
    <p>This is a sample dialog using the dismissible component.</p>
  </div>
  <div class="dialog__footer flex_justify_end">
    <div class="button-group">
      <button data-dismiss class="button button_color_primary">
        Do Action
      </button>
      <button data-dismiss class="button">
        Cancel
      </button>
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div data-dismissible class="dialog">
  <div class="dialog__header">
    <h2 class="dialog__title">...</h2>
    <button data-dismiss class="icon-action icon-action_color_subtle">...</button>
  </div>
  <div class="dialog__body">...</div>
  <div class="dialog__footer flex_justify_end">
    <div class="button-group">
      <button data-dismiss class="button button_color_primary">...</button>
      <button data-dismiss class="button">...</button>
    </div>
  </div>
</div>
```
{% include demo_close.html %}

{% include flag.html heading="Dismissible Settings" %}

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
        <td><code class="code text_nowrap">dataTrigger</code></td>
        <td><code class="code text_nowrap">"dismiss"</code></td>
        <td>Data attribute for a dismiss trigger</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dataTarget</code></td>
        <td><code class="code text_nowrap">"dismissible"</code></td>
        <td>Data attribute for a dismissible element</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">classHide</code></td>
        <td><code class="code text_nowrap">"display_none"</code></td>
        <td>The class to apply for hiding an element</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">method</code></td>
        <td><code class="code text_nowrap">"hide"</code></td>
        <td>The method of dismissing an element. Either "hide" or "remove".</td>
      </tr>
    </tbody>
  </table>
</div>

{% include flag.html heading="Dismissible API" %}

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
        <td><code class="code text_nowrap">dismissible.init()</code></td>
        <td>Initializes the dismissible instance</td>
      </tr>
      <tr>
        <td><code class="code text_nowrap">dismissible.destroy()</code></td>
        <td>Destroys and cleans up the dismissible instantiation</td>
      </tr>
    </tbody>
  </table>
</div>
