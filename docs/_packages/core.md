---
layout: article
title: Core
description: "The core variables, functions and mixins for Vrembem components."
category: simple
usage:
  npm: "core"
  scss: "core"
  js: "core"
---

## Sass

To make use of global Vrembem functions, mixins and variables, it is recommended to import the core index file:

<div class="demo">
<div class="demo__code" markdown="1">
```scss
@import "@vrembem/core";
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

## JavaScript

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

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Method</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">addClass(el, ...cl)</code></td>
        <td data-mobile-label="Desc">Adds a class or classes to an element or NodeList</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">camelCase(str)</code></td>
        <td data-mobile-label="Desc">Takes a hyphen cased string and converts it to camel case</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">hasClass(el, ...cl)</code></td>
        <td data-mobile-label="Desc">Checks an element or NodeList whether they contain a class or classes</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">hyphenCase(str)</code></td>
        <td data-mobile-label="Desc">Takes a camel cased string and converts it to hyphen case</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">removeClass(el, ...cl)</code></td>
        <td data-mobile-label="Desc">Remove a class or classes from an element or NodeList</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">toggleClass(el, ...cl)</code></td>
        <td data-mobile-label="Desc">Toggle a class or classes on an element or NodeList</td>
      </tr>
      <tr>
        <td data-mobile-label="Method"><code class="code text_nowrap">variables</code></td>
        <td data-mobile-label="Desc">Exposes CSS variables in JavaScript</td>
      </tr>
    </tbody>
  </table>
</div>
