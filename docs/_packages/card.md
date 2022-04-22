---
layout: article
title: Card
description: "The cards component provides a flexible and extensive content container with multiple variants and options."
package: "@vrembem/card"
category: compound
usage:
  npm: true
  scss: true
---

## card

Card is a highly composable container component that comes with a variety of elements. The three most basic are:

- `card__body`
- `card__image`
- `card__title`

{% include demo_open.html %}
<div class="card">
  <img src="https://picsum.photos/600/400/?random" class="card__image" width="600" height="400">
  <div class="card__body gap-y">
    <h3 class="card__title">Card Title</h3>
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
    <p>
      <button class="button button_color_primary">Card Action</button>
    </p>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="card">
  <img class="card__image" src="..." />
  <div class="card__body">
    <h3 class="card__title">...</h3>
    ...
  </div>
</div>
```
{% include demo_close.html %}

### card__header + card__footer

Used to separate distinct card sections for headers and footers. It's also possible to include multiple `card__body` elements as needed.

- `card__header`
- `card__footer`

{% include demo_open.html %}
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
  </div>
  <div class="card__body gap-y">
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
  </div>
  <div class="card__footer">
    <button class="button button_color_primary">Card Action</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">...</h3>
  </div>
  <div class="card__body">
    ...
  </div>
  <div class="card__footer">
    ...
  </div>
</div>
```
{% include demo_close.html %}

### card__screen + card__background

Card screens and backgrounds are displayed behind the other card elements. These are typically paired with the [`card_invert` modifier](#card_invert) which switches text colors to better suite a dark background theme.

- `card__screen`
- `card__background`

{% include demo_open.html %}
<div class="card card_invert">
  <div class="card__body gap-y text-align-center">
    <h3 class="card__title">Card Title</h3>
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
    <p>
      <button class="button button_color_primary">Card Action</button>
    </p>
  </div>
  <img src="https://picsum.photos/600/400/?random" class="card__background" width="600" height="400">
  <div class="card__screen"></div>
</div>
{% include demo_switch.html %}
```html
<div class="card card_invert">
  <div class="card__body">
    ...
  </div>
  <img src="..." class="card__background" />
  <div class="card__screen"></div>
</div>
```
{% include demo_close.html %}

## card_fade

Hides the content of a card so that [only the `card__background` is visible](#card__screen--card__background). The content is then revealed on user interaction via `:hover` and `:focus` events.

{% include demo_open.html %}
<div class="card card_invert card_fade">
  <div class="card__body gap-y text-align-center">
    <h3 class="card__title">Card Title</h3>
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
    <p>
      <a href="#" class="button button_invert">Card Action</a>
    </p>
  </div>
  <img src="https://picsum.photos/600/400/?random" class="card__background" width="600" height="400">
  <div class="card__screen"></div>
</div>
{% include demo_switch.html %}
```html
<div class="card card_fade">
  ...
  <img src="..." class="card__background">
  <div class="card__screen"></div>
</div>
```
{% include demo_close.html %}

## card_invert

Inverts the contrast of the card component (by default adds a dark background with white text). This can be used together with the [`card__screen` and `card__background` elements](#card__screen--card__background) to help keep the content of a card legible. 

{% include demo_open.html %}
<div class="card card_invert">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
  </div>
  <div class="card__body gap-y">
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
  </div>
  <div class="card__footer">
    <button class="button button_color_primary">Card Action</button>
  </div>
</div>
{% include demo_switch.html %}
```html
<div class="card card_invert">
  <div class="card__header">
    <h3 class="card__title">...</h3>
  </div>
  <div class="card__body">
    ...
  </div>
  <div class="card__footer">
    ...
  </div>
</div>
```
{% include demo_close.html %}

## card_link

Add styles to a card when the entire component is a clickable link. 

{% include demo_open.html %}
<a href="#" class="card card_link">
  <div class="card__body gap-y text-align-center">
    <h3 class="card__title">Card Title</h3>
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
    <p>
      <span class="button">Card Action</span>
    </p>
  </div>
</a>
{% include demo_switch.html %}
```html
<div class="card card_link">
  ...
</div>
```
{% include demo_close.html %}

## card_zoom

A style enhancement modifier for when the [`card__background` element](#card__screen--card__background) is used. This will create a "zoom" effect when the card is hovered or focused.

{% include demo_open.html %}
<div class="card card_invert card_zoom">
  <div class="card__body gap-y text-align-center">
    <h3 class="card__title">Card Title</h3>
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
    <p>
      <a href="#" class="button button_invert">Card Action</a>
    </p>
  </div>
  <img src="https://picsum.photos/600/400/?random" class="card__background" width="600" height="400">
  <div class="card__screen"></div>
</div>
{% include demo_switch.html %}
```html
<div class="card card_zoom">
  ...
  <img src="..." class="card__background">
  <div class="card__screen"></div>
</div>
```
{% include demo_close.html %}

## Sass Variables

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
      <!-- Prefixes -->
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
      <!-- General -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$padding</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">1.25em</code></td>
        <td data-mobile-label="Desc">Sets the padding property on the <code class="code">card__body</code>, <code class="code">card__header</code> and <code class="code">card__footer</code> elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the border property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$sep-border</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border</code></td>
        <td data-mobile-label="Desc">Sets the border property that separates card elements.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$border-radius</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-radius</code></td>
        <td data-mobile-label="Desc">Sets the border-radius property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$box-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$box-shadow-1</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the color property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-property</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary">background-color, border-color, box-shadow, transform</code></td>
        <td data-mobile-label="Desc">Sets the transition-property property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-duration</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-duration</code></td>
        <td data-mobile-label="Desc">Sets the transition-duration property.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$transition-timing-function</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$transition-timing-function</code></td>
        <td data-mobile-label="Desc">Sets the transition-timing-function property.</td>
      </tr>
      <!-- card__title -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$title-font-size</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-size-lg</code></td>
        <td data-mobile-label="Desc">Sets the font-size property on the <code class="code">card__title</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$title-line-height</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$line-height-lg</code></td>
        <td data-mobile-label="Desc">Sets the line-height property on the <code class="code">card__title</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$title-font-weight</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$font-weight-semi-bold</code></td>
        <td data-mobile-label="Desc">Sets the font-weight property on the <code class="code">card__title</code> element.</td>
      </tr>
      <!-- card__screen -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$screen-opacity</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.7</code></td>
        <td data-mobile-label="Desc">Sets the opacity property on the <code class="code">card__screen</code> element.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$screen-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$night</code></td>
        <td data-mobile-label="Desc">Sets the background property on the <code class="code">card__screen</code> element.</td>
      </tr>
      <!-- card_invert -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-background</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$night</code></td>
        <td data-mobile-label="Desc">Sets the background property of the <code class="code">card_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">null</code></td>
        <td data-mobile-label="Desc">Sets the border-color property of the <code class="code">card_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-sep-border-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$border-color-invert</code></td>
        <td data-mobile-label="Desc">Sets the border-color property that separates card elements of the <code class="code">card_invert</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$invert-color</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$white</code></td>
        <td data-mobile-label="Desc">Sets the background property of the <code class="code">card_invert</code> modifier.</td>
      </tr>
      <!-- card_link -->
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-shadow</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$box-shadow-2</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property of the <code class="code">card_link</code> modifier.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-shadow-hover</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">core.$box-shadow-3</code></td>
        <td data-mobile-label="Desc">Sets the box-shadow property of the <code class="code">card_link</code> modifier on <code class="code">:hover</code> state.</td>
      </tr>
      <tr>
        <td data-mobile-label="Var"><code class="code text-nowrap">$link-offset</code></td>
        <td data-mobile-label="Default"><code class="code color-secondary text-nowrap">0.25em</code></td>
        <td data-mobile-label="Desc">Sets the distance that the card will travel vertically on <code class="code">:hover</code> of the <code class="code">card_link</code> modifier.</td>
      </tr>
    </tbody>
  </table>
</div>
