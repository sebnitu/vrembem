---
layout: article
title: Core
description: "The core variables, functions and mixins for Vrembem components."
category: simple
usage:
  npm: "@vrembem/core"
  scss: "@vrembem/core/index"
  js: "@vrembem/core"
---

{% include flag.html heading="Sass" %}

To make use of global Vrembem functions, mixins and variables, it is recommended to import the core index file:

<div class="demo">
<div class="demo__code" markdown="1">
```scss
@import "@vrembem/core/index";
```
</div>
</div>

You could also import these files individually, but the order of imports matters and some rely on others being imported before.

<div class="demo">
<div class="demo__code" markdown="1">
```scss
@import "@vrembem/core/src/css/palette";
@import "@vrembem/core/src/css/functions";
@import "@vrembem/core/src/css/variables";
@import "@vrembem/core/src/css/mixins";
```
</div>
</div>

{% include flag.html heading="JavaScript" %}

To make use of the core JavaScript modules, import the specific named export you need:

<div class="demo">
<div class="demo__code" markdown="1">
```js
// Import specific named exports
import { addClass, removeClass } from "@vrembem/core";

// Usage
addClass(el, "some-class");
```
</div>
</div>

You can also include all core named exports under a namespace by importing the entire module's contents:

<div class="demo">
<div class="demo__code" markdown="1">
```js
// Import all named exports under the 'core' namespace
import * as core from "@vrembem/core";

// Usage
core.removeClass(el, "some-class");
```
</div>
</div>

Available named exports:

<table class="table table_zebra">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="code text_nowrap">addClass</code></td>
      <td>Adds a class or classes to an element or NodeList</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">camelCase</code></td>
      <td>Takes a hyphen cased string and converts it to camel case</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">hasClass</code></td>
      <td>Checks an element or NodeList whether they contain a class or classes</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">hyphenCase</code></td>
      <td>Takes a camel cased string and converts it to hyphen case</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">removeClass</code></td>
      <td>Remove a class or classes from an element or NodeList</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">toggleClass</code></td>
      <td>Toggle a class or classes on an element or NodeList</td>
    </tr>
    <tr>
      <td><code class="code text_nowrap">variables</code></td>
      <td>Exposes CSS variables in JavaScript</td>
    </tr>
  </tbody>
</table>
