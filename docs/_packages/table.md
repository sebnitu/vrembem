---
layout: article
title: Table
description: "A table component for displaying HTML tables."
category: simple
usage:
  npm: "@vrembem/table"
  scss: "@vrembem/table/index"
---

{% include flag.html heading="table" %}

<div class="notice notice_state_info type" markdown="1">
For simple responsive table styles you can wrap your tables in the `scroll-box` base component.
</div>

{% include demo_open.html class_grid="grid_break" %}
<div class="scroll-box">
  {% include table.html caption="List of anarchists" %}
</div>
{% include demo_switch.html %}
```html
<table class="table">
  <caption>List of anarchists</caption>
  <thead>
    <tr>
      <th class="col_auto">#</th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Noam</td>
      <td>Chomsky</td>
      <td>@chomsky</td>
    </tr>
    ...
  </tbody>
</table>
```
{% include demo_close.html %}

{% include flag.html heading="table_style_rowed" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="scroll-box">
  {% include table.html class="table_style_rowed" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_style_rowed">
  ...
</table>
```
{% include demo_close.html %}

{% include flag.html heading="table_style_bordered" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="scroll-box">
  {% include table.html class="table_style_bordered" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_style_bordered">
  ...
</table>
```
{% include demo_close.html %}

{% include flag.html heading="table_zebra" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="scroll-box">
  {% include table.html class="table_zebra" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_zebra">
  ...
</table>
```
{% include demo_close.html %}

{% include flag.html heading="table_hover" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="scroll-box">
  {% include table.html class="table_hover" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_hover">
  ...
</table>
```
{% include demo_close.html %}

{% include flag.html heading="table_size_sm" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="scroll-box">
  {% include table.html class="table table_zebra table_size_sm" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_size_sm">
  ...
</table>
```
{% include demo_close.html %}

{% include flag.html heading="table_size_lg" %}

{% include demo_open.html class_grid="grid_break" %}
<div class="scroll-box">
  {% include table.html class="table table_zebra table_size_lg" %}
</div>
{% include demo_switch.html %}
```html
<table class="table table_size_lg">
  ...
</table>
```
{% include demo_close.html %}

{% include flag.html heading="table_overflow_ellipsis" %}

{% include demo_open.html %}
<table class="table table_ellipsis">
  <colgroup>
    <col style="width:50px;">
  </colgroup>
  <thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Email</th>
      <th>Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Noam</td>
      <td>Chomsky</td>
      <td>noam@chomsky.com</td>
      <td>@chomsky</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Howard</td>
      <td>Zinn</td>
      <td>howard@zinn.com</td>
      <td>@zinn</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Pierre-Joseph</td>
      <td>Proudhon</td>
      <td>pierre@proudhon.com</td>
      <td>@proudhon</td>
    </tr>
    <tr>
      <th>4</th>
      <td>George</td>
      <td>Orwell</td>
      <td>george@orwell.com</td>
      <td>@orwell</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Rudolf</td>
      <td>Rocker</td>
      <td>rudolf@rocker.com</td>
      <td>@rocker</td>
    </tr>
  </tbody>
</table>
{% include demo_switch.html %}
```html
<table class="table table_ellipsis">
  <colgroup>
    <col style="width:50px;">
  </colgroup>
  ...
</table>
```
{% include demo_close.html %}
