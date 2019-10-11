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

{% include flag.html heading="embed" %}

{% include demo_open.html class_gridItem="span_6" %}
<div class="embed">
  <iframe class="embed__item" src="https://www.youtube.com/embed/YTsf-OAaoKc?rel=0&showinfo=0" width="560" height="315" frameborder="0" scrolling="no" allowfullscreen></iframe>
</div>
{% include demo_switch.html %}
```html
<div class="embed">
  <iframe class="embed__item" src="..." width="560" height="315"></iframe>
</div>
```
{% include demo_close.html %}
