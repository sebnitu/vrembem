---
layout: article
title: "Section"
description: "A container component for wrapping distinct sections of a page."
category: layout
usage:
  npm: "section"
  scss: "section"
---

## section

<div class="section section_size_xl">
  <div class="section__container container">
    <div class="section__intro type type_invert">
      <h1>Huge section with a screen &amp; background image</h1>
      <p class="text_lead">This is a demonstration of section area using the intro element along with a screen and background image. The screen color is set using the background modifiers and can be changed as needed.</p>
      <div class="level flex_justify_center">
        <button class="button button_color_primary">First Action</button>
        <button class="button button_color_secondary">Second Action</button>
      </div>
    </div>
    <hr class="sep sep_invert margin_vert_md" />
<div class="demo">
<div class="demo__code" markdown="1">
```html
<div class="section section_size_xl">
  <div class="section__container container">
    <div class="section__intro">
      ...
    </div>
  </div>
  <img class="section__background" src="..." />
  <div class="section__screen"></div>
</div>
```
</div>
</div>
  </div>
  <img src="https://picsum.photos/1200/800/?random" class="section__background" width="1200" height="800" />
  <div class="section__screen"></div>
</div>

## section_size_[type]

<div class="type" markdown="1">
Sections have a few size modifier options to help adjust the space that is used based on how prominent the section needs to be. These are optimized for all screen sizes to avoid oversized areas on mobile:

* `section_size_xs`
* `section_size_sm`
* `section_size_md`
* `section_size_xl`
* `section_size_lg`
</div>



<hr class="sep" />

<div class="section section_size_xs">
<div class="section__container container">
<div class="demo">
<div class="demo__code" markdown="1">
```html
<div class="section section_size_xs">
  ...
</div>
```
</div>
</div>
</div>
</div>

<hr class="sep" />

<div class="section section_size_sm">
<div class="section__container container">
<div class="demo">
<div class="demo__code" markdown="1">
```html
<div class="section section_size_sm">
...
</div>
```
</div>
</div>
</div>
</div>

<hr class="sep" />

<div class="section section_size_md">
<div class="section__container container">
<div class="demo">
<div class="demo__code" markdown="1">
```html
<div class="section section_size_md">
...
</div>
```
</div>
</div>
</div>
</div>

<hr class="sep" />

<div class="section section_size_lg">
<div class="section__container container">
<div class="demo">
<div class="demo__code" markdown="1">
```html
<div class="section section_size_lg">
...
</div>
```
</div>
</div>
</div>
</div>

<hr class="sep" />

<div class="section section_size_xl">
<div class="section__container container">
<div class="demo">
<div class="demo__code" markdown="1">
```html
<div class="section section_size_xl">
...
</div>
```
</div>
</div>
</div>
</div>
