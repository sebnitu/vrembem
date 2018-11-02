---
layout: page
title: Input
description: "The default component for user input."
---

## `input`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <input class="input" placeholder="Default input..." type="text" />
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<input class="input" placeholder="Text input..." type="text" />
```
  </div>
  </div>
</div>

## `input_type_select`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render">
    <select class="input input_type_select">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<select class="input input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
```
  </div>
  </div>
</div>

## `input_type_textarea`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render spacing">
    <div class="demo__group">
      <textarea class="input input_type_textarea" rows="3"></textarea>
    </div>
    <div class="demo__group">
      <textarea class="input input_type_textarea" rows="2"></textarea>
    </div>
    <div class="demo__group">
      <textarea class="input input_type_textarea" rows="1"></textarea>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<textarea class="input input_type_textarea" rows="3"></textarea>
<textarea class="input input_type_textarea" rows="2"></textarea>
<textarea class="input input_type_textarea" rows="1"></textarea>
```
  </div>
  </div>
</div>

## `input_size`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render spacing">
    <div class="demo__group">
      <input class="input input_size_sm" placeholder="Default input..." type="text" />
    </div>
    <div class="demo__group">
      <input class="input" placeholder="Default input..." type="text" />
    </div>
    <div class="demo__group">
      <input class="input input_size_lg" placeholder="Default input..." type="text" />
    </div>
    <div class="demo__group">
      <select class="input input_type_select input_size_sm">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
    <div class="demo__group">
      <select class="input input_type_select">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
    <div class="demo__group">
      <select class="input input_type_select input_size_lg">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<input class="input input_size_sm" placeholder="Default input..." type="text" />
<input class="input input_size_lg" placeholder="Default input..." type="text" />
<select class="input input_type_select input_size_sm">...</select>
<select class="input input_type_select input_size_lg">...</select>
```
  </div>
  </div>
</div>

## `input_state_success`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render spacing">
    <div class="demo__group">
      <input class="input input_state_success" type="text" />
    </div>
    <div class="demo__group">
      <select class="input input_state_success input_type_select">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
    <div class="demo__group">
      <textarea class="input input_state_success input_type_textarea" rows="3"></textarea>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<input class="input input_state_success" type="text" />
<select class="input input_state_success input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_success input_type_textarea" rows="3"></textarea>
```
  </div>
  </div>
</div>

## `input_state_caution`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render spacing">
    <div class="demo__group">
      <input class="input input_state_caution" type="text" />
    </div>
    <div class="demo__group">
      <select class="input input_state_caution input_type_select">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
    <div class="demo__group">
      <textarea class="input input_state_caution input_type_textarea" rows="3"></textarea>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<input class="input input_state_caution" type="text" />
<select class="input input_state_caution input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_caution input_type_textarea" rows="3"></textarea>
```
  </div>
  </div>
</div>

## `input_state_danger`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demo__render spacing">
    <div class="demo__group">
      <input class="input input_state_danger" type="text" />
    </div>
    <div class="demo__group">
      <select class="input input_state_danger input_type_select">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
    <div class="demo__group">
      <textarea class="input input_state_danger input_type_textarea" rows="3"></textarea>
    </div>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<input class="input input_state_danger" type="text" />
<select class="input input_state_danger input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_danger input_type_textarea" rows="3"></textarea>
```
  </div>
  </div>
</div>
