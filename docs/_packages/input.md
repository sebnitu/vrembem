---
layout: article
title: Input
description: "The default component for user input."
category: simple
usage:
  npm: "@vrembem/input"
  scss: "vrembem/input/index"
---

{% include flag.html heading="input" %}

{% include demo_open.html %}

<input class="input" placeholder="Text input..." type="text" />

{% include demo_switch.html %}

```html
<input class="input" placeholder="Text input..." type="text" />
```
{% include demo_close.html %}

{% include flag.html heading="input_type_select" %}

{% include demo_open.html %}

<select class="input input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>

{% include demo_switch.html %}

```html
<select class="input input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
```

{% include demo_close.html %}

{% include flag.html heading="input_type_textarea" %}

{% include demo_open.html class_parent="spacing" %}

<div class="demo__group">
  <textarea class="input input_type_textarea" rows="3"></textarea>
</div>

<div class="demo__group">
  <textarea class="input input_type_textarea" rows="2"></textarea>
</div>

<div class="demo__group">
  <textarea class="input input_type_textarea" rows="1"></textarea>
</div>

{% include demo_switch.html %}

```html
<textarea class="input input_type_textarea" rows="3"></textarea>
<textarea class="input input_type_textarea" rows="2"></textarea>
<textarea class="input input_type_textarea" rows="1"></textarea>
```

{% include demo_close.html %}

{% include flag.html heading="input_size" %}

{% include demo_open.html class_parent="spacing" %}

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

{% include demo_switch.html %}

```html
<input class="input input_size_sm" placeholder="Default input..." type="text" />
<input class="input input_size_lg" placeholder="Default input..." type="text" />
<select class="input input_type_select input_size_sm">...</select>
<select class="input input_type_select input_size_lg">...</select>
```

{% include demo_close.html %}

{% include flag.html heading="input_state_success" %}

{% include demo_open.html class_parent="spacing" %}

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

{% include demo_switch.html %}

```html
<input class="input input_state_success" type="text" />
<select class="input input_state_success input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_success input_type_textarea" rows="3"></textarea>
```

{% include demo_close.html %}

{% include flag.html heading="input_state_caution" %}

{% include demo_open.html class_parent="spacing" %}

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

{% include demo_switch.html %}

```html
<input class="input input_state_caution" type="text" />
<select class="input input_state_caution input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_caution input_type_textarea" rows="3"></textarea>
```

{% include demo_close.html %}

{% include flag.html heading="input_state_danger" %}

{% include demo_open.html class_parent="spacing" %}

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

{% include demo_switch.html %}

```html
<input class="input input_state_danger" type="text" />
<select class="input input_state_danger input_type_select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
<textarea class="input input_state_danger input_type_textarea" rows="3"></textarea>
```

{% include demo_close.html %}
