---
layout: article
title: Base
description: "Includes the base styles for a project."
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

{% include flag.html heading="Table" %}

<!--
table_rowed
table_bordered
table_zebra
table_hover
-->

{% include demo_open.html class_grid="grid_break" %}
<div class="scroll-box">
  <table class="table table_bordered table_zebra table_hover">
    <caption>List of anarchists</caption>
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
        <td>1</td>
        <td>Noam</td>
        <td>Chomsky</td>
        <td>noam@chomsky.com</td>
        <td>@chomsky</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Howard</td>
        <td>Zinn</td>
        <td>howard@zinn.com</td>
        <td>@zinn</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Pierre-Joseph</td>
        <td>Proudhon</td>
        <td>pierre@proudhon.com</td>
        <td>@proudhon</td>
      </tr>
      <tr>
        <td>4</td>
        <td>George</td>
        <td>Orwell</td>
        <td>george@orwell.com</td>
        <td>@orwell</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Rudolf</td>
        <td>Rocker</td>
        <td>rudolf@rocker.com</td>
        <td>@rocker</td>
      </tr>
    </tbody>
  </table>
</div>
{% include demo_switch.html %}
```html
...
```
{% include demo_close.html %}
