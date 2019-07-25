---
layout: article
layout_options:
  section: false
  container: false
title: "Section"
description: "A container component for wrapping distinct sections of a view."
category: layout
# usage:
  # npm: "@vrembem/section"
  # scss: "vrembem/section/all"
---

{% include section_open.html %}

{% include flag.html heading="section" %}

{% include section_close.html %}

<div class="section section_size_xl">
  <div class="section__container container">

    <div class="section__intro type type_invert">
      <h1>Huge section with a screen &amp; background image</h1>
      <p class="text_lead">This is a demonstration of section area using the intro element along with a screen and background image. The screen color is set using the background modifiers and can be changed as needed.</p>
      <div class="level flex_hori_center">
        <button class="button button_color_primary">First Action</button>
        <button class="button button_color_secondary">Second Action</button>
      </div>
    </div>

    <hr class="hr hr_invert margin_vert_md" />

<div class="demo spacing">
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

{% include section_open.html %}

{% include flag.html heading="section_size_[type]" %}

<div class="type" markdown="1">

Sections have a few size modifier options to help adjust the space that is used based on how prominent the section needs to be:

* `section_size_xl`
* `section_size_lg`
* `section_size_sm`

</div>

{% include section_close.html %}

<div class="section section_size_sm">
  <div class="section__container container type type_invert">
    <h1>Small section</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
  <div class="section__screen"></div>
</div>

<hr class="hr" />

<div class="section">
  <div class="section__container container type type_invert">
    <h1>Default section</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
  <div class="section__screen"></div>
</div>

<hr class="hr" />

<div class="section section_size_lg">
  <div class="section__container container type type_invert">
    <h1>Large section</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
  <div class="section__screen"></div>
</div>

<hr class="hr" />

<div class="section section_size_xl">
  <div class="section__container container type type_invert">
    <h1>Extra large section</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
  <div class="section__screen"></div>
</div>
