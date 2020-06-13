---
layout: article
title: "Section"
description: "A container component for wrapping distinct sections of a page."
package: "@vrembem/section"
category: layout
usage:
  npm: true
  scss: true
---

## section

<div class="section section_size_xl">
<div class="section__container container">
<div class="section__intro type type_invert spacing">
  <h1>Huge section with a screen &amp; background image</h1>
  <p class="text_lead">This is a demonstration of section area using the intro element along with a screen and background image. The screen color is set using the background modifiers and can be changed as needed.</p>
  <div class="level flex-justify-center">
    <button class="button button_color_primary">First Action</button>
    <button class="button button_color_secondary">Second Action</button>
  </div>
</div>
<hr class="sep sep_invert margin-vert-xl" />
<div markdown="1">
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
<img src="https://picsum.photos/1200/800/?random" class="section__background" width="1200" height="800" />
<div class="section__screen"></div>
</div>

## section_size_[type]

Sections have a few size modifier options to help adjust the space that is used based on how prominent the section needs to be. These are optimized for all screen sizes to avoid oversized areas on mobile:

* `section_size_xs`
* `section_size_sm`
* `section_size_md`
* `section_size_xl`
* `section_size_lg`

---

<div class="section section_size_xs">
<div class="section__container container" markdown="1">
```html
<div class="section section_size_xs">
  ...
</div>
```
</div>
</div>

---

<div class="section section_size_sm">
<div class="section__container container" markdown="1">
```html
<div class="section section_size_sm">
...
</div>
```
</div>
</div>

---

<div class="section section_size_md">
<div class="section__container container" markdown="1">
```html
<div class="section section_size_md">
...
</div>
```
</div>
</div>

---

<div class="section section_size_lg">
<div class="section__container container" markdown="1">
```html
<div class="section section_size_lg">
...
</div>
```
</div>
</div>

---

<div class="section section_size_xl">
<div class="section__container container" markdown="1">
```html
<div class="section section_size_xl">
...
</div>
```
</div>
</div>
