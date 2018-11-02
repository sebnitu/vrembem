---
layout: page
title: "Section"
description: "A container component for wrapping distinct sections of a project."
---

<div class="section section_size_xl">
  <div class="section__container container">

    <div class="section__intro type type_invert">
      <h1>Huge Section with Screen &amp; Background Image</h1>
      <p class="text_lead">This is a demonstration of section area using the intro element along with a screen and background image. The screen color is set using the background modifiers and can be changed as needed.</p>
      <div class="level justify_center">
        <button class="button button_color_primary">First Action</button>
        <button class="button button_color_secondary">Second Action</button>
      </div>
    </div>

    <hr class="hr hr_invert my_3" />

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

<div class="page__section bb">
  <div class="page__container container type" markdown="1">

## `section_size_[type]`

  </div>
</div>

<div class="section section_size_xl bb">
  <div class="section__container container type">
    <h1>Huge Section</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section section_size_lg bb">
  <div class="section__container container type">
    <h1>LargeSection</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bb">
  <div class="section__container container type">
    <h1>Default Section</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section section_size_sm bb">
  <div class="section__container container type">
    <h1>Small Section</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="page__section bb">
  <div class="page__container container type" markdown="1">

## `section` `+` `bg_[type]`

  </div>
</div>

<div class="section">
  <div class="section__container container type">
    <h1>Default Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_primary-light">
  <div class="section__container container type type_invert">
    <h1>Light Primary Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_primary">
  <div class="section__container container type type_invert">
    <h1>Primary Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_primary-dark">
  <div class="section__container container type type_invert">
    <h1>Dark Primary Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_secondary-light">
  <div class="section__container container type type_invert">
    <h1>Light Secondary Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_secondary">
  <div class="section__container container type type_invert">
    <h1>Secondary Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_secondary-dark">
  <div class="section__container container type type_invert">
    <h1>Dark Secondary Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_accent-light">
  <div class="section__container container type type_invert">
    <h1>Light Accent Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_accent">
  <div class="section__container container type type_invert">
    <h1>Accent Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_accent-dark">
  <div class="section__container container type type_invert">
    <h1>Dark Accent Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_shade">
  <div class="section__container container type">
    <h1>Shade Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_dark">
  <div class="section__container container type type_invert">
    <h1>Dark Shade Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>

<div class="section bg_black">
  <div class="section__container container type type_invert">
    <h1>Dark Shade Background</h1>
    <p class="text_lead">Vestibulum a arcu mi. Integer tempus scelerisque turpis, nec sodales eros facilisis non. Nam pulvinar vel quam in eleifend. Nunc ullamcorper aliquet tellus vitae euismod.</p>
  </div>
</div>
