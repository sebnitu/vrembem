---
title: Hero
---

# Hero

<p class="text_lead">A block component for a marketing style hero section.</p>

## `hero`

The hero component provides the following elements:

* `hero`
  * `hero__container`
    * `hero__title`
    * `hero__desc`
    * `hero__action`

<div class="demo">
  <div class="demo__render">
    <div class="hero">
      <div class="hero__container">
        <h1 class="hero__title">Easily Create Hero Titles</h1>
        <p class="hero__desc">Ut posuere lacinia tellus, non convallis nulla aliquam in. Pellentesque est dui, interdum nec urna ut, consectetur dictum elit.</p>
        <div class="hero__action">
          <button class="button button_size_large button_color_primary">Action One</button>
          <button class="button button_size_large button_color_secondary">Action Two</button>
        </div>
      </div>
    </div>
  </div>
  <div class="demo__code">

```html
<div class="hero">
  <div class="hero__container">
    <h1 class="hero__title">Easily Create Hero Titles</h1>
    <p class="hero__desc">Ut posuere lacinia tellus, non convallis nulla aliquam in. Pellentesque est dui, interdum nec urna ut, consectetur dictum elit.</p>
    <div class="hero__action">
      <button class="button button_size_large button_color_primary">Action One</button>
      <button class="button button_size_large button_color_secondary">Action Two</button>
    </div>
  </div>
</div>
```

  </div>
</div>

## `hero__background + hero__screen`

Used for adding cover style inline images and optional color screens on top.

* `hero`
  * `hero__container`: gets z-index value of 3
  * `hero__screen`: gets z-index value of 2
  * `hero__background`: gets z-index value of 1

<div class="demo">
  <div class="demo__render">
    <div class="hero">
      <div class="hero__container hero__container_inverted">
        <h1 class="hero__title">Easily Create Hero Titles</h1>
        <p class="hero__desc">Ut posuere lacinia tellus, non convallis nulla aliquam in. Pellentesque est dui, interdum nec urna ut, consectetur dictum elit.</p>
        <div class="hero__action">
          <button class="button button_size_large button_outline_inverted">Action One</button>
          <button class="button button_size_large button_outline_inverted">Action Two</button>
        </div>
      </div>
      <div class="hero__screen"></div>
      <img class="hero__background" src="/assets/img/hero-background-example.jpg" alt="" />
    </div>
  </div>
  <div class="demo__code">

```html
<div class="hero">
  <div class="hero__container hero__container_inverted">
    <h1 class="hero__title">Easily Create Hero Titles</h1>
    <p class="hero__desc">Ut posuere lacinia tellus, non convallis nulla aliquam in. Pellentesque est dui, interdum nec urna ut, consectetur dictum elit.</p>
    <div class="hero__action">
      <button class="button button_size_large button_outline_inverted">Action One</button>
      <button class="button button_size_large button_outline_inverted">Action Two</button>
    </div>
  </div>
  <div class="hero__screen"></div>
  <img class="hero__background" src="/assets/img/hero-background-example.jpg" alt="" />
</div>
```

  </div>
</div>
