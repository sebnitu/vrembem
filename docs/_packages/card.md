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

The base card component comes with a number of elements for card composition. The three most basic being:

* `card__body`
* `card__image`
* `card__title`

{% include demo_open.html %}
<div class="card">
  <img src="https://picsum.photos/600/400/?random" class="card__image" width="600" height="400">
  <div class="card__body spacing">
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

## card__header + card__footer

These are used for when you need separated card headers and footers.

* `card__header`
* `card__footer`

{% include demo_open.html %}
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
  </div>
  <div class="card__body spacing">
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

## card__screen + card__background

Card screens and backgrounds are displayed behind the other card elements. These are typically paired with `.card_invert` which switches text colors to better suite a dark background.

* `card__screen`
* `card__background`

{% include demo_open.html %}
<div class="card card_invert">
  <div class="card__body spacing text-align-center">
    <h3 class="card__title">Card Title</h3>
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
    <p>
      <button class="button button_color_primary">Card Action</button>
    </p>
  </div>
  <img src="https://picsum.photos/600/400/?20" class="card__background" width="600" height="400">
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

## card_invert

{% include demo_open.html %}
<div class="card card_invert">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
  </div>
  <div class="card__body spacing">
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

{% include demo_open.html %}
<a href="#" class="card card_link">
  <div class="card__body spacing text-align-center">
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

## card_fade

{% include demo_open.html %}
<div class="card card_invert card_fade">
  <div class="card__body spacing text-align-center">
    <h3 class="card__title">Card Title</h3>
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
    <p>
      <a href="#" class="button button_invert button_outline">Card Action</a>
    </p>
  </div>
  <img src="https://picsum.photos/600/400/?20" class="card__background" width="600" height="400">
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

## card_zoom

{% include demo_open.html %}
<div class="card card_invert card_zoom">
  <div class="card__body spacing text-align-center">
    <h3 class="card__title">Card Title</h3>
    <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
    <p>
      <a href="#" class="button button_invert button_outline">Card Action</a>
    </p>
  </div>
  <img src="https://picsum.photos/600/400/?20" class="card__background" width="600" height="400">
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

## card_invert card_fade card_zoom

<div class="demo">
  <div class="demp__render">
    <div class="grid grid_break_md">
      {%- for counter in (1..3) -%}
      <div class="grid__item grid__item_fill">
        <div class="card card_invert card_fade card_zoom">
          <div class="card__body spacing text-align-center">
            <h3 class="card__title">Card Title</h3>
            <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque.</p>
            <p>
              <button class="button button_invert button_outline">
                <span>Card Action</span>
                {%- include icon.html icon="arrow-right" -%}
              </button>
            </p>
          </div>
          <img src="https://picsum.photos/600/400/?3{{ counter }}" class="card__background" width="600" height="400">
          <div class="card__screen"></div>
        </div>
      </div>
      {%- endfor -%}
    </div>
  </div>
</div>

## card_link

<div class="demo">
  <div class="demp__render">
    <div class="grid grid_break_md">
      {%- for counter in (1..3) -%}
      <div class="grid__item grid__item_fill">
        <a href="#" class="card card_link">
          <img src="https://picsum.photos/600/400/?2{{ counter }}" class="card__image" width="600" height="400">
          <div class="card__body spacing">
            <h3 class="card__title level flex-justify-between">
              <span>Card Title</span>
              {%- include icon.html icon="arrow-right" -%}
            </h3>
            <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque.</p>
          </div>
        </a>
      </div>
      {%- endfor -%}
    </div>
    <div class="grid grid_break_md">
      {%- for counter in (1..3) -%}
      <div class="grid__item grid__item_fill">
        <a href="#" class="card card_link">
          <div class="card__body">
            <div class="media">
              <div class="media__image text-size-lg">
                {%- include icon.html icon="check-circle" -%}
              </div>
              <div class="media__body">
                <h3 class="card__title">Card Title</h3>
                <p>Quisque eget erat non dolor rutrum vel dui.</p>
              </div>
            </div>
          </div>
        </a>
      </div>
      {%- endfor -%}
    </div>
  </div>
</div>

## Demos

<div class="grid">

  <div class="grid__item span_12 span_6_xs span_4_md grid__item_fill">
    <div class="card">
      <img src="https://picsum.photos/600/400/?2" class="card__image" width="600" height="400">
      <div class="card__body spacing">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
    </div>
  </div>

  <div class="grid__item span_12 span_6_xs span_4_md grid__item_fill">
    <div class="card">
      <div class="card__body spacing">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p><button class="button button_color_secondary">Card Action</button></p>
      </div>
      <img src="https://picsum.photos/600/400/?3" class="card__image" width="600" height="400">
    </div>
  </div>

  <div class="grid__item span_12 span_6_xs span_4_md grid__item_fill">
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
      </div>
      <div class="card__body spacing">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
    </div>
  </div>

  <div class="grid__item span_12 span_6_xs grid__item_fill">
    <div class="card card_invert card_link card_fade">
      <div class="card__header level flex-justify-between">
        <h3 class="card__title">Card Title</h3>
        {%- include icon.html icon="arrow-right" -%}
      </div>
      <div class="card__body">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <button class="button button_invert">Card Action</button>
      </div>
      <img src="https://picsum.photos/600/400/?4" class="card__background" width="600" height="400">
      <div class="card__screen"></div>
    </div>
  </div>

  <div class="grid__item span_12 span_6_md grid__item_fill">
    <a href="#" class="card card_link">
      <div class="card__body">
        <blockquote class="spacing">
          <p class="text-lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et, efficitur ultricies metus. Vestibulum rutrum dolor dui, lacinia viverra tellus molestie eget. Proin tempor mauris id velit luctus, sit amet varius erat vestibulum.</p>
          <footer class="text-subtle">
            <cite title="Source Title">
              &mdash; Someone famous in Source Title
            </cite>
          </footer>
        </blockquote>
      </div>
    </a>
  </div>

  <div class="grid__item span_12 span_6_xs span_4_md grid__item_fill">
    <div class="card">
      <img src="https://picsum.photos/600/400/?11" class="card__image" width="600" height="400">
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
      </div>
      <div class="card__body spacing">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_outline_primary">Card Action</button></p>
      </div>
    </div>
  </div>

  <div class="grid__item span_12 span_6_xs span_4_md grid__item_fill">
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
      </div>
      <img src="https://picsum.photos/600/400/?12" class="card__image" width="600" height="400">
      <div class="card__body spacing">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_outline_secondary">Card Action</button></p>
      </div>
    </div>
  </div>

  <div class="grid__item span_12 span_4_md grid__item_fill">
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
      </div>
      <div class="card__body spacing">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_outline_accent">Card Action</button></p>
      </div>
      <img src="https://picsum.photos/600/400/?13" class="card__image" width="600" height="400">
    </div>
  </div>

</div><!-- .grid -->
