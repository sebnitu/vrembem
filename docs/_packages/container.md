---
layout: article
title: Container
description: "A component for giving content a max width and centered within it's parent."
package: "@vrembem/container"
category: layout
usage:
  npm: true
  scss: true
---

## container

<div class="demo spacing">
  <div class="demo__render">
    <div class="container">
      <div class="box"><code>max-width: 70rem;</code></div>
    </div>
  </div>
  <div class="demo__code" markdown="1">
```html
<div class="container">...</div>
```
  </div>
</div>

## container_size_[key]

<div class="demo spacing">
  <div class="demo__render spacing">
    <div class="container container_size_xs">
      <div class="box"><code>max-width: 45rem;</code></div>
    </div>
    <div class="container container_size_sm">
      <div class="box"><code>max-width: 60rem;</code></div>
    </div>
    <div class="container container_size_md">
      <div class="box"><code>max-width: 70rem;</code></div>
    </div>
    <div class="container container_size_lg">
      <div class="box"><code>max-width: 80rem;</code></div>
    </div>
    <div class="container container_size_xl">
      <div class="box"><code>max-width: 90rem;</code></div>
    </div>
  </div>
  <div class="demo__code" markdown="1">
```html
<div class="container container_size_xs">...</div>
<div class="container container_size_sm">...</div>
<div class="container container_size_md">...</div>
<div class="container container_size_lg">...</div>
<div class="container container_size_xl">...</div>
```
  </div>
</div>
