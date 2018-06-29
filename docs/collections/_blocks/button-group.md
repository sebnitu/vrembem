---
title: Button-group
---

# Button-group

<p class="text_lead">A container component for groups of buttons.</p>

## `button-group`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="demo__group">
      <div class="button-group">
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group">
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="button-group">
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
</div>
```
  </div>
  </div>
</div>

## `button-group_full`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="button-group button-group_full">
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
</div>
```
  </div>
  </div>
</div>

## `button-group_stack`

<div class="demo grid grid_md">
  <div class="demo__render grid__item">
    <div class="level">
      <div class="button-group button-group_stack">
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
      </div>
      <div class="button-group button-group_stack">
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="button-group button-group_stack">
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
</div>
```
  </div>
  </div>
</div>

## `button-group_stack + button-group_full`

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="demo__group">
      <div class="button-group button-group_stack button-group_full">
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group button-group_stack button-group_full">
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="button-group button-group_stack button-group_full">
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
</div>
```
  </div>
  </div>
</div>

## Item Modifiers

## `button-group > button_equal`

Item modifier to set flex-basis to 0.

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button button_color_primary button_equal">Button</button>
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
        <button class="button button_outline button_equal">Button</button>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="button-group button-group_full">
  <button class="button button_color_primary button_equal">Button</button>
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
</div>
```
  </div>
  </div>
</div>

## `button-group > button_static`

Item modifier to remove flex-grow.

<div class="demo grid grid_md">
  <div class="demo__render grid__item spacing">
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button button_color_primary button_static">Button</button>
        <button class="button button_color_primary">Button</button>
        <button class="button button_color_primary">Button</button>
      </div>
    </div>
    <div class="demo__group">
      <div class="button-group button-group_full">
        <button class="button button_outline">Button</button>
        <button class="button button_outline">Button</button>
        <button class="button button_outline button_static">Button</button>
      </div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="button-group button-group_full">
  <button class="button button_color_primary button_static">Button</button>
  <button class="button button_color_primary">Button</button>
  <button class="button button_color_primary">Button</button>
</div>
```
  </div>
  </div>
</div>
