---
layout: page
title: "Container"
description: "A container component for general page composition purposes."
tags: layout
---

<div class="page__section">
  <div class="page__container container spacing">
    <h1 class="h1">{{ page.title }}</h1>
    <p class="text_lead">{{ page.desc }}</p>
  </div>
</div>

<div class="demo">
  <div class="demo__render spacing">
    <div class="container container_size_xs">
      <div class="box">This is an extra small container</div>
    </div>
    <div class="container container_size_sm">
      <div class="box">This is a small container</div>
    </div>
    <div class="container">
      <div class="box">This is the default container</div>
    </div>
    <div class="container container_size_lg">
      <div class="box">This is a large container</div>
    </div>
    <div class="container container_size_xl">
      <div class="box">This is an extra large container</div>
    </div>
  </div>
</div>

<div class="page__section">
  <div class="page__container container type">

<div class="demo">
  <div class="demo__code" markdown="1">
```html
<div class="container container_size_xs">...</div>
<div class="container container_size_sm">...</div>
<div class="container">...</div>
<div class="container container_size_lg">...</div>
<div class="container container_size_xl">...</div>
```
  </div>
</div>

  </div>
</div>
