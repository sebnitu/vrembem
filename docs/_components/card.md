---
layout: page
title: Card
description: "The cards component provide a flexible and extensible content container with multiple variants and options."
---

## `.card`

<div class="demo grid grid_md">
  <div class="grid__item size_4">
  <div class="demo__render">
    <div class="card">
      <img src="https://picsum.photos/600/400/?random" class="card__image" width="600" height="400">
      <div class="card__body spacing">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
    </div>
  </div>
  </div>
  <div class="grid__item">
  <div class="demo__code" markdown="1">
```html
<div class="card">
  <img class="card__image" src="..." />
  <div class="card__body">
    ...
  </div>
</div>
```
  </div>
  </div>
</div>

{%- comment -%}
  Available Classes:
  - card_link
  - ---
  - card_lift
  - card_step
  - card_zoom
  - card_fade

  - card_tall
  - card_max
  - card_size_lg
  - card_size_xl
{%- endcomment -%}

## `.card_link`

<div class="demo">
  <div class="demp__render">

    <div class="grid grid_md">

      {%- assign card_class = 'card_link' -%}

      {%- for counter in (1..3) -%}
      <div class="grid__item grid__item_fill">
        <a href="#" class="card {{ card_class }}">
          <img src="https://picsum.photos/600/400/?2{{ counter }}" class="card__image" width="600" height="400">
          <div class="card__body spacing">
            <h3 class="card__title level justify_between">
              <span>Card Title</span>
              {%- include icon.html icon="arrow-right" -%}
            </h3>
            <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et.</p>
          </div>
        </a>
      </div>
      {%- endfor -%}

    </div>

  </div>
</div>

## `.card_tall .card_zoom .card_fade`

<div class="demo">
  <div class="demp__render">

    <div class="grid grid_md">

      {%- assign card_class = 'card_tall card_fade card_zoom' -%}

      {%- for counter in (1..3) -%}
      <div class="grid__item grid__item_fill">
        <a href="#" class="card card_theme_dark {{ card_class }}">
          <div class="card__body spacing text_align_center">
            <h3 class="card__title">Card Title</h3>
            <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et.</p>
            <p>
              <button class="button button_outline_invert">
                <span>Card Action</span>
                {%- include icon.html icon="arrow-right" -%}
              </button>
            </p>
          </div>
          <img src="https://picsum.photos/600/400/?3{{ counter }}" class="card__background" width="600" height="400">
          <div class="card__screen"></div>
        </a>
      </div>
      {%- endfor -%}

    </div>

  </div>
</div>

## `.card_step`

<div class="demo">
  <div class="demp__render">

    <div class="grid grid_md">

      {%- assign card_class = 'card_step' -%}

      {%- for counter in (1..3) -%}
      <div class="grid__item grid__item_fill">
        <a href="#" class="card card_theme_shade {{ card_class }}">
          <div class="card__body">
            <div class="media">
              <div class="media__image">
                {%- include icon.html icon="check-circle" class="icon_size_lg" -%}
              </div>
              <div class="media__body">
                <h3 class="card__title">Card Title</h3>
                <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui.</p>
              </div>
            </div>
          </div>
        </a>
      </div>
      {%- endfor -%}

    </div>

  </div>
</div>

## `.card__screen` `+` `.card__background`

<div class="demo grid grid_md">
  <div class="grid__item">
  <div class="demp__render">
    <a href="#" class="card card_theme_dark">
      <div class="card__body spacing text_align_center">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p>
          <button class="button button_color_secondary">Card Action</button>
        </p>
      </div>
      <img src="https://picsum.photos/600/400/?20" class="card__background" width="600" height="400">
      <div class="card__screen"></div>
    </a>
  </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="card">
  <div class="card__body">
    ...
  </div>
  <img src="..." class="card__background" />
  <div class="card__screen"></div>
</div>
```
  </div>
  </div>
</div>

## `.card_size_[value]`

<div class="demo grid grid_md">
  <div class="demp__render grid__item">
    <div class="card card_theme_dark card_size_lg">
      <div class="card__body spacing text_align_center">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p>
          <button class="button button_color_primary">Card Action</button>
        </p>
      </div>
      <img src="https://picsum.photos/600/400/?9" class="card__background" width="600" height="400">
      <div class="card__screen"></div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="card card_size_lg">
  ...
</div>
```
  </div>
  </div>
</div>

<div class="demo grid grid_md">
  <div class="demp__render grid__item">
    <div class="card card_theme_dark card_size_xl">
      <div class="card__body spacing text_align_center">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p>
          <button class="button button_color_secondary">Card Action</button>
        </p>
      </div>
      <img src="https://picsum.photos/600/400/?10" class="card__background" width="600" height="400">
      <div class="card__screen"></div>
    </div>
  </div>
  <div class="grid__item size_6">
  <div class="demo__code" markdown="1">
```html
<div class="card card_size_xl">
  ...
</div>
```
  </div>
  </div>
</div>

## Examples

Below are a few examples of different ways to build a card.

<div class="grid">

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
    <div class="card">
      <img src="https://picsum.photos/600/400/?2" class="card__image" width="600" height="400">
      <div class="card__body spacing">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
    </div>
  </div>

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
    <div class="card">
      <div class="card__body spacing">
        <h3 class="card__title">Card Title</h3>
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
      <img src="https://picsum.photos/600/400/?3" class="card__image" width="600" height="400">
    </div>
  </div>

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
    <div class="card card_theme_dark">
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

  <div class="grid__item size_12 size_6_xs grid__item_fill">
    <a href="#" class="card card_theme_dark card_tall card_link card_fade">
      <div class="card__header level justify_between">
        <h3 class="card__title">Card Title</h3>
        {%- include icon.html icon="arrow-right" -%}
      </div>
      <div class="card__body">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_color_primary">Card Action</button></p>
      </div>
      <img src="https://picsum.photos/600/400/?4" class="card__background" width="600" height="400">
      <div class="card__screen"></div>
    </a>
  </div>

  <div class="grid__item size_12 size_6_md grid__item_fill">
    <a href="#" class="card card_theme_bordered card_link card_size_lg">
      <div class="card__body spacing">
        <blockquote>
          <p class="text_lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus libero est, fermentum ac risus et, efficitur ultricies metus. Vestibulum rutrum dolor dui, lacinia viverra tellus molestie eget. Proin tempor mauris id velit luctus, sit amet varius erat vestibulum.</p>
          <footer class="text_subtle mt_1">
            <cite title="Source Title">&mdash; Someone famous in Source Title</cite>
          </footer>
        </blockquote>
      </div>
    </a>
  </div>

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
    <div class="card card_theme_shade">
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

  <div class="grid__item size_12 size_6_xs size_4_md grid__item_fill">
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

  <div class="grid__item size_12 size_4_md grid__item_fill">
    <a href="#" class="card card_theme_bordered card_link">
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
      </div>
      <div class="card__body spacing">
        <p>Quisque eget erat non dolor rutrum pellentesque ac vel dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur.</p>
      </div>
      <div class="card__footer">
        <p><button class="button button_outline_success">Card Action</button></p>
      </div>
      <img src="https://picsum.photos/600/400/?13" class="card__image d_none_xs d_block_md" width="600" height="400">
    </a>
  </div>

</div><!-- .grid -->

