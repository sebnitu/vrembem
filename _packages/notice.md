---
layout: article
title: Notice
description: "A component for highlighting messages to the user."
package: "@vrembem/notice"
category: compound
usage:
  npm: true
  scss: true
---

## notice

The most basic implementation of the notice component consists of the `notice` container element wrapping text content.

{% include demo_open.html %}
<div class="notice">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
</div>
{% include demo_switch.html %}
```html
<div class="notice">
  ...
</div>
```
{% include demo_close.html %}

## notice__title

Add a title to your notice using the `notice__title` element.

{% include demo_open.html %}
<div class="notice">
  <h2 class="notice__title">Notice title</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
</div>
{% include demo_switch.html %}
```html
<div class="notice">
  <h2 class="notice__title">...</h2>
  <p>...</p>
</div>
```
{% include demo_close.html %}

## notice + media

For cases where a notice message should be displayed alongside an icon or image, try combining it with the media component.

{% include demo_open.html class_parent="gap-y" %}
<div class="notice notice_state_danger">
  <div class="media media_gap_sm">
    <div class="media__obj">
      {% include icon.html icon="alert-circle" %}
    </div>
    <div class="media__body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
    </div>
  </div>
</div>
<div class="notice notice_state_info">
  <div class="media media_gap_sm">
    <div class="media__body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et.</p>
    </div>
    <div class="media__obj">
      {% include icon.html icon="archive" %}
    </div>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice">
  <div class="media media_gap_sm">
    <div class="media__obj">
      ...
    </div>
    <div class="media__body">
      ...
    </div>
  </div>
</div>
```
{% include demo_close.html %}

## notice + icon-action

When a notice needs to be dismissible, try adding the icon-action component along with some flex utilities.

{% include demo_open.html class_parent="gap-y" %}
<div class="notice">
  <div class="flex flex-justify-between">
    <p>Hello, world!</p>
    <button class="icon-action" aria-label="Close">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
<div class="notice">
  <div class="flex flex-justify-between flex-gap-x-sm">
    <p>Lorem ipsum dolor sit amet, consectetur adip iscing elit. Vivamus libero est, fermen.</p>
    <button class="icon-action" aria-label="Close">
      {% include icon.html icon="x" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="notice">
  <div class="flex flex-justify-between">
    <p>...</p>
    <button class="icon-action">
      <svg class="icon" role="img">...</svg>
    </button>
  </div>
</div>
```
{% include demo_close.html %}

> Dismissible JavaScript behavior is not provided.

## notice_state_[value]

Adds styles for changing the look and feel of a notice to better reflect the urgency or status.

{% include demo_open.html class_parent="gap-y" %}

<div class="notice notice_state_info">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est.</p>
</div>

<div class="notice notice_state_success">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est.</p>
</div>

<div class="notice notice_state_caution">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est.</p>
</div>

<div class="notice notice_state_danger">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est.</p>
</div>

{% include demo_switch.html %}
```html
<div class="notice notice_state_info">...</div>
<div class="notice notice_state_success">...</div>
<div class="notice notice_state_caution">...</div>
<div class="notice notice_state_danger">...</div>
```
{% include demo_close.html %}

## Sass Variables

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <!-- Prefixes -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-block</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifier values with.</td>
      </tr>
      <!-- General -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">0.5em</code></td>
        <td data-mobile-label="Desc">The default gap spacing for the notice component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1em</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the notice.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the border property of the notice.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property of the notice.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$shade</code></td>
        <td data-mobile-label="Desc">Sets the background property of the notice.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property of the notice.</td>
      </tr>
      <!-- Title -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$title-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the <code class="code">notice__title</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$title-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$line-height-lg</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the <code class="code">notice__title</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$title-font-weight</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-weight-semi-bold</code></td>
        <td data-mobile-label="Desc">Sets the font-weight property of the <code class="code">notice__title</code> element.</td>
      </tr>
    </tbody>
  </table>
</div>
