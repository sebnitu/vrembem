---
layout: article
title: Vrembem
description: "A complete collection of all Vrembem packages into a single comprehensive library for convenience."
category: compound
usage:
  npm: "vrembem"
  scss: "vrembem"
  js: "vrembem"
---

{% include flag.html heading="Sass" %}

To include all Vrembem components into your styles, just import the vrembem package in your Sass manifest file.

<div class="demo">
<div class="demo__code" markdown="1">
```scss
@import "vrembem";
```
</div>
</div>

{% include flag.html heading="JavaScript" %}

First we need to import the JavaScript component's we'd like to use.

<div class="demo">
<div class="demo__code" markdown="1">
```js
import {
  utility,
  Checkbox,
  Dismissible,
  Drawer,
  Modal
} from "vrembem"
```
</div>
</div>

Then we can create an instance of each script. In this example, we set them to auto initialize.

<div class="demo">
<div class="demo__code" markdown="1">
```js
new Checkbox({ autoInit: true })
new Dismissible({ autoInit: true })
new Drawer({ autoInit: true })
new Modal({ autoInit: true })
```
</div>
</div>

We can also manually initialize components using their `init` function.

<div class="demo">
<div class="demo__code" markdown="1">
```js
const modal = new Checkbox()
modal.init()
```
</div>
</div>

*Note that `utility` does not need to be instantiated since it's just a set of helpful utility functions.*
