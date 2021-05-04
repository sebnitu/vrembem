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
      <a href="#" class="button button_invert button_outline">Card Action</a>
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
      <span class="button button_outline">Card Action</span>
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
      <a href="#" class="button button_invert button_outline">Card Action</a>
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
