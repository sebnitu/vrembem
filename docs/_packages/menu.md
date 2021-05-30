---
layout: article
title: Menu
description: "Menus represent groups of links, actions or tools that a user can interact with."
package: "@vrembem/menu"
category: compound
usage:
  npm: true
  scss: true
---

## menu

The menu component is composed of at minimum three parts: `menu`, `menu__item` and `menu__action`. The menu and menu items should be a `<ul>` and list items `<li>` respectively while the menu action can be either an `<a>` or `<button>` element. Also available is the optional `menu__sep` element to create separators in between menu items.

{% include demo_open.html %}
<ul class="menu">
  <li class="menu__item">
    <button class="menu__action">Undo</button>
  </li>
  <li class="menu__item">
    <button class="menu__action">Redo</button>
  </li>
  <li class="menu__sep"></li>
  <li class="menu__item">
    <button class="menu__action">Cut</button>
  </li>
  <li class="menu__item">
    <button class="menu__action">Copy</button>
  </li>
  <li class="menu__item">
    <button class="menu__action">Paste</button>
  </li>
</ul>
{% include demo_switch.html %}
```html
<ul class="menu">
  <li class="menu__item">
    <button class="menu__action">
      ...
    </button>
  </li>
  <li class="menu__sep"></li>
</ul>
```
{% include demo_close.html %}

Use the `menu__text` element to wrap text inside the `menu__action` element. Additional elements inside the menu action receive appropriate spacing.

{% include demo_open.html %}
<ul class="menu">
  <li class="menu__item">
    <button class="menu__action">
      {% include icon.html class="color-primary" icon="scissors" %}
      <span class="menu__text">Cut</span>
      <span class="color-subtle">&#x2318;X</span>
    </button>
  </li>
  <li class="menu__item">
    <button class="menu__action">
      {% include icon.html class="color-primary" icon="copy" %}
      <span class="menu__text">Copy</span>
      <span class="color-subtle">&#x2318;C</span>
    </button>
  </li>
  <li class="menu__item">
    <button class="menu__action">
      {% include icon.html class="color-primary" icon="clipboard" %}
      <span class="menu__text">Paste</span>
      <span class="color-subtle">&#x2318;V</span>
    </button>
  </li>
  <li class="menu__sep"></li>
  <li class="menu__item">
    <button class="menu__action">
      {% include icon.html class="color-primary" icon="log-out" %}
      <span class="menu__text">Logout</span>
    </button>
  </li>
</ul>
{% include demo_switch.html %}
```html
<button class="menu__action">
  <svg class="icon" role="img"></svg>
  <span class="menu__text">...</span>
  <span class="color-subtle">...</span>
</button>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="scroll-box">
  <ul class="menu menu_inline">
    <li class="menu__item">
      <a class="menu__action" href="#">
        {% include icon.html icon="thumbs-up" %}
        <span>30k</span>
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">
        {% include icon.html icon="thumbs-down" %}
        <span>1k</span>
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">
        {% include icon.html icon="share" %}
        <span>Share</span>
      </a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="more-horizontal" %}
      </a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<button class="menu__action">
  <svg class="icon" role="img"></svg>
  <span class="menu__text">...</span>
</button>
```
{% include demo_close.html %}

For links that only contain an icon, you can use the `menu__action_icon` element modifier to create a square link similar to the `button_icon` modifier.

{% include demo_open.html %}
<div class="scroll-box">
  <ul class="menu menu_inline">
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="arrow-left" %}
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="arrow-right" %}
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="rotate-cw" %}
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="home" %}
      </a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="at-sign" %}
      </a>
    </li>
    <li class="menu__item">
      <a class="menu__action menu__action_icon" href="#">
        {% include icon.html icon="more-vertical" %}
      </a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<button class="menu__action menu__action_icon">
  ...
</button>
```
{% include demo_close.html %}

### is-active

Adding the `is-active` class will provide visual indication that the action is currently in an active state.

{% include demo_open.html %}
<ul class="menu">
  <li class="menu__item">
    <button class="menu__action is-active" disabled>Active example</button>
  </li>
</ul>
{% include demo_switch.html %}
```html
<button class="menu__action is-active" disabled>
  ...
</button>
```
{% include demo_close.html %}

### is-disabled

Adding the boolean `disabled` attribute or `is-disabled` class will provide visual indication that the user should not be able to interact with the action.

{% include demo_open.html %}
<ul class="menu">
  <li class="menu__item">
    <button class="menu__action is-disabled" disabled>Disabled example</button>
  </li>
</ul>
{% include demo_switch.html %}
```html
<button class="menu__action is-disabled" disabled>
  ...
</button>
```
{% include demo_close.html %}

## menu_inline_[key]

Used to apply horizontal menu styles. This is typically used for short menus or toolbars where vertical space can be saved.

{% include demo_open.html %}
<div class="scroll-box">
  <ul class="menu menu_inline">
    <li class="menu__item">
      <a class="menu__action" href="#">Create</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Edit</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Delete</a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_inline">...</ul>
```
{% include demo_close.html %}

To set a menu to inline **above** a specific breakpoint, use the inline breakpoint modifier: `menu_inline_[key]`

{% include demo_open.html %}
<div class="scroll-box">
  <ul class="menu menu_inline_lg">
    <li class="menu__item">
      <a class="menu__action" href="#">Create</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Edit</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Delete</a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_inline_lg">...</ul>
```
{% include demo_close.html %}

### Available Variations

- `menu_inline_xl`
- `menu_inline_lg`
- `menu_inline_md`
- `menu_inline_sm`
- `menu_inline_xs`

## menu_full_[key]

Used to span a horizontal menu to fill the full width of its container. This modifier is meant to be paired with the `menu_inline` modifier as the default styles of a vertical menu already fill the full width of their container.

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  <ul class="menu menu_inline menu_full">
    <li class="menu__item">
      <a class="menu__action" href="#">Create</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Edit</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Delete</a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_inline menu_full">...</ul>
```
{% include demo_close.html %}

To set a menu to full **below** a specific breakpoint, use the full breakpoint modifier: `menu_full_[key]`

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  <ul class="menu menu_inline menu_full_lg">
    <li class="menu__item">
      <a class="menu__action" href="#">Create</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Edit</a>
    </li>
    <li class="menu__item">
      <a class="menu__action" href="#">Delete</a>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <a class="menu__action" href="#">Logout</a>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_inline menu_full_lg">...</ul>
```
{% include demo_close.html %}

### Available Variations

- `menu_full_xl`
- `menu_full_lg`
- `menu_full_md`
- `menu_full_sm`
- `menu_full_xs`

## menu_invert

A modifier that provides an inversed menu style for better contrast on a dark background.

{% include demo_open.html %}
<div class="padding background-night radius gap">
  <ul class="menu menu_invert">
    <li class="menu__item">
      <button class="menu__action">Undo</button>
    </li>
    <li class="menu__item">
      <button class="menu__action is-active">Redo</button>
    </li>
    <li class="menu__sep"></li>
    <li class="menu__item">
      <button class="menu__action is-disabled" disabled>Cut</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Copy</button>
    </li>
    <li class="menu__item">
      <button class="menu__action">Paste</button>
    </li>
  </ul>
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_invert">
  ...
</ul>
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
        <td data-mobile-label="Var"><code class="code text-nowrap">$breakpoints</code></td>
        <td data-mobile-label="Default">
          <a class="link text-nowrap" href="#breakpoints"><code class="code color-secondary">core.$breakpoints</code> Ref &darr;</a>
        </td>
        <td data-mobile-label="Desc">The breakpoints map the <code class="code">menu_inline_[key]</code> and <code class="code">menu_full_[key]</code> modifiers uses to build their styles.</td>
      </tr>
    </tbody>
  </table>
</div>

### $breakpoints

The breakpoints map the `menu_inline_[key]` and `menu_full_[key]` modifiers uses to build their styles.

```scss
// Inherited from: core.$breakpoints
$breakpoints: (
  "xs": 480px,
  "sm": 620px,
  "md": 760px,
  "lg": 990px,
  "xl": 1380px
) !default;
```
