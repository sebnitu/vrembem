---
title: Button
---

# Button

<p class="text_lead">The most basic of UI components. Buttons represent an action that a user can take.</p>

## `button`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <a class="button" href="#">Button</a>
    <button class="button">Button</button>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<a class="button" href="#">Button</a>
<button class="button">Button</button>
```
  </div>
  </div>
</div>

## `button__item`

Elements inside the button component receive appropriate spacing using the `> * + *` selector rule. You can also use the `.button__item` element for more specificity.

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="level level_wrap">
      <button class="button button_color_primary">
        {% include icon.html icon="anchor" %}
        <span class="button__item">Button</span>
        <span class="arrow"></span>
      </button>
      <button class="button button_color_primary">
        <span class="button__item">Button</span>
        {% include icon.html icon="anchor" %}
        <span class="arrow"></span>
      </button>
      <button class="button button_color_primary">
        {% include icon.html icon="anchor" %}
        <span class="arrow"></span>
      </button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="button">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
  <span class="button__item">Button</span>
  <span class="arrow"></span>
</button>
```
  </div>
  </div>
</div>

## `button_icon`

Used for when displaying a button with only an icon and no text.

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="level level_wrap">
      <button class="button button_size_small button_icon">
        {% include icon.html icon="anchor" %}
      </button>
      <button class="button button_size_small button_icon button_color_primary">
        {% include icon.html icon="anchor" %}
      </button>
      <button class="button button_icon">
        {% include icon.html icon="anchor" %}
      </button>
      <button class="button button_icon button_color_primary">
        {% include icon.html icon="anchor" %}
      </button>
      <button class="button button_size_large button_icon">
        {% include icon.html icon="anchor" %}
      </button>
      <button class="button button_size_large button_icon button_color_primary">
        {% include icon.html icon="anchor" %}
      </button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="button button_icon">
  <svg role="img" class="icon">
    <use xlink:href="#anchor"></use>
  </svg>
</button>
```
  </div>
  </div>
</div>

## `button_size`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="level level_wrap">
      <button class="button button_size_small button_color_primary">
        <span>Button</span>
      </button>
      <button class="button button_color_primary">
        <span>Button</span>
      </button>
      <button class="button button_size_large button_color_primary">
        <span>Button</span>
      </button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="button button_size_small button_color_primary">Button</button>
<button class="button button_color_primary">Button</button>
<button class="button button_size_large button_color_primary">Button</button>
```
  </div>
  </div>
</div>

## `button_block`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="demo__group">
      <button class="button button_block button_color_primary">Button</button>
    </div>
    <div class="demo__group">
      <button class="button button_block button_color_secondary">Button</button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="button button_block">
  Button
</button>
```
  </div>
  </div>
</div>

## `button_min-width`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="level level_wrap">
      <button class="button button_min-width button_color_primary">Button</button>
      <button class="button button_min-width button_color_secondary">Button</button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="button button_min-width">Button</button>
```
  </div>
  </div>
</div>

## `button_color`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="demo__group level level_wrap">
      <button class="button button_color_primary">Button</button>
      <button class="button button_color_secondary">Button</button>
      <button class="button button_color_success">Button</button>
      <button class="button button_color_caution">Button</button>
      <button class="button button_color_danger">Button</button>
    </div>
    <div class="demo__group bg_gray p_1">
      <button class="button button_color_inverted">Button</button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="button button_color_inverted">Button</button>
<button class="button button_color_primary">Button</button>
<button class="button button_color_secondary">Button</button>
<button class="button button_color_success">Button</button>
<button class="button button_color_caution">Button</button>
<button class="button button_color_danger">Button</button>
```
  </div>
  </div>
</div>

## `button_outline`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="demo__group level level_wrap">
      <button class="button button_outline">Button</button>
      <button class="button button_outline_primary">Button</button>
      <button class="button button_outline_secondary">Button</button>
      <button class="button button_outline_success">Button</button>
      <button class="button button_outline_caution">Button</button>
      <button class="button button_outline_danger">Button</button>
      <button class="button button_outline_dark">Button</button>
      <button class="button button_outline_fade">Button</button>
    </div>
    <div class="demo__group bg_gray p_1">
      <button class="button button_outline_inverted">Button</button>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<button class="button button_outline">Button</button>
<button class="button button_outline_inverted">Button</button>
<button class="button button_outline_primary">Button</button>
<button class="button button_outline_secondary">Button</button>
<button class="button button_outline_success">Button</button>
<button class="button button_outline_caution">Button</button>
<button class="button button_outline_danger">Button</button>
<button class="button button_outline_dark">Button</button>
<button class="button button_outline_fade">Button</button>
```
  </div>
  </div>
</div>
