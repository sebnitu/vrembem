---
layout: article
title: Icon-action
description: "A component for displaying simple action buttons using icons."
package: "@vrembem/icon-action"
category: simple
usage:
  npm: true
  scss: true
---

## icon-action

The icon-action component consists of two parts, the `icon-action` and it's child `icon` component. Because icon-actions only contain an icon as its content, it's important to add an `aria-label` attribute with a label of what the action does for accessibility.

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <button class="icon-action" aria-label="Dismiss component">
    {% include icon.html icon="x" %}
  </button>
  <button class="icon-action" aria-label="Minimize component">
    {% include icon.html icon="minus" %}
  </button>
  <button class="icon-action" aria-label="Toggle fullscreen mode">
    {% include icon.html icon="maximize-2" %}
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="icon-action" aria-label="Close button">
  <svg role="img" class="icon">
    <!-- SVG markup or link ID goes here... -->
  </svg>
</button>
```
{% include demo_close.html %}

## icon-action_invert

A boolean icon-action modifier that allows icon-actions and their modifiers to provide an inversed version of themselves. Since not all icon-action styles require an inversed variant, this is typically used for when the background context of a button matters. Can be combined with [`icon-action_subtle`](#icon-action_subtle) boolean modifier.

{% include demo_open.html class_grid="grid_stack" %}
<div class="padding radius background-night">
  <div class="level">
    <button class="icon-action icon-action_invert" aria-label="Dismiss component">
      {% include icon.html icon="x" %}
    </button>
    <button class="icon-action icon-action_invert" aria-label="Minimize component">
      {% include icon.html icon="minus" %}
    </button>
    <button class="icon-action icon-action_invert" aria-label="Toggle fullscreen mode">
      {% include icon.html icon="maximize-2" %}
    </button>
  </div>
</div>
{% include demo_switch.html %}
```html
<button class="icon-action" aria-label="...">...</button>
<button class="icon-action icon-action_invert" aria-label="...">...</button>
```
{% include demo_close.html %}

### Available Combinations

- `icon-action icon-action_invert`
- `icon-action icon-action_invert icon-action_subtle`

## icon-action_state_[value]

Adds styles for changing the look and feel of an icon-action to better reflect the urgency or status of the action.

{% include demo_open.html class_grid="grid_stack" %}
<div class="level">
  <button class="icon-action icon-action_state_info" aria-label="Helpful information">
    {% include icon.html icon="anchor" %}
  </button>
  <button class="icon-action icon-action_state_success" aria-label="Fullscreen">
    {% include icon.html icon="maximize-2" %}
  </button>
  <button class="icon-action icon-action_state_caution" aria-label="Minimize">
    {% include icon.html icon="minus" %}
  </button>
  <button class="icon-action icon-action_state_danger" aria-label="Close">
    {% include icon.html icon="x" %}
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="icon-action icon-action_state_info" aria-label="...">...</button>
<button class="icon-action icon-action_state_success" aria-label="...">...</button>
<button class="icon-action icon-action_state_caution" aria-label="...">...</button>
<button class="icon-action icon-action_state_danger" aria-label="...">...</button>
```
{% include demo_close.html %}

### Available Variations

- `icon-action_state_info`
- `icon-action_state_success`
- `icon-action_state_caution`
- `icon-action_state_danger`

## icon-action_subtle

A boolean icon-action modifier that allows icon-actions and their modifiers to provide a more subtle version of themselves. Can be combined with [`icon-action_invert`](#icon-action_invert) boolean modifier.

{% include demo_open.html class_grid="grid_stack" class_parent="flex flex-items-equal" %}
<div class="padding radius background-white border margin-right-sm">
  <button class="icon-action icon-action_subtle" aria-label="Close button">
    {% include icon.html icon="x" %}
  </button>
</div>
<div class="padding radius background-night margin-left-sm">
  <button class="icon-action icon-action_invert icon-action_subtle" aria-label="Close button">
    {% include icon.html icon="x" %}
  </button>
</div>
{% include demo_switch.html %}
```html
<button class="icon-action icon-action_subtle" aria-label="...">...</button>
<button class="icon-action icon-action_subtle icon-action_invert" aria-label="...">...</button>
```
{% include demo_close.html %}

### Available Combinations

- `icon-action icon-action_subtle`
- `icon-action icon-action_subtle icon-action_invert`

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
        <td data-mobile-label="Var"><code class="code text-nowrap">$size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">(core.$font-size * core.$line-height)</code></td>
        <td data-mobile-label="Desc">Sets the width and height properties.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-radius-circle</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.3)</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.4)</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.4)</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.5)</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-focus-visible</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.4) solid 2px</code></td>
        <td data-mobile-label="Desc">Sets the outline property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$outline-focus-visible-offset</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">2px</code></td>
        <td data-mobile-label="Desc">Sets the outline-offset property on <code class="code">:focus</code> state.</td>
      </tr>
      <!-- icon -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$icon-stroke-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">2.5px</code></td>
        <td data-mobile-label="Desc">Sets the stroke-width property on the child <code class="code">icon</code> component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$icon-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the font-size property on the child <code class="code">icon</code> component.</td>
      </tr>
    </tbody>
  </table>
</div>
