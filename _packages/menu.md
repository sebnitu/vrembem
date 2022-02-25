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

### `@mixin menu-inline()`

Output the styles for an inline menu.

**Example**

```scss
.menu_custom {
  @include menu-inline();
}

// CSS Output
.menu_custom {
  flex-direction: row;
  align-items: center;
}

.menu_custom .menu__item + .menu__item {
  margin-top: 0;
  margin-left: 1px;
}

.menu_custom .menu__sep {
  width: 1px;
  height: auto;
  margin: 0 0.5em;
}

.menu_custom .menu__sep:first-child {
  margin-left: 0;
}

.menu_custom .menu__sep:last-child {
  margin-right: 0;
}

.menu_custom .menu__action {
  justify-content: center;
  white-space: nowrap;
}
```

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

### `@mixin menu-full()`

Output the styles for a full width menu (should be applied to menus that are already inline).

**Example**

```scss
.menu_custom {
  @include menu-full();
}

// CSS Output
.menu_custom .menu__item {
  flex: 1 1 auto;
}

.menu_custom .menu__action {
  justify-content: center;
}
```

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

## menu_size_[value]

Adjust the size of a menu by increasing or decreasing its padding and font-size. By default, the menu scale will provide an action height of 30px (small `menu_size_sm`), 40px (default) and 50px (large `menu_size_lg`).

{% include demo_open.html %}
<div class="scroll-box gap-y padding-y-md">
  <ul class="menu menu_inline menu_size_sm">
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
  <ul class="menu menu_inline menu_size_lg">
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
</div>
{% include demo_switch.html %}
```html
<ul class="menu menu_size_sm">
  ...
</ul>

<ul class="menu menu_size_lg">
  ...
</ul>
```
{% include demo_close.html %}

### Available Variations

- `menu_size_sm`
- `menu_size_lg`

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
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of menu actions using the min-height and min-width properties.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$padding</code></td>
        <td data-mobile-label="Desc">Sets the padding property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1px</code></td>
        <td data-mobile-label="Desc">Sets the gap spacing between <code class="code">menu__item</code> elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$inner-gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1em</code></td>
        <td data-mobile-label="Desc">The horizontal gap spacing for elements inside the <code class="code">menu__action</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">none</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.05)</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.05)</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$black, 0.1)</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$color</code></td>
        <td data-mobile-label="Desc">Sets the color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1em</code></td>
        <td data-mobile-label="Desc">Sets the font-size property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1.5</code></td>
        <td data-mobile-label="Desc">Sets the line-height property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$sep-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">1px</code></td>
        <td data-mobile-label="Desc">Sets the size on the <code class="code">menu__sep</code> element using height and width properties based on orientation.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$sep-gap</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">0.5em</code></td>
        <td data-mobile-label="Desc">Sets the spacing gap created around the <code class="code">menu__sep</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$sep-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-color</code></td>
        <td data-mobile-label="Desc">Sets the background property on the <code class="code">menu__sep</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$active-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">none</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">is-active</code> state class.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$active-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$primary</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">is-active</code> state class.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$disabled-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">none</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">is-disabled</code> state class.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$disabled-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$color-subtle</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">is-disabled</code> state class.</td>
      </tr>
      <!-- menu_invert -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the background property of the <code class="code">menu_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-background-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$white, 0.05)</code></td>
        <td data-mobile-label="Desc">Sets the background property of the <code class="code">menu_invert</code> modifier on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-background-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$white, 0.05)</code></td>
        <td data-mobile-label="Desc">Sets the background property of the <code class="code">menu_invert</code> modifier on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-background-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$white, 0.1)</code></td>
        <td data-mobile-label="Desc">Sets the background property of the <code class="code">menu_invert</code> modifier on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the color property of the <code class="code">menu_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-color-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property of the <code class="code">menu_invert</code> modifier on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-color-focus</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property of the <code class="code">menu_invert</code> modifier on <code class="code">:focus</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-color-active</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">null</code></td>
        <td data-mobile-label="Desc">Sets the color property of the <code class="code">menu_invert</code> modifier on <code class="code">:active</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-sep-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$border-color-invert</code></td>
        <td data-mobile-label="Desc">Sets the background property on the <code class="code">menu__sep</code> element of the <code class="code">menu_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-active-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">none</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">is-active</code> state class of the <code class="code">menu_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-active-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$primary</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">is-active</code> state class of the <code class="code">menu_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-disabled-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">none</code></td>
        <td data-mobile-label="Desc">Sets the background property on <code class="code">is-disabled</code> state class of the <code class="code">menu_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-disabled-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">rgba(core.$white, 0.5)</code></td>
        <td data-mobile-label="Desc">Sets the color property on <code class="code">is-disabled</code> state class of the <code class="code">menu_invert</code> modifier.</td>
      </tr>
      <!-- menu_size_[value] -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of menu actions of the <code class="code">menu_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$padding-sm</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the <code class="code">menu_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size-sm</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the <code class="code">menu_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-sm-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$line-height-sm</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the <code class="code">menu_size_sm</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$form-control-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the minimum size of menu actions of the <code class="code">menu_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$padding-lg</code></td>
        <td data-mobile-label="Desc">Sets the padding property of the <code class="code">menu_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$font-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the font-size property of the <code class="code">menu_size_lg</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$size-lg-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">core.$line-height-lg</code></td>
        <td data-mobile-label="Desc">Sets the line-height property of the <code class="code">menu_size_lg</code> modifier.</td>
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
