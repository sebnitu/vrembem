---
layout: article
title: "Level"
description: "A simple layout component that helps center children in an element vertically and gives them horizontal spacing."
category: layout
# usage:
  # npm: "@vrembem/level"
  # scss: "vrembem/level/all"
---

{% include flag.html heading="level" %}

{% include demo_open.html %}

<div class="level">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>

{% include demo_switch.html %}

```html
<div class="level">
  ...
</div>
```

{% include demo_close.html %}

{% include flag.html heading="level_block" %}

{% include demo_open.html %}

<div class="level level_block">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>

{% include demo_switch.html %}

```html
<div class="level level_block">
  ...
</div>
```

{% include demo_close.html %}

{% include flag.html heading="level_wrap" %}

{% include demo_open.html %}

<div class="level level_wrap">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>

{% include demo_switch.html %}

```html
<div class="level level_wrap">
  ...
</div>
```

{% include demo_close.html %}

{% include flag.html heading="level_spacing_[key]" %}

{% include demo_open.html class_parent="spacing" %}

<div class="level level_spacing_xs">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>

{% include demo_switch.html %}

```html
<div class="level level_spacing_xs">...</div>
```

{% include demo_close.html %}

{% include demo_open.html class_parent="spacing" %}

<div class="level level_spacing_sm">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>

{% include demo_switch.html %}

```html
<div class="level level_spacing_sm">...</div>
```

{% include demo_close.html %}

{% include demo_open.html class_parent="spacing" %}

<div class="level level_spacing_md">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>

{% include demo_switch.html %}

```html
<div class="level level_spacing_md">...</div>
```

{% include demo_close.html %}

{% include demo_open.html class_parent="spacing" %}

<div class="level level_spacing_lg">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>

{% include demo_switch.html %}

```html
<div class="level level_spacing_lg">...</div>
```

{% include demo_close.html %}

{% include demo_open.html class_parent="spacing" %}

<div class="level level_spacing_xl">
  <div class="box">...</div>
  <div class="box">...</div>
  <div class="box">...</div>
</div>

{% include demo_switch.html %}

```html
<div class="level level_spacing_xl">...</div>
```

{% include demo_close.html %}
