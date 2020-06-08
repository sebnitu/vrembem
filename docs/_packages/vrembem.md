---
layout: article
title: Vrembem
description: "A complete collection of all Vrembem components into a single comprehensive library for convenience."
category: compound
usage:
  npm: "vrembem"
  scss: "vrembem"
  js: "vrembem"
---

{% include flag.html heading="Sass" %}

<div class="type" markdown="1">
To include all Vrembem components into your styles, just import the vrembem package in your Sass manifest file.
</div>

<div class="demo">
<div class="demo__code" markdown="1">
```scss
@use "vrembem";
```
</div>
</div>

<div class="type" markdown="1">
All component variables, functions and mixins are forwarded under their respective namespace and can be customized:
</div>

<div class="demo">
<div class="demo__code" markdown="1">
```scss
@use "vrembem" with (
  $button-padding: 1rem 2rem
);
```
</div>
</div>

<div class="type" markdown="1">
Customize core variables which all components inherit from. The example below will prefix all components with a prefix:
</div>

<div class="demo">
<div class="demo__code" markdown="1">
```scss
@use "@vrembem/core" with (
  $prefix-block: "vb-"
);
@use "vrembem";
```
</div>
</div>

{% include flag.html heading="JavaScript" %}

<div class="type" markdown="1">
Import and initialize the components you'll need:
</div>

<div class="demo">
<div class="demo__code" markdown="1">
```js
// Import all under the vb namespace
import * as vb from "vrembem";
const drawer = new vb.Drawer({ autoInit: true });

// Or import individual components
import { Drawer } from "vrembem";
const drawer = new Drawer({ autoInit: true });
```
</div>
</div>

<div class="type" markdown="1">
Components also make available the `init` function for initializing or re-initializing.
</div>

<div class="demo">
<div class="demo__code" markdown="1">
```js
const modal = new Checkbox()
modal.init()
```
</div>
</div>

<div class="type" markdown="1">
> Note that `utility` component does not need to be initialized since it's just a set of helpful utility functions.
</div>

{% include flag.html heading="Markup" %}

<div class="type" markdown="1">
Include the component's markup into your project. Use the [online documentation](https://vrembem.com) for more information, code examples and available modifiers.
</div>

<div class="demo">
<div class="demo__code" markdown="1">
```html
<div class="drawer__wrapper">
  <aside data-drawer="[unique-id]" class="drawer">
    <div class="drawer__item">
      <button data-drawer-close>...</button>
    </div>
  </aside>
  <div class="drawer__main">
    <button data-drawer-toggle="[unique-id]">...</button>
  </div>
</div>
```
</div>
</div>
