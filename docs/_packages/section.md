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
<div class="section__container">
<div class="max-width-xs margin-x-auto text-align-center color-white gap-y">
  <h1 class="h1">Section with a screen &amp; background image</h1>
  <p class="font-size-lg">This is a demonstration of section area using the intro element along with a screen and background image. The screen color is set using the background modifiers and can be changed as needed.</p>
  <div class="level flex-justify-center">
    <button class="button button_color_primary">First Action</button>
    <button class="button button_color_secondary">Second Action</button>
  </div>
</div>
<hr class="sep border-color-invert margin-y-xl" />
<div markdown="1">
```html
<div class="section section_size_xl">
  <div class="section__container">
    ...
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
