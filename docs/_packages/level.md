---
layout: article
title: "Level"
description: "A simple flexbox based layout component."
category: layout
usage:
  npm: "level"
  scss: "level"
---

## level

{% include demo_open.html %}
<div class="level">
  {% for i in (1..9) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level">...</div>
```
{% include demo_close.html %}

## level_gap_[key]

{% include demo_open.html %}
<div class="level level_gap_none">
  {% for i in (1..9) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level level_gap_none">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="level level_gap_xs">
  {% for i in (1..9) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level level_gap_xs">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="level level_gap_sm">
  {% for i in (1..9) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level level_gap_sm">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="level level_gap_md">
  {% for i in (1..9) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level level_gap_md">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="level level_gap_lg">
  {% for i in (1..9) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level level_gap_lg">...</div>
```
{% include demo_close.html %}

{% include demo_open.html %}
<div class="level level_gap_xl">
  {% for i in (1..9) %}
    <div class="box">{{ i }}</div>
  {% endfor %}
</div>
{% include demo_switch.html %}
```html
<div class="level level_gap_xl">...</div>
```
{% include demo_close.html %}
