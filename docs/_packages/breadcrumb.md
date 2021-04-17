---
layout: article
title: Breadcrumb
description: "A navigation component that shows the hierarchical path to a users current location."
package: "@vrembem/breadcrumb"
category: compound
usage:
  npm: true
  scss: true
---

## breadcrumb

The breadcrumb component is composed of three parts: `breadcrumb`, `breadcrumb__item` and `breadcrumb__link`.

{% include demo_open.html class_grid="grid_stack" %}
<ol class="breadcrumb">
  <li class="breadcrumb__item">
    <a href="#" class="breadcrumb__link">&larr; Home</a>
  </li>
  <li class="breadcrumb__item">
    <a href="#" class="breadcrumb__link">Blog</a>
  </li>
  <li class="breadcrumb__item">
    <a href="#" class="breadcrumb__link">Category</a>
  </li>
  <li class="breadcrumb__item">
    <span class="breadcrumb__text">Current Page</span>
  </li>
</ol>
{% include demo_switch.html %}
```html
<ol class="breadcrumb">
  <li class="breadcrumb__item">
    <a href="/" class="breadcrumb__link">Home</a>
  </li>
  ...
  <li class="breadcrumb__item">
    Current Page
  </li>
</ol>
```
{% include demo_close.html %}

## breadcrumb_invert

Inverts the colors of the breadcrumb component to be used on dark backgrounds when more contrast is needed.

{% include demo_open.html class_grid="grid_stack" %}
<div class="padding background-night radius">
  <ol class="breadcrumb breadcrumb_invert">
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link">&larr; Home</a>
    </li>
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link">Blog</a>
    </li>
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link">Category</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__text">Current Page</span>
    </li>
  </ol>
</div>
{% include demo_switch.html %}
```html
<ol class="breadcrumb breadcrumb_invert">
  ...
</ol>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color-subtle</code></td>
        <td data-mobile-label="Desc">Sets the color property.</td>
      </tr>
      <!-- Delimiter -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$delimiter</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"/"</code></td>
        <td data-mobile-label="Desc">Sets the delimiter character used after each <code class="code">breadcrumb__item</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$delimiter-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color-dark</code></td>
        <td data-mobile-label="Desc">Sets the color property for the delimiter character.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$delimiter-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0 0.5em</code></td>
        <td data-mobile-label="Desc">Sets the padding property for the delimiter character.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$delimiter-last</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">false</code></td>
        <td data-mobile-label="Desc">Whether or not to render the delimiter at the end of the breadcrumb.</td>
      </tr>
      <!-- Link element -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">base.$link-color</code></td>
        <td data-mobile-label="Desc">Sets the color property on the <code class="code">breadcrumb__link</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">base.$link-color-hover</code></td>
        <td data-mobile-label="Desc">Sets the color property on the <code class="code">breadcrumb__link</code> element for its <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border</code></td>
        <td data-mobile-label="Desc">Sets the border property on the <code class="code">breadcrumb__link</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-border-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1px solid base.$link-color-hover</code></td>
        <td data-mobile-label="Desc">Sets the border property on the <code class="code">breadcrumb__link</code> element for its <code class="code">:hover</code> state.</td>
      </tr>
      <!-- Invert modifier -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$color-invert-subtle</code></td>
        <td data-mobile-label="Desc">Sets the color property on the <code class="code">breadcrumb_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-delimiter-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color-invert-dark</code></td>
        <td data-mobile-label="Desc">Sets the color property for the delimiter character on the <code class="code">breadcrumb_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-link-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">base.$link-invert-color</code></td>
        <td data-mobile-label="Desc">Sets the color property on the <code class="code">breadcrumb__link</code> element on the <code class="code">breadcrumb_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-link-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">base.$link-invert-color-hover</code></td>
        <td data-mobile-label="Desc">Sets the color property on the <code class="code">breadcrumb__link</code> element on the <code class="code">breadcrumb_invert</code> modifier for its <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-link-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-invert</code></td>
        <td data-mobile-label="Desc">Sets the border property on the <code class="code">breadcrumb__link</code> element on the <code class="code">breadcrumb_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-link-border-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1px solid core.$white</code></td>
        <td data-mobile-label="Desc">Sets the border property on the <code class="code">breadcrumb__link</code> element on the <code class="code">breadcrumb_invert</code> modifier for its <code class="code">:hover</code> state.</td>
      </tr>
    </tbody>
  </table>
</div>
