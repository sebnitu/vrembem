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

Sections are composed using the base wrapper (`section`) along with three optional elements. The `section__container` element's primary purpose is to wrap content with a max-width and centered using margin auto. The other two element's—`section__background` and `section__screen` (usually used together)—add a background image and colored screen that fills the full size of the section component.

- `section`
  - `section__container`
  - `section__background`
  - `section__screen`

<div class="section section_size_xl">
<div class="section__container max-width-xs">
<div class="gap-y color-white text-align-center">
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
<section class="section section_size_xl">
  <div class="section__container">
    ...
  </div>
  <img class="section__background" src="..." />
  <div class="section__screen"></div>
</section>
```
</div>
</div>
<img src="https://picsum.photos/1200/800/?random" class="section__background" width="1200" height="800" />
<div class="section__screen"></div>
</div>

> Depending on contrast when using background and screen elements, it may be needed to invert the text color of the section content for readability.

## section_size_[key]

Sections have a few size modifier options to help adjust the space that is used based on how prominent the section needs to be. These are optimized for all screen sizes to avoid oversized areas on mobile. These values are built using the [`$padding-scale`](#padding-scale) map.

* `section_size_xs`
* `section_size_sm`
* `section_size_md`
* `section_size_lg`
* `section_size_xl`

```html
<section class="section section_size_xl">
  ...
</section>
```

## Sass variables

<div class="scroll-box">
  <table class="table table_style_bordered table_zebra table_hover table_responsive_lg">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-block</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">String to prefix blocks with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-element</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"__"</code></td>
        <td data-mobile-label="Desc">String to prefix elements with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifiers with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$prefix-modifier-value</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">"_"</code></td>
        <td data-mobile-label="Desc">String to prefix modifier values with.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$max-width</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">70rem</code></td>
        <td data-mobile-label="Desc">Sets the max-width property on the section container element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$screen-opacity</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.7</code></td>
        <td data-mobile-label="Desc">Sets the opacity property on the section screen element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$screen-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$night</code></td>
        <td data-mobile-label="Desc">Sets the background-color property on the section screen element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><a class="link" href="#padding">Sass map ref &darr;</a></td>
        <td data-mobile-label="Desc">Sets the default padding for the section component.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding-scale</code></td>
        <td data-mobile-label="Default"><a class="link" href="#padding-scale">Sass map ref &darr;</a></td>
        <td data-mobile-label="Desc">Used to build the size modifiers for the section component.</td>
      </tr>
    </tbody>
  </table>
</div>

### `$padding`

Sets the default padding for the section component. Each key in the map represents a breakpoint to apply the specified padding value. The `base` key is applied with no media query.

```scss
$padding: (
  'base': 1.5em,
  'md': 2em 1.5em,
  'lg': 3em 1.5em
) !default;
```

### `$padding-scale`

Used to build the `section_size_[key]` modifier where each key represents a map of breakpoint and padding value pairs for the size key modifier. The `base` key is applied with no media query.

```scss
$padding-scale: (
  'xs': (
    'base': 0,
    'md': 0,
    'lg': 0
  ),
  'sm': (
    'base': 1em,
    'md': 1em,
    'lg': 1em
  ),
  'md': (
    'base': 1.5em,
    'md': 2em 1.5em,
    'lg': 3em 1.5em
  ),
  'lg': (
    'base': 1.5em,
    'md': 4em 1.5em,
    'lg': 6em 1.5em
  ),
  'xl': (
    'base': 3em 1.5em,
    'md': 8em 2em,
    'lg': 12em 2em
  )
) !default;
```
