---
layout: article
title: Base
description: "Includes useful default styles and base components for common HTML elements."
category: simple
usage:
  npm: "@vrembem/base"
  scss: "@vrembem/base/index"
---

{% include flag.html heading="Heading" %}

{% include demo_open.html class_parent="spacing" %}
<p class="h1">Heading</p>
<p class="h2">Heading</p>
<p class="h3">Heading</p>
<p class="h4">Heading</p>
<p class="h5">Heading</p>
<p class="h6">Heading</p>
{% include demo_switch.html %}
```html
<p class="h1">...</p>
<p class="h2">...</p>
<p class="h3">...</p>
<p class="h4">...</p>
<p class="h5">...</p>
<p class="h6">...</p>
```
{% include demo_close.html %}

{% include flag.html heading="Link" %}

{% include demo_open.html %}
<div class="spacing padding">
  <p><a href="#" class="link">Default link</a></p>
  <p><a href="#" class="link link_subtle">Subtle link</a></p>
</div>
<div class="spacing padding radius background_night">
  <p><a href="#" class="link link_invert">Inverted link</a></p>
  <p><a href="#" class="link link_invert-subtle">Inverted link</a></p>
</div>
{% include demo_switch.html %}
```html
<a href="#" class="link">Link</p>
<a href="#" class="link link_subtle">Link</a>
<a href="#" class="link link_invert">Link</a>
<a href="#" class="link link_invert-subtle">Link</a>
```
{% include demo_close.html %}

{% include flag.html heading="List" %}

{% include demo_open.html %}
<div class="spacing_xl">
  <ul class="list">
    <li>One</li>
    <li>Two
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
    </li>
    <li>Three</li>
  </ul>

  <ol class="list">
    <li>One</li>
    <li>Two
      <ol>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ol>
    </li>
    <li>Three</li>
  </ol>
</div>
{% include demo_switch.html %}
```html
<ul class="list">
  <li>One</li>
  <li>Two
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
  </li>
  <li>Three</li>
</ul>

<ol class="list">
  ...
</ol>
```
{% include demo_close.html %}

{% include flag.html heading="Separator" %}

<div class="type" markdown="1">
Typically used on an `<hr>` HTML element representing a thematic break between paragraph-level elements.
</div>

{% include demo_open.html %}
<div class="spacing padding">
  <hr class="sep sep_light">
  <hr class="sep">
  <hr class="sep sep_dark">
  <hr class="sep sep_darker">
</div>
<div class="spacing padding radius background_night">
  <hr class="sep sep_invert-light">
  <hr class="sep sep_invert">
  <hr class="sep sep_invert-dark">
  <hr class="sep sep_invert-darker">
</div>
{% include demo_switch.html %}
```html
<!-- Separator -->
<hr class="sep sep_light">
<hr class="sep">
<hr class="sep sep_dark">
<hr class="sep sep_darker">

<!-- Invert separator -->
<hr class="sep sep_invert-light">
<hr class="sep sep_invert">
<hr class="sep sep_invert-dark">
<hr class="sep sep_invert-darker">
```
{% include demo_close.html %}

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

{% include demo_open.html class_gridItem="span_6" %}
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
