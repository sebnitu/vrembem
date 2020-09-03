---
layout: article
title: Table
description: "A table component for displaying HTML tables."
package: "@vrembem/table"
category: simple
usage:
  npm: true
  scss: true
---

## table

For basic table styles, only the `table` component class is required. Use [proper table markup](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) and styles should apply as expected.

{% include demo_open.html class_grid="grid_stack" %}
<div class="scroll-box">
  {% include table.html caption="List of anarchists" %}
</div>
{% include demo_switch.html %}
```html
<table class="table">
  <caption>List of anarchists</caption>
  <thead>
    <tr>
      <th class="table__auto">#</th>
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

> For simple responsive table styles, wrap your tables in the `scroll-box` base component.
>
> ```html
> <div class="scroll-box">
>   <table class="table">...</table>
> </div>
> ```

## table_style_[key]

{% include demo_open.html class_grid="grid_stack" %}
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

{% include demo_open.html class_grid="grid_stack" %}
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

## table_zebra

{% include demo_open.html class_grid="grid_stack" %}
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

## table_hover

{% include demo_open.html class_grid="grid_stack" %}
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

## table_responsive_[key]

When `scroll-box` isn't mobile friendly enough, `table_responsive_[key]` is available to turn tables into a more readable format on smaller devices. Mobile labels are set using the `data-mobile-lable` attribute.

{% include demo_open.html class_grid="grid_stack" class_parent="gap" %}
<div class="scroll-box">
  <table class="table table_responsive_lg table_style_bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>User</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="#">1</td>
        <td data-mobile-label="User">someone</td>
        <td data-mobile-label="Email">someone@email.com</td>
      </tr>
      <tr>
        <td data-mobile-label="#">2</td>
        <td data-mobile-label="User">else</td>
        <td data-mobile-label="Email">else@email.com</td>
      </tr>
      <tr>
        <td data-mobile-label="#">3</td>
        <td data-mobile-label="User">another</td>
        <td data-mobile-label="Email">another@email.com</td>
      </tr>
    </tbody>
  </table>
</div>
{% include demo_switch.html %}
```html
<table class="table table_responsive_lg">
  <thead>
    <tr>
      <th>...</th>
      ...
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-mobile-label="...">...</td>
      ...
    </tr>
    ...
  </tbody>
</table>
```
{% include demo_close.html %}

> Available modifier keys default to `core.$breakpoints` map but can be overridden by setting component variable `$breakpoints`:
>
> ```scss
> $breakpoints: (
>   "xs": 480px,
>   "sm": 620px,
>   "md": 760px,
>   "lg": 990px,
>   "xl": 1380px
> ) !default;
> ```

## table_size_[key]

{% include demo_open.html class_grid="grid_stack" %}
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

{% include demo_open.html class_grid="grid_stack" %}
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

## table_overflow_ellipsis

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
